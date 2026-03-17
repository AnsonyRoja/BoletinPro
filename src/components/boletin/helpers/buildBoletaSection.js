
import { TabStopType, PageBorderZOrder, Header, VerticalAlign, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ImageRun, PageBorderDisplay, PageBorderOffsetFrom } from "docx";
import { cleanWordText } from "./generateWord";

export const buildBoletaSections = (
    boleta,
    docente,
    imgBuffer,
    fontSizeTitle,
    fontSize,
    imgStar
) => {

    const section1 = {
        properties: {


            page: {

                size: {
                    orientation: "portrait", // vertical
                    width: 12240,   // CARTA
                    height: 15840,          // 29.7 cm en Twips
                },
                borders: {

                    pageBorderLeft: {
                        style: BorderStyle.SINGLE,
                        size: 15,
                        color: 'D4AF37',
                        space: 20
                    },
                    pageBorderRight: {
                        style: BorderStyle.SINGLE,
                        size: 15,
                        color: 'D4AF37',
                        space: 20
                    },
                    pageBorderTop: {
                        style: BorderStyle.SINGLE,
                        size: 15,
                        color: 'D4AF37',
                        space: 20
                    },
                    pageBorderBottom: {
                        style: BorderStyle.SINGLE,
                        size: 15,
                        color: 'D4AF37',
                        space: 20
                    },
                    pageBorders: {
                        display: PageBorderDisplay.FIRST_PAGE,
                        offsetFrom: PageBorderOffsetFrom.PAGE,
                        zOrder: PageBorderZOrder.FRONT,
                    },

                }

            }


        },
        headers: {
            default: buildHeader(imgBuffer),
        },
        children: [
            new Paragraph({
                children: [new TextRun({ text: "REPÚBLICA BOLIVARIANA DE VENEZUELA", bold: true, size: fontSizeTitle, font: "Arial", })],
                alignment: AlignmentType.CENTER,
            }),

            new Paragraph({
                children: [new TextRun({ text: "MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN", bold: true, size: fontSizeTitle, font: "Arial", })],
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
                children: [new TextRun({ text: 'UNIDAD EDUCATIVA COLEGIO PRIVADO "LATINOAMÉRICA"', bold: true, size: fontSizeTitle, font: "Arial", })],
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
                children: [new TextRun({ text: "BOLETÍN INFORMATIVO 2DO MOMENTO PEDAGÓGICO", bold: true, size: fontSizeTitle, font: "Arial", })],
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
                children: [new TextRun({ text: "EDUCACIÓN PRIMARIA", bold: true, size: fontSizeTitle - 1, font: "Arial", })],
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
                text: "",
                spacing: {
                    before: 10, // espacio antes de la tabla (en Twips, 1 pt ≈ 20 Twips)
                },
            }),

            // ================= REPRESENTANTE =================
            new Paragraph({
                children: [
                    new TextRun({ text: "NOMBRES Y APELLIDOS DEL REPRESENTANTE: ", bold: true, size: fontSizeTitle, font: "Arial", }),
                    new TextRun({ text: boleta.representante, underline: {}, size: fontSize, font: "Arial", }),
                ],
            }),

            // ================= ESTUDIANTE =================
            new Paragraph({
                children: [
                    new TextRun({ text: "NOMBRES Y APELLIDOS DEL ESTUDIANTE: ", bold: true, size: fontSizeTitle, font: "Arial", }),
                    new TextRun({ text: boleta.estudiante, underline: {}, size: fontSize, font: "Arial", }),
                    new TextRun({ text: "   EDAD: ", bold: true, size: fontSizeTitle, font: "Arial", }),
                    new TextRun({ text: boleta.edad.toString(), underline: {}, size: fontSize, font: "Arial", }),
                ],
            }),

            // ================= CÉDULA, GRADO, SECCIÓN =================
            new Paragraph({
                children: [
                    new TextRun({ text: "CÉDULA ESCOLAR: ", bold: true, size: fontSizeTitle, font: "Arial", }),
                    new TextRun({ text: boleta.cedulaEscolar, underline: {}, size: fontSize, font: "Arial", }),
                    new TextRun({ text: "   GRADO: ", bold: true, size: fontSizeTitle, font: "Arial", }),
                    new TextRun({ text: docente.grado, underline: {}, size: fontSize, font: "Arial", }),
                    new TextRun({ text: "   SECCIÓN: ", bold: true, size: fontSizeTitle, font: "Arial", }),
                    new TextRun({ text: docente.seccion, underline: {}, size: fontSize, font: "Arial", }),
                ],
            }),

            // ================= DOCENTE y AÑO ESCOLAR =================
            new Paragraph({
                children: [
                    new TextRun({ text: "DOCENTE: ", bold: true, size: fontSizeTitle, font: "Arial", }),
                    new TextRun({ text: docente.nombre, underline: {}, size: fontSize, font: "Arial", }),
                    new TextRun({ text: "   AÑO ESCOLAR: ", bold: true, size: fontSizeTitle, font: "Arial", }),
                    new TextRun({ text: docente.anoEscolar, underline: {}, size: fontSize, font: "Arial", }),
                ],
            }),


            new Paragraph({
                text: "",
                spacing: {
                    before: 10, // espacio antes de la tabla (en Twips, 1 pt ≈ 20 Twips)
                },
            }),



            // ================= TABLA DE EVALUACIÓN =================
            new Table({
                rows: [
                    // Fila encabezado
                    new TableRow(

                        {

                            children: [
                                new TableCell({
                                    verticalAlign: AlignmentType.CENTER,
                                    width: { size: 30, type: WidthType.PERCENTAGE },
                                    children: [new Paragraph({ children: [new TextRun({ text: "ASPECTOS A EVALUAR", bold: true, size: fontSizeTitle, font: "Arial", })], alignment: AlignmentType.CENTER })],
                                    borders: { top: { style: BorderStyle.SINGLE, size: 7 }, bottom: { style: BorderStyle.SINGLE, size: 7 }, left: { style: BorderStyle.SINGLE, size: 7 }, right: { style: BorderStyle.SINGLE, size: 7 } },
                                }),
                                new TableCell({
                                    verticalAlign: AlignmentType.CENTER,
                                    width: { size: 70, type: WidthType.PERCENTAGE },
                                    children: [new Paragraph({ children: [new TextRun({ text: "JUICIO VALORATIVO", bold: true, size: fontSizeTitle, font: "Arial", })], alignment: AlignmentType.CENTER })],
                                    borders: { top: { style: BorderStyle.SINGLE, size: 7 }, bottom: { style: BorderStyle.SINGLE, size: 7 }, left: { style: BorderStyle.SINGLE, size: 7 }, right: { style: BorderStyle.SINGLE, size: 7 } },
                                }),
                            ],
                        }),
                    // Filas de datos
                    ...[
                        { aspecto: "SER – CONVIVIR", valor: cleanWordText(boleta.serConvivir) },
                        { aspecto: "CONOCER – HACER", valor: cleanWordText(boleta.conocerHacer) },
                        { aspecto: "ÁREAS DE FORMACIÓN", valor: null, colSpan: 2 },
                        { aspecto: "LENGUAJE, COMUNICACIÓN Y LITERATURA", valor: cleanWordText(boleta.lenguaje) },
                        { aspecto: "MATEMÁTICA", valor: cleanWordText(boleta.matematica) },
                        { aspecto: "CIENCIAS NATURALES", valor: cleanWordText(boleta.cienciasNaturales) },
                        { aspecto: "CIENCIAS SOCIALES", valor: cleanWordText(boleta.cienciasSociales) },
                        { aspecto: "IDENTIDAD Y ORIENTACIÓN VOCACIONAL", valor: cleanWordText(boleta.identidad) },
                    ].map(item =>
                        new TableRow({
                            children: item.colSpan === 2
                                ? [new TableCell({
                                    margins: { top: 50, bottom: 50, left: 100, right: 10 }, // padding interno

                                    columnSpan: 2,
                                    children: [new Paragraph({ children: [new TextRun({ text: item.aspecto, bold: true, size: fontSizeTitle, font: "Arial", })], alignment: AlignmentType.LEFT })],
                                    borders: { top: { style: BorderStyle.SINGLE, size: 7 }, bottom: { style: BorderStyle.SINGLE, size: 7 }, left: { style: BorderStyle.SINGLE, size: 7 }, right: { style: BorderStyle.SINGLE, size: 7 } },
                                })]
                                : [
                                    new TableCell({
                                        verticalAlign: VerticalAlign.CENTER, // <-- centrar vertical
                                        margins: { top: 20, bottom: 20, left: 20, right: 10 }, // padding interno

                                        width: { size: 0, type: WidthType.PERCENTAGE },
                                        children: [new Paragraph({ children: [new TextRun({ text: item.aspecto, bold: true, size: fontSizeTitle, font: "Arial", })], alignment: AlignmentType.CENTER })],
                                        borders: { top: { style: BorderStyle.SINGLE, size: 7 }, bottom: { style: BorderStyle.SINGLE, size: 7 }, left: { style: BorderStyle.SINGLE, size: 7 }, right: { style: BorderStyle.SINGLE, size: 7 } },
                                    }),
                                    new TableCell({

                                        margins: { top: 50, bottom: 50, left: 50, right: 50 }, // padding interno
                                        width: { size: 80, type: WidthType.PERCENTAGE },
                                        children: [new Paragraph({ children: [new TextRun({ text: item.valor || "", size: fontSize, font: "Arial", })], alignment: AlignmentType.JUSTIFIED })],
                                        borders: { top: { style: BorderStyle.SINGLE, size: 7 }, bottom: { style: BorderStyle.SINGLE, size: 7 }, left: { style: BorderStyle.SINGLE, size: 7 }, right: { style: BorderStyle.SINGLE, size: 7 } },
                                    }),
                                ],
                        })
                    ),
                ],
            }),


        ],
    };

    const section2 = {
        properties: {
            page: {

                size: {
                    orientation: "portrait", // vertical
                    width: 12240,   // CARTA
                    height: 15840,          // 29.7 cm en Twips
                },
                borders: {

                    pageBorderLeft: {
                        style: BorderStyle.SINGLE,
                        size: 15,
                        color: 'D4AF37',
                        space: 20
                    },
                    pageBorderRight: {
                        style: BorderStyle.SINGLE,
                        size: 15,
                        color: 'D4AF37',
                        space: 20
                    },
                    pageBorderTop: {
                        style: BorderStyle.SINGLE,
                        size: 15,
                        color: 'D4AF37',
                        space: 20
                    },
                    pageBorderBottom: {
                        style: BorderStyle.SINGLE,
                        size: 15,
                        color: 'D4AF37',
                        space: 20
                    },
                    pageBorders: {
                        display: PageBorderDisplay.FIRST_PAGE,
                        offsetFrom: PageBorderOffsetFrom.PAGE,
                        zOrder: PageBorderZOrder.FRONT,
                    },

                }

            }
        },
        headers: {
            default: buildHeader(imgBuffer),
        },
        children: [
            // ================= TABLA PRINCIPAL 
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },

                rows: [

                    // EDUCACIÓN FÍSICA

                    new TableRow({
                        children: [

                            new TableCell({
                                children: [

                                    new Paragraph({
                                        children: [new TextRun({ text: "EDUCACIÓN FÍSICA, DEPORTE Y RECREACIÓN", bold: true, size: fontSizeTitle, font: "Arial", })],
                                        alignment: AlignmentType.CENTER,
                                    }),

                                ],
                                verticalAlign: VerticalAlign.CENTER,
                                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                            }),

                        ],
                    }),

                    new TableRow({
                        children: [
                            new TableCell({
                                children: [

                                    new Paragraph({
                                        children: [new TextRun({ text: cleanWordText(boleta.educacionFisica) || '', size: fontSize, font: "Arial", })],
                                        alignment: AlignmentType.JUSTIFIED,
                                    }),
                                ],
                                verticalAlign: VerticalAlign.CENTER,
                                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                            }),

                        ],
                    }),



                    // AJEDREZ
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [new TextRun({ text: "AJEDREZ", bold: true, size: fontSizeTitle, font: "Arial", })],
                                        alignment: AlignmentType.CENTER,
                                    }),

                                ],
                                verticalAlign: VerticalAlign.CENTER,
                                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                            }),
                        ],
                    }),

                    new TableRow({
                        children: [
                            new TableCell({
                                children: [

                                    new Paragraph({
                                        children: [new TextRun({ text: cleanWordText(boleta.ajedrez) || '', size: fontSize, font: "Arial", })],
                                        alignment: AlignmentType.JUSTIFIED,
                                    }),
                                ],
                                verticalAlign: VerticalAlign.CENTER,
                                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                            }),
                        ],
                    }),

                    // INGLÉS
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [new TextRun({ text: "INGLÉS (INSTITUTO CLEVELAND)", bold: true, size: fontSizeTitle, font: "Arial", })],
                                        alignment: AlignmentType.CENTER,
                                    }),

                                ],
                                verticalAlign: VerticalAlign.CENTER,
                                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                            }),
                        ],
                    }),

                    new TableRow({
                        children: [
                            new TableCell({
                                children: [

                                    new Paragraph({
                                        children: [new TextRun({ text: cleanWordText(boleta.ingles) || '', size: fontSize, font: "Arial", })],
                                        alignment: AlignmentType.JUSTIFIED,
                                    }),
                                ],
                                verticalAlign: VerticalAlign.CENTER,
                                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                            }),
                        ],
                    }),

                    // MATIFIC
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [new TextRun({ text: "MATIFIC – ESTRELLAS ALCANZADAS", bold: true, size: fontSizeTitle, font: "Arial", }),


                                        ],
                                        alignment: AlignmentType.CENTER,
                                    }),

                                ],
                                verticalAlign: VerticalAlign.CENTER,
                                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                            }),
                        ],
                    }),

                    new TableRow({
                        children: [
                            new TableCell({
                                children: [

                                    new Paragraph({
                                        children: [new TextRun({ text: boleta.matific || '', size: fontSize, font: "Arial", }),

                                        new TextRun({ text: " " }),


                                        new ImageRun({
                                            data: imgStar, // La imagen debe estar en Buffer o Base64
                                            transformation: {
                                                width: 12,  // Ajusta el tamaño según tu fontSize
                                                height: 12,
                                            },
                                        }),


                                        ],
                                        alignment: AlignmentType.CENTER,
                                    }),
                                ],
                                verticalAlign: VerticalAlign.CENTER,
                                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                            }),
                        ],
                    }),

                    // RECOMENDACIONES
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [new TextRun({ text: "RECOMENDACIONES PARA EL REPRESENTANTE", bold: true, size: fontSizeTitle, font: "Arial", })],
                                        alignment: AlignmentType.CENTER,
                                    }),

                                ],
                                verticalAlign: VerticalAlign.CENTER,
                                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                            }),
                        ],
                    }),

                    new TableRow({
                        children: [
                            new TableCell({
                                children: [

                                    new Paragraph({
                                        children: [new TextRun({ text: cleanWordText(boleta.recomendaciones) || '', size: fontSize, font: "Arial", })],
                                        alignment: AlignmentType.JUSTIFIED,
                                    }),
                                ],
                                verticalAlign: VerticalAlign.CENTER,
                                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                            }),
                        ],
                    }),

                    // DEBERES
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [new TextRun({ text: "DEBERES DE LOS NIÑOS (AS) Y ADOLESCENTES", bold: true, size: fontSizeTitle, font: "Arial", })],
                                        alignment: AlignmentType.CENTER,
                                    }),

                                ],
                                verticalAlign: VerticalAlign.CENTER,
                                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                            }),
                        ],
                    }),


                    new TableRow({
                        children: [
                            new TableCell({
                                children: [

                                    new Paragraph({
                                        children: [

                                            new TextRun({ text: cleanWordText(boleta.deberes.slice(0, 33)) || '', size: fontSize, bold: true, font: "Arial", }),
                                            new TextRun({ text: cleanWordText(boleta.deberes.slice(33, 86)) || '', size: fontSize, font: "Arial", })

                                        ],
                                        alignment: AlignmentType.LEFT,
                                    }),
                                ],
                                verticalAlign: VerticalAlign.CENTER,
                                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                            }),
                        ],
                    }),

                    new TableRow({
                        children: [
                            new TableCell({
                                children: [

                                    new Paragraph({
                                        children: [
                                            new TextRun({ text: `Total de Inasistencias: ${boleta.totalInasistencia} % (${boleta.faltas.length === 0 ? 0 : boleta.faltas}) FALTAS`, size: fontSize, bold: true, font: "Arial", })

                                        ],
                                        alignment: AlignmentType.CENTER,
                                    }),

                                    new Paragraph({
                                        children: [

                                            new TextRun({ text: cleanWordText(boleta.deberes.slice(87, 112)) || '', size: fontSize, bold: true, font: "Arial", }),
                                            new TextRun({ text: cleanWordText(boleta.deberes.slice(112)) || '', size: fontSize, font: "Arial", })

                                        ],
                                        alignment: AlignmentType.LEFT,
                                    }),
                                ],
                                verticalAlign: VerticalAlign.CENTER,
                                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                            }),
                        ],
                    }),


                    // qui
                ],
            }),

            new Paragraph({ text: "" }),


            new Table({
                width: { size: 50, type: WidthType.PERCENTAGE },
                alignment: AlignmentType.CENTER,
                rows: [

                    // ===== FILA SUPERIOR (TÍTULO / TEXTO) =====
                    new TableRow({
                        children: [
                            new TableCell({
                                margins: {
                                    top: 50,
                                    bottom: 50,
                                    left: 100,
                                    right: 0,
                                },
                                columnSpan: 3,
                                children: [
                                    new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                            new TextRun({
                                                text: "ESCALA",
                                                bold: true,
                                                size: fontSize,
                                                font: "Arial",
                                            }),
                                        ],
                                    }),

                                ],
                                borders: {
                                    top: { style: BorderStyle.SINGLE },
                                    bottom: { style: BorderStyle.SINGLE },
                                    left: { style: BorderStyle.SINGLE },
                                    right: { style: BorderStyle.SINGLE },
                                },
                            }),
                        ],
                    }),

                    // ===== FILAS DE LA ESCALA =====
                    ...[
                        ["INICIADO", "I", boleta.escalaGeneral === "I" ? "X" : ""],
                        ["REQUIERE AYUDA", "RA", boleta.escalaGeneral === "RA" ? "X" : ""],
                        ["PROCESO LENTO", "PL", boleta.escalaGeneral === "PL" ? "X" : ""],
                        ["EN PROCESO", "EP", boleta.escalaGeneral === "EP" ? "X" : ""],
                        ["CONSOLIDADO", "C", boleta.escalaGeneral === "C" ? "X" : ""],
                        ["MAS QUE CONSOLIDADO", "+C", boleta.escalaGeneral === "+C" ? "X" : ""],
                    ].map(row =>
                        new TableRow({
                            children: row.map((cell, colIndex) =>
                                new TableCell({
                                    margins: {
                                        top: 50,
                                        bottom: 50,
                                        left: colIndex === 0 ? 100 : 0,
                                        right: 0,
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [

                                                new TextRun({
                                                    text: cleanWordText(cell),
                                                    bold: colIndex === 1, // 👈 SOLO segunda columna
                                                    size: fontSize,
                                                    font: "Arial",
                                                }),
                                            ],
                                            alignment: colIndex === 0 ? AlignmentType.LEFT : AlignmentType.CENTER,
                                        }),
                                    ],
                                    borders: {
                                        top: { style: BorderStyle.SINGLE },
                                        bottom: { style: BorderStyle.SINGLE },
                                        left: { style: BorderStyle.SINGLE },
                                        right: { style: BorderStyle.SINGLE },
                                    },
                                    verticalAlign: AlignmentType.CENTER
                                })
                            ),
                        })
                    ),
                ],
            }),


            // ================= FIRMAS =================
            new Paragraph({ text: "\n\n" }),

            new Paragraph({
                text: ''
            }),
            new Paragraph({
                text: ''
            }),

            new Paragraph(

                {
                    spacing: {
                        before: 50, // espacio arriba
                        after: 200,  // espacio abajo
                        line: 276,   // opcional: altura de línea
                    },
                    alignment: AlignmentType.CENTER,

                    children: [

                        new TextRun(
                            { text: 'SELLO', size: 16, bold: true, font: "Arial", })
                    ]
                }),

            // Líneas de firma y sello
            // Primera línea
            new Paragraph({
                tabStops: [
                    { type: TabStopType.LEFT, position: 1000 },   // primera línea
                    { type: TabStopType.RIGHT, position: 9000 },  // segunda línea
                ],
                children: [
                    new TextRun({
                        text: "__________________________\t__________________________",
                        size: 24,
                        font: "Arial",
                    }),
                ],
            }),


            // Nombres de las personas
            // Nombres debajo de cada línea
            new Paragraph({
                indent: { left: 700 },
                tabStops: [
                    { type: TabStopType.LEFT, position: 1000 },   // primera columna
                    { type: TabStopType.RIGHT, position: 8100 },  // segunda columna
                ],
                children: [
                    new TextRun({
                        text: "FRANCIS GUTIÉRREZ\tLIZMARY PÉREZ",
                        size: 16,
                        bold: true,
                        font: "Arial",
                    }),
                ],
            }),
            // Cargos

            new Paragraph({
                indent: { left: 950 },
                tabStops: [
                    { type: TabStopType.LEFT, position: 1000 },   // primera columna
                    { type: TabStopType.RIGHT, position: 8500 },  // segunda columna
                ],
                children: [
                    new TextRun({
                        text: "DIRECTORA\tCOORD. EDUC. PRIMARIA",
                        size: 16,
                        bold: true,
                        font: "Arial",
                    }),
                ],
            }),


            new Paragraph({
                text: ''
            }),

            new Paragraph({
                text: ''
            }),

            new Paragraph({
                text: ''
            }),
            new Paragraph({
                text: ''
            }),

            new Paragraph({
                indent: {
                    left: 2900
                },
                children: [
                    new TextRun({
                        text: "__________________________",
                        size: 24,
                        font: "Arial",
                    }),
                ],
            }),


            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [

                    new TextRun({ text: cleanWordText(docente.nombre), bold: true, size: 16, font: "Arial", })

                ]
            }),

            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [

                    new TextRun({ text: "DOCENTE DE AULA", bold: true, size: 16, font: "Arial", })

                ]
            }),
        ],
    };

    return [section1, section2];
};


const buildHeader = (imgBuffer) => {

    return new Header({

        children: [
            new Paragraph({
                children: [
                    new ImageRun({
                        data: imgBuffer,
                        transformation: { width: 580, height: 30 },
                    }),
                ],
                alignment: AlignmentType.CENTER,
            }),
        ],
    });

}
