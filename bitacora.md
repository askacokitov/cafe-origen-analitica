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