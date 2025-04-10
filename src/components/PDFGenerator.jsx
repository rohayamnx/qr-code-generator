import React from 'react';
import { Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { saveAs } from 'file-saver';
import { toCanvas } from 'qrcode';

const PDFGenerator = ({ urls }) => {
  const generatePDF = async () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a6',
      compress: true // enable internal compression
    });

    const qrCodeSize = 80; // size in mm on paper
    const scaleFactor = 3; // medium resolution to keep size small
    const pixelSize = qrCodeSize * scaleFactor; // simulate DPI for canvas

    for (const url of urls) {
      const canvas = document.createElement('canvas');

      await toCanvas(canvas, url, {
        width: pixelSize,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      // JPEG compression (quality: 0.85)
      const imageData = canvas.toDataURL('image/jpeg', 0.85);

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const x = (pageWidth - qrCodeSize) / 2;
      const y = (pageHeight - qrCodeSize) / 2;

      doc.addImage(imageData, 'JPEG', x, y, qrCodeSize, qrCodeSize);

      // Shorten long URLs and reduce font size
      doc.setFontSize(9);
      const displayUrl = url.length > 50 ? url.substring(0, 47) + '...' : url;
      doc.text(displayUrl, pageWidth / 2, y + qrCodeSize + 8, { align: 'center' });

      if (url !== urls[urls.length - 1]) {
        doc.addPage();
      }
    }

    const pdfBlob = doc.output('blob');
    saveAs(pdfBlob, 'qrcodes.pdf');
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={generatePDF}
      startIcon={<PictureAsPdfIcon />}
      disabled={!urls || urls.length === 0}
    >
      Generate PDF
    </Button>
  );
};

export default PDFGenerator;
