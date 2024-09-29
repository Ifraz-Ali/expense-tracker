import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { app } from "@/app/firebase/firebaseConfig";
import { auth } from "@/app/firebase/firebaseauth";

export const db = getFirestore(app);
type UserType = {
    email: string;
    fullName: string;
    uid: string;
};
type ExpenseType = {
    title: string,
    amount: Number,
    category: 'food' | 'transport' | 'bills' | 'education' | 'investment' | 'luxuries' | 'others',
    date: string,
    optional: string
};
export async function saveUser(user: UserType) {
    //   let docRef = doc(db, "collectionName", "docID");
    //   await setDoc(docRef, user);

    //   let collectionRef = collection(db, "collectionName");
    //   await addDoc(collectionRef, user);
    try {
        let docRef = doc(db, "users", user.uid);
        await setDoc(docRef, user);
        console.log('user agya: ', user)
    } catch (e) {
        console.log('error agya: ', e);
    }
}



export async function getUser(uid: string | undefined) {
    try {
        if (!uid) {
            console.error("User ID is undefined!");
            return;
        }
        // Reference to the document in the "users" collection by user ID (uid)
        const docRef = doc(db, "users", uid);

        // Fetch the document snapshot
        const docSnap = await getDoc(docRef);

        // Check if the document exists
        if (docSnap.exists()) {
            // Return or log the data
            const userData = docSnap.data();
            console.log("User data:", userData);
            return userData;
        } else {
            console.log("No such user found!");
        }
    } catch (error) {
        console.error("Error getting user data:", error);
    }
}

export async function addExpense(expense : ExpenseType) {
    let uid = auth.currentUser?.uid;
    let newExpense = {expense, uid}
    try {
        let collectionRef = collection(db, "expenses");
        await addDoc(collectionRef, newExpense);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function deleteExpense(id: string) {
    await deleteDoc(doc(db, "expenses", id));
}