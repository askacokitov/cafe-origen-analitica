# cafe-origen-analitica

Exploración inicial del historial de ventas de Café Origen con Node.js.

## Estructura
- `src/datos.js`: ventas en un arreglo de objetos (datos originales, sin limpiar).
- `src/explorar.js`: muestra cantidad de registros, primero, último, posición 4 y tabla.
- `src/analitica.js`: reservado para análisis futuros.
- `bitacora.md`: diccionario de datos y casos borde.

## Uso
    node src/explorar.js

    # cafe-origen-analitica (v0.1)

Motor de análisis de ventas de Café Origen. Lee un historial de ventas y produce un
reporte en consola, sin necesidad de abrir el código.

## Cómo ejecutarlo
1. Instala Node.js (versión LTS).
2. Clona el repositorio y entra a la carpeta.
3. Ejecuta:

       node src/reporte.js

Otros scripts: `node src/verificar.js` (compara versiones con ciclo y con métodos de
arreglo) y `node src/errores.js` (reproduce los errores corregidos).

## Qué preguntas responde
- ¿Cuánto se vendió en total, cuántas unidades y cuál es el ticket promedio?
- ¿Cuál fue la venta más grande?
- ¿Cuánto vendió cada ciudad?
- ¿Cuántas unidades se vendieron de cada producto?
- ¿Cuáles son los 3 productos que más dinero generaron?
- ¿Cómo le fue a un día específico, incluso si no hubo ventas?

## Estructura
- `src/datos.js`: ventas (datos originales, sin limpiar).
- `src/analitica.js`: funciones de análisis.
- `src/reporte.js`: reporte completo.
- `bitacora.md`: decisiones, diccionario de datos, casos borde, trazas y errores.