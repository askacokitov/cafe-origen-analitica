const ventas = require("./datos");
const a = require("./analitica");

const entradas = {
  completo: ventas,
  unElemento: [ventas[0]],
  vacio: [],
};

for (const nombre in entradas) {
  const v = entradas[nombre];
  console.log(`--- ${nombre} ---`);
  console.log("totalVendido:", a.totalVendido(v));
  console.log("unidadesVendidas:", a.unidadesVendidas(v));
  console.log("ventaMayor:", a.ventaMayor(v));
  console.log("ticketPromedio:", a.ticketPromedio(v));
  console.log("ventasPorCiudad Medellín:", a.ventasPorCiudad(v, "  MEDELLÍN "));
}