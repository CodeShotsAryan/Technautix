// File: /app/(protectedRoutes)/(features)/invoice-management/api/extractInvoiceData.ts
import { extractInvoiceDataAction } from '@/app/(protectedRoutes)/(features)/invoice-management/actions/extractInvoiceData';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { filePath } = await req.json();

    if (!filePath) {
      return NextResponse.json(
        { success: false, message: 'No file path provided' },
        { status: 400 }
      );
    }

    // Call the action to extract invoice data
    const extractedData = await extractInvoiceDataAction(filePath);
    console.log('api side ', extractedData);

    // Check if data extraction was successful
    if (!extractedData.success) {
      return NextResponse.json(extractedData, { status: 400 });
    }

    // Return the extracted data if successful
    return NextResponse.json(
      { success: true, extractedData: extractedData.data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error extracting invoice data:', error);

    return NextResponse.json(
      { success: false, message: 'Error extracting data' },
      { status: 500 }
    );
  }
}
