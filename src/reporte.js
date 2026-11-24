const ventas = require("./datos");
const {
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
} = require("./analitica");

const ANCHO = 52;
const COL_VALOR = 18;

function pesos(n) {
  return "$ " + n.toLocaleString("es-CO", { maximumFractionDigits: 0 });
}

function seccion(titulo) {
  console.log(`\n${titulo.toUpperCase()}`);
  console.log("-".repeat(ANCHO));
}

function fila(etiqueta, valor) {
  console.log(
    `${etiqueta.padEnd(ANCHO - COL_VALOR)}${String(valor).padStart(COL_VALOR)}`
  );
}

console.log("=".repeat(ANCHO));
console.log("CAFÉ ORIGEN · REPORTE DE VENTAS v0.1".padStart(ANCHO / 2 + 18));
console.log("=".repeat(ANCHO));

seccion("1. Resumen general");
const mayor = ventaMayor(ventas);
fila("Registros", ventas.length);
fila("Total vendido", pesos(totalVendido(ventas)));
fila("Unidades vendidas", unidadesVendidas(ventas));
fila("Ticket promedio", pesos(ticketPromedio(ventas)));
if (mayor !== null) {
  fila(`Venta mayor (id ${mayor.id}, ${mayor.producto})`, pesos(valorVenta(mayor)));
}

seccion("2. Ventas por ciudad");
const ciudades = Object.entries(totalPorCiudad(ventas)).sort((a, b) => b[1] - a[1]);
for (const [ciudad, total] of ciudades) {
  fila(ciudad, pesos(total));
}

seccion("3. Unidades por producto");
const productos = Object.entries(unidadesPorProducto(ventas))
  .map(([producto, unidades]) => ({ producto, unidades }))
  .sort((a, b) => b.unidades - a.unidades);
console.table(productos);

seccion("4. Top 3 productos por valor");
topProductosPorValor(ventas, 3).forEach((item, i) => {
  fila(`${i + 1}. ${item.producto}`, pesos(item.valor));
});

seccion("5. Resumen por día");
function mostrarDia(fecha) {
  const d = ventasDelDia(ventas, fecha);
  console.log(d.fecha);
  fila("  Registros", d.registros);
  fila("  Total vendido", pesos(d.total));
  fila("  Unidades", d.unidades);
  fila("  Ticket promedio", pesos(d.ticketPromedio));
  if (d.registros === 0) {
    console.log("  (Sin ventas registradas este día)");
  }
}
mostrarDia("2026-09-05"); 
mostrarDia("2026-09-07"); 