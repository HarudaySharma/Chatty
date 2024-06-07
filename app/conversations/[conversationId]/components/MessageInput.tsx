'use client'

import Input from '@/app/components/inputs/Input';
import { type } from 'os';
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    id: string;
    register: UseFormRegister<FieldValues>;
    type?: string;
    errors: FieldErrors<FieldValues>;
    required?: boolean;
    placeholder: string;
}
// NOTE: TimeStamp: 4:12:35
const MessageInput: React.FC<MessageInputProps> = ({
    id,
    register,
    type,
    errors,
    required,
    placeholder
}) => {
    return (
        <div className='relative w-full'>
            <input
                id={id}
                type={type}
                autoComplete={id}
                {...register(id, { required: required })}
                placeholder={placeholder}
                className={`
                    text-black
                    font-light
                    py-2
                    px-4
                    bg-neutral-100
                    w-full
                    rounded-full
                    focus:outline-none
                `}
            />
        </div>
    )
}

export default MessageInput
