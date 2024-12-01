import path from 'path';
import { InvoiceDataSchema } from '../schemas/invoiceDataSchema';
import { extractTextFromPdf } from '../utils/pdfParser';

export const extractInvoiceDataAction = async (filePath: string) => {
  try {
    // Validate the file path
    if (!filePath || typeof filePath !== 'string') {
      throw new Error("Invalid file path provided.");
    }

    // Extract file extension and ensure it's a PDF
    const fileExtension = path.extname(filePath).toLowerCase();
    console.log('File Extension:', fileExtension);

    let extractedText = '';
    if (fileExtension === '.pdf') {
      console.log('It is a PDF');
      
      // Extract text from PDF
      extractedText = await extractTextFromPdf(filePath);
      console.log("Extracted text:", extractedText);  // Debugging the extracted text

      // If no text is extracted, handle the case
      if (!extractedText) {
        return { success: false, message: 'No text found in the PDF.' };
      }
    } else {
      return { success: false, message: 'Unsupported file type' };
    }

    // Clean the extracted text for more consistent processing
    const cleanedText = extractedText.replace(/\s+/g, ' ').trim();
    console.log('Cleaned Extracted Text:', cleanedText); // Log cleaned text for debugging

    // Use regex to extract invoice data with improved patterns
    const invoiceNumber = cleanedText.match(/Invoice Number[:\s]*([\w-]+)/)?.[1] || null;
    const invoiceDate = cleanedText.match(/Date[:\s]*([\w\s]+,\s*\d{4})/)?.[1] || null;
    const totalAmountText = cleanedText.match(/(?:Total|Amount Due):?\s*\$?(\d+(?:\.\d{2})?)/)?.[1] || null;

    console.log('Extracted Invoice Number:', invoiceNumber);
    console.log('Extracted Invoice Date:', invoiceDate);
    console.log('Extracted Total Amount:', totalAmountText);

    // Check if any required data is missing
    if (!invoiceNumber || !invoiceDate || !totalAmountText) {
      return {
        success: false,
        message: 'Missing required invoice data. Please check the format of the invoice.',
      };
    }

    // Ensure the total amount is a valid number
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

    // Return the validated invoice data
    return {
      success: true,
      data: parsedData,
    };
  } catch (error) {
    // Log the error for debugging and return a failure response
    console.error('Error in extracting invoice data:', error);
    return { success: false, message: 'Failed to extract data' };
  }
};
