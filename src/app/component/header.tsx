import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import sun from '@/app/assets/sun.gif'
import night from '@/app/assets/night.gif'
import home from '@/app/assets/new-house.gif'
import logoutIcon from '@/app/assets/logout.gif'
import { useToggleThemeContext } from '../context/toggleThemeContext'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '../context/authContext'
import { logout } from '../firebase/firebaseauth'

const Header = () => {
    const { user } = useAuthContext()!;
    useEffect(() => {
    }, [])
    const { isDark, toggleTheme } = useToggleThemeContext()!;
    const router = useRouter();

    const handleLogout = () => {
        console.log('logout');
        logout();
    }
    return (
        <>
            {isDark ?
                <div className='fixed top-0 flex bg-slate-500 h-16 w-full p-1'>
                    <div className='flex items-center w-1/4 order-last'>
                        <button onClick={toggleTheme}>
                            <Image src={night} alt='theme-icon' width={50} height={50} />
                        </button>
                    </div>
                    <div className='flex items-center w-1/4'>
                        <button onClick={() => router.push('/')}>
                            <Image src={home} alt='home-icon' width={50} height={50} className='' />
                        </button>
                    </div>
                    {user ?
                        <div className='flex items-center w-1/4 order-first'>
                            <button onClick={handleLogout}>
                                <Image src={logoutIcon} alt='home-icon' width={50} height={50} />
                            </button>
                        </div>
                        : null
                    }
                </div>
                :
                <div className='fixed top-0 flex bg-slate-50 h-16 w-full p-1'>
                    <div className='flex items-center w-1/4 order-last'>
                        <button onClick={toggleTheme}>
                            <Image src={sun} alt='theme-icon' width={50} height={50} />
                        </button>
                    </div>
                    <div className='flex items-center w-1/4'>
                        <button onClick={() => router.push('/')}>
                            <Image src={home} alt='home-icon' width={50} height={50} />
                        </button>
                    </div>
                    {user ?
                        <div className='flex items-center w-1/4 order-first'>
                            <button onClick={handleLogout}>
                                <Image src={logoutIcon} alt='home-icon' width={50} height={50} className='mix-blend-multiply' />
                            </button>
                        </div>
                        : null
                    }
                </div>
            }
            {/* <div className='fixed top-0 flex bg-slate-50 h-16 w-full dark:bg-slate-800'>
                <div className='flex items-center '>
                    <button onClick={toggleTheme}>
                        {isDark ?
                            <Image src={sun} alt='theme-icon' width={50} height={50} />
                            :
                            <Image src={night} alt='theme-icon' width={50} height={50} />
                        }
                    </button>
                </div>
            </div> */}
        </>
    )
}

export default Header