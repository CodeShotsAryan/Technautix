// /app/api/features/invoice-management/extract/route.ts
import { extractInvoiceDataAction } from '@/app/(protectedRoutes)/(features)/invoice-management/actions/extractInvoiceData';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { filePath } = await req.json(); // Extract file path from request body

    if (!filePath) {
      return NextResponse.json({ success: false, message: 'No file path provided' }, { status: 400 });
    }

    const extractedData = await extractInvoiceDataAction(filePath);

    // Return the extracted data
    return NextResponse.json({
      success: true,
      extractedData, 
    });
  } catch (error) {
    console.error('Error extracting invoice data:', error);
    return NextResponse.json({ success: false, message: 'Error extracting data' }, { status: 500 });
  }
}
