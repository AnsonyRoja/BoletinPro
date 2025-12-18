import { autoTable } from "jspdf-autotable";
import startImg from '../../../assets/star.png';






export const previewBoletaPDF = async (pdf, boleta, docente, membrete, fontSizeTitle, fontSize) => {
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
    pdf.setFont("Times", "bold");
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
    pdf.setFont('Times', 'bold');
    y += 20;
    // Representante
    pdf.text('NOMBRES Y APELLIDOS DEL REPRESENTANTE:', 40, y);
    pdf.setFont('Times', 'normal');
    pdf.setFontSize(fontSize);

    const representanteText = boleta.representante;
    const xStart = 258; // posición inicial X
    const textWidth = pdf.getTextWidth(representanteText);
    pdf.text(representanteText, xStart, y);
    pdf.line(251, y + 2, (xStart + textWidth) + 4, y + 2); // subrayado
    y += 20;

    // Estudiante y Edad
    pdf.setFont('Times', 'bold');
    pdf.setFontSize(fontSizeTitle - 4);

    pdf.text('NOMBRES Y APELLIDOS DEL ESTUDIANTE:', 40, y - 5);

    pdf.setFont('Times', 'normal');
    pdf.setFontSize(fontSize);
    const estudianteTextt = boleta.estudiante;
    const estudianteWidth = pdf.getTextWidth(estudianteTextt);

    pdf.text(boleta.estudiante, 238, y - 5);
    pdf.line(233, y - 3, xStart + estudianteWidth - 15, y - 3);

    pdf.setFont('Times', 'bold');
    pdf.setFontSize(fontSizeTitle - 4);
    pdf.text('EDAD:', 430, y - 4);

    pdf.setFont('Times', 'normal');
    pdf.setFontSize(fontSize);

    const edadText = boleta.edad.toString(); // <-- texto de la edad
    const edadXStart = 460;
    const edadWidth = pdf.getTextWidth(edadText);

    pdf.text(edadText, edadXStart, y - 4);
    pdf.line(edadXStart, y - 2, edadXStart + edadWidth, y - 2); // subrayado exacto
    y += 10;
    // Cédula, Grado, Sección, Docente
    pdf.setFont('Times', 'bold');
    pdf.setFontSize(fontSizeTitle - 4);

    pdf.setFont('Times', 'bold');
    pdf.text('CÉDULA ESCOLAR:', 40, y);

    pdf.setFont('Times', 'normal');
    pdf.setFontSize(fontSize);

    const cedulaText = boleta.cedulaEscolar; // texto a medir
    const cedulaXStart = 130;
    const cedulaWidth = pdf.getTextWidth(cedulaText);

    pdf.text(cedulaText, cedulaXStart, y);
    pdf.line(cedulaXStart, y + 2, cedulaXStart + cedulaWidth, y + 2); // línea ajustada al texto


    pdf.setFont('Times', 'bold');
    pdf.setFontSize(fontSizeTitle - 4);
    pdf.text('GRADO:', 210, y);
    pdf.setFont('Times', 'normal');
    pdf.setFontSize(fontSize);

    const gradoText = docente.grado;
    const gradoXStart = 250;
    const gradoWidth = pdf.getTextWidth(gradoText);

    pdf.text(gradoText, gradoXStart, y);
    pdf.line(gradoXStart, y + 2, gradoXStart + gradoWidth, y + 2);
    pdf.setFont('Times', 'bold');
    pdf.setFontSize(fontSizeTitle - 3);
    pdf.text('SECCIÓN:', 310, y);

    pdf.setFont('Times', 'normal');
    pdf.setFontSize(fontSize);

    const seccionText = docente.seccion;
    const seccionXStart = 360;
    const seccionWidth = pdf.getTextWidth(seccionText);
    pdf.text(seccionText, seccionXStart, y);
    pdf.line(seccionXStart, y + 2, seccionXStart + seccionWidth, y + 2);


    pdf.setFont('Times', 'bold');
    pdf.setFontSize(fontSizeTitle - 4);

    pdf.text('DOCENTE:', 420, y);
    pdf.setFont('Times', 'normal');
    pdf.setFont('Times', 'normal');
    pdf.setFontSize(fontSize);

    const docenteText = docente.nombre;          // texto del docente
    const docenteXStart = 470;                   // posición inicial X
    const docenteWidth = pdf.getTextWidth(docenteText); // ancho del texto

    pdf.text(docenteText, docenteXStart, y);              // escribimos el texto
    pdf.line(docenteXStart, y + 2, docenteXStart + docenteWidth, y + 2); // línea ajustada


    y += 16;

    // Año Escolar
    pdf.setFont('Times', 'bold');
    pdf.setFontSize(fontSizeTitle - 4);

    pdf.text('AÑO ESCOLAR:', 40, y);
    pdf.setFont('Times', 'normal');
    pdf.setFont('Times', 'normal');
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
            font: "Times",
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
    let newY = 50; // reiniciamos el cursor Y para la nueva página

    pdf.setLineWidth(4);
    pdf.setDrawColor(212, 175, 55); // gold
    pdf.rect(20, 20, pageWidth - 40, 800);

    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(1);

    pdf.addImage(img, "PNG", 40, 30, imgWidth, imgHeight);
    const imgStar = await loadImage(startImg);


    // Puedes agregar otra tabla o cualquier contenido
    autoTable(pdf, {
        startY: newY,
        theme: "grid",
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.5,
            font: "Times",
            fontSize: fontSize,
            cellPadding: 5,
            overflow: "linebreak",
            textColor: 0,
        },
        columnStyles: {
            0: { cellWidth: 95 },
            1: { cellWidth: 95 },
        },
        body: [
            // EDUCACIÓN FÍSICA

            [

                {
                    content: "EDUCACIÓN FÍSICA, DEPORTE Y RECREACIÓN",
                    colSpan: 2,
                    styles: { fontSize: fontSizeTitle - 3, fontStyle: "bold", halign: "center" }
                }
            ],
            [
                {
                    content: boleta.educacionFisica || "",
                    colSpan: 2,
                    styles: { fontSize: fontSizeTitle - 3, halign: "justify" }
                }
            ],

            // AJEDREZ
            [
                {
                    content: "AJEDREZ",
                    colSpan: 2,
                    styles: { fontSize: fontSizeTitle - 3, fontStyle: "bold", halign: "center" }
                }
            ],
            [
                {
                    content: boleta.ajedrez || "",
                    colSpan: 2,
                    styles: { fontSize: fontSizeTitle - 3, halign: "justify" }
                }
            ],

            // INGLÉS
            [
                {
                    content: "INGLÉS (INSTITUTO CLEVELAND)",
                    colSpan: 2,
                    styles: { fontSize: fontSizeTitle - 3, fontStyle: "bold", halign: "center" }
                }
            ],
            [
                {
                    content: boleta.ingles || "",
                    colSpan: 2,
                    styles: { fontSize: fontSize, halign: "justify" }
                }
            ],

            // MATIFIC
            [
                {
                    content: "MATIFIC – ESTRELLAS ALCANZADAS",
                    colSpan: 2,
                    styles: { fontSize: fontSizeTitle - 3, fontStyle: "bold", halign: "center" }
                }
            ],
            [
                {
                    content: `${boleta.matific}` || "",
                    colSpan: 2,
                    styles: { fontSize: fontSize, halign: "center" }
                }
            ],

            // RECOMENDACIONES
            [
                {
                    content: "RECOMENDACIONES PARA EL REPRESENTANTE",
                    colSpan: 2,
                    styles: { fontSize: fontSizeTitle - 3, fontStyle: "bold", halign: "center" }
                }
            ],
            [
                {
                    content: boleta.recomendaciones || "",
                    colSpan: 2,
                    styles: { fontSize: fontSize, halign: "justify" }
                }
            ],

            // DEBERES
            [
                {
                    content: "DEBERES DE LOS NIÑOS (AS) Y ADOLESCENTES",
                    colSpan: 2,
                    styles: { fontSize: fontSizeTitle - 3, fontStyle: "bold", halign: "center" }
                }
            ],
            [
                {
                    content: "",
                    colSpan: 2,
                    styles: { minCellHeight: 10 },
                    deberesParcial: true

                }
            ],
            [
                {
                    colSpan: 2,
                    styles: { minCellHeight: 60 },
                    content: "", // dejamos vacío porque dibujaremos todo
                    customRow: true
                }
            ]

        ],
        didDrawCell: async function (data) {
            console.log('data', data.cell.raw.content);

            if (data.cell.raw && String(data.cell.raw.content) === String(boleta.matific)) {
                try {
                    const pdf = data.doc;
                    const iconSize = 8; // Tamaño del icono (ajusta según necesites)
                    const spacing = 2;  // Espacio entre el texto y el icono

                    // 1. Obtener el contenido del texto
                    const text = String(data.cell.raw.content);

                    // 2. Calcular cuánto mide el texto en el PDF
                    const textWidth = pdf.getTextWidth(text);

                    // 3. Calcular la posición X
                    // Si la celda está centrada, el texto empieza en: 
                    // (x de celda + mitad del ancho de celda) - (mitad del ancho del texto)
                    const textStartX = data.cell.x + (data.cell.width / 2) - (textWidth / 2);

                    // El icono va justo después del texto
                    const xIcon = textStartX + textWidth + spacing;

                    // 4. Calcular la posición Y (Centrado vertical en la celda)
                    const yIcon = data.cell.y + (data.cell.height / 2) - (iconSize / 2);

                    // 5. Dibujar el icono
                    pdf.addImage(imgStar, 'PNG', xIcon, yIcon, iconSize, iconSize);

                    console.log("Icono colocado al lado del texto");
                } catch (error) {
                    console.error("Error al colocar el icono:", error);
                }
            }

            if (data.cell.raw?.customRow) {
                const paddingX = 5;
                const paddingY = 10;
                const x = data.cell.x + paddingX;
                let y = data.cell.y + paddingY;

                // Usamos el ancho real de la celda menos solo el padding
                const cellWidth = data.cell.width - paddingX * 2;

                // --- Parte 1: Total de inasistencias (centrado y negrita) ---
                const totalInasistencias = `Total de inasistencias: ${boleta.totalInasistencia.replace(".", ",") === "0,00" ? "" : boleta.totalInasistencia.replace(".", ",")} % (${boleta.faltas.length === 0 ? 0 : boleta.faltas}) FALTAS`;

                pdf.setFont("Times", "bold");
                pdf.text(totalInasistencias, x + cellWidth / 2, y, { align: "center" });
                const textoCompletoOriginal = boleta.deberes || "";
                const inicioNegrita = 0;
                const finNegrita = 24;
                const lineHeight = 12;
                let cursorY = y + 10;
                const textoAEliminar =
                    'Articulo 93 Literal f de la LOPNA "Cumplir sus obligaciones en materia de educación".';
                const textoCompleto = textoCompletoOriginal
                    .replace(textoAEliminar, "")
                    .trim();
                console.log('Texto completo', textoCompleto);

                // Dividir texto en líneas usando TODO el ancho
                const lineas = pdf.splitTextToSize(textoCompleto, cellWidth);

                let charIndexGlobal = 0;

                lineas.forEach(linea => {
                    let cursorX = x;
                    let buffer = "";
                    let bufferStartIndex = charIndexGlobal;

                    for (let i = 0; i < linea.length; i++) {
                        const char = linea[i];
                        const globalIndex = charIndexGlobal;

                        const debeIrNegrita =
                            globalIndex >= inicioNegrita && globalIndex < finNegrita;

                        const bufferDebeIrNegrita =
                            bufferStartIndex >= inicioNegrita && bufferStartIndex < finNegrita;

                        // Si cambia el estado de negrita → pintar buffer
                        if (buffer.length > 0 && debeIrNegrita !== bufferDebeIrNegrita) {
                            pdf.setFont("Times", bufferDebeIrNegrita ? "bold" : "normal");
                            pdf.setFontSize(fontSize);
                            pdf.text(buffer, cursorX, cursorY);
                            cursorX += pdf.getTextWidth(buffer);

                            buffer = "";
                            bufferStartIndex = globalIndex;
                        }

                        buffer += char;
                        charIndexGlobal++;
                    }

                    // Pintar resto del buffer
                    if (buffer.length > 0) {
                        const debeIrNegrita =
                            bufferStartIndex >= inicioNegrita && bufferStartIndex < finNegrita;

                        pdf.setFont("Times", debeIrNegrita ? "bold" : "normal");

                        pdf.text(buffer, cursorX, cursorY);
                    }

                    cursorY += lineHeight;
                });
            }
            if (data.cell.raw?.deberesParcial && data.column.index === 0) {
                console.log("primero")

                const paddingX = 5;
                const paddingY = 13;

                const x = data.cell.x + paddingX;
                const y = data.cell.y + paddingY;

                const cellWidth = data.cell.width - paddingX * 2;

                const textoNegrita = boleta.deberes?.slice(0, 33) || "";
                const textoNormal = boleta.deberes?.slice(33, 85) || "";

                // Texto en negrita
                pdf.setFont("Times", "bold");
                pdf.text(textoNegrita, x, y);

                const anchoNegrita = pdf.getTextWidth(textoNegrita);

                // Texto normal (con ajuste automático)
                pdf.setFont("Times", "normal");
                const textoAjustado = pdf.splitTextToSize(
                    textoNormal,
                    cellWidth - anchoNegrita
                );

                pdf.text(
                    textoAjustado,
                    x + anchoNegrita,
                    y
                );
            }
        }
    });


    const tableWidth = 150 + 25 + 18;

    autoTable(pdf, {
        startY: pdf.lastAutoTable.finalY + 20,

        margin: {
            left: (pageWidth - tableWidth) / 2
        },

        theme: "grid",

        styles: {
            lineColor: [0, 0, 0],
            font: "Times",
            fontSize: fontSize,
            halign: "center",
            valign: "middle",
            lineWidth: 0.3
        },

        headStyles: {
            fillColor: false,
            textColor: 0,
            fontStyle: "bold",
            fontSize: fontSizeTitle - 3
        },

        columnStyles: {
            0: { halign: "left", cellWidth: 150 },
            1: { halign: "center", fontStyle: "bold", cellWidth: 25 },
            2: { halign: "center", cellWidth: 18 }
        },

        head: [[
            {
                content: "ESCALA",
                colSpan: 3,
                styles: { halign: "center", fontStyle: "bold" }
            }
        ]],

        body: [
            ["INICIADO", "I", boleta.escalaGeneral === "I" ? "X" : ""],
            ["REQUIERE AYUDA", "RA", boleta.escalaGeneral === "RA" ? "X" : ""],
            ["PROCESO LENTO", "PL", boleta.escalaGeneral === "PL" ? "X" : ""],
            ["EN PROCESO", "EP", boleta.escalaGeneral === "EP" ? "X" : ""],
            ["CONSOLIDADO", "C", boleta.escalaGeneral === "C" ? "X" : ""],
            ["MAS QUE CONSOLIDADO", "+C", boleta.escalaGeneral === "+C" ? "X" : ""]
        ]
    });


    // Y inicial: debajo de la última tabla
    const startY = pdf.lastAutoTable.finalY + 50;


    // Ancho por bloque (3 columnas)
    const blockWidth = pageWidth / 3;

    // Tamaño de fuente
    pdf.setFont("Times", "bold");
    pdf.setFontSize(fontSize);

    // -------------------- DIRECTORA --------------------
    const xDirectora = blockWidth * 0 + blockWidth / 2;

    pdf.line(
        xDirectora - 55,
        startY,
        xDirectora + 55,
        startY
    );

    pdf.text("FRANCIS GUTIÉRREZ", xDirectora, startY + 11, { align: "center" });
    pdf.text("DIRECTORA", xDirectora, startY + 20, { align: "center" });

    // -------------------- DOCENTE + SELLO --------------------
    const xDocente = blockWidth * 1 + blockWidth / 2;

    // Texto SELLO (espacio reservado)
    pdf.text("SELLO", xDocente, startY - 25, { align: "center" });

    // Línea de firma
    pdf.line(
        xDocente - 55,
        startY + 55,
        xDocente + 55,
        startY + 55
    );

    pdf.text(docente.nombre, xDocente, startY + 75, { align: "center" });
    pdf.text("DOCENTE DE AULA", xDocente, startY + 65, { align: "center" });

    // -------------------- COORDINADOR --------------------
    const xCoord = blockWidth * 2 + blockWidth / 2;

    pdf.line(
        xCoord - 55,
        startY,
        xCoord + 55,
        startY
    );

    pdf.text("LIZMARY PÉREZ", xCoord, startY + 10, { align: "center" });
    pdf.text("COORD. EDUC. PRIMARIA", xCoord, startY + 21, { align: "center" });




    // const blob = pdf.output("blob");
    // const url = URL.createObjectURL(blob);
    // window.open(url);
};



const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
};
