// components/TextAreaWithHighlight.jsx
import { useEffect, useState, useRef } from 'react';

const TextAreaWithHighlight = ({
    register,
    name,
    repeatedWords = {},
    className = '',
    placeholder = '',
    ...props
}) => {
    const [highlightedText, setHighlightedText] = useState('');
    const textareaRef = useRef(null);

    const highlightRepeatedWords = (text) => {
        if (!text || Object.keys(repeatedWords).length === 0) {
            return text;
        }

        let highlighted = text;
        const repeatedWordsList = Object.keys(repeatedWords);

        repeatedWordsList.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            highlighted = highlighted.replace(regex,
                match => `<span class="highlighted-word" title="Esta palabra aparece ${repeatedWords[word].count} veces">${match}</span>`
            );
        });

        return highlighted;
    };

    const { ref, onChange, ...rest } = register(name);

    return (
        <div className="textarea-with-highlight">
            <textarea
                {...rest}
                ref={(element) => {
                    ref(element);
                    textareaRef.current = element;
                }}
                onChange={(e) => {
                    onChange(e);
                    const text = e.target.value;
                    setHighlightedText(highlightRepeatedWords(text));
                }}
                className={`${className} ${Object.keys(repeatedWords).length > 0 ? 'has-repeated-words' : ''}`}
                placeholder={placeholder}
                {...props}
            />

            {/* Vista previa con palabras resaltadas */}
            {highlightedText && highlightedText.includes('highlighted-word') && (
                <div className="highlight-preview">
                    <div className="preview-label">
                        <small>Palabras repetidas destacadas:</small>
                    </div>
                    <div
                        className="preview-content"
                        dangerouslySetInnerHTML={{ __html: highlightedText }}
                    />
                </div>
            )}
        </div>
    );
};

export default TextAreaWithHighlight;