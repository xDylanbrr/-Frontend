fetch('http://localhost:3000/api/pedidos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id_cliente: 1,
    estado: "Pendiente",
    total: 500,
    items: [
      {
        id: "algo_no_numérico",
        title: "Bolsas Personalizadas",
        cantidad: 2,
        price: 250
      },
      {
        id: 99999, // Un id que seguro no existe
        title: "Otro Producto Que No Existe",
        cantidad: 1,
        price: 100
      }
    ]
  })
}).then(res => res.json()).then(console.log).catch(console.error);
