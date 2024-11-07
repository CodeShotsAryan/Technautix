import React from "react";

interface FormErrorProps {
  message?: string; // Change this to optional
}

export const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null; // Return null if there's no message
  return <p className="mt-1 text-red-500 text-sm">{message}</p>;
};
