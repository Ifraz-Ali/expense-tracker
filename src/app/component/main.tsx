'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import Header from './header';
import { useToggleThemeContext } from '../context/toggleThemeContext';

const Main = () => {
    const { isDark } = useToggleThemeContext()!;
    const router = useRouter();

    const signup = () => {
        router.push('./signup');
    }
    const login = () => {
        router.push('/login');
    }
    return (
        <>
            {isDark ?
                <div className='flex justify-center items-center h-screen text-slate-200'>
                    <Header />
                    <div className='w-1/2 h-80 bg-slate-900 shadow-2xl flex justify-center items-center gap-12'>
                        <div>
                            <button className='bg-blue-900 p-2 rounded'
                                onClick={signup}>Signup</button>
                        </div>
                        <div>
                            <button className='bg-sky-700 p-2 rounded'
                                onClick={login}>Login</button>
                        </div>
                        <h1>Main Page</h1>
                    </div>
                </div>
                :
                <div className='flex justify-center items-center h-screen'>
                    <Header />
                    <div className='w-1/2 h-80 bg-slate-200 flex justify-center items-center gap-12'>
                        <div>
                            <button className='bg-blue-500 p-1 rounded'
                                onClick={signup}>Signup</button>
                        </div>
                        <div>
                            <button className='bg-sky-500 p-1 rounded'
                                onClick={login}>Login</button>
                        </div>
                        <h1>Main Page</h1>
                    </div>
                </div>
            }
        </>
    )
}

export default Main