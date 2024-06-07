import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";


export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            userId,
            isGroup,
            members,
            name
        } = body;
        console.log({ body })

        if (!currentUser?.id || !currentUser.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid Data', { status: 400 });
        }

        // for group chats
        if (isGroup) {
            // creating a new conversation
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include: {
                    users: true,
                }
            })
            return NextResponse.json(newConversation);
        }

        // for one to one conversations
        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    }
                ]
            }
        })
        if (existingConversations && existingConversations.length !== 0) {
            const existingConversation = existingConversations[0];
            if (existingConversation) {
                return NextResponse.json(existingConversation);;
            }
        }
        // create new conversation
        const newConversation = await prisma.conversation.create({
            data: {
                name: name || 'one-one',
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId as string
                        }
                    ]
                }
            },
            include: {
                users: true,
            }
        })
        return NextResponse.json(newConversation);
    }
    catch (err) {
        console.log(err);
        console.log('ERROR IN CONVERSATIONS ROUTE')
        return new NextResponse('INTERNAL SERVER ERROR', { status: 501 });
    }
}
