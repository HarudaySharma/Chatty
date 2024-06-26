import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
    conversationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                users: true,
            }
        })
        if (!existingConversation) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        existingConversation.users.forEach(user => {
            if(user.email) {
                pusherServer.trigger(user.email, 'conversation:remove', existingConversation)
            }
        })

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        })

        return NextResponse.json(deletedConversation);
    }
    catch (err) {
        console.log(err, "ERROR_CONVERSATION_DELETE");
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
