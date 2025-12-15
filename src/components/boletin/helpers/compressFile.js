import JSZip from "jszip";
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

import generateWordFromHTML from "./generateWord";

export const downloadBoletaZip = async (boleta) => {
    const zip = new JSZip();

    // PDF desde HTML


    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html("container", {
        callback: (pdf) => {
            pdf.save('boleta.pdf');
        }
    });
    const pdfBlob = pdf.output('blob');

    // Word desde boleta
    const wordBlob = await generateWordFromHTML(boleta);

    // Agregar archivos al ZIP
    zip.file(`Boleta_${boleta.estudiante}.pdf`, pdfBlob);
    zip.file(`Boleta_${boleta.estudiante}.docx`, wordBlob);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `Boleta_${boleta.estudiante}.zip`);
};
