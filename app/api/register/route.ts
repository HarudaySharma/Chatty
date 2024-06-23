import prisma from "@/app/libs/prismadb";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {
    const data = await request.json();
    const { name, email, password } = data;
    console.log('REGISTER REQUEST');
    console.log({ user: data });

    if (!email || !name || !password) {
        return new NextResponse("Missing info", { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    try {
        const emailTaken = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if(emailTaken) {
            return new NextResponse("Email already taken", { status: 409 });
        }
        
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            }
        });
        console.log('REGISTRATION SUCCESSFULL');
        return NextResponse.json(user);
    }
    catch (err) {
        console.log(err, "REGISTRATION ERROR");
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
