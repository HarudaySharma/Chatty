import type { Metadata } from "next";
import ToasterContext from '@/app/context/ToasterContext'

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Chatty",
    description: "communicate with humans",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ToasterContext />
                {children}
            </body>
        </html>
    );
}
