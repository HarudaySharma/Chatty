'use client'

import useConversation from '@/app/hooks/useConversation'
import { FullConversationType } from '@/app/types'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './ConversationBox'
import GroupChatModal from './GroupChatModal'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/app/libs/pusher'
import { find } from 'lodash'

interface ConversationListProps {
    initialItems: FullConversationType[]
    users: User[];
}
const ConversationList: React.FC<ConversationListProps> = ({ users, initialItems }) => {
    const session = useSession();
    const router = useRouter();
    const { conversationId, isOpen } = useConversation();

    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModelOpen] = useState(false);

    const pusherKey = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email])

    const newConversationHandler = (conversation: FullConversationType) => {
        setItems(curr => {
            if (find(curr, { id: conversation.id })) {
                return curr;
            }
            return [conversation, ...curr];
        })
    }

    const updateConversationHandler = (conversation: FullConversationType) => {
        setItems(curr => (
            curr.map(conv => {
                if (conv.id === conversation.id) {
                    return {
                        ...conv,
                        messages: conversation.messages,
                    }
                }
                return conv;
            })
        ))
    }

    const removeConversationHandler = (conversation: FullConversationType) => {
        setItems(curr => {
            return [...curr.filter(conv => conv.id !== conversation.id)];
        })

        if (conversationId === conversation.id) {
            router.push('/conversations');
        }
    }

    useEffect(() => {
        if (!pusherKey) {
            return;
        }

        pusherClient.subscribe(pusherKey);
        pusherClient.bind('conversation:new', newConversationHandler);
        pusherClient.bind('conversation:update', updateConversationHandler);
        pusherClient.bind('conversation:remove', removeConversationHandler);

        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind('conversation:new', newConversationHandler);
            pusherClient.unbind('conversation:update', updateConversationHandler);
            pusherClient.unbind('conversation:remove', removeConversationHandler);
        }
    }, [pusherKey, conversationId, router]);

    return (
        <>
            <GroupChatModal
                users={users}
                isOpen={isModalOpen}
                onClose={() => setIsModelOpen(false)}
            />
            <aside
                className={clsx(`
                        fixed
                        inset-y-0
                        pb-20
                        lg:pb-0
                        lg:left-20
                        lg:w-80
                        lg:block
                        overflow-y-auto
                        border-r
                        border-gray-200
                    `,
                    isOpen ? 'hidden' : 'block w-full left-0'
                )}
            >
                <div className='px-5'>
                    <div
                        className={`
                            flex 
                            justify-between
                            mb-4
                            pt-4
                        `}
                    >
                        <div
                            className={`
                                text-2xl
                                font-bold 
                                text-neutral-800
                            `}
                        >
                            Messages
                        </div>
                        <div
                            onClick={() => setIsModelOpen(true)}
                            className={`
                                rounded-full
                                p-2
                                bg-gray-100
                                text-gray-600
                                cursor-pointer
                                hover:opacity-75
                                transition
                            `}
                        >
                            <MdOutlineGroupAdd size={20} />
                        </div>
                    </div>
                    {items.map(item => (
                        <ConversationBox
                            key={item.id}
                            data={item}
                            selected={conversationId === item.id}
                        />
                    ))}
                </div>
            </aside>
        </>
    )
}

export default ConversationList
