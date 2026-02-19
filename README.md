---

# 📘 SISTEMA DE GESTIÓN FINANCIERA MULTIPERFIL

**Actividad Frontend con Uso Obligatorio de IA**

---

# 1️⃣ Introducción

Este proyecto consiste en el desarrollo de una aplicación web frontend llamada **Sistema de Gestión Financiera Multiperfil**, cuyo objetivo es permitir administrar ingresos, gastos, presupuestos y reportes financieros utilizando almacenamiento en `localStorage`.

### Tecnologías obligatorias utilizadas:

* HTML5
* Bootstrap (Framework CSS)
* JavaScript Vanilla
* localStorage

El desarrollo incluyó el uso obligatorio de Inteligencia Artificial, documentando mínimo 8 prompts aplicados a diferentes áreas técnicas del proyecto.

---

# 2️⃣ Modelado de Datos (Uso de IA)

## 🔹 Prompt 1 – Diseño de Arquitectura Inicial

**Prompt utilizado:**

> Genera una estructura desde cero de un sistema de gestión financiera multiperfil, cumpliendo con las tecnologías obligatorias (HTML5, Bootstrap, JS Vanilla y localStorage).

### Área cubierta:

✔ Diseño de arquitectura
✔ Estructura base del proyecto

### Resultado:

La IA generó:

* Estructura de carpetas
* index.html
* app.js
* storage.js
* finance.js
* README inicial

Se estableció separación de responsabilidades:

* `storage.js` → Persistencia en localStorage
* `finance.js` → Lógica de cálculos
* `app.js` → Control de vistas y autenticación

### Análisis crítico:

La IA facilitó la estructura inicial correctamente, aunque fue necesario ajustar la organización de roles posteriormente.

---

# 3️⃣ Implementación de Funcionalidades

---

## 🔹 Prompt 2 – Implementación del Perfil de Usuario

**Prompt utilizado:**

> Implementar correctamente el perfil de usuario.

### Área cubierta:

✔ Modelado de datos
✔ Funciones de cálculo

### Componentes implementados:

* Registro de ingresos y gastos
* Cálculo automático de balance
* Protección por rol
* Manejo de movimientos financieros

### Análisis crítico:

La IA propuso una lógica funcional, pero fue necesario depurar validaciones y mejorar control de sesiones.

---

## 🔹 Prompt 3 – Opciones del Administrador

**Prompt utilizado:**

> Implementar las opciones obligatorias en el perfil de administrador.

### Área cubierta:

✔ Diseño de arquitectura
✔ Modelado de datos

### Funcionalidades implementadas:

* Visualizar datos de todos los usuarios
* Generar reportes generales
* Identificar usuarios con sobrepresupuesto
* Restricción de modificación de registros personales

### Análisis crítico:

La IA generó una estructura correcta, aunque se debió ajustar la lógica para que el administrador no pudiera editar registros individuales.

---

## 🔹 Prompt 4 – Panel de Estadísticas

**Prompt utilizado:**

> Implementar el panel de estadísticas.

### Área cubierta:

✔ Funciones de cálculo
✔ Optimización

### Funcionalidades:

* Total de ingresos
* Total de gastos
* Balance general
* Indicadores de sobrepresupuesto

### Análisis crítico:

Fue necesario optimizar los cálculos para evitar duplicaciones al actualizar localStorage.

---

# 4️⃣ Diseño Visual y Refactorización

---

## 🔹 Prompt 5 – Implementación CSS Inicio

**Prompt utilizado:**

> Implementar CSS a la página de inicio.

### Área cubierta:

✔ Diseño visual

Se aplicó Bootstrap con mejoras personalizadas.

---

## 🔹 Prompt 6 – Implementación de Login

**Prompt utilizado:**

> Añadir login con Bootstrap y credenciales de ejemplo.

### Área cubierta:

✔ Arquitectura
✔ Seguridad básica

Credenciales implementadas:

| Rol           | Usuario  | Contraseña |
| ------------- | -------- | ---------- |
| Usuario       | nico-alz | 1234       |
| Administrador | admin    | 12345      |

### Mejoras realizadas:

* Validación básica
* Creación automática del usuario si no existe
* Protección de vistas
* Manejo de sesión en localStorage

### Análisis crítico:

La IA facilitó la implementación, pero fue necesario ajustar la validación para evitar accesos indebidos.

---

## 🔹 Prompt 7 – Requisitos del Administrador

**Prompt utilizado:**

> Implementar requisitos en el perfil de administrador.

### Área cubierta:

✔ Refactorización
✔ Optimización

Se reorganizó la lógica del panel para separar:

* Visualización
* Reportes
* Control de presupuesto

---

## 🔹 Prompt 8 – Refactorización CSS

**Prompt utilizado:**

> Al momento de organizar el CSS dañaba la lógica, por lo que decidí dejarlo con ese diseño.

### Área cubierta:

✔ Refactorización

### Análisis crítico:

Se identificó que algunos cambios visuales afectaban la manipulación del DOM.
Se optó por mantener estabilidad funcional antes que modificar estructura.

Esto demuestra toma de decisiones técnicas responsables.

---

# 5️⃣ Optimización Aplicada

Durante el proceso se realizaron mejoras como:

* Separación de lógica y almacenamiento.
* Reutilización de funciones.
* Eliminación de duplicación en cálculos.
* Validaciones adicionales en login.
* Control estricto de roles.

---

# 6️⃣ Entregables Cumplidos

✔ Aplicación funcional
✔ Código estructurado por módulos
✔ Uso de Bootstrap
✔ Uso de JavaScript Vanilla
✔ Uso de localStorage
✔ Documento con mínimo 8 prompts documentados
✔ Análisis crítico de cada prompt
✔ Separación por áreas: modelado, cálculo, arquitectura, optimización y refactorización

---

# 7️⃣ Conclusión

El uso de Inteligencia Artificial permitió acelerar el desarrollo del proyecto, especialmente en:

* Diseño de arquitectura
* Modelado de datos
* Implementación de funcionalidades
* Optimización de cálculos

Sin embargo, fue necesario aplicar criterio técnico propio para:

* Ajustar validaciones
* Corregir errores de lógica
* Adaptar código a los requisitos obligatorios
* Tomar decisiones de estabilidad frente a diseño

El proyecto cumple con los requisitos técnicos y académicos establecidos.

---

