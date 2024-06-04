import React from 'react'
import Sidebar from '../components/sidebar/Sidebar';

interface UsersLayoutProps {
    children: React.ReactNode;
}

async function UsersLayout({ children }: UsersLayoutProps) {
    return (
        <Sidebar>
            <div
                className='h-full'
            >
                {children}
            </div>
        </Sidebar>
    )
}

export default UsersLayout
