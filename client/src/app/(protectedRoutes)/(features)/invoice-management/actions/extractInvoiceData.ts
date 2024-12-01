// File: /app/(protectedRoutes)/(features)/invoice-management/actions/extractInvoiceData.ts
import path from 'path';
import { InvoiceDataSchema } from '../schemas/invoiceDataSchema'; // Ensure you have defined a Zod schema for validation
import { extractTextFromPdf } from '../utils/pdfParser'; // Make sure extractTextFromPdf is defined somewhere

export const extractInvoiceDataAction = async (filePath: string) => {
  try {
    if (!filePath || typeof filePath !== 'string') {
      throw new Error("Invalid file path provided.");
    }

    const fileExtension = path.extname(filePath).toLowerCase();
    console.log('File Extension:', fileExtension);

    let extractedText = '';
    if (fileExtension === '.pdf') {
      console.log('It is a PDF');
      extractedText = await extractTextFromPdf(filePath);
      console.log("Extracted text:", extractedText);  // Debugging the extracted text
    } else {
      return { success: false, message: 'Unsupported file type' };
    }

    console.log("Full Extracted Text:", extractedText);

    // Improved Regex Matching with Fallbacks
    const invoiceNumber = extractedText.match(/Invoice\s*Number\s*(\S+)/)?.[1] || null;
    const invoiceDate = extractedText.match(/Invoice\s*Date\s*([A-Za-z]+\s*\d{1,2},\s*\d{4})/)?.[1] || null;
    const totalAmountText = extractedText.match(/Total\s*Due\s*\$?(\d+(\.\d{2})?)/)?.[1] || null;

    console.log('Extracted Invoice Number:', invoiceNumber);
    console.log('Extracted Invoice Date:', invoiceDate);
    console.log('Extracted Total Amount:', totalAmountText);

    if (!invoiceNumber || !invoiceDate || !totalAmountText) {
      return {
        success: false,
        message: 'Missing required invoice data. Please check the format of the invoice.',
      };
    }

    const totalAmount = parseFloat(totalAmountText);
    if (isNaN(totalAmount) || totalAmount <= 0) {
      return { success: false, message: 'Invalid total amount detected.' };
    }

    // Validate the extracted data with Zod
    const parsedData = InvoiceDataSchema.parse({
      invoiceNumber,
      invoiceDate,
      totalAmount,
    });

    return {
      success: true,
      data: parsedData,
    };
  } catch (error) {
    console.error('Error in extracting invoice data:', error);
    return { success: false, message: 'Failed to extract data' };
  }
};
