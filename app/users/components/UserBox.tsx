'use client'

import Avatar from '@/app/components/Avatar';
import { Conversation, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';

interface UserBoxProps {
    userData: User;
}

const UserBox: React.FC<UserBoxProps> = ({ userData }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);


    const handleClick = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/conversations', {
                method: 'POST',
                body: JSON.stringify({ userId: userData.id })
            })
            if (!res.ok) {
                toast.error('something went wrong')
                console.error(res);
                return;
            }
            const data = await res.json() as Conversation;
            router.push(`/conversations/${data.id}`);
        }
        catch (err) {
            toast.error('something went wrong')
            console.error(err);
        }
        finally {
            setIsLoading(false);
        }
    }, [userData, router]);

    return (
        <div
            onClick={handleClick}
            className='
                w-full
                relative
                flex
                items-center
                space-x-3
                bg-white
                p-3
                hover:bg-neutral-100
                rounded-lg
                transition
                cursor-pointer
            '
        >
            <Avatar user={userData} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div
                        className="
                            flex
                            justify-between
                            items-center
                            mb-1
                        "
                    >
                        <p
                            className='
                                text-sm
                                font-medium
                                text-gray-900
                            '
                        >
                            {userData.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBox
