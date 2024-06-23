import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    return;
}

export default withAuth({
    pages: {
        signIn: '/'
    }
})

export const config = {
    matches: [
        // protected every endpoint of user
        '/users/:path*',
        '/conversations/:path*',
    ]
}
