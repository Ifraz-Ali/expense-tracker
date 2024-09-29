'use client'
import React from 'react'
import Login from '../component/login'
import { login } from '../firebase/firebaseauth'
import Header from '../component/header'

const page = () => {
    return (
        <div>
            <Header />
            <Login handlefun={login} />
        </div>
    )
}

export default page