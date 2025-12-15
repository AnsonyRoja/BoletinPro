// components/boletin/Firmas.jsx
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function Firmas() {
    const [docente] = useLocalStorage('docente', {});

    return (
        <div className="firmas">
            <div>
                Francis Gutiérrez<br />
                <small>DIRECTORA</small>
            </div>

            <div>
                {docente?.nombre}<br />
                <small>DOCENTE DE AULA</small>
            </div>

            <div>
                Lizmary Pérez<br />
                <small>COORD. EDUC. PRIMARIA</small>
            </div>
        </div>
    );
}
