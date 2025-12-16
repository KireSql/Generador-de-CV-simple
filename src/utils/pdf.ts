import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;

export async function exportElementToPdf(element: HTMLElement, fileName = 'cv.pdf') {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdfWidth = PAGE_WIDTH_MM;
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  const pageHeight = PAGE_HEIGHT_MM;

  let heightLeft = pdfHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(fileName);
}

