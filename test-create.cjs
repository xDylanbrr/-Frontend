const { PrismaClient } = require('../Backend/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const pedido = await prisma.pedido_cliente.create({
      data: {
        id_cliente: 1, // Assuming client 1 exists! Let's hope. If not, this might fail on client.
        total: 100,
        estado: "Pendiente",
        fecha: new Date(),
        detalle_pedido_cliente: {
          create: [
            {
              id_producto: null,
              nombre_producto: "Producto Prueba",
              cantidad: 1,
              precio_unitario: 100,
              subtotal: 100
            }
          ]
        }
      }
    });
    console.log("Success:", pedido);
  } catch(e) {
    console.error("Error creating:", e.message);
  }
}

main().finally(() => prisma.$disconnect());
