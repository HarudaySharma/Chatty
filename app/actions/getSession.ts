import { getServerSession } from "next-auth";

import authOptions from "../api/auth/[...nextauth]/options"

async function getSession() {
    return await getServerSession(authOptions);
}

export default getSession;
