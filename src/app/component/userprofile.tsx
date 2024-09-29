'use client';
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/authContext'
import Profile from '@/app/assets/profile.png'
import User from '@/app/assets/user.png'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useToggleThemeContext } from '../context/toggleThemeContext';
import Loader from './loader';
import { getUser } from "@/app/firebase/firebasefirestore";

type UserDataType = {
    email: string
    fullName: string
    uid: string
}
const UserProfile = () => {
    const [userData, setUSerData] = useState<UserDataType | null>(null);
    const { isDark } = useToggleThemeContext()!;
    const { user } = useAuthContext()!;
    const route = useRouter();
    useEffect(() => {
        getUser(user?.uid).then((userData) => {
            console.log('mei agya', userData);
            setUSerData(userData);
        })
    }, [])
    return (
        <>
            {user ?
                isDark ?
                    <div className='flex flex-col justify-center items-center h-screen bg-slate-800 text-slate-200'>
                        <div className='fixed top-20 right-0 px-3 active:scale-95'>
                            <button className='bg-gray-400 rounded-lg p-1'
                                onClick={() => route.push('/expense-tracker')}>Expense Tracker</button>
                        </div>
                        <div className='bg-gray-900 w-1/2 h-60 p-2 shadow-2xl '>
                            <h2 className='bg-gray-600 text-center text-2xl p-1'>User Card</h2>
                            <div className='flex items-center bg-slate-600 h-3/4 mt-2 gap-4 p-1 max-[1000px]:flex-col max-[1000px]:h-4/5'>
                                <div className='bg-white h-5/2 w-1/5 p-1 '>
                                    <Image src={User} alt="profile-icon" width={100} height={100} className='' />
                                </div>
                                <div className='bg-gray-900 w-0.5 h-5/6 max-[1000px]:hidden'></div>
                                <div className='p-1 max-[1000px]:text-sm'>
                                    <p className='font-semibold'>Name: {userData?.fullName}</p>
                                    <p className='font-semibold'>Email: {userData?.email}</p>
                                    <p className='font-semibold  max-[1000px]:truncate'>Unique ID: {userData?.uid}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='flex flex-col justify-center items-center h-screen'>
                        <div className='fixed top-20 right-0 px-3 active:scale-95'>
                            <button className='bg-gray-400 rounded-lg p-1'
                                onClick={() => route.push('/expense-tracker')}>Expense Tracker</button>
                        </div>
                        <div className='bg-gray-300 w-1/2 h-60 p-2 '>
                            <h2 className='bg-gray-100 text-center text-2xl p-1'>User Card</h2>
                            <div className='flex items-center bg-slate-200 h-3/4 mt-2 gap-4 p-1 max-[1000px]:flex-col max-[1000px]:h-5/6'>
                                <div className='bg-white h-5/2 w-1/5 p-1 '>
                                    <Image src={User} alt="profile-icon" width={100} height={100} className='' priority/>
                                </div>
                                <div className='bg-gray-600 w-0.5 h-5/6 max-[1000px]:hidden'></div>
                                <div className='p-1 max-[1000px]:text-sm'>
                                    <p className='font-semibold'>Name: {userData?.fullName}</p>
                                    <p className='font-semibold'>Email: {userData?.email}</p>
                                    <p className='font-semibold  max-[1000px]:truncate'>Unique ID: {userData?.uid}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                :
                <Loader />
            }

        </>
    )
}

export default UserProfile