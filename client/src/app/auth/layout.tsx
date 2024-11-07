import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6 md:p-8"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0L5 10' stroke='%23d1d5db' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundBlendMode: "overlay",
      }}
      role="main" // Adding role for accessibility
      aria-label="Authentication area" // Descriptive label for accessibility
    >
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        {children}
      </div>
    </div>
  );
}
