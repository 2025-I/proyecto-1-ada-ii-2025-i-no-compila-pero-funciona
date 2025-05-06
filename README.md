[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/kKWtV-CB)

# Proyecto 1: Análisis de Algoritmos II

**Fecha de entrega:** 07 de mayo de 2025

**Lenguaje implementado:** JavaScript (Node.js + Interfaz Web)

---

## Integrantes

| Nombre completo              | Código  |
| ---------------------------- | ------- |
| Juan Pablo Ospina Vanegas    | 2411023 |
| Carlos Fernando Padilla Mesa | 2059962 |
| Diana Marcela Oviedo         | 2459375 |

---

## Descripción del proyecto

Este proyecto implementa soluciones a dos problemas de algoritmos utilizando diferentes enfoques:

1. **Problema 1:** Encontrar todas las subsecuencias palindrómicas de máxima longitud en una cadena, ignorando mayúsculas/minúsculas y caracteres no alfanuméricos.

2. **Problema 2:** Maximizar la suma de calificaciones de convivencia en una fiesta empresarial respetando la jerarquía de supervisión (ningún invitado puede ser supervisor directo de otro).

---

## Implementación

El proyecto incluye tres enfoques para cada problema:

- Solución de fuerza bruta
- Solución con programación dinámica
- Solución voraz (cuando sea aplicable)

### Enfoques utilizados

| Problema       | Fuerza bruta | Programación dinámica | Voraz |
| -------------- | ------------ | --------------------- | ----- |
| Palindromos    | ✓            | ✓                     | ✓     |
| Fiesta empresa | ✓            | ✓                     | ✓     |

---

## 🚀 Estructura del repositorio

```plaintext
.
├── src/                        # Código fuente
│   ├── main.js/                # Archivo principal
│   └── logic/                  # Codigo de los problemas
|       ├──palindrome.js        # Implementaciones para el problema 1
|       ├──combinations.js      # Implementaciones para el problema 2
├── docs/                       # Documentación técnica
│   ├── informe.md              # Archivo principal (hace referencia a los otros)
|   ├── informe_p1.md           # Análisis completo del Problema 1
|   ├── informe_p2.md           # Análisis completo del Problema 2
│   ├── complejidad/            # Gráficos de análisis experimental
│   └── imagenes/               # Capturas de pantalla
├── test/
|   ├──data/                    # Archivos txt para pruebas unitarias
│   ├── palindrome.test.js/     # Casos de prueba para el problema 1
│   └── combinations.test.js    # Casos de prueba para el problema 2
├── .github/workflows/          # Pipelines CI/CD (compilación y pruebas)
├── .gitignore
└── README.md                   # Este archivo
```

## 🌟 Interfaz Gráfica

El proyecto incluye una interfaz web para interactuar con los algoritmos:

```plaintext
public/
├── index.html       # Interfaz principal
└── index.css        # Estilos
```

## 🔧 Cómo iniciar el proyecto

### Requisitos

- Node.js instalado (versión recomendada: 18.x o superior)

### Instalación

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
npm install
```

### Ejecución del servidor

- Para iniciar el proyecto y acceder a la interfaz gráfica:

```bash
npm start
```

- Una vez iniciado, verás una URL en la terminal como:

```bash
Servidor corriendo en http://localhost:3000
```
