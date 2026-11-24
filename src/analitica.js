module.exports = {};

function valorVenta(venta) {
  return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
  let total = 0;
  for (const venta of ventas) {
    total += valorVenta(venta);
  }
  return total;
}

function unidadesVendidas(ventas) {
  let unidades = 0;
  for (const venta of ventas) {
    unidades += venta.cantidad;
  }
  return unidades;
}

function ventaMayor(ventas) {
  let mayor = null;
  for (const venta of ventas) {
    if (mayor === null || valorVenta(venta) > valorVenta(mayor)) {
      mayor = venta;
    }
  }
  return mayor;
}

function ticketPromedio(ventas) {
  let total = 0;
  let validas = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      total += valorVenta(venta);
      validas++;
    }
  }
  if (validas === 0) {
    return 0;
  }
  return total / validas;
}

function ventasPorCiudad(ventas, ciudad) {
  const buscada = ciudad.trim().toLowerCase();
  let total = 0;
  for (const venta of ventas) {
    if (venta.ciudad.trim().toLowerCase() === buscada) {
      total += valorVenta(venta);
    }
  }
  return total;
}


function totalVendidoM(ventas) {
  return ventas.reduce((acc, venta) => acc + valorVenta(venta), 0);
}

function unidadesVendidasM(ventas) {
  return ventas.reduce((acc, venta) => acc + venta.cantidad, 0);
}

function ventasPorCiudadM(ventas, ciudad) {
  const buscada = ciudad.trim().toLowerCase();
  return ventas
    .filter((venta) => venta.ciudad.trim().toLowerCase() === buscada)
    .reduce((acc, venta) => acc + valorVenta(venta), 0);
}

function normalizarCiudad(ciudad) {
  const limpia = ciudad.trim().toLowerCase();
  return limpia.charAt(0).toUpperCase() + limpia.slice(1);
}

function totalPorCiudad(ventas) {
  return ventas.reduce((grupos, venta) => {
    const clave = normalizarCiudad(venta.ciudad);
    grupos[clave] = (grupos[clave] || 0) + valorVenta(venta);
    return grupos;
  }, {});
}

function unidadesPorProducto(ventas) {
  return ventas.reduce((grupos, venta) => {
    grupos[venta.producto] = (grupos[venta.producto] || 0) + venta.cantidad;
    return grupos;
  }, {});
}

function topProductosPorValor(ventas, k) {
  const valores = ventas.reduce((grupos, venta) => {
    grupos[venta.producto] = (grupos[venta.producto] || 0) + valorVenta(venta);
    return grupos;
  }, {});

  const lista = Object.entries(valores).map(([producto, valor]) => ({
    producto,
    valor,
  }));

  return [...lista].sort((a, b) => b.valor - a.valor).slice(0, k);
}
module.exports = {
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
  totalVendidoM,
  unidadesVendidasM,
  ventasPorCiudadM,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
};