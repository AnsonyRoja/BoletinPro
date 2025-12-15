import { jsPDF } from "jspdf";



const generatePDFfromHTML = async (boleta, htmlContent) => {
    const pdf = new jsPDF('p', 'pt', 'a4');

    await pdf.html(htmlContent, {
        callback: function (doc) {
            doc.save(`Boleta_${boleta.estudiante}.pdf`);
        },
        margin: [20, 20, 20, 20],
        autoPaging: 'text',
        html2canvas: { scale: 0.57 } // Ajusta escala si quieres que entre en página
    });
};

export { generatePDFfromHTML };