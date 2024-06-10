import clsx from 'clsx';
import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps {
    type: "submit" | "reset" | "button" | undefined;
    children?: ReactNode;
    onClick?: () => void;
    fullWidth?: boolean;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type,
    children,
    onClick,
    fullWidth,
    secondary,
    danger,
    disabled,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(`
                flex 
                justify-center
                rounded-md
                px-3
                py-2
                text-sm
                font-semibold
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
            `,
                disabled && "opacity-50 cursor-default",
                fullWidth && "w-full",
                secondary ? 'text-gray-900' : 'text-white',
                danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
                !secondary && !danger && "bg-brandColor-500 hover:bg-brandColor-600 focus-visible:outline-brandColor-600",)}
        >
            {children}
        </button>
    )
}

export default Button
