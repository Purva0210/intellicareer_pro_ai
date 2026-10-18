import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';

// Set worker src for pdfjs-dist (bundled by Vite)
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl; // bundled locally, no CDN dependency

/**
 * Extract plain text from PDF File object
 */
export async function extractTextFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    
    let fullText = '';
    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    return fullText.trim();
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw new Error('Could not parse PDF document. Please make sure the file is valid and unencrypted.');
  }
}

/**
 * Extract plain text from DOCX File object
 */
export async function extractTextFromDOCX(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error('Error extracting DOCX text:', error);
    throw new Error('Could not parse DOCX document. Please make sure the file is not corrupted.');
  }
}

/**
 * Main parser entry point handling PDF, DOCX, and TXT
 */
export async function parseResumeFile(file) {
  if (!file) throw new Error('No file provided');
  
  const fileName = file.name.toLowerCase();
  
  if (fileName.endsWith('.pdf')) {
    return await extractTextFromPDF(file);
  } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
    return await extractTextFromDOCX(file);
  } else if (fileName.endsWith('.txt')) {
    return await file.text();
  } else {
    throw new Error('Unsupported file format. Please upload a PDF or DOCX resume.');
  }
}
