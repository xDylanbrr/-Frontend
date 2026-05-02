import API_BASE_URL from '../../apiConfig';
const API_URL = `${API_BASE_URL}/logistica/empaque`;

export const getEmpaques = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || data.message || 'Error al obtener los empaques');
        }
        return data;
    } catch (error) {
        console.error("Error en getEmpaques:", error);
        throw error;
    }
};

export const crearEmpaque = async (empaqueData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empaqueData),
        });
        
        // Primero convertimos la respuesta a JSON, sea buena o mala
        const data = await response.json();

        // Si la respuesta NO fue exitosa (ej. error 400 o 500)
        if (!response.ok || data.success === false) {
            // AQUÍ ESTÁ LA MAGIA: Lanzamos el error EXACTO que nos manda tu Backend/Prisma
            throw new Error(data.error || data.message || 'Error al crear el registro');
        }
        
        return data;
    } catch (error) {
        console.error("Error en el servicio crearEmpaque:", error);
        throw error; // Esto hace que el Formulario atrape el texto del error
    }
};

export const eliminarEmpaque = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        
        if (!response.ok || data.success === false) {
            throw new Error(data.error || data.message || 'Error al eliminar el registro');
        }
        return data;
    } catch (error) {
        console.error("Error en eliminarEmpaque:", error);
        throw error;
    }
};

export const actualizarEmpaque = async (id, data) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || result.message || 'Error al actualizar');
        return result;
    } catch (error) {
        console.error("Error en actualizarEmpaque:", error);
        throw error;
    }
};