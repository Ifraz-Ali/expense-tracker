
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/authContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/firebaseConfig';
import Link from 'next/link';
import { login } from '../firebase/firebaseauth'
import { useToggleThemeContext } from '../context/toggleThemeContext';
import {verify} from '@/app/firebase/firebaseauth';

type FunctionType = {
    handlefun: (email: string, password: string) => void
}
const Login = ({ handlefun }: FunctionType) => {
    const { isDark } = useToggleThemeContext()!;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
    const { user, handleUser } = useAuthContext()!;
    // console.log(user);
    const handleSignup = async () => {
        const user = await login(email, password)
        console.log('login : ', user);
        const auth = getAuth(app);
        onAuthStateChanged(auth, (loggedInUser) => {
            if (loggedInUser) {
                const { email, uid, emailVerified } = loggedInUser
                handleUser({ email, uid });
                if (emailVerified) {
                    router.push('/home');
                }
                else {
                    router.push('/verify-email');
                    verify();
                }
            }
            else {
                // handleUser(null);
                router.push('/login');
            }
        })
    }

    return (
        <>
            {isDark ?
                <div className='flex justify-center items-center h-screen text-slate-200 bg-slate-800'>
                    <div className='w-1/2 h-80 bg-slate-900 shadow-2xl flex flex-col justify-center items-center gap-8 rounded'>
                        <h1 className='text-2xl font-semibold'>Login page</h1>
                        <div>
                            Email <input type="text" name='email' id='email' placeholder='Email' className='border p-1 px-2 rounded-2xl text-gray-800'
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            Password <input type="password" name='password' id='password' placeholder='Password' className='border p-1 px-2 rounded-2xl text-gray-800'
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        { }
                        <button className='bg-blue-400 px-4 rounded-lg' onClick={handleSignup}>Login</button>
                        <div>
                            <p>Not Registered Yet? <Link href={'/signup'} className='hover:underline'>Signup</Link></p>
                        </div>
                    </div>
                </div>
                :
                <div className='flex justify-center items-center h-screen'>
                    <div className='w-1/2 h-80 bg-slate-200 flex flex-col justify-center items-center gap-7 rounded'>
                        <h1 className='text-2xl font-semibold'>Login page</h1>
                        <div>
                            <label htmlFor="email" className='block'>
                                Email
                            </label>
                            <input type="text" name='email' id='email' placeholder='Email' className='border p-1 px-2 rounded-2xl text-gray-800'
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email" className='block'>
                                Password
                            </label>
                            <input type="password" name='password' id='password' placeholder='Password' className='border p-1 px-2 rounded-2xl text-gray-800'
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className='bg-blue-400 px-4 rounded-lg' onClick={handleSignup}>Login</button>
                        <div>
                            <p>Not Registered Yet? <Link href={'/signup'} className='hover:underline'>Signup</Link></p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Login