import { useEffect, useState } from 'react';
import TransporteForm from './TransporteForm';
import TransporteList from './TransporteList';
import { obtenerTransportes } from '../../../services/logistica/transporte.service';

const TransportePage = () => {
    const [transportes, setTransportes] = useState([]);
    const [cargando, setCargando] = useState(true);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const data = await obtenerTransportes();
            setTransportes(data);
        } catch (error) {
            console.error("Error al cargar la lista de transportes:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">

            <TransporteForm onGuardado={cargarDatos} historialTransportes={transportes} />

            {cargando ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <TransporteList data={transportes} />
            )}
        </div>
    );
};

export default TransportePage;