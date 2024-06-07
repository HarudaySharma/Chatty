import prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser"

const getConversations = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) {
        return [];
    }

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc',
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true,
                    }
                }
            }
        })
        return conversations;
    }
    catch (err) {
        console.log(err);
        console.log("ERROR AT getConversations");
        return []
    }
}

export default getConversations;
