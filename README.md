# Sistema de Gestión Financiera Multiperfil (Frontend)

Proyecto destinado a la administración de ingresos, gastos, presupuestos y reportes financieros utilizando únicamente almacenamiento local (`localStorage`).

## Tecnologías usadas
- HTML5
- Bootstrap 5 (framework CSS)
- JavaScript vanilla
- `localStorage` para persistencia

## Estructura del proyecto
```
Actividad NMA/
├─ assets/
│  ├─ css/
│  │  └─ style.css
│  ├─ js/
│  │  ├─ app.js
│  │  ├─ storage.js
│  │  ├─ finance.js
│  │  └─ (otros módulos)...
│  └─ img/
├─ index.html
├─ dashboard.html
├─ admin.html
└─ README.md
```

## Funcionalidades previstas
- **Usuario**
  - Registrar ingresos y gastos
  - Crear categorías personalizadas
  - Definir presupuesto mensual
  - Visualizar balance general
  - Consultar historial con filtros por fecha o categoría

- **Administrador financiero**
  - Visualizar datos de todos los usuarios
  - Generar reportes generales
  - Identificar usuarios con sobrepresupuesto
  - (No puede modificar registros personales)

- CRUD completo de movimientos financieros (crear, eliminar y editar registros)
- Cálculo automático de balance con consideración de presupuesto
- Filtros dinámicos y panel de estadísticas por categoría
- Persistencia total en `localStorage`
- Protección de vistas según rol

### Panel de administrador
- **Reportes generales avanzados**: KPIs visuales con métricas de usuarios activos, movimientos totales, ingresos, gastos y balance neto del sistema
- **Alerta de sobrepresupuesto**: Sección dedicada que identifica y destaca usuarios que exceden su presupuesto, mostrando el monto sobrepasado
- **Detalle de usuarios**: Tabla interactiva con estado por usuario, filas marcadas en rojo para sobrepresupuestos
- **Estadísticas por categoría**: Desglose de ingresos y gastos en todas las categorías del sistema
- **Protección de integridad**: El administrador solo visualiza datos, no puede editar registros personales de usuarios
- **Interfaz profesional**: Navbar fijo, cards con efectos hover, responsive design

## Cómo empezar
1. Abrir `index.html` en un navegador.
2. Sistema de autenticación con dos opciones:
   
   **Opción 1: Iniciar sesión (credenciales de ejemplo)**
   - Pestaña "Iniciar sesión"
   - **Usuario**: `nico-alz` / **Contraseña**: `1234`
   - **Administrador**: `admin` / **Contraseña**: `12345`
   
   **Opción 2: Registrarse (crear nueva cuenta)**
   - Pestaña "Registrarse"
   - Completa el formulario con usuario, contraseña y rol
   - Se validará que el usuario tenga mínimo 4 caracteres y la contraseña coincida
   - Las nuevas cuentas se guardan en `localStorage`

3. Navegar por las distintas vistas. El código JS valida credenciales, gestiona usuarios y protege las páginas según el rol.

> Este repositorio es una base inicial; se debe implementar la lógica detallada de cada módulo según los requisitos del proyecto.
