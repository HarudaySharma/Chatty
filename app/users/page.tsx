'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

const Users = () => {
    return (
        <button
            onClick={() => signOut()}
            className='p-4 bg-sky-50'
        >
            LogOut
        </button>
    )
}

export default Users
