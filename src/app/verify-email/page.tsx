'use client'
import React, { useEffect } from 'react'
import { useAuthContext } from '../context/authContext'
import { useRouter } from 'next/navigation'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '../firebase/firebaseConfig'
import { verify } from '../firebase/firebaseauth'



const Page = () => {
    useEffect(() => {
        verify();
    }, [])
    const router = useRouter();
    // const { user } = useAuthContext()!;
    // console.log(user);
    // const auth = getAuth(app);
    // const user = auth.currentUser;

    const handleVerification = () => {
        console.log('email verified')
        verify()
        router.push('/login')
    }
    // if (user) {
    //     console.log('user =>', user.emailVerified);
    //     if (user.emailVerified) {
    //         router.push('/home');
    //     }
    //     else {
    //         handleVerification()
    //     }
    // } else {
    //     console.log('koi nhi hai',);
    // }


    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-1/2 h-80 bg-slate-200 flex flex-col justify-center items-center gap-10'>
                <h1 className='text-2xl'>Email Verification Page</h1>
                <p>Check your email. click on the link to verify</p>
                <p>If it doesn't redirect you to login page, refresh the page</p>
                <button className='bg-yellow-500 p-1 rounded'
                    onClick={handleVerification}>Send Email again</button>
            </div>
        </div>
    )
}

export default Page