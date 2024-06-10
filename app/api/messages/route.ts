import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const {
            message,
            image,
            conversationId,
        } = await request.json();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // creating a new Message
        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId,
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id,
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id,
                    }
                }
            },
            include: {
                seen: true,
                sender: true,
            }
        })

        // updating the conversation in the db
        const updatedConversations = await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id,
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true,
                    }
                }
            }
        })

        // send the message to channel {conversationId} under event 'message:new'
        await pusherServer.trigger(conversationId, 'messages:new', newMessage);

        const lastIdx = updatedConversations.messages.length - 1;
        const lastMessage = updatedConversations.messages[lastIdx];

        // to update the conversation of each user {to be used in the sidebar}
        updatedConversations.users.forEach(user => {
            pusherServer.trigger(user.email!, 'conversation:update', {
                id: conversationId,
                messages: [lastMessage]
            })
        })

        return NextResponse.json(newMessage);
    }
    catch (err) {
        console.log(err, "ERROR IN MESSAGES POST");
        return new NextResponse('INTERNAL SERVER ERROR', { status: 500 });
    }
}
