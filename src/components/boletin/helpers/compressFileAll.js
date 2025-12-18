

import JSZip from "jszip";
import { saveAs } from 'file-saver';
import { generateBoletaAllWord } from "./generateWordAll";
import { generateBoletasAllPDF } from "./generatePdfAll";

export const downloadAllBallotsZip = async (boletas, docente, membrete, fontSizeTitle, fontSize) => {



    const zip = new JSZip();


    const pdfBlob = await generateBoletasAllPDF(boletas, docente, membrete, fontSizeTitle, fontSize);




    const wordBlob = await generateBoletaAllWord(boletas, docente, membrete, fontSizeTitle, fontSize);

    zip.file(`Boletas_Sección_${docente.seccion}_Grado_${docente.grado}.pdf`, pdfBlob);
    zip.file(`Boletas_Sección_${docente.seccion}_Grado_${docente.grado}.docx`, wordBlob);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `Boletas.zip`);



}