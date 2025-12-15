// src/utils/constants.js

export const INITIAL_DOCENTE_DATA = {
    nombreDocente: '',
    seccion: '',
    grado: '',
    anioEscolar: '2025-2026',
};

export const INITIAL_BOLETA_DATA = {
    nombreRepresentante: '',
    nombreEstudiante: '',
    cedulaEstudiante: '',
    gradoEstudiante: '6°', // Por defecto según la imagen
    seccionEstudiante: 'U', // Por defecto según la imagen

    // JUICIOS VALORATIVOS (Campos 1 y 2)
    serConvivir: 'Es un estudiante analítico y reflexivo. Sigue instrucciones, culmina los trabajos a tiempo, es responsable y asiste puntualmente a clases.',
    conocerHacer: 'Conoce, comprende, interpreta y generaliza conceptos, se relaciona con sus compañeros y trabaja en grupo, utiliza de manera adecuada los materiales como cuadernos y libros.',

    // ÁREAS DE FORMACIÓN (Campos 3 a 7)
    lenguajeComunicacion: '',
    matematica: '',
    cienciasNaturales: '',
    cienciasSociales: '',
    identidadOrientacion: '',

    // PARTE TRASERA (Campos 8 a 10)
    educacionFisica: '', // Campo 8
    ajedrez: '', // Campo 9
    ingles: '',
    matificEstrellas: '0 ⭐', // Campo 10

    // RECOMENDACIONES (Campos 11 a 13)
    recRepresentante: '', // Campo 11
    derNinos: '', // Campo 12
    debNinos: '', // Campo 13

    // INASISTENCIAS
    totalInasistencia: '0 % (0) FALTAS',
};

export const ESCALA_VALORATIVA = [
    { label: 'INICIADO', key: 'iniciado' },
    { label: 'REQUIERE AYUDA', key: 'requiereAyuda' },
    { label: 'PROCESO LENTO', key: 'procesoLento' },
    { label: 'EN PROCESO', key: 'enProceso' },
    { label: 'CONSOLIDADO', key: 'consolidado' },
    { label: 'MÁS QUE CONSOLIDADO', key: 'masQueConsolidado' },
];

export const FIRMAS = {
    izquierda: { nombre: 'Francis Gutiérrez', cargo: 'Directora' },
    centro: { nombreKey: 'nombreDocente', cargo: 'Docente de Aula' }, // Usamos key para traer del local storage
    derecha: { nombre: 'Lizmary Pérez', cargo: 'Coord. Educ. Primaria' },
};

