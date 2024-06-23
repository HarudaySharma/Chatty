'use client'

import { useState } from 'react'
import Image from "next/image";
import AuthForm from "./components/AuthForm";

type Variant = 'LOGIN' | 'REGISTER';

export default function Home() {
    const [variant, setVariant] = useState<Variant>('LOGIN');

    return (
        <main
            className="flex min-h-full flex-col justify-center 
                           py-12 sm:px-6 lg:px-8 bg-gray-100 "
        >
            <div
                className="sm:mx-auto sm:w-full sm:max-w-md"
            >
                <Image
                    src={'/images/logo.png'}
                    alt="logo"
                    height={48}
                    width={48}
                    className="mx-auto w-auto"
                />
                <h2
                    className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
                >
                    {variant === 'LOGIN'
                        ? 'Sign in to your account'
                        : 'Create a new account'
                    }
                </h2>
                <AuthForm
                    variant={variant}
                    setVariant={setVariant}
                />
            </div>
        </main>
    );
}
