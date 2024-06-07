import prisma from "@/app/libs/prismadb"
import getSession from "./getSession"

async function getUsers() {

    const session = await getSession();
    console.log({ SESSIONUSER: session });

    if (!session?.user?.email) {
        return [];
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                NOT: {
                    email: session.user.email
                }
            }
        })
        console.log({ users });
        return users;
    }
    catch (err) {
        console.log(err);
        return []
    }
}

export default getUsers;
