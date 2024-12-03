// File: /app/upload/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import axios from "axios";
import { useRouter } from "next/navigation"; // Using next/navigation for navigation
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";

interface FileWithPreview {
  file: File;
  preview: string;
  progress: number;
  filePath?: string; // Add a filePath to store the server path for the uploaded file
}

export default function UploadInvoice() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [extractedData, setExtractedData] = useState<string | null>(null);
  const maxFileSize = 50 * 1024 * 1024; // 50 MB
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles: FileWithPreview[] = [];
    acceptedFiles.forEach((file) => {
      validFiles.push({
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
      });
    });

    setFiles((prev) => [...prev, ...validFiles]);
  }, []);

  const handleUpload = async () => {
    const updatedFiles = await Promise.all(
      files.map(async (fileObj) => {
        try {
          const formData = new FormData();
          formData.append("file", fileObj.file);

          const response = await axios.post(
            "/api/features/invoice-management/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                  const progress = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  setFiles((prevFiles) =>
                    prevFiles.map((item) =>
                      item.file.name === fileObj.file.name
                        ? { ...item, progress }
                        : item
                    )
                  );
                }
              },
            }
          );

          if (response.data.success) {
            toast.success(`File ${fileObj.file.name} uploaded successfully!`);

            const updatedFileObj = {
              ...fileObj,
              progress: 100,
              filePath: response.data.filePath,
            };

            // Extract data after upload
            await handleDataExtraction(updatedFileObj);

            return updatedFileObj;
          } else {
            toast.error(`Failed to upload ${fileObj.file.name}`);
            return { ...fileObj, progress: 0 };
          }
        } catch (error) {
          toast.error(`Error uploading ${fileObj.file.name}`);
          return { ...fileObj, progress: 0 };
        }
      })
    );

    setFiles(updatedFiles);
  };

  const handleDataExtraction = async (fileObj: FileWithPreview) => {
    try {
      if (!fileObj.filePath) return;

      const response = await axios.post(
        "/api/features/invoice-management/extract",
        {
          filePath: fileObj.filePath,
        }
      );

      if (response.data.success) {
        setExtractedData(JSON.stringify(response.data.extractedData, null, 2)); // Pretty-print the data
        toast.success("Data extracted successfully!");

        // Redirect to the validation page with extracted data
        router.push(
          `/invoice-management/upload/validate?data=${encodeURIComponent(
            JSON.stringify(response.data.extractedData)
          )}`
        );
      } else {
        toast.error("Failed to extract data.");
      }
    } catch (error) {
      toast.error("Error extracting data.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: maxFileSize,
  });

  const handleDelete = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <CardHeader className="text-lg font-semibold m-1">
          Upload and Attach Files
        </CardHeader>
        <CardDescription className="mb-4 text-gray-600">
          Upload and attach files to this invoice.
        </CardDescription>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-dashed border-2 rounded-lg p-10 mb-4 flex flex-col items-center justify-center cursor-pointer ${
              isDragActive ? "border-blue-500" : "border-black"
            } text-gray-500`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-blue-500">Drop the files here ...</p>
            ) : (
              <p>Click to upload or drag and drop</p>
            )}
            <p className="text-sm text-gray-400">Max file size 50MB</p>
          </div>

          {/* File preview with upload progress */}
          <div className="space-y-2">
            {files.map((fileObj, index) => (
              <div
                key={index}
                className="relative p-2 border rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {fileObj.file.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {Math.round(fileObj.file.size / 1024 / 1024)} MB
                  </span>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 ml-2"
                  onClick={() => handleDelete(index)}
                >
                  ❌
                </button>
                <div className="h-2 mt-2 bg-gray-200 rounded">
                  <div
                    className="bg-blue-500 h-full rounded"
                    style={{ width: `${fileObj.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            size="sm"
            className="text-black border-gray-300 hover:bg-gray-100 m-2 font-medium"
            onClick={() => setFiles([])}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="bg-black text-white border-black m-2 font-medium hover:bg-gray-800"
            onClick={handleUpload}
          >
            Attach Files
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
