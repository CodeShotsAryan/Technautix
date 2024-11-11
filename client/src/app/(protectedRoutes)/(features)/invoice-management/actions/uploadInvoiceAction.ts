"use server";

import fs from "fs";
import path from "path";
import z from "zod";

// Define schema for file validation
const invoiceSchema = z.object({
  file: z.instanceof(File).or(z.string()),
});

// Define temp directory
const TEMP_DIR = path.join(process.cwd(), "public", "uploads");

// Create temp directory if it doesn't exist
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

export async function uploadInvoiceAction(file: File | string) {
  try {
    // Validate the file
    const parsedFile = invoiceSchema.parse({ file });
    console.log(parsedFile.file);

    if (typeof parsedFile.file === "string") {
      throw new Error("Invalid File type");
    }

    // Save the file in the temp directory
    const buffer = await parsedFile.file.arrayBuffer();
    const fileName = parsedFile.file.name;
    const tempFilePath = path.join(TEMP_DIR, fileName);

    // Write file to temp directory
    fs.writeFileSync(tempFilePath, Buffer.from(buffer));
    
    console.log(`File saved at: ${tempFilePath}`);

    return { success: true, message: "File uploaded successfully!" };
  } catch (error) {
    console.error("File upload error:", error);
    return { success: false, message: "Invalid file upload request" };
  }
}
