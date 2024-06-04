'use client'

import useRoutes from '@/app/hooks/useRoutes'
import React, { useState } from 'react'
import { IconType } from 'react-icons';
import DesktopItem from './DesktopItem';

const DesktopSidebar = () => {
    const routes = useRoutes();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className='
                hidden
                lg:fixed
                lg:inset-y-0
                lg:left-0
                lg:z-40
                lg:w-40
                xl:px-6
                lg:overflow-y-auto
                lg:bg-white
                lg:border-r-[1px]
                lg:flex
                lg:flex-col
                justify-between
            '
        >
            <nav
                className='
                    mt-4
                    flex 
                    flex-col
                    justify-between
                '
            >
                <ul
                    role='list'
                    className='
                        flex 
                        flex-col 
                        items-center
                        space-y-1
                    '
                >
                    {routes.map(item => (
                        <DesktopItem
                            key={item.label}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            onClick={item.onClick}
                            active={item.active}
                        />
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default DesktopSidebar

