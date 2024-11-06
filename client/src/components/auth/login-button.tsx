"use client";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "redirect" | "modal";
  asChild?: boolean;
}

export default function LoginButton({
  children,
  mode = "redirect",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  asChild,
}: LoginButtonProps) {
  const router = useRouter();

  const onClick = () => {
    if (mode === "redirect") {
      router.push("/auth/login");
    }
    // Handle "modal" mode when implemented
  };

  if (mode === "modal") {
    return <span>You need to implement the modal code</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
