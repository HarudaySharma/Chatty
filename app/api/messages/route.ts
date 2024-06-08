import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

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
        await prisma.conversation.update({
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

        return NextResponse.json(newMessage);
    }
    catch (err) {
        console.log(err, "ERROR IN MESSAGES POST");
        return new NextResponse('INTERNAL SERVER ERROR', { status: 500 });
    }
}
