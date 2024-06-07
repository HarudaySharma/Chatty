'use client'

import useConversation from '@/app/hooks/useConversation'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';

const Form = () => {
    const { conversationId } = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setValue('message', '', { shouldValidate: true });
        try {
            await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    conversationId
                })
            })
        }
        catch (err) {
            console.log(err);
            console.log('ERROR IN MESSAGE FORM');
        }
    }

    return (
        <div
            className={`
                py-4
                px-4
                bg-white
                border-t
                flex
                items-center
                gap-2
                lg:gap-4
                w-full
            `}
        >
            <HiPhoto
                size={32}
                className='text-brandColor-500'
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`
                    flex
                    items-center
                    gap-2
                    lg:gap-4
                    w-full
                `}
            >
                <MessageInput
                    id='message'
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />
                <button
                    type='submit'
                    className={`
                        rounded-full
                        p-2
                        bg-brandColor-500
                        cursor-pointer
                        hover:bg-brandColor-600
                    `}
                >
                <HiPaperAirplane
                    size={18}
                    className='text-white'
                />
                </button>
            </form>

        </div>
    )
}

export default Form
