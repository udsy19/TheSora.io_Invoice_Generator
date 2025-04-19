
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { InvoiceData } from '../types/invoice';

export const generatePDF = async (
  elementRef: React.RefObject<HTMLDivElement>, 
  invoiceData: InvoiceData,
  customFilename?: string,
  saveFile: boolean = true
) => {
  if (!elementRef.current) return null;
  
  try {
    // Load fonts before generating PDF
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // Wait for fonts to load
    await document.fonts.ready;
    
    const canvas = await html2canvas(elementRef.current, {
      scale: 2,
      logging: false,
      useCORS: true,
      imageTimeout: 0,
      backgroundColor: '#fff8f2',
      onclone: (clonedDoc) => {
        // Ensure fonts are applied in the cloned document
        const style = clonedDoc.createElement('style');
        style.textContent = `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
          .font-playfair { font-family: 'Playfair Display', serif !important; }
          .font-neue { font-family: system-ui, -apple-system, sans-serif !important; }
        `;
        clonedDoc.head.appendChild(style);
      }
    });
    
    // Calculate dimensions for continuous PDF
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [imgWidth, imgHeight], // Set custom height based on content
      compress: true
    });
    
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0),
      'JPEG',
      0,
      0,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    );
    
    const filename = customFilename 
      ? `${customFilename}.pdf`
      : `Invoice-${invoiceData.invoiceNumber}.pdf`;
    
    // If saveFile is true, save the file to disk
    if (saveFile) {
      pdf.save(filename);
    }
    
    // Return the PDF blob and filename for email attachment
    const pdfBlob = pdf.output('blob');
    return { blob: pdfBlob, filename };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return null;
  }
};

export const generateImage = async (
  elementRef: React.RefObject<HTMLDivElement>, 
  invoiceData: InvoiceData,
  customFilename?: string
) => {
  if (!elementRef.current) return;
  
  try {
    const canvas = await html2canvas(elementRef.current, {
      scale: 2,
      logging: false,
      useCORS: true,
    });
    
    const downloadLink = document.createElement('a');
    const filename = customFilename 
      ? `${customFilename}.png` 
      : `Invoice-${invoiceData.invoiceNumber}.png`;
      
    downloadLink.setAttribute('download', filename);
    downloadLink.href = canvas.toDataURL('image/png', 0.8);
    downloadLink.click();
    
    return true;
  } catch (error) {
    console.error('Error generating image:', error);
    return false;
  }
};
