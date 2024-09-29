'use client'
import React from 'react'
import { useAuthContext } from '../context/authContext'
import UserProfile from '../component/userprofile'
import Header from '../component/header'

const Page = () => {

    return (
        <div className='h-screen bg-slate-100'>
            <Header />
            <UserProfile />
        </div>
    )
}

export default Page