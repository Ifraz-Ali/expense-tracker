import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useAuthContext } from '../context/authContext';
import { useToggleThemeContext } from '../context/toggleThemeContext';
import { app } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { signup } from '../firebase/firebaseauth'

const Signup = () => {
    const { isDark } = useToggleThemeContext()!;
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)

    const router = useRouter();
    const handleSignup = () => {

        signup(email, password, fullName)
            .then(() => {
                console.log('signup');
                router.push('/verify-email');
                
            })
            .catch((error) => {
                console.log('error =>', error.code);
                setError(error.code);
            })
    }
    return (
        // <div className='flex flex-col items-center justify-center bg-slate-100 h-screen bg-gradient-to-r from-green-300 from-15% via-teal-400 via-45% to-emerald-400 to-70% '>
        //     <div className='bg-blue-100  w-1/2 h-4/5 flex items-center flex-col justify-center gap-6 shadow-xl bg-white/30 ring-1 ring-black/10'>
        //         <h1 className='text-4xl font-bold text-slate-100 font-sans'>Signup</h1>
        //         <div className=''>
        //             <label htmlFor="fullname" className='block'>Full Name</label>
        //             <input type="text" name='fullname' id='fullname'
        //                 className='px-2 ring-gray-300 ring-1 rounded-lg focus:outline-cyan-300 border-0'
        //                 value={fullName} onChange={(e) => setFullName(e.target.value)} />
        //         </div>
        //         <div>
        //             <label htmlFor="email" className='block'>Email</label>
        //             <input type="text" name='email' id='email'
        //                 className='px-2 ring-gray-300 ring-1 rounded-lg focus:outline-cyan-300 border-0 ' />
        //         </div>
        //         <div>
        //             <label htmlFor="password" className='block'>Create Password</label>
        //             <input type="password" name='password' id='password'
        //                 className='px-2 ring-gray-300 ring-1 rounded-lg focus:outline-cyan-300 border-0 ' />
        //         </div>
        //         <div>
        //             <label htmlFor="password" className='block'>Confirm Password</label>
        //             <input type="password" name='password' id='password'
        //                 className='px-2 ring-gray-300 ring-1 rounded-lg focus:outline-cyan-300 border-0 ' />
        //         </div>
        //         <button className='border-0 p-1 bg-emerald-600 rounded-xl w-1/3 transition ease-in duration-300 hover:bg-teal-500 active:scale-90'>Sign up</button>
        //         <div>
        //             <p>Already Registered? <span><Link href={'login'}>Login</Link></span></p>
        //         </div>
        //     </div>
        // </div>
        <>
            {isDark ?
                <div className='flex justify-center items-center h-screen bg-slate-800 text-slate-200'>
                    <div className='w-1/2 h-96 bg-slate-900 shadow-2xl flex flex-col justify-center items-center gap-8 rounded'>
                        <h1 className='text-2xl font-semibold'>signup page</h1>
                        <div>
                            Full Name <input type="text" name='fullName' id='fullName' placeholder='Full Name' className='border p-1 px-2 rounded-2xl text-gray-800'
                                value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div>
                            Email <input type="text" name='email' id='email' placeholder='Email' className='border p-1 px-2 rounded-2xl text-gray-800'
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            Password <input type="password" name='password' id='password' placeholder='Password' className='border p-1 px-2 rounded-2xl text-gray-800'
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {error ? <div className='bg-red-500 text-gray-900 text-xl'>im here{error}</div> : "kuch nhi h"}
                        <button className='bg-blue-400 px-4 rounded-lg' onClick={handleSignup}>Signup</button>
                        <div className=''>
                            <p>Already Registered? <Link href={'/login'} className='hover:underline'>Login</Link></p>
                        </div>
                    </div>
                </div>
                :
                <div className='flex justify-center items-center h-screen'>
                    <div className='w-1/2 h-96 bg-slate-200 flex flex-col justify-center items-center gap-4 rounded'>
                        <h1 className='text-2xl font-semibold'>signup page</h1>
                        <div>
                            <label htmlFor="fullname" className='block'>
                                Full Name
                            </label>
                            <input type="text" name='fullName' id='fullName' placeholder='Full Name' className='border p-1 px-2 rounded-2xl text-gray-800'
                                value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email" className='block'>
                                Email
                            </label>
                            <input type="text" name='email' id='email' placeholder='Email' className='border p-1 px-2 rounded-2xl text-gray-800'
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className='block'>
                                Password
                            </label>
                            <input type="password" name='password' id='password' placeholder='Password' className='border p-1 px-2 rounded-2xl text-gray-800'
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {error ? <span className='text-red-500 text-md'>{error}</span> : ''}
                        <button className='bg-blue-400 px-4 rounded-lg' onClick={handleSignup}>Signup</button>
                        <div className=''>
                            <p>Already Registered? <Link href={'/login'} className='hover:underline'>Login</Link></p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Signup