'use client';

import Link from "next/link";

export default function Navbar() {
    return (
        <header className=" bg-slate-300 flex justify-between items-center p-6">
            <nav className="flex space-x-4">
                <Link href="/" className="text-lg font-bold">
                    TECHNAUTIX
                </Link>
                <Link href="/" className="">
                    Home
                </Link>
            </nav>
            <nav className="flex space-x-4">
                {/* <Link href="/products" className="">
                    Products
                </Link> */}
                <Link href="/login" className="rounded-md bg-gray-400 px-3 py-2 text-sm font-medium text-black">
                    Login
                </Link>
                <Link href="/register" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
                    Register
                </Link>
            </nav>
        </header>
    );
}
