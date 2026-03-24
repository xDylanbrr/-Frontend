import { useState } from 'react';
import { crearTransporte } from '../../../services/logistica/transporte.service';

const TransporteForm = ({ onGuardado }) => {
    const [formData, setFormData] = useState({
        empresa: '',
        chofer: '',
        placa: '',
        fecha_salida: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await crearTransporte(formData);
            alert("✅ Transporte registrado con éxito");
            setFormData({ empresa: '', chofer: '', placa: '', fecha_salida: '' }); 
            onGuardado(); 
        } catch (error) {
            alert("❌ Error al guardar: " + error.message);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Registrar Nuevo Transporte</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                    <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} required
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" 
                        placeholder="Ej. Transportes Cibao" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chofer</label>
                    <input type="text" name="chofer" value={formData.chofer} onChange={handleChange} required
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" 
                        placeholder="Ej. Juan Pérez" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Placa del Vehículo</label>
                    <input type="text" name="placa" value={formData.placa} onChange={handleChange} required
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" 
                        placeholder="Ej. L-123456" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Salida</label>
                    <input type="datetime-local" name="fecha_salida" value={formData.fecha_salida} onChange={handleChange} required
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" />
                </div>
                <div className="md:col-span-2 flex justify-end mt-2">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition duration-150">
                        Guardar Registro
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TransporteForm;