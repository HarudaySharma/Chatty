import React from 'react'
import Sidebar from '../components/sidebar/Sidebar';
import UserList from './components/UserList'
import getUsers from '../actions/getUsers';

interface UsersLayoutProps {
    children: React.ReactNode;
}

const UsersLayout = async ({ children }: UsersLayoutProps) => {
    const users = await getUsers();

    return (
        <Sidebar>
            <UserList items={users} />
            <div
                className='h-full'
            >
                {children}
            </div>
        </Sidebar>
    )
}

export default UsersLayout
