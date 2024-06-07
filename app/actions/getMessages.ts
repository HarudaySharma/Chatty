import prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser"

const getMessages = async (
    conversationId: string
) => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser?.email) {
            return [];
        }

        const messages = await prisma.message.findMany({
            where: {
                conversationId: conversationId,
            },
            include: {
                sender: true,
                seen: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return messages;

    }
    catch (err) {
        return [];
    }
}

export default getMessages;
