import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";


export const previewBoletaPDF = async (boleta, docente, membrete, fontSizeTitle, fontSize) => {
    const pdf = new jsPDF("p", "pt", "a4");
    fontSize = fontSize - 3;
    const pageWidth = pdf.internal.pageSize.getWidth();
    let y = 30;

    // =========================
    // MARCO DORADO
    // =========================
    pdf.setLineWidth(4);
    pdf.setDrawColor(212, 175, 55); // gold
    pdf.rect(20, 20, pageWidth - 40, 800);

    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(1);

    // =========================
    // MEMBRETE
    // =========================
    const img = await loadImage(membrete);
    const imgWidth = pageWidth - 80;
    const imgHeight = 20;

    pdf.addImage(img, "PNG", 40, y, imgWidth, imgHeight);
    y += imgHeight + 10;

    // =========================
    // ENCABEZADO
    // =========================
    pdf.setFont("times", "bold");
    pdf.setFontSize(fontSizeTitle);

    pdf.text(
        "REPÚBLICA BOLIVARIANA DE VENEZUELA",
        pageWidth / 2,
        y,
        { align: "center" }
    );
    y += 14;

    pdf.text(
        "MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN",
        pageWidth / 2,
        y,
        { align: "center" }
    );
    y += 14;

    pdf.text(
        'UNIDAD EDUCATIVA COLEGIO PRIVADO "LATINOAMÉRICA"',
        pageWidth / 2,
        y,
        { align: "center" }
    );

    // =========================
    // TÍTULO
    // =========================
    y += 25;

    pdf.setFontSize(fontSizeTitle - 3);

    pdf.text(
        "BOLETÍN INFORMATIVO 1er MOMENTO PEDAGÓGICO",
        pageWidth / 2,
        y,
        { align: "center" }
    );

    y += 14;

    pdf.text(
        "EDUCACIÓN PRIMARIA",
        pageWidth / 2,
        y,
        { align: "center" }
    );


    pdf.setFontSize(fontSizeTitle - 4);
    pdf.setFont('helvetica', 'bold');
    y += 20;
    // Representante
    pdf.text('NOMBRES Y APELLIDOS DEL REPRESENTANTE:', 40, y);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(fontSize);

    const representanteText = boleta.representante;
    const xStart = 258; // posición inicial X
    const textWidth = pdf.getTextWidth(representanteText);
    pdf.text(representanteText, xStart, y);
    pdf.line(251, y + 2, (xStart + textWidth) + 4, y + 2); // subrayado
    y += 20;

    // Estudiante y Edad
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(fontSizeTitle - 4);

    pdf.text('NOMBRES Y APELLIDOS DEL ESTUDIANTE:', 40, y - 5);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(fontSize);
    const estudianteTextt = boleta.estudiante;
    const estudianteWidth = pdf.getTextWidth(estudianteTextt);

    pdf.text(boleta.estudiante, 238, y - 5);
    pdf.line(233, y - 3, xStart + estudianteWidth - 15, y - 3);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(fontSizeTitle - 4);
    pdf.text('EDAD:', 430, y - 4);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(fontSize);

    const edadText = boleta.edad.toString(); // <-- texto de la edad
    const edadXStart = 460;
    const edadWidth = pdf.getTextWidth(edadText);

    pdf.text(edadText, edadXStart, y - 4);
    pdf.line(edadXStart, y - 2, edadXStart + edadWidth, y - 2); // subrayado exacto
    y += 10;
    // Cédula, Grado, Sección, Docente
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(fontSizeTitle - 4);

    pdf.setFont('helvetica', 'bold');
    pdf.text('CÉDULA ESCOLAR:', 40, y);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(fontSize);

    const cedulaText = boleta.cedulaEscolar; // texto a medir
    const cedulaXStart = 130;
    const cedulaWidth = pdf.getTextWidth(cedulaText);

    pdf.text(cedulaText, cedulaXStart, y);
    pdf.line(cedulaXStart, y + 2, cedulaXStart + cedulaWidth, y + 2); // línea ajustada al texto


    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(fontSizeTitle - 4);
    pdf.text('GRADO:', 210, y);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(fontSize);

    const gradoText = docente.grado;
    const gradoXStart = 250;
    const gradoWidth = pdf.getTextWidth(gradoText);

    pdf.text(gradoText, gradoXStart, y);
    pdf.line(gradoXStart, y + 2, gradoXStart + gradoWidth, y + 2);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(fontSizeTitle - 3);
    pdf.text('SECCIÓN:', 310, y);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(fontSize);

    const seccionText = docente.seccion;
    const seccionXStart = 360;
    const seccionWidth = pdf.getTextWidth(seccionText);
    pdf.text(seccionText, seccionXStart, y);
    pdf.line(seccionXStart, y + 2, seccionXStart + seccionWidth, y + 2);


    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(fontSizeTitle - 4);

    pdf.text('DOCENTE:', 420, y);
    pdf.setFont('helvetica', 'normal');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(fontSize);

    const docenteText = docente.nombre;          // texto del docente
    const docenteXStart = 470;                   // posición inicial X
    const docenteWidth = pdf.getTextWidth(docenteText); // ancho del texto

    pdf.text(docenteText, docenteXStart, y);              // escribimos el texto
    pdf.line(docenteXStart, y + 2, docenteXStart + docenteWidth, y + 2); // línea ajustada


    y += 16;

    // Año Escolar
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(fontSizeTitle - 4);

    pdf.text('AÑO ESCOLAR:', 40, y);
    pdf.setFont('helvetica', 'normal');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(fontSize);

    const anoEscolarText = docente.anoEscolar;     // texto del año escolar
    const anoXStart = 113;                          // posición inicial X
    const anoWidth = pdf.getTextWidth(anoEscolarText); // ancho del texto

    pdf.text(anoEscolarText, anoXStart, y);                // escribimos el texto
    pdf.line(anoXStart, y + 2, anoXStart + anoWidth, y + 2); // línea ajustada al texto

    y += 25;


    // TABLA 
    const margin = 20;

    // Ancho columna 0 = solo lo necesario para el texto + padding
    const col0MaxWidth = Math.max(...[
        "ASPECTOS A EVALUAR",
        "SER – CONVIVIR",
        "CONOCER – HACER",
        "ÁREAS DE FORMACIÓN",
        "LENGUAJE, COMUNICACIÓN Y LITERATURA",
        "MATEMÁTICA",
        "CIENCIAS NATURALES",
        "CIENCIAS SOCIALES",
        "IDENTIDAD Y ORIENTACIÓN VOCACIONAL"
    ].map(text => pdf.getTextWidth(text))) + 5;

    // Columna 1 ocupa el resto del ancho del PDF
    const col1MaxWidth = pageWidth - margin * 2 - col0MaxWidth;

    autoTable(pdf, {
        startY: y,
        head: [
            [
                { content: "ASPECTOS A EVALUAR", styles: { halign: "center", fontStyle: "bold", textColor: 0, fillColor: [255, 255, 255] } },
                { content: "JUICIO VALORATIVO", styles: { fontStyle: "bold", textColor: 0, fillColor: [255, 255, 255], halign: "center" } },
            ],
        ],
        body: [
            [{ content: "SER – CONVIVIR", styles: { fontStyle: "bold", halign: "center", textColor: 0 } }, { content: boleta.serConvivir || "", styles: { textColor: 0 } }],
            [{ content: "CONOCER – HACER", styles: { fontStyle: "bold", halign: "center", textColor: 0 } }, { content: boleta.conocerHacer || "", styles: { textColor: 0 } }],
            [{ content: "ÁREAS DE FORMACIÓN", colSpan: 2, styles: { fontStyle: "bold", halign: "left", textColor: 0 } }],
            [{ content: "LENGUAJE, COMUNICACIÓN Y LITERATURA", styles: { fontStyle: "bold", textColor: 0 } }, { content: boleta.lenguaje || "", styles: { textColor: 0 } }],
            [{ content: "MATEMÁTICA", styles: { fontStyle: "bold", textColor: 0 } }, { content: boleta.matematica || "", styles: { textColor: 0 } }],
            [{ content: "CIENCIAS NATURALES", styles: { fontStyle: "bold", textColor: 0 } }, { content: boleta.cienciasNaturales || "", styles: { textColor: 0 } }],
            [{ content: "CIENCIAS SOCIALES", styles: { fontStyle: "bold", textColor: 0 } }, { content: boleta.cienciasSociales || "", styles: { textColor: 0 } }],
            [{ content: "IDENTIDAD Y ORIENTACIÓN VOCACIONAL", styles: { fontStyle: "bold", textColor: 0 } }, { content: boleta.identidad || "", styles: { textColor: 0 } }],
        ],
        theme: "grid",
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.5,
            font: "helvetica",
            fontSize: fontSize,
            cellPadding: 5,
            overflow: 'linebreak', // ajusta texto largo en varias líneas
        },
        columnStyles: {
            0: { cellWidth: 120, halign: "center", valign: "middle" },
            1: { cellWidth: col1MaxWidth + 2, halign: 'justify', },
        },
        didParseCell: function (data) {
            // Para la fila "ÁREAS DE FORMACIÓN" unir columnas
            if (data.row.index === 2) {
                data.cell.colSpan = 2;
                data.cell.styles.fontStyle = "bold";
                data.cell.styles.halign = "left";
            }
        },
    });

    // =========================
    // NUEVA PÁGINA
    // =========================
    pdf.addPage(); // agrega una página en blanco
    let newY = 30; // reiniciamos el cursor Y para la nueva página

    pdf.setLineWidth(4);
    pdf.setDrawColor(212, 175, 55); // gold
    pdf.rect(20, 20, pageWidth - 40, 800);

    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(1);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(fontSizeTitle);
    pdf.text('CONTENIDO DE LA NUEVA PÁGINA', pdf.internal.pageSize.getWidth() / 2, newY, { align: 'center' });
    newY += 20;

    // Puedes agregar otra tabla o cualquier contenido
    autoTable(pdf, {
        startY: newY,
        head: [["OTRA TABLA", "VALOR"]],
        body: [
            ["Dato 1", "Valor 1"],
            ["Dato 2", "Valor 2"],
        ],
        theme: 'grid',
        styles: {
            fontSize: fontSize,
            cellPadding: 4,
        }
    })



    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);
    window.open(url);
};



const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
};
