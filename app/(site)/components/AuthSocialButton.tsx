import React from 'react'
import { IconType } from 'react-icons'

interface AuthSocialButtonProps {
    icon: IconType,
    className?: string | undefined,
    onClick: () => void
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    onClick,
    className
}) => {
    return (
        <button
            onClick={onClick}
            className={`inline-flex w-full justify-center rounded-md bg-white 
                        px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-500 ${className}`}
        >
            <Icon />
        </button>
    )
}

export default AuthSocialButton;
