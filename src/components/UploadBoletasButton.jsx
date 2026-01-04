import { uploadAllBallotsJson } from './boletin/helpers/compressFileAll';

export default function UploadBoletasButton({ boletas = [1, 2, 3] }) {

    const handleClick = () => {
        document.getElementById('boletas-file-input').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/json') {
            alert('Por favor seleccione un archivo JSON válido');
            e.target.value = '';
            return;
        }

        uploadAllBallotsJson(file);
        e.target.value = '';
    };

    return (
        <>
            <input
                type="file"
                accept=".json"
                id="boletas-file-input"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <button
                type="button"
                className="btn-download-all"
                onClick={boletas.length > 0 ? handleClick : undefined}
            >
                Cargar Boletas Json
            </button>
        </>
    );
}
