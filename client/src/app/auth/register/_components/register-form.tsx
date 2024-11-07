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
import { useForm } from "react-hook-form";
import { FiLock, FiMail } from "react-icons/fi"; // Importing icons for email and lock
import { registerSchema } from "../../../../../schemas";

export function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Card className="mx-auto max-w-sm mt-3 shadow-lg rounded-lg bg-white">
      <CardHeader>
        <CardTitle className="font-bold text-2xl text-center my-1">
          🤖 Technautix
        </CardTitle>
        <h2 className="text-lg font-semibold text-neutral-500">Sign Up</h2>
        <CardDescription className="text-sm text-neutral-600">
          Enter your details to create an account on Technautix
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
                required
                {...register("email")} // Connect input to form validation
                className="pl-10 border focus:outline-none focus:ring-0 placeholder:text-neutral-400"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-neutral-400" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                {...register("password")} // Connect input to form validation
                className="pl-10 border focus:outline-none focus:ring-0 placeholder:text-neutral-400"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-neutral-400" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                required
                {...register("confirmPassword")} // Connect input to form validation
                className="pl-10 border focus:outline-none focus:ring-0 placeholder:text-neutral-400"
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Sign Up
          </Button>
          <Button
            variant="outline"
            className="w-full mt-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Sign Up with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="underline text-blue-500 hover:text-blue-600"
          >
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
