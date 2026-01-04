

const WordRepetitionWarning = ({ repeatedWords }) => {
    if (!repeatedWords || Object.keys(repeatedWords).length === 0) {
        return null;
    }

    return (
        <div className="word-repetition-warning">
            <div className="warning-header">
                ⚠️ <strong>Palabras repetidas detectadas</strong>
            </div>
            <div className="warning-content">
                <p>Las siguientes palabras aparecen más de 2 veces en el formulario:</p>
                <ul className="word-list">
                    {Object.entries(repeatedWords).map(([word, data]) => (
                        <li key={word} className="word-item">
                            <span className="word-text">
                                "<strong>{word}</strong>"
                            </span>
                            <span className="word-count">
                                aparece {data.count} veces
                            </span>
                            <div className="word-fields">
                                En campos: {data.fields.join(', ')}
                            </div>
                        </li>
                    ))}
                </ul>
                <p className="suggestion">
                    <small>Sugerencia: Intenta usar sinónimos o reformular para mayor variedad.</small>
                </p>
            </div>
        </div>
    );
};

export default WordRepetitionWarning;