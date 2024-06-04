import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: '/'
    }
})

export const config = {
    matches: [
        // protected every endpoint of user
        '/users/:path*',
    ]
}
