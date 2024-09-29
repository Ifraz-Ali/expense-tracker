import { app } from '@/app/firebase/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import { saveUser } from './firebasefirestore';

export const auth = getAuth(app);
const signup = async (email: string, password: string, fullName: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { uid } = userCredential.user;
        saveUser({ email, fullName, uid });
        return userCredential.user;
    } catch (error) {
        console.log("Singup Erorr :", error);
        throw error;
    }
}

const login = async (email: string, password: string) => {

    // signInWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         const user = userCredential.user;
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.error(errorMessage);
    //     });
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        console.log(user, "==> login user");
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const logout = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
        console.log(error)
    });
}

const verify = () => {
    if (auth.currentUser) {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log('Verification email sent to:', auth.currentUser);
            })
            .catch((error) => {
                console.error('Error sending verification email:', error);
            });
    } else {
        console.error('No user is currently signed in.');
    }
}


export {
    signup,
    login,
    logout,
    verify
}