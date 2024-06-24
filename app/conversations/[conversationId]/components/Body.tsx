'use client'

import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types';
import { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';

interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(() => {
        if (!conversationId) {
            return;
        }

        //console.log({ conversationId });
        pusherClient.subscribe(conversationId);
        bottomRef?.current?.scrollIntoView();

        const messageHandler = (message: FullMessageType) => {
            fetch(`/api/conversations/${conversationId}/seen`, {
                method: 'POST',
            })

            setMessages((current) => {
                // check if msg already exists on client
                if (find(current, { id: message.id })) {
                    return current;
                }
                return [...current, message];
            })

            bottomRef?.current?.scrollIntoView();

        }

        const updateMessageHandler = (newMessage: FullMessageType) => {
            // update seen status
            setMessages(curr => (
                curr.map(msg => {
                    if (msg.id === newMessage.id) {
                        return newMessage;
                    }
                    return msg;
                })
            ))
        }

        pusherClient.bind('messages:new', messageHandler);
        pusherClient.bind('message:update', updateMessageHandler);


        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('messages:new', messageHandler);
            pusherClient.unbind('message:update', updateMessageHandler);
        }
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
