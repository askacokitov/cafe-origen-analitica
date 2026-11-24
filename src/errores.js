const ventas = require("./datos");
const a = require("./analitica");

function totalPorCiudadIngenua(lista) {
  const grupos = {};
  for (const v of lista) {
    grupos[v.ciudad] = (grupos[v.ciudad] || 0) + v.cantidad * v.precio;
  }
  return grupos;
}

function ticketIngenuo(lista) {
  let total = 0;
  for (const v of lista) {
    total += v.cantidad * v.precio;
  }
  return total / lista.length; 
}

const conEspacio = [...ventas, { ...ventas[1], id: 13, ciudad: "Bogotá " }];
console.log("Ingenua:", Object.keys(totalPorCiudadIngenua(conEspacio)));
console.log("Mía:    ", Object.keys(a.totalPorCiudad(conEspacio)));

const sinVentas = ventas.filter((v) => v.fecha === "2026-09-07");
console.log("Ticket ingenuo:", ticketIngenuo(sinVentas));
console.log("Ticket mío:    ", a.ticketPromedio(sinVentas));
console.log("ventasDelDia:  ", a.ventasDelDia(ventas, "2026-09-07"));