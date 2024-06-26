import type { Metadata } from "next";

import "./globals.css";
import { Inter } from "next/font/google";
import ToasterContext from './context/ToasterContext'
import AuthContext from "./context/AuthContext";
import ActiveStatus from "./components/ActiveStatus";

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
        <head>
        <link href='/icon.png' type="image/png" rel="icon"/>
        </head>
            <body className={inter.className}>
                <AuthContext>
                    <ToasterContext />
                    <ActiveStatus />
                    {children}
                </AuthContext>
            </body>
        </html>
    );
}
