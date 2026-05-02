const { PrismaClient } = require('../Backend/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`SELECT is_nullable FROM information_schema.columns WHERE table_name = 'detalle_pedido_cliente' AND column_name = 'id_producto'`;
  console.log(result);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
