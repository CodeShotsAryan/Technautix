import PDFParser from 'pdf2json';

export async function extractTextFromPdf(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", err => reject(err));

    pdfParser.on("pdfParser_dataReady", pdfData => {
      console.log('pdfData:', pdfData);  // Log to inspect

      // Ensure Pages and Texts are present
      if (!pdfData.Pages || pdfData.Pages.length === 0) {
        return reject(new Error("No pages found in the PDF."));
      }

      const page = pdfData.Pages[0];  // Assuming you want to extract text from the first page
      if (!page.Texts || page.Texts.length === 0) {
        return reject(new Error("No text found on the first page of the PDF."));
      }

      try {
        // Extract text from the page's Texts array
        const extractedText = page.Texts.map(text => {
          return decodeURIComponent(text.R[0].T);  // Extract the text content
        }).join(" ");

        resolve(extractedText);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        reject(new Error("Error processing text on the page."));
      }
    });

    try {
      pdfParser.loadPDF(filePath);  // Load the PDF
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      reject(new Error("Error loading PDF"));
    }
  });
}
