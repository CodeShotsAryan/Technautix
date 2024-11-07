import React from "react";

interface FormSuccessProps {
  message?: string; // Change this to optional
}

export const FormSuccess: React.FC<FormSuccessProps> = ({ message }) => {
  if (!message) return null; // Return null if there's no message
  return <p className="mt-1 text-green-500 text-sm">{message}</p>;
};
