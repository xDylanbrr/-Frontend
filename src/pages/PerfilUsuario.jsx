import React, { useState, useRef } from 'react';
import { FaUpload, FaSpinner } from 'react-icons/fa';

export default function PerfilUsuario({ user, onUserUpdate }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('imagenPerfil', selectedFile);
    formData.append('userId', user.id); 

    try {
      const response = await fetch("http://localhost:3000/api/auth/perfil/imagen", {
        method: "PATCH",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Sincronizamos con App.jsx y localStorage
        onUserUpdate(data.user); 
        
        // Limpiamos los estados locales para forzar el uso de la URL del servidor
        setSelectedFile(null);
        setPreviewUrl(null);
        
        alert("¡Imagen actualizada!");
      } else {
        alert(data.message || "Error al actualizar");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Mi Perfil</h2>
      
      <div className="relative inline-block mb-6">
        <img 
          src={previewUrl || user?.profileImageUrl} 
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
          alt="Perfil"
          onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=User"; }}
        />
        <button 
          onClick={() => fileInputRef.current.click()}
          className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          <FaUpload size={14} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
          accept="image/*"
        />
        
        {selectedFile && (
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Guardar Nueva Foto"}
          </button>
        )}
      </form>

      <div className="mt-6 text-left border-t pt-4">
        <p className="text-sm text-gray-500">Nombre: <span className="font-semibold text-gray-800">{user?.nombre}</span></p>
        <p className="text-sm text-gray-500">Cédula: <span className="font-semibold text-gray-800">{user?.cedula}</span></p>
      </div>
    </div>
  );
}