"use client";

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/authContext';
import { addExpense, db, deleteExpense } from '../firebase/firebasefirestore';
import { collection, onSnapshot, query, Unsubscribe, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseauth';
import { useToggleThemeContext } from '../context/toggleThemeContext';


interface ExpenseType {
    optional: string;
    title: string;
    id: string;
    amount: number;
    category: string;
    date: string;  // Date could be stored as string or Firestore Timestamp
}
const Page = () => {
    const { isDark } = useToggleThemeContext()!;

    const [title, setTitle] = useState<string>('');
    const [amount, setAmount] = useState<Number | string>(0);
    const [category, setCategory] = useState<'food' | 'transport' | 'bills' | 'education' | 'investment' | 'luxuries' | 'others'>('food');
    const [date, setDate] = useState<string>('');
    const [optional, setOptional] = useState<string>('');
    const { user } = useAuthContext()!;
    const route = useRouter();

    const [expenses, setExpenses] = useState<ExpenseType[]>([]);

    const saveExpense = () => {
        console.log('chal rha h')
        const expense = {
            title: title,
            amount: amount,
            category: category,
            date: date,
            optional: optional
        }
        console.log(expense);
        console.log('user', user);
        addExpense(expense);
        setTitle('');
        setAmount('');
        setCategory('food');
        setDate('');
        setOptional('');
    }

    useEffect(() => {
        let detachOnAuthListiner = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchExpensesRealtime();
            }
        })

        return () => {
            if (readExpensesRealtime) {
                console.log("Component Unmount.");
                readExpensesRealtime();
                detachOnAuthListiner();
            }
        }

    }, [])

    let readExpensesRealtime: Unsubscribe;

    const fetchExpensesRealtime = () => {
        let collectionRef = collection(db, "expenses");
        let currentUserUID = auth.currentUser?.uid;
        let condition = where("uid", "==", currentUserUID);
        let q = query(collectionRef, condition);
        let allExpensesClone = [...expenses];

        readExpensesRealtime = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                // console.log("mei data hn",querySnapshot.docs.forEach((value)=>{
                //     console.log('value', value.data())
                // }));
                if (change.type === "added") {
                    let expense = change.doc.data();
                    expense.id = change.doc.id;
                    allExpensesClone.push(expense);
                    setExpenses([...allExpensesClone])
                }
                if (change.type === "modified") {
                    console.log('data modified');
                }
                if (change.type === "removed") {
                    console.log('data removed', change.doc.data());
                    console.log('some id', change.doc.id);
                    let updated = querySnapshot.docs.map((value) => {
                        console.log('value', value.data())
                        return value.data();
                    })
                    console.log('mei bach gya', updated);
                    let newClone = [...updated];
                    setExpenses([...newClone]);
                }
            })
        })
    }

    const handleEdit = async (id: string) => {
        console.log('edit');
    }
    const handleDelete = (id: string) => {
        console.log('delete', id);
        deleteExpense(id);
    }

    return (
        <>
            <div className='p-2'>
                <button className='bg-gray-300 rounded-lg p-1 active:scale-95'
                    onClick={() => route.push('/home')}>Back</button>
            </div>
            <div>
                <div>
                    <h1 className='text-2xl text-center'>Expense Tracker</h1>
                </div>
                <div className='bg-gray-100 p-2'>
                    Title:
                    <input type="text"
                        placeholder='Title'
                        className='border-1 ring-2 px-2 m-1 rounded-lg'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} /> <br />
                    Amount:
                    <input type="text"
                        placeholder='Amount'
                        className='border-1 ring-2 px-2 m-1 rounded-lg'
                        value={Number(amount)}
                        onChange={(e) => setAmount(Number(e.target.value))} /> <br />
                    Category:
                    <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="food">Food</option>
                        <option value="transport">Transport</option>
                        <option value="bills">Bills</option>
                        <option value="education">Education</option>
                        <option value="investment">Investment</option>
                        <option value="luxuries">Luxuries</option>
                        <option value="others">Others</option>
                    </select> <br />
                    Date:
                    <input type="date"
                        className='border-1 ring-2 px-2 m-1 rounded-lg'
                        value={date}
                        onChange={(e) => setDate(e.target.value)} /> <br />
                    Optional:
                    <input type="text"
                        placeholder='description'
                        className='border-1 ring-2 px-2 m-1 rounded-lg'
                        value={optional}
                        onChange={(e) => setOptional(e.target.value)} /> <br />
                    <button className='bg-blue-400 p-1 rounded border-0 active:scale-95'
                        onClick={saveExpense}>Save</button>
                </div>
                <div>
                    <h1 className='text-2xl text-center'>My Expenses</h1>
                    <table className='border-2 bg-orange-100 w-full'>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>

                            {expenses.length > 0 ? expenses.map((expenseDoc) => {
                                console.log(expenseDoc)
                                const { id, expense: { date, title, amount, category, optional } } = expenseDoc;
                                return (
                                    <tr className='border-2 text-center'
                                        key={id}>
                                        <td>{date}</td>
                                        <td>{title}</td>
                                        <td>${amount}</td>
                                        <td>{category}</td>
                                        <td>{optional}</td>
                                        <td>
                                            <button className='rounded mx-1 bg-blue-400 p-1 w-3/4'
                                                onClick={() => handleEdit(id)}>Edit</button>
                                        </td>
                                        <td>
                                            <button className='rounded mx-1 bg-red-400 p-1 w-3/4'
                                                onClick={() => handleDelete(id)}>Delete</button>
                                        </td>
                                    </tr>

                                )
                            }) : (
                                <tr>
                                    <td colSpan={7} className='text-center'>No expenses found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Page