"use client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { app } from "../firebase/firebaseConfig";

type UserType = {
    email: string | null,
    uid: string,
}
type AuthContextType = {
    user: UserType | null
    handleUser: (user: UserType) => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserType | null>(null);

    const handleUser = (user: UserType | null) => {
        setUser(user ? user : null);
    }
    const route = useRouter();
    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (loggedInUser) => {
            if (loggedInUser) {
                console.log(loggedInUser);
                const { email, uid, emailVerified } = loggedInUser;
                setUser({ email, uid });
                if (emailVerified) {
                    route.push("/home");
                }
                else {
                    route.push('/verify-email');
                }
            }
            else {
                setUser(null);
                route.push("/login");
            }
        });
    }, [])
    return (
        <AuthContext.Provider value={{ user, handleUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);