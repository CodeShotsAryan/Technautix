import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FiLock, FiMail } from "react-icons/fi"; // Importing icons for email and lock

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm mt-3 shadow-lg rounded-lg bg-white">
      <CardHeader>
        <CardTitle className="font-bold text-2xl text-center my-1">
          Technautix
        </CardTitle>
        <h2 className="text-lg font-semibold text-neutral-500">Login</h2>
        <CardDescription className="text-sm text-neutral-600">
          Enter your email & password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {/* Email Field */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              {" "}
              {/* Added relative positioning */}
              <FiMail className="absolute left-3 top-3 text-neutral-400" />{" "}
              {/* Absolute positioning for the icon */}
              <Input
                id="email"
                type="email"
                placeholder="xyz@example.com"
                required
                className="pl-10 border focus:outline-none focus:ring-0 placeholder:text-neutral-400" // Added padding-left to avoid overlap
              />
            </div>
          </div>
          {/* Password Field */}
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="ml-auto text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <div className="relative">
              {" "}
              {/* Added relative positioning */}
              <FiLock className="absolute left-3 top-3 text-neutral-400" />{" "}
              {/* Absolute positioning for the icon */}
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="pl-10 border focus:outline-none focus:ring-0 placeholder:text-neutral-400" // Added padding-left to avoid overlap
              />
            </div>
          </div>
          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="w-full mt-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm text-neutral-500">
          Don t have an account?{" "}
          <Link
            href="/auth/register"
            className="underline text-blue-500 hover:text-blue-600"
          >
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
