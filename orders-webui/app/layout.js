import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";
import {Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import React from "react";
import {usePathname} from "next/navigation";
import MainNavbar from "@/app/mainNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Order Organizer",
    description: "An order organizer",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className='dark'>
        <body className={`h-screen ${inter.className}`}>
        <Providers>
            <MainNavbar/>
            {children}
        </Providers>
        </body>
        </html>
    );
}
