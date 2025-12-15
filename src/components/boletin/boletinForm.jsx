// components/boletin/BoletinForm.jsx
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import '../../styles/boletinForm.css';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


import EscalaTable from './escalaTable';

const DEBERES_DEFAULT = `Articulo 93 Literal f de la LOPNA "Cumplir sus obligaciones en materia de educación".

Articulo 109 de la RGLOE "La asistencia a clases es obligatoria. El porcentaje mínimo de asistencia para optar a la aprobación de un grado, área o asignatura o similar según el caso, será de 75%. Queda a salvo lo que se determine en el artículo 60 del reglamento."`;

export default function BoletinForm() {
    const CAMPOS_IGNORADOS = ['deberes', 'escala'];

    const location = useLocation();
    const [boletin, setBoletin] = useLocalStorage('boletin', {});

    const [boletasGuardadas, setBoletasGuardadas] = useState(
        JSON.parse(localStorage.getItem('boletasGuardadas') || '[]')
    );

    const boletaProp = location.state?.boleta; // aquí obtienes la boleta
    const navigate = useNavigate();
    const emptyBoletin = {
        representante: '',
        estudiante: '',
        cedulaEscolar: '',
        edad: '',
        serConvivir: '',
        conocerHacer: '',
        lenguaje: '',
        matematica: '',
        cienciasNaturales: '',
        cienciasSociales: '',
        identidad: '',
        educacionFisica: '',
        ajedrez: '',
        ingles: '',
        matific: '',
        recomendaciones: '',
        derechos: '',
        deberes: DEBERES_DEFAULT // este sí se mantiene
    };

    const {
        register,
        watch,
        setValue,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: boletaProp
            ? boletaProp : {
                ...boletin,
                deberes: boletin.deberes ?? DEBERES_DEFAULT
            }
    });

    const isEmptyBoletin = (data) => {
        return Object.entries(data)
            .filter(([key]) => !CAMPOS_IGNORADOS.includes(key))
            .every(([, value]) => {
                if (value === null || value === undefined) return true;

                if (typeof value === 'string') {
                    return value.trim() === '';
                }


                if (typeof value === 'object') {
                    return Object.keys(value).length === 0;
                }

                return false;
            });
    };


    watch((data) => setBoletin(data));

    const onSaveBoleta = (data) => {
        // Convertir edad a número
        const dataToSave = { ...data, edad: data.edad };

        let updatedBoletas;

        if (boletaProp) {
            // Editar boleta existente
            updatedBoletas = boletasGuardadas.map(b =>
                b.id === boletaProp.id ? { ...b, ...dataToSave } : b
            );
            alert('Boleta editada correctamente');
        } else {
            // Crear nueva boleta
            const maxId = boletasGuardadas.length > 0
                ? Math.max(...boletasGuardadas.map(b => b.id))
                : 0;
            const nextId = maxId + 1;
            const nuevaBoleta = { ...dataToSave, id: nextId };
            updatedBoletas = [...boletasGuardadas, nuevaBoleta];
            alert('Boleta guardada correctamente');
        }

        // Actualizar localStorage y estado
        localStorage.setItem('boletasGuardadas', JSON.stringify(updatedBoletas));
        setBoletasGuardadas(updatedBoletas);

        // Actualizar boleta principal
        const boletaPrincipal = boletaProp ? { ...boletaProp, ...dataToSave } : { ...dataToSave, id: Date.now() };
        localStorage.setItem('boletin', JSON.stringify(boletaPrincipal));

        // Limpiar formulario y redirigir
        reset();
        navigate('/boletas-list');
    };



    const onClearForm = () => {

        reset(emptyBoletin);

        alert('Formulario limpiado correctamente');
    };


    const watchedData = watch();

    useEffect(() => {
        if (!watchedData) return;

        if (!boletin.deberes) setValue('deberes', DEBERES_DEFAULT);

        if (boletaProp) {
            reset(boletaProp);
            localStorage.setItem('boletin', JSON.stringify(boletaProp));
        } else {

        }

        if (isEmptyBoletin(watchedData)) {

            localStorage.removeItem('boletin');
        } else {

            localStorage.setItem('boletin', JSON.stringify(watchedData));
        }
    }, []);



    return (
        <form className="grid-boletin" onSubmit={handleSubmit(onSaveBoleta)}>
            {/* Representante */}
            <div className="label-with-action">
                <label>Nombres y Apellidos del Representante</label>

                <button
                    type="button"
                    className="btn-home"
                    title="Ir a boletas guardadas"
                    onClick={() => navigate('/boletas-list', { replace: true })}
                >
                    🏠
                </button>
            </div>
            <input
                className="full-width"
                {...register('representante', { required: true })}
                placeholder="Ej: María González"
                onChange={(e) => setValue('representante', e.target.value.toUpperCase())}
            />

            {/* Estudiante */}
            <label>Nombres y Apellidos del Estudiante</label>
            <input
                className="full-width"
                {...register('estudiante', { required: true })}
                placeholder="Ej: Carlos Pérez"
                onChange={(e) => setValue('estudiante', e.target.value.toUpperCase())}
            />

            {/* Cédula + Edad */}
            <label>Cédula Escolar (V-)</label>
            <input
                {...register('cedulaEscolar', {
                    required: 'La cédula es obligatoria',
                    pattern: {
                        value: /^V-\d{6,13}$/,
                        message: 'Formato inválido. Ej: V-12345678'
                    }
                })}
                placeholder="V-12345678"
                onChange={(e) => setValue('cedulaEscolar', e.target.value.toUpperCase())}
            />

            <input
                {...register('edad', { required: 'Edad obligatoria' })}
                type="text"       // <- aquí
                placeholder="Edad"
                onChange={(e) => setValue('edad', e.target.value.toUpperCase())}
            />
            {/* Mensajes de error */}
            {errors.cedulaEscolar && (
                <span className="error">{errors.cedulaEscolar.message}</span>
            )}
            {errors.edad && (
                <span className="error">{errors.edad.message}</span>
            )}

            {/* Aspectos a Evaluar */}
            <div className="section-title">Aspectos a Evaluar</div>
            <div className="table-full-width">

                <table className="aspectos-table">
                    <thead>
                        <tr>
                            <th>Aspectos a Evaluar</th>
                            <th>Juicio Valorativo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ser – Convivir</td>
                            <td>
                                <textarea {...register('serConvivir')} />
                            </td>
                        </tr>
                        <tr>
                            <td>Conocer – Hacer</td>
                            <td>
                                <textarea {...register('conocerHacer')} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Áreas de Formación */}
                <div className="section-title">Áreas de Formación</div>
                <table className="aspectos-table">
                    <thead>
                        <tr>
                            <th>Área</th>
                            <th>Juicio Valorativo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Lenguaje, Comunicación y Literatura</td>
                            <td>
                                <textarea {...register('lenguaje')} />
                            </td>
                        </tr>
                        <tr>
                            <td>Matemática</td>
                            <td>
                                <textarea {...register('matematica')} />
                            </td>
                        </tr>
                        <tr>
                            <td>Ciencias Naturales</td>
                            <td>
                                <textarea {...register('cienciasNaturales')} />
                            </td>
                        </tr>
                        <tr>
                            <td>Ciencias Sociales</td>
                            <td>
                                <textarea {...register('cienciasSociales')} />
                            </td>
                        </tr>
                        <tr>
                            <td>Identidad y Orientación Vocacional</td>
                            <td>
                                <textarea {...register('identidad')} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="section-title">Educación Física, Deporte y Recreación</div>
                <table className="aspectos-table">
                    <thead>
                        <tr>
                            <th>Actividad</th>
                            <th>Juicio Valorativo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Educación Física</td>
                            <td>
                                <textarea {...register('educacionFisica')} />
                            </td>
                        </tr>
                        <tr>
                            <td>Ajedrez</td>
                            <td>
                                <textarea {...register('ajedrez')} />
                            </td>
                        </tr>
                        <tr>
                            <td>Inglés (Instituto CLEVELAND)</td>
                            <td>
                                <textarea {...register('ingles')} />
                            </td>
                        </tr>
                        <tr>
                            <td>Matific – Estrellas Alcanzadas</td>
                            <td>
                                <input {...register('matific')} placeholder="Ej: 299 ⭐" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="section-title">Observaciones</div>
                <label>Recomendaciones para el Representante</label>
                <textarea {...register('recomendaciones')} />

                <label>Derechos de los Niños(as) y Adolescentes</label>
                <textarea {...register('derechos')} />

                <label>Deberes de los Niños(as) y Adolescentes</label>
                <textarea {...register('deberes')} />

                <div className="section-title">Escala</div>
                <EscalaTable register={register} />
            </div>
            <button type="submit" className="btn-guardar">
                Guardar Boleta
            </button>

            <button
                type="button"
                className="btn-limpiar"
                onClick={onClearForm}
            >
                Limpiar Campos
            </button>



        </form>
    );
}
