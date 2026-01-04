// components/boletin/BoletinForm.jsx
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import '../../styles/boletinForm.css';
import '../../styles/wordRepetition.css';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EscalaTable from './escalaTable';
import useWordRepetition from '../hooks/useWordRepetition';
import WordRepetitionWarning from '../WordRepetitionWarning';
import TextAreaWithHighlight from '../TextAreaWithHighlight';

const DERECHOS_DEFAULT = `Todos los niños, niñas y adolescentes, tienen derecho a participar activamente en las diferentes actividades
planificadas y/o por el docente, así como también la participación del padre o representante (Artículo 55 y 81
de la Ley Orgánica de Protección del Niño y del Adolescente).`

const DEBERES_DEFAULT = `Articulo 93 Literal f de la LOPNA "Cumplir sus obligaciones en materia de educación".

Articulo 109 de la RGLOE "La asistencia a clases es obligatoria. El porcentaje mínimo de asistencia para optar a la aprobación de un grado, área o asignatura o similar según el caso, será de 75%. Queda a salvo lo que se determine en el artículo 60 del reglamento."`;

export default function BoletinForm() {
    const CAMPOS_IGNORADOS = ['deberes', 'derechos'];

    const location = useLocation();
    const [boletin, setBoletin] = useLocalStorage('boletin', {});
    const [boletasGuardadas, setBoletasGuardadas] = useState(
        JSON.parse(localStorage.getItem('boletasGuardadas') || '[]')
    );

    const boletaProp = location.state?.boleta;
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
        derechos: DERECHOS_DEFAULT,
        deberes: DEBERES_DEFAULT,
        faltas: '',
        clasesTotales: '',
        totalInasistencia: '',
        escalaGeneral: ''
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
            ? boletaProp
            : {
                ...boletin,
                deberes: boletin.deberes ?? DEBERES_DEFAULT,
                derechos: boletin.derechos ?? DERECHOS_DEFAULT
            },
        mode: 'onBlur'
    });

    // Obtener todos los datos del formulario
    const formData = watch();

    // Usar el hook para detectar palabras repetidas
    const { repeatedWords } = useWordRepetition(formData);

    // Configurar validación para todos los campos requeridos
    const registerRequired = (name) => ({
        ...register(name, { required: `El campo ${name} es obligatorio` })
    });

    const isEmptyBoletin = (data) => {
        return Object.entries(data)
            .filter(([key]) => !CAMPOS_IGNORADOS.includes(key))
            .every(([, value]) => {
                if (value === null || value === undefined) return true;
                if (typeof value === 'string') return value.trim() === '';
                if (typeof value === 'object') return Object.keys(value).length === 0;
                return false;
            });
    };

    watch((data) => setBoletin(data));

    const onSaveBoleta = (data) => {
        // Validar que todos los campos requeridos estén completos
        const camposRequeridos = Object.keys(emptyBoletin).filter(
            key => !CAMPOS_IGNORADOS.includes(key)
        );

        const camposFaltantes = camposRequeridos.filter(
            key => !data[key] || data[key].toString().trim() === ''
        );

        if (camposFaltantes.length > 0) {
            alert(`Por favor complete los siguientes campos: ${camposFaltantes.join(', ')}`);
            return;
        }

        // Advertencia si hay muchas palabras repetidas
        if (Object.keys(repeatedWords).length > 5) {
            const confirmar = window.confirm(
                `Se han detectado ${Object.keys(repeatedWords).length} palabras que se repiten mucho. ¿Desea revisar antes de guardar?\n\n` +
                'Palabras más repetidas:\n' +
                Object.entries(repeatedWords)
                    .sort((a, b) => b[1].count - a[1].count)
                    .slice(0, 5)
                    .map(([word, data]) => `• "${word}" (${data.count} veces)`)
                    .join('\n')
            );

            if (!confirmar) return;
        }

        const dataToSave = { ...data, edad: data.edad };
        let updatedBoletas;

        if (boletaProp) {
            updatedBoletas = boletasGuardadas.map(b =>
                b.id === boletaProp.id ? { ...b, ...dataToSave } : b
            );
            alert('Boleta editada correctamente');
        } else {
            const maxId = boletasGuardadas.length > 0
                ? Math.max(...boletasGuardadas.map(b => b.id))
                : 0;
            const nextId = maxId + 1;
            const nuevaBoleta = { ...dataToSave, id: nextId };
            updatedBoletas = [...boletasGuardadas, nuevaBoleta];
            alert('Boleta guardada correctamente');
        }

        localStorage.setItem('boletasGuardadas', JSON.stringify(updatedBoletas));
        setBoletasGuardadas(updatedBoletas);

        const boletaPrincipal = boletaProp
            ? { ...boletaProp, ...dataToSave }
            : { ...dataToSave, id: Date.now() };
        localStorage.setItem('boletin', JSON.stringify(boletaPrincipal));

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
        if (!boletin.derechos) setValue('derechos', DERECHOS_DEFAULT);

        if (boletaProp) {
            reset(boletaProp);
            localStorage.setItem('boletin', JSON.stringify(boletaProp));
        }

        if (isEmptyBoletin(watchedData)) {
            localStorage.removeItem('boletin');
        } else {
            localStorage.setItem('boletin', JSON.stringify(watchedData));
        }
    }, []);

    const faltas = parseFloat(watch("faltas")) || 0;
    const clasesTotales = parseFloat(watch("clasesTotales")) || 1;

    useEffect(() => {
        const porcentaje = ((faltas / clasesTotales) * 100).toFixed(2);
        setValue("totalInasistencia", porcentaje);
    }, [faltas, clasesTotales, setValue]);

    // Lista de campos de texto que queremos analizar
    const textFields = [
        'serConvivir', 'conocerHacer', 'lenguaje', 'matematica',
        'cienciasNaturales', 'cienciasSociales', 'identidad',
        'educacionFisica', 'ajedrez', 'ingles', 'recomendaciones'
    ];

    return (
        <form lang="es" className="grid-boletin" onSubmit={handleSubmit(onSaveBoleta)}>
            {/* Mostrar advertencia de palabras repetidas */}
            <WordRepetitionWarning repeatedWords={repeatedWords} />

            {/* Representante */}
            <div className="label-with-action">
                <label>Nombres y Apellidos del Representante *</label>
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
                {...registerRequired('representante')}
                placeholder="Ej: María González"
                onChange={(e) => setValue('representante', e.target.value.toUpperCase())}
            />
            {errors.representante && (
                <span className="error">{errors.representante.message}</span>
            )}

            {/* Estudiante */}
            <label>Nombres y Apellidos del Estudiante *</label>
            <input
                className="full-width"
                {...registerRequired('estudiante')}
                placeholder="Ej: Carlos Pérez"
                onChange={(e) => setValue('estudiante', e.target.value.toUpperCase())}
            />
            {errors.estudiante && (
                <span className="error">{errors.estudiante.message}</span>
            )}

            {/* Cédula + Edad */}
            <label>Cédula Escolar (V-) *</label>
            <input
                {...register('cedulaEscolar', {
                    required: 'La cédula es obligatoria',
                    pattern: {
                        value: /^(V|E)-\d{6,13}$/,
                        message: 'Formato inválido. Ej: V-12345678'
                    }
                })}
                placeholder="E|V-12345678"
                onChange={(e) => setValue('cedulaEscolar', e.target.value.toUpperCase())}
            />

            <input
                {...register('edad', {
                    required: 'Edad obligatoria',
                })}
                type="text"
                placeholder="Edad"
                onChange={(e) => setValue('edad', e.target.value.toUpperCase())}
            />

            {errors.cedulaEscolar && (
                <span className="error">{errors.cedulaEscolar.message}</span>
            )}
            {errors.edad && (
                <span className="error">{errors.edad.message}</span>
            )}

            {/* Aspectos a Evaluar */}
            <div className="section-title">Aspectos a Evaluar *</div>
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
                            <td>Ser – Convivir *</td>
                            <td>
                                <TextAreaWithHighlight
                                    register={register}
                                    name="serConvivir"
                                    repeatedWords={repeatedWords}
                                    spellCheck="true"
                                    lang="es"
                                />
                                {errors.serConvivir && (
                                    <span className="error">{errors.serConvivir.message}</span>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Conocer – Hacer *</td>
                            <td>
                                <TextAreaWithHighlight
                                    register={register}
                                    name="conocerHacer"
                                    repeatedWords={repeatedWords}
                                    spellCheck="true"
                                    lang="es"
                                />
                                {errors.conocerHacer && (
                                    <span className="error">{errors.conocerHacer.message}</span>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Áreas de Formación */}
                <div className="section-title">Áreas de Formación *</div>
                <table className="aspectos-table">
                    <thead>
                        <tr>
                            <th>Área</th>
                            <th>Juicio Valorativo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {['lenguaje', 'matematica', 'cienciasNaturales', 'cienciasSociales', 'identidad'].map((campo) => (
                            <tr key={campo}>
                                <td>{campo === 'lenguaje' ? 'Lenguaje, Comunicación y Literatura' :
                                    campo === 'matematica' ? 'Matemática' :
                                        campo === 'cienciasNaturales' ? 'Ciencias Naturales' :
                                            campo === 'cienciasSociales' ? 'Ciencias Sociales' :
                                                'Identidad y Orientación Vocacional'} *
                                </td>
                                <td>
                                    <TextAreaWithHighlight
                                        register={register}
                                        name={campo}
                                        repeatedWords={repeatedWords}
                                        spellCheck="true"
                                        lang="es"
                                    />
                                    {errors[campo] && (
                                        <span className="error">{errors[campo].message}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="section-title">Educación Física, Deporte y Recreación *</div>
                <table className="aspectos-table">
                    <thead>
                        <tr>
                            <th>Actividad</th>
                            <th>Juicio Valorativo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {['educacionFisica', 'ajedrez', 'ingles'].map((campo) => (
                            <tr key={campo}>
                                <td>{campo === 'educacionFisica' ? 'Educación Física' :
                                    campo === 'ajedrez' ? 'Ajedrez' :
                                        'Inglés (Instituto CLEVELAND)'} *
                                </td>
                                <td>
                                    <TextAreaWithHighlight
                                        register={register}
                                        name={campo}
                                        repeatedWords={repeatedWords}
                                        spellCheck="true"
                                        lang="es"
                                    />
                                    {errors[campo] && (
                                        <span className="error">{errors[campo].message}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>Matific – Estrellas Alcanzadas *</td>
                            <td>
                                <input
                                    {...registerRequired('matific')}
                                    placeholder="Ej: 299 ⭐"
                                />
                                {errors.matific && (
                                    <span className="error">{errors.matific.message}</span>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="section-title">Observaciones *</div>
                <label>Recomendaciones para el Representante *</label>
                <TextAreaWithHighlight
                    register={register}
                    name="recomendaciones"
                    repeatedWords={repeatedWords}
                    spellCheck="true"
                    lang="es"
                />
                {errors.recomendaciones && (
                    <span className="error">{errors.recomendaciones.message}</span>
                )}
                <br />

                <label>Derechos de los Niños(as) y Adolescentes *</label>
                <textarea {...registerRequired('derechos')} />
                {errors.derechos && (
                    <span className="error">{errors.derechos.message}</span>
                )}
                <br />
                <label>Deberes de los Niños(as) y Adolescentes</label>
                <textarea {...register('deberes')} />
                <br />

                <div className="input-group">
                    <label htmlFor="faltas">Faltas (Inasistencias): *</label>
                    <input
                        type="number"
                        id="faltas"
                        {...register("faltas", {
                            required: 'Este campo es obligatorio',
                            min: { value: 0, message: 'Mínimo 0' }
                        })}
                        placeholder="0"
                        className="input-field"
                        min={0}
                    />
                    {errors.faltas && (
                        <span className="error">{errors.faltas.message}</span>
                    )}
                </div>

                <div className="input-group">
                    <label htmlFor="clasesTotales">Clases totales: *</label>
                    <input
                        type="number"
                        id="clasesTotales"
                        {...register("clasesTotales", {
                            required: 'Este campo es obligatorio',
                            min: { value: 1, message: 'Mínimo 1' }
                        })}
                        placeholder="0"
                        className="input-field"
                        step="any"
                        min={1}
                    />
                    {errors.clasesTotales && (
                        <span className="error">{errors.clasesTotales.message}</span>
                    )}
                </div>

                <div className="input-group">
                    <label>Total de Inasistencias (%):</label>
                    <input
                        type="text"
                        {...register("totalInasistencia")}
                        value={watch("totalInasistencia")}
                        readOnly
                        className="input-field"
                    />
                </div>

                <div className='section-title'>Escala</div>
                <EscalaTable register={register} error={errors.escalaGeneral} />
                <br />
                {errors.escalaGeneral && (
                    <span className="error">{errors.escalaGeneral.message}</span>
                )}
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