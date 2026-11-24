# Bitácora – Café Origen

## Diccionario de datos

| Propiedad | Tipo | Significado |
|-----------|------|-------------|
| id        | number | Identificador único y consecutivo de la venta. |
| fecha     | string | Fecha de la venta en formato AAAA-MM-DD (texto, no objeto Date). |
| cliente   | string | Código del cliente que compró (ej. "C01"). |
| producto  | string | Nombre del producto vendido, incluye origen y presentación. |
| ciudad    | string | Ciudad donde se realizó o entregó la venta. |
| cantidad  | number | Unidades vendidas en ese registro. |

## Casos borde detectados

1. **Ciudad con mayúsculas inconsistentes (id 5):** aparece `"medellín"` en minúscula,
   mientras los demás registros usan `"Medellín"`. Un agrupamiento por ciudad lo contaría
   como ciudad distinta.
   **Decisión:** normalizar el texto (capitalización y tildes) al limpiar, sin tocar
   el dato original en `datos.js`.

2. **Cantidad igual a 0 (id 8):** una venta de 0 unidades no tiene sentido comercial;
   puede ser un error de captura o una venta anulada.
   **Decisión:** excluirla de los cálculos de ventas y marcarla para confirmar con
   el negocio.

3. **Clientes con una sola compra y sin más información (C04–C08):** solo existe un
   código, sin nombre ni datos para validarlo. Además, el cliente C06 está
   asociado a la venta con cantidad 0.
   **Decisión:** conservarlos, pero no sacar conclusiones de fidelidad con tan
   pocos datos; tratar los códigos como identificadores y no como clientes verificados.

4. **Productos de naturaleza distinta en una misma columna:** café (Origen…) y
   accesorios (Prensa francesa, Molino manual) están mezclados sin categoría.
   **Decisión:** al analizar, agregar una categoría derivada para no sumar
   cantidades de cosas no comparables.

5. **Posición 4 del arreglo:** `ventas[4]` es el registro con `id: 5`
   (los índices parten de 0).


   ## Plan en pseudocódigo

**totalVendido** (acumulador)
- Inicio: total = 0
- Recorro cada venta del arreglo
- Sin condición
- Acumulo: total = total + cantidad × precio
- Devuelvo total

**unidadesVendidas** (acumulador)
- Inicio: unidades = 0
- Recorro cada venta
- Sin condición
- Acumulo: unidades = unidades + cantidad
- Devuelvo unidades

**ventaMayor** (máximo)
- Inicio: mayor = nada (null)
- Recorro cada venta
- Condición: si mayor es null, o el valor de esta venta supera el de mayor
- Guardo: mayor = esta venta (el registro completo)
- Devuelvo mayor

**ticketPromedio** (acumulador + contador)
- Inicio: total = 0, validas = 0
- Recorro cada venta
- Condición: solo si cantidad > 0
- Acumulo el valor en total y sumo 1 a validas
- Si validas es 0, devuelvo 0; si no, devuelvo total / validas

**ventasPorCiudad** (acumulador con filtro)
- Inicio: total = 0; normalizo la ciudad buscada con trim y toLowerCase
- Recorro cada venta
- Condición: ciudad de la venta, normalizada igual, es igual a la buscada
- Acumulo el valor de la venta en total
- Devuelvo total

## Comportamiento con arreglo vacío

| Función | Devuelve | Por qué |
|---|---|---|
| totalVendido | 0 | No hay nada que sumar; 0 es el valor neutro. |
| unidadesVendidas | 0 | Igual que arriba. |
| ventaMayor | null | No existe un registro que devolver; null indica "no hay". |
| ticketPromedio | 0 | Evita dividir 0/0, que daría NaN. |
| ventasPorCiudad | 0 | No se vendió nada en esa ciudad. |

## Trazas manuales

**totalVendido (muestra completa)**

| Venta (id) | Valor | total acumulado |
|---|---|---|
| inicio | | 0 |
| 1 | 2 × 42000 = 84000 | 84000 |
| 2 | 1 × 26000 = 26000 | 110000 |
| 3 | 95000 | 205000 |
| 4 | 42000 | 247000 |
| 5 | 3 × 45000 = 135000 | 382000 |
| 6 | 2 × 26000 = 52000 | 434000 |
| 7 | 120000 | 554000 |
| 8 | 0 × 42000 = 0 | 554000 |
| 9 | 2 × 45000 = 90000 | 644000 |
| 10 | 4 × 42000 = 168000 | 812000 |
| 11 | 95000 | 907000 |
| 12 | 3 × 26000 = 78000 | 985000 |

Resultado a mano: 985000. Coincide con el programa.

**ventasPorCiudad(ventas, "Medellín")**

| Venta (id) | ciudad normalizada | ¿Coincide? | total |
|---|---|---|---|
| 1 | medellín | sí | 84000 |
| 4 | medellín | sí | 126000 |
| 5 | medellín (era "medellín") | sí | 261000 |
| 11 | medellín | sí | 356000 |

Las demás ventas (bogotá, cali, pereira) no coinciden. Resultado a mano: 356000, igual al programa.