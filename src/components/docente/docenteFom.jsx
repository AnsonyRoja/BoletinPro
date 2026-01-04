// components/docente/DocenteForm.jsx
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import '../../styles/docenteForm.css';
import UploadBoletasButton from '../UploadBoletasButton';

export default function DocenteForm({ onReady }) {
    const [docente, setDocente] = useLocalStorage('docente', null);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid }
    } = useForm({
        mode: 'onChange' // Validar en cada cambio
    });

    useEffect(() => {
        if (docente) {
            onReady();
        }
    }, [docente, onReady]);

    const onSubmit = (data) => {
        setDocente(data);
    };

    // Si ya existe docente, no mostrar el formulario
    if (docente) return null;

    return (
        <form className="docente-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Datos del Docente *</h2>
            <p className="required-note">Todos los campos son obligatorios</p>

            {/* Nombre del docente */}
            <label>Nombre del docente *</label>
            <input
                {...register('nombre', {
                    required: 'El nombre del docente es obligatorio',
                    minLength: {
                        value: 3,
                        message: 'Mínimo 3 caracteres'
                    }
                })}
                placeholder="Ej: Yris Ramírez"
                onChange={(e) => setValue('nombre', e.target.value.toUpperCase(), { shouldValidate: true })}
                className={errors.nombre ? 'error-input' : ''}
            />
            {errors.nombre && (
                <span className="error-message">{errors.nombre.message}</span>
            )}

            {/* Grado */}
            <label>Grado *</label>
            <input
                {...register('grado', {
                    required: 'El grado es obligatorio',

                })}
                placeholder="Ej: 6°"
                onChange={(e) => setValue('grado', e.target.value.toUpperCase(), { shouldValidate: true })}
                className={errors.grado ? 'error-input' : ''}
            />
            {errors.grado && (
                <span className="error-message">{errors.grado.message}</span>
            )}

            {/* Sección */}
            <label>Sección *</label>
            <input
                {...register('seccion', {
                    required: 'La sección es obligatoria',
                    pattern: {
                        value: /^[A-Za-z]$/,
                        message: 'Debe ser una sola letra (A-Z)'
                    }
                })}
                placeholder="Ej: U"
                onChange={(e) => setValue('seccion', e.target.value.toUpperCase(), { shouldValidate: true })}
                maxLength="1"
                className={errors.seccion ? 'error-input' : ''}
            />
            {errors.seccion && (
                <span className="error-message">{errors.seccion.message}</span>
            )}

            {/* Año Escolar */}
            <label>Año Escolar *</label>
            <input
                {...register('anoEscolar', {
                    required: 'El año escolar es obligatorio',
                    pattern: {
                        value: /^\d{4}\s*[-–]\s*\d{4}$/,
                        message: 'Formato: 2024 - 2025'
                    }
                })}
                placeholder="Ej: 2025 - 2026"
                onChange={(e) => setValue('anoEscolar', e.target.value.toUpperCase(), { shouldValidate: true })}
                className={errors.anoEscolar ? 'error-input' : ''}
            />
            {errors.anoEscolar && (
                <span className="error-message">{errors.anoEscolar.message}</span>
            )}
            <br></br> <br></br>
            <button
                type="submit"
                className={!isValid ? 'btn-disabled' : ''}
                disabled={!isValid}
            >
                Guardar Docente
            </button>

            <UploadBoletasButton />
        </form>
    );
}