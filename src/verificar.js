const ventas = require("./datos");
const a = require("./analitica");

function comparar(nombre, esperado, obtenido) {
  const estado = esperado === obtenido ? "OK" : "DIFERENTE";
  console.log(`${nombre}: ${estado} (ciclo=${esperado}, método=${obtenido})`);
}

const copiaOriginal = [...ventas];

comparar("totalVendido", a.totalVendido(ventas), a.totalVendidoM(ventas));
comparar("unidadesVendidas", a.unidadesVendidas(ventas), a.unidadesVendidasM(ventas));
comparar(
  'ventasPorCiudad "Medellín"',
  a.ventasPorCiudad(ventas, "Medellín"),
  a.ventasPorCiudadM(ventas, "Medellín")
);
comparar(
  'ventasPorCiudad " BOGOTÁ "',
  a.ventasPorCiudad(ventas, " BOGOTÁ "),
  a.ventasPorCiudadM(ventas, " BOGOTÁ ")
);

comparar("totalVendido []", a.totalVendido([]), a.totalVendidoM([]));
comparar("unidadesVendidas []", a.unidadesVendidas([]), a.unidadesVendidasM([]));

console.log("\ntotalPorCiudad:", a.totalPorCiudad(ventas));
console.log("ciudades:", Object.keys(a.totalPorCiudad(ventas)).length);
console.log("unidadesPorProducto:", a.unidadesPorProducto(ventas));
console.log("top 3:", a.topProductosPorValor(ventas, 3));

const intacto = ventas.every((v, i) => v === copiaOriginal[i]);
console.log("ventas conserva su orden:", intacto ? "OK" : "DIFERENTE");