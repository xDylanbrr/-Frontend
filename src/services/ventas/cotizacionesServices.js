// src/modules/ventas/cotizaciones/services/cotizacionesService.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todas las cotizaciones
async function obtenerCotizaciones() {
  return await prisma.cotizacion.findMany({
    orderBy: { fecha: "desc" },
  });
}

// Obtener cotización por ID
async function obtenerCotizacionPorId(id) {
  return await prisma.cotizacion.findUnique({
    where: { id_cotizacion: Number(id) },
  });
}

// Crear cotización
async function crearCotizacion(data) {
  return await prisma.cotizacion.create({
    data: {
      cliente: data.cliente,
      fecha: data.fecha ? new Date(data.fecha) : new Date(),
      total: data.total || 0,
      observaciones: data.observaciones || "",
      moneda: data.moneda || "DOP", // Valor por defecto si no viene del frontend
    },
  });
}

// Actualizar cotización
async function actualizarCotizacion(id, data) {
  return await prisma.cotizacion.update({
    where: { id_cotizacion: Number(id) },
    data: {
      cliente: data.cliente,
      fecha: data.fecha ? new Date(data.fecha) : undefined,
      total: data.total,
      observaciones: data.observaciones,
      moneda: data.moneda || "DOP",
    },
  });
}

// Eliminar cotización
async function eliminarCotizacion(id) {
  await prisma.cotizacion.delete({
    where: { id_cotizacion: Number(id) },
  });
  return { success: true };
}

module.exports = {
  obtenerCotizaciones,
  obtenerCotizacionPorId,
  crearCotizacion,
  actualizarCotizacion,
  eliminarCotizacion,
};