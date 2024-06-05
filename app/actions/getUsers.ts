import prisma from "@/app/libs/prismadb"
import { getSession } from "next-auth/react";

async function getUsers() {
    console.log("get Users:");

    const session = await getSession();
    console.log({session});

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
