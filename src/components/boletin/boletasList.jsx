// src/components/boletin/BoletasList.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import membrete from "../../assets/membrete.png";
import { downloadBoletaZip } from './helpers/compressFile';
import '../../styles/boletasList.css'
import { previewBoletaPDF } from './helpers/previewPdf';
import generateHtmlContent from './helpers/generateHtml';

export default function BoletasList() {
    const [boletas, setBoletas] = useState([]);

    const [boletin, setBoletin] = useState([]);
    const [fontSize, setFontSize] = useState(12); // valor por defecto 10pt
    const [fontSizeTitle, setFontSizeTitle] = useState(13);
    const [docente, setDocente] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const boletin = JSON.parse(localStorage.getItem('boletin' || {}))
        const guardadas = JSON.parse(localStorage.getItem('boletasGuardadas') || '[]');
        const docente = JSON.parse(localStorage.getItem('docente') || '{}');

        setBoletas(guardadas);
        setBoletin(boletin);
        setDocente(docente);

    }, []);

    const handleExplore = (boleta) => {
        handlePrint(boleta, true)
    };

    const handleEdit = (boleta) => {
        // Redirige a BoletinForm pasando la boleta por state
        navigate('/boleta', { state: { boleta }, replace: true });
    };

    const handleDelete = (id) => {
        const filtradas = boletas.filter(b => b.id !== id);

        if (filtradas.length === 0) {
            localStorage.removeItem('boletasGuardadas');
            localStorage.removeItem('boletin');
            navigate('/boleta', { replace: true });
        } else {

            localStorage.setItem('boletasGuardadas', JSON.stringify(filtradas));
            localStorage.setItem('boletin', JSON.stringify(filtradas[0]));
        }

        setBoletas(filtradas);
    };



    const handlePrint = (boleta, isExplore = false) => {
        const ventana = window.open('', '_blank');


        const html = generateHtmlContent(boleta, fontSize, fontSizeTitle, isExplore, docente, membrete);
        ventana.document.open();
        ventana.document.writeln(html);

        ventana.document.close();

    };


    const handleNewBoleta = () => {

        const existeEnGuardadas = boletas.some(b => b.id === boletin.id);
        if (!existeEnGuardadas) {
            navigate('/boleta',);
        } else {
            navigate('/boleta',);

            // opcional: limpiar localStorage
            localStorage.removeItem('boletin');
        }
    };

    return (
        <div className="boletas-list-page">
            <h2>Boletas Guardadas</h2>
            <div className="boletas-controls">
                <button type="button" onClick={handleNewBoleta} className="btn-new-boleta">
                    Agregar Nueva Boleta
                </button>

                <div className="font-size-selector">
                    <label htmlFor="fontSize">Tamaño de Fuente</label>
                    <input
                        id="fontSize"
                        type="number"
                        min={6}
                        max={20}
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                    />
                </div>
                <div className="font-size-selector">
                    <label htmlFor="fontSize">Titulos/Sub</label>
                    <input
                        id="fontSize-title"
                        type="number"
                        min={6}
                        max={20}
                        value={fontSizeTitle}
                        onChange={(e) => setFontSizeTitle(Number(e.target.value))}
                    />
                </div>
            </div>

            {boletas.length === 0 ? (
                <p>No hay boletas guardadas.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Numero</th>
                            <th>Estudiante</th>
                            <th>Representante</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boletas.map((b) => (
                            <tr key={b.id}>
                                <td>{b.id}</td>
                                <td>{b.estudiante}</td>
                                <td>{b.representante}</td>
                                <td className="actions-cell">
                                    <button type="button" onClick={() => handleExplore(b)}>Explorar</button>
                                    <button type="button" onClick={() => handleEdit(b)}>Editar</button>
                                    <button type="button" onClick={() => handleDelete(b.id)}>Eliminar</button>
                                    <button type="button" onClick={() => handlePrint(b, false)}>Imprimir</button>
                                    <button type="button" onClick={() => previewBoletaPDF(b, docente, membrete, fontSizeTitle, fontSize)}>
                                        Descargar ZIP
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
