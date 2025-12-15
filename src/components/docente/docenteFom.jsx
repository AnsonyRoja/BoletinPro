// components/docente/DocenteForm.jsx
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import '../../styles/docenteForm.css';

export default function DocenteForm({ onReady }) {
    const [docente, setDocente] = useLocalStorage('docente', null);
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (docente) {
            onReady();
        }
    }, [docente, onReady]);

    const onSubmit = (data) => {
        setDocente(data);
    };

    if (docente) return null;

    return (
        <form className="docente-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Datos del Docente</h2>

            <label>Nombre del docente</label>
            <input {...register('nombre')} placeholder="Ej: Yris Ramírez"
                onChange={(e) => setValue('nombre', e.target.value.toUpperCase())}
            />

            <label>Grado</label>
            <input {...register('grado')} placeholder="Ej: 6°"
                onChange={(e) => setValue('grado', e.target.value.toUpperCase())}

            />

            <label>Sección</label>
            <input {...register('seccion')} placeholder="Ej: U"
                onChange={(e) => setValue('seccion', e.target.value.toUpperCase())}

            />

            <label>Año Escolar</label>
            <input {...register('anoEscolar')} placeholder="Ej: 2025 - 2026"
                onChange={(e) => setValue('anoEscolar', e.target.value.toUpperCase())}

            />

            <button type="submit">Guardar Docente</button>
        </form>
    );
}
