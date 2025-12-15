import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import DocenteForm from './components/docente/docenteFom';
import BoletinForm from './components/boletin/boletinForm';
import BoletasList from './components/boletin/boletasList';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function App() {
  const [docente] = useLocalStorage('docente', null);
  const [docenteListo, setDocenteListo] = useState(!!docente);
  const [tieneBoletinPendiente, setTieneBoletinPendiente] = useState(false);

  const [tieneBoletas, setTieneBoletas] = useState(false);

  useEffect(() => {
    const boletas = JSON.parse(localStorage.getItem('boletasGuardadas') || '[]');
    const boletinPendiente = JSON.parse(localStorage.getItem('boletin') || 'null');


    setTieneBoletas(boletas.length > 0);
    setTieneBoletinPendiente(!!boletinPendiente);

  }, []);
  if (!docenteListo) {
    return <DocenteForm onReady={() => setDocenteListo(true)} />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          tieneBoletinPendiente
            ? <Navigate to="/boleta" replace />
            : tieneBoletas
              ? <BoletasList />
              : <BoletinForm />
        }
      />
      <Route path="/boletas-list" element={<BoletasList />} />
      <Route path="/boleta" element={<BoletinForm />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
