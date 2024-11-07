"use client";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FiLock, FiMail } from "react-icons/fi"; // Importing icons for email and lock
import { z } from "zod";
import { loginSchema } from "../../../../../schemas";
import { login } from "../../actions/login";

export function LoginForm() {
  const [error, setError] = useState<string | undefined>(""); // Error state
  const [success, setSuccess] = useState<string | undefined>(""); // Success state
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(data).then((values) => {
        setError(values.error);
        setSuccess(values.success);
      });
    });
    console.log(data);
  };

  return (
    <Card className="mx-auto max-w-sm mt-3 shadow-lg rounded-lg bg-white md:max-w-md lg:max-w-lg">
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
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* Email Field */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-neutral-400" />
              <Input
                id="email"
                type="email"
                placeholder="xyz@example.com"
                disabled={isPending}
                required
                {...register("email")}
                className="pl-10 border focus:outline-none focus:ring-0 placeholder:text-neutral-400"
              />
              {errors.email && (
                <FormError message={errors.email.message} /> // Use FormError component
              )}
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
              <FiLock className="absolute left-3 top-3 text-neutral-400" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                disabled={isPending}
                required
                {...register("password")}
                className="pl-10 border focus:outline-none focus:ring-0 placeholder:text-neutral-400"
              />
              {errors.password && (
                <FormError message={errors.password.message} /> // Use FormError component
              )}
            </div>
          </div>
          {/* Display Success or Error Messages */}
          {success && <FormSuccess message={success} />}
          {error && <FormError message={error} />}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isPending}
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="w-full mt-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            onClick={() => console.log("Google login clicked")} // Placeholder for Google login action
          >
            Login with Google
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-neutral-500">
          Don’t have an account?{" "}
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
