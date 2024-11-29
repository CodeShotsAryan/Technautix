import fs from 'fs'
import PdfParse from 'pdf-parse'
export async function extractTextfromPdf   (filePath: string){
    try {
        const dataBuffer = fs.readFileSync('/client/public/uploads/sample.pdf')
        const data = await PdfParse(dataBuffer)
        console.log('data from utils/pdfparser ',data.text)
        return data.text
    } catch (error) {
        console.log(error)
    }
}











