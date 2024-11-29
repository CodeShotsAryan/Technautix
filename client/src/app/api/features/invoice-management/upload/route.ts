import fs from "fs";
import path from "path";

const TEMP_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response(JSON.stringify({ success: false, message: "No file uploaded" }), { status: 400 });
    }

    // Create file path
    const fileName = file.name;
    const filePath = path.join(TEMP_DIR, fileName);

    // Save the file to the server
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Return the path to the uploaded file
    return new Response(JSON.stringify({ success: true, filePath }), { status: 200 });
  } catch (error) {
    console.error("Error in uploading file:", error);
    return new Response(JSON.stringify({ success: false, message: "File upload failed" }), { status: 500 });
  }
}
