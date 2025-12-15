// services/exporterZip.js
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { generatePDF } from './exporterPdf';
import { generateWord } from './exporterWord';

export const exportZIP = async (data) => {
    const zip = new JSZip();

    zip.file('boletin.pdf', generatePDF(data));
    zip.file('boletin.docx', await generateWord(data));

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'boletin_escolar.zip');
};


