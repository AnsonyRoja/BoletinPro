import { Document, Packer, Paragraph, TextRun } from "docx";

const generateWordFromHTML = async (boleta) => {
    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({ text: `Boleta de: ${boleta.estudiante}`, bold: true }),
                        ],
                    }),
                    new Paragraph({ text: `Representante: ${boleta.representante}` }),
                    new Paragraph({ text: `Grado: ${boleta.grado} Sección: ${boleta.seccion}` }),
                    // Aquí puedes extraer más info de tu boleta para agregar al Word
                ],
            },
        ],
    });

    const blob = await Packer.toBlob(doc);
    return blob;
};


export default generateWordFromHTML;