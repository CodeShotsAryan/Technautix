// src/invoice-processing/schemas/fileSchema.ts

import { z } from "zod";

const maxFileSize = 50 * 1024 * 1024; // 50 MB

export const fileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= maxFileSize, {
      message: "File size should be less than 50 MB",
    })
    .refine(
      (file) =>
        ["image/png", "image/jpeg", "application/pdf", "application/msword"].includes(
          file.type
        ),
      {
        message: "Unsupported file format. Allowed: JPEG, PNG, PDF, DOC",
      }
    ),
});

export const validateFile = (file: File) => {
  try {
    fileSchema.parse({ file });
    return true;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.issues?.[0]?.message || "Invalid file";
  }
};
