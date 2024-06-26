import bcrypt from "bcrypt"
import { AuthOptions } from "next-auth"

import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/app/libs/prismadb"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                console.log('login request');
                console.log({ credentials });
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid Credentials');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    },
                })

                if (!user || !user.hashedPassword) {
                    throw new Error('Invalid Credentials');
                }

                const passMatch = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!passMatch) {
                    throw new Error('Invalid Credentials');
                }

                return user;
            }
        })
    ],
    callbacks: {
        async jwt({ token }) {
            return token;
        }
        ,
        async session({ session }) {
            return session;
        },
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions;
