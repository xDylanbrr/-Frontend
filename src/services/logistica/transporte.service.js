import API_BASE_URL from '../../apiConfig';
const API_URL = `${API_BASE_URL}/logistica/transporte`;

// Función para traer la lista de transportes (GET)
export const obtenerTransportes = async () => {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error("Error al obtener los datos");
        return await respuesta.json();
    } catch (error) {
        console.error("Hubo un problema con la petición Fetch:", error);
        throw error;
    }
};

// Función para guardar un nuevo transporte (POST)
export const crearTransporte = async (datosTransporte) => {
    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosTransporte),
        });
        
        if (!respuesta.ok) throw new Error("Error al guardar el transporte");
        return await respuesta.json();
    } catch (error) {
        console.error("Hubo un problema al crear el registro:", error);
        throw error;
    }
};