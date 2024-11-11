import { z } from "zod";

// Define the maximum file size (50 MB)
const maxFileSize = 50 * 1024 * 1024;

// Create a schema for file validation
export const fileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= maxFileSize, {
      message: "File size should be less than 50 MB",
    })
    .refine(
      (file) =>
        ["image/png", "image/jpeg", "application/pdf", "application/msword"].includes(file.type),
      {
        message: "Unsupported file format. Allowed: JPEG, PNG, PDF, DOC",
      }
    ),
});

// Define a type for validation results to ensure consistent typing
export type ValidationResult = true | string;

// Validation function that checks file based on the schema
export const validateFile = (file: File): ValidationResult => {
  try {
    fileSchema.parse({ file });
    return true; // Indicates successful validation
  } catch (error) {
    // Return the specific error message from the first issue, if available
    return error instanceof z.ZodError ? error.issues[0].message : "Invalid file";
  }
};
