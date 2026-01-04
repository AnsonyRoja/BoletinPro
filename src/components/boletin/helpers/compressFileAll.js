

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

export const donloadAllBallotsJson = () => {
    const data = {
        boletin: JSON.parse(localStorage.getItem('boletin') || 'null'),
        docente: JSON.parse(localStorage.getItem('docente') || 'null'),
        boletasGuardadas: JSON.parse(localStorage.getItem('boletasGuardadas') || '[]'),
        exportedAt: new Date().toISOString()
    };

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'boletas_exportadas.json';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};


export const uploadAllBallotsJson = (file) => {
    if (!file || !(file instanceof Blob)) {
        alert('Archivo inválido');
        return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);

            if (data.boletin !== undefined) {
                localStorage.setItem('boletin', JSON.stringify(data.boletin));
            }

            if (data.docente !== undefined) {
                localStorage.setItem('docente', JSON.stringify(data.docente));
            }

            if (Array.isArray(data.boletasGuardadas)) {
                localStorage.setItem(
                    'boletasGuardadas',
                    JSON.stringify(data.boletasGuardadas)
                );
            }

            alert('Boletas cargadas correctamente');
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Archivo JSON inválido o corrupto');
        }
    };

    reader.readAsText(file);
};
