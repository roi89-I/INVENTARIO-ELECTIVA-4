# Diseño de Base de Datos: Productos, Características y Cantidad

Este documento describe el esquema de una base de datos para gestionar productos, sus características y la cantidad disponible en diferentes almacenes.

## Tablas

### Productos

Almacena la información básica de cada producto.

*   **producto_id (INT, PRIMARY KEY):** Identificador único del producto.  Clave primaria.
*   **nombre (VARCHAR):** Nombre del producto.
*   **descripcion (TEXT):** Descripción detallada del producto.
*   **precio (DECIMAL):** Precio del producto.

### Caracteristicas

Almacena las características específicas de cada producto.

*   **caracteristica_id (INT, PRIMARY KEY):** Identificador único de la característica. Clave primaria.
*   **producto_id (INT, FOREIGN KEY referencing Productos.producto_id):** Identificador del producto al que pertenece la característica. Clave foránea que referencia la tabla `Productos`.
*   **nombre (VARCHAR):** Nombre de la característica (ej. "Color", "Tamaño").
*   **valor (VARCHAR):** Valor de la característica (ej. "Rojo", "Grande").

### Cantidad

Almacena la cantidad de cada producto disponible en cada almacén.

*   **producto_id (INT, FOREIGN KEY referencing Productos.producto_id):** Identificador del producto. Clave foránea que referencia la tabla `Productos`.
*   **almacen_id (INT, FOREIGN KEY referencing Almacenes.almacen_id):** Identificador del almacén. Clave foránea que referencia la tabla `Almacenes` (se asume que existe una tabla `Almacenes`).
*   **cantidad (INT):** Cantidad disponible del producto en el almacén.
*   **PRIMARY KEY (producto_id, almacen_id):** Clave primaria compuesta por `producto_id` y `almacen_id`, asegurando la unicidad de la combinación producto-almacén.

## Relaciones

*   **Productos <-->> Caracteristicas:** Un producto puede tener múltiples características.  Esta es una relación de uno a muchos.

## Consideraciones Adicionales

*   **Tabla Almacenes:**  Este esquema asume la existencia de una tabla `Almacenes` con una columna `almacen_id` como clave primaria.  Si esta tabla no existe, debe ser creada.
*   
*   **Tipos de Datos:** Los tipos de datos al usar son (INT, VARCHAR, TEXT, DECIMAL) como ejemplos, y pueden ser ajustados según las necesidades específicas que se adapten al proyecto.
*   
*   **Índices:** Se basa considerando en la creación de índices en las columnas `producto_id` en las tablas `Caracteristicas` y `Cantidad` para mejorar el rendimiento de las consultas.


+-----------------+       +---------------------+       +-----------------+
|   Productos     |       |   Características    |       |    Cantidad     |
+-----------------+       +---------------------+       +-----------------+
| * producto_id   |------>| * caracteristica_id |       | * producto_id   |----->
|   nombre        |       |   producto_id (FK)  |<------| * almacen_id    |
|   descripcion   |       |   nombre          |       |   cantidad      |
|   precio        |       |   valor           |       +-----------------+
+-----------------+       +---------------------+
    ^
    |
    |
    +-----------------+
    |   Almacenes     |
    +-----------------+
    | * almacen_id    |
    |   nombre        |
    |   ubicacion     |
    +-----------------+