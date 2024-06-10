'use client'

import Button from '@/app/components/Button';
import Modal from '@/app/components/sidebar/Modal';
import useConversation from '@/app/hooks/useConversation';
import { Dialog } from '@headlessui/react';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import { FiAlertTriangle } from "react-icons/fi"


interface ConfirmModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
}) => {
    const router = useRouter();
    const { conversationId } = useConversation();

    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(async () => {
        setIsLoading(true);

        try {
            await fetch(`/api/conversations/${conversationId}`, {
                method: 'DELETE',
            });

            router.push('/conversations');
            router.refresh();
        }
        catch (err) {
            console.log(err, 'ERROR IN DELETE CONVERSATION');
            toast.error('Something went wrong');
        }
        finally {
            setIsLoading(false);
        }
    }, [conversationId, router, onClose])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div
                className='sm:flex sm:items-start'
            >
                <div
                    className='
                        mx-auto
                        flex
                        h-12
                        w-12
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-red-100
                        sm:mx-0
                        sm:h-10
                        sm:w-10
                    '
                >
                    <FiAlertTriangle
                        className='
                            h-6
                            w-6
                            text-red-600
                        '
                    />
                </div>
                <div
                    className='
                        mt-3
                        text-center
                        sm:ml-4
                        sm:mt-0
                        sm:text-left
                    '
                >
                    <Dialog.Title
                        as='h3'
                        className='
                            text-base
                            font-semibold
                            loading-6
                            text-gray-900
                        '
                    >
                        Delete Conversation
                    </Dialog.Title>
                    <div className='mt-2'>
                        <p
                            className='
                                text-sm
                                text-gray-500
                            '
                        >
                            Are you sure you want to delete this conversation?
                        </p>
                    </div>
                </div>
            </div>
            <div
                className='
                    mt-5
                    sm:mt-4
                    sm:flex
                    sm:flex-row-reverse
                '
            >
                <Button
                    type='button'
                    disabled={isLoading}
                    danger
                    onClick={onDelete}
                >
                    Delete
                </Button>
                <Button
                    type='button'
                    secondary
                    disabled={isLoading}
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

export default ConfirmModal