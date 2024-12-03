// File: /app/invoice-management/upload/validate/page.tsx
"use client";

import { Button } from "@/components/ui/button"; // Import the Button component
import { useSearchParams } from "next/navigation"; // To access query params
import { useState } from "react";

export default function ValidateInvoice() {
  const searchParams = useSearchParams();
  const extractedData = searchParams.get("data"); // Get the data query parameter

  // Parse the extracted data from the URL
  const parsedData = extractedData
    ? JSON.parse(decodeURIComponent(extractedData))
    : null;

  // State to manage the editable data
  const [editableData, setEditableData] = useState(parsedData);

  // If data is not available, show a message
  if (!parsedData) {
    return <p>No valid data available to validate.</p>;
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle confirmation (send updated data to the backend or next step)
  const handleConfirm = async () => {
    if (!editableData) return;
    console.log("Confirmed Data:", editableData);
    // Add logic to handle further actions (submit data, process, etc.)
    // Example: You can send the data to the backend API
    try {
      const response = await fetch(
        "/api/features/invoice-management/validate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editableData),
        }
      );
      const result = await response.json();
      if (result.success) {
        console.log("Data validated successfully!");
        // Optionally, navigate to another page or show success message
      } else {
        console.error("Validation failed");
      }
    } catch (error) {
      console.error("Error during validation:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Review & Edit Invoice Data
        </h2>

        {/* Editable fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Invoice Number:
            </label>
            <input
              type="text"
              name="invoiceNumber"
              value={editableData.invoiceNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Invoice Date:
            </label>
            <input
              type="text"
              name="invoiceDate"
              value={editableData.invoiceDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Total Amount:
            </label>
            <input
              type="number"
              name="totalAmount"
              value={editableData.totalAmount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Button for confirmation */}
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleConfirm}
            className="bg-black text-white hover:bg-gray-800"
          >
            Confirm & Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
