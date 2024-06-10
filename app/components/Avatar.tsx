import { User } from '@prisma/client'
import React from 'react'

import Image from "next/image"
import useActiveList from '../hooks/useActiveList';

interface AvatarProps {
    user: User | null;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {

    if (!user) {
        return null;
    }

    const { members } = useActiveList();
    const isActive = members.indexOf(user?.email!) !== -1;

    return (
        <div className='relative'>
            <div
                className='
                    relative
                    inline-block
                    rounded-full
                    overflow-hidden
                    h-9
                    w-9
                    md:h-11
                    md:w-11
                '
            >
                <Image
                    alt='avatar'
                    src={user.image || '/images/placeholder.avif'}
                    fill
                />
                {isActive &&
                    (<span
                        className='
                        absolute
                        block
                        rounded-full
                        bg-green-500
                        ring-2
                        ring-white
                        top-2
                        right-1
                        w-2
                        h-2
                        md:w-3
                        md:h-3
                    '
                    />)
                }
            </div>
        </div>
    )
}

export default Avatar
