const ESCALA = [
    { label: 'Iniciado', value: 'I' },
    { label: 'Requiere Ayuda', value: 'RA' },
    { label: 'Proceso Lento', value: 'PL' },
    { label: 'En Proceso', value: 'EP' },
    { label: 'Consolidado', value: 'C' },
    { label: 'Más que Consolidado', value: '+C' },
];

export default function EscalaTable({ register }) {
    return (
        <div className="escala-row">
            {ESCALA.map((e) => (
                <div key={e.value} className="escala-item">
                    <label>{e.label}</label>
                    <input
                        type="radio"
                        value={e.value}
                        {...register('escalaGeneral')}
                    />
                </div>
            ))}
        </div>
    );
}
