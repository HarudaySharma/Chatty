import { User } from '@prisma/client'
import React from 'react'

import Image from "next/image"

interface AvatarProps {
    user: User | null;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {

    if (!user) {
        return null;
    }

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
                    src={user.image || '/images/placeholder.jpg'}
                    fill
                />
                <span
                    className='
                        absolute
                        block
                        rounded-full
                        bg-green-500
                        ring-2
                        ring-white
                        top-0
                        right-0
                        w-2
                        h-2
                        md:w-3
                        md:h-3
                    '
                />
            </div>
        </div>
    )
}

export default Avatar