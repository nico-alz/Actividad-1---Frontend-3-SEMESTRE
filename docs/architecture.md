# Arquitectura del Proyecto

Este documento describe la estructura inicial y la organización de la aplicación frontend.

## Carpetas principales
- **assets/css**: estilos personalizados.
- **assets/js**: scripts JavaScript separados por responsabilidad.
- **assets/img**: imágenes y recursos estáticos.
- **docs**: documentación adicional (este archivo, futuras guías).

## Páginas HTML
- `index.html`: página de selección de rol/inicio.
- `dashboard.html`: vista principal del usuario.
- `admin.html`: panel para el administrador financiero.

## Flujo de navegación
1. Usuario elige rol en `index.html`.
2. Se guarda `currentRole` en `localStorage`.
3. Se redirige a la página correspondiente.
4. Los archivos JS verifican que la sesión y rol sean correctos;
   caso contrario se regresa a `index.html`.

## Persistencia local
- **Usuarios**: lista almacenada bajo la clave `fin_users`.
- **Movimientos**: bajo `fin_movements`, contiene objetos con campos como `id`, `userId`, `type`, `amount`, `date`, `category`.

## Futuros pasos
- Implementar componentes de CRUD en `dashboard.html`.
- Añadir diagrama de estadísticas con gráficos (ej. Chart.js).
- Crear utilidades para generación de reportes y métricas administrativas.
