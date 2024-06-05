
import prisma from "@/app/libs/prismadb"
import getSession from "./getSession"

async function getCurrentUser() {
    try {
        const session = await getSession();

        console.log({session});
        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma?.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currentUser) {
            return null;
        }
        return currentUser;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

export default getCurrentUser
