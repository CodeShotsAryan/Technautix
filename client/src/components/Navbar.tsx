"use client";

import Link from "next/link";
import LoginButton from "./auth/login-button";
import { Button } from "./ui/button";

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
        <LoginButton asChild mode="redirect">
          <Button>Login</Button>
        </LoginButton>
        <Button>
          <Link href="/auth/register">Register</Link>
        </Button>
      </nav>
    </header>
  );
}
