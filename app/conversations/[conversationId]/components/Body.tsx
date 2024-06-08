'use client'

import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types';
import { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';

interface BodyProps {
    initialMessages: FullMessageType[];
}
const Body: React.FC<BodyProps> = ({ initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(() => {
        fetch(`/api/conversations/${conversationId}/seen`, {
            method: 'POST',
        })
    }, [conversationId])

    return (
        <div className='flex-1 overflow-y-auto'>
            {
                messages.map((msg, idx) => (
                    <MessageBox
                        isLast={idx === messages.length - 1}
                        key={msg.id}
                        data={msg}
                    />
                ))
            }
            <div ref={bottomRef} className='pt-24'>
            </div>
        </div>
    )
}

export default Body
