// hooks/useWordRepetition.js
import { useState, useEffect, useCallback, useRef } from 'react';

const useWordRepetition = (formData) => {
    const [repeatedWords, setRepeatedWords] = useState({});
    const prevFormDataRef = useRef({});

    const analyzeText = useCallback((text) => {
        if (!text || typeof text !== 'string') return [];

        // Limpiar texto: eliminar puntuación, números y convertir a minúsculas
        const cleanText = text.toLowerCase()
            .replace(/[^\wáéíóúñü\s]/g, ' ') // Mantener letras y espacios
            .replace(/\s+/g, ' ') // Unificar espacios
            .trim();

        // Dividir en palabras (ignorar palabras muy cortas)
        const words = cleanText.split(' ')
            .filter(word => word.length > 3) // Solo palabras de más de 3 letras
            .filter(word => !/^\d+$/.test(word)); // Filtrar números

        return words;
    }, []);

    useEffect(() => {
        if (!formData) return;

        // Verificar si realmente hubo cambios significativos
        const formDataString = JSON.stringify(formData);
        const prevFormDataString = JSON.stringify(prevFormDataRef.current);

        if (formDataString === prevFormDataString) {
            return; // No hubo cambios, evitar recálculo
        }

        // Actualizar referencia
        prevFormDataRef.current = formData;

        // Resetear contadores
        const occurrences = {};
        const repeated = {};

        // Analizar solo campos de texto que son relevantes
        const relevantFields = [
            'serConvivir', 'conocerHacer', 'lenguaje', 'matematica',
            'cienciasNaturales', 'cienciasSociales', 'identidad',
            'educacionFisica', 'ajedrez', 'ingles', 'recomendaciones'
        ];

        // Analizar campos del formulario
        relevantFields.forEach(fieldName => {
            const fieldValue = formData[fieldName];
            if (typeof fieldValue === 'string' && fieldValue.trim()) {
                const words = analyzeText(fieldValue);

                words.forEach(word => {
                    occurrences[word] = occurrences[word] || { count: 0, fields: [] };
                    occurrences[word].count += 1;

                    if (!occurrences[word].fields.includes(fieldName)) {
                        occurrences[word].fields.push(fieldName);
                    }
                });
            }
        });

        // Encontrar palabras repetidas más de 2 veces
        Object.entries(occurrences).forEach(([word, data]) => {
            if (data.count > 2) {
                repeated[word] = {
                    count: data.count,
                    fields: data.fields
                };
            }
        });

        setRepeatedWords(repeated);
        // No necesitamos setWordOccurrences si no se usa en otros lugares
    }, [formData, analyzeText]);

    return { repeatedWords };
};

export default useWordRepetition;