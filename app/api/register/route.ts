import prisma from "@/app/libs/prismadb";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {
    const data = await request.json();
    const { name, email, password } = data;
    console.log(data);

    if (!email || !name || !password) {
        return new NextResponse("Missing info", { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            }
        });
        return NextResponse.json(user);
    }
    catch (err) {
        console.log(err, "REGISTRATION ERROR");
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}
