
# KUTROL — Gestión Inteligente de Combustible

> **Optimiza cada gota. Reduce tu huella.**

KUTROL es una plataforma de gestión de combustible y telemetría vehicular orientada a flotas de transporte terrestre en la Provincia de Chiloé. Su objetivo es transformar datos operacionales en información estratégica mediante estadísticas, análisis de telemetría y métricas de sostenibilidad ambiental.

La plataforma busca identificar ineficiencias en el consumo de combustible, detectar posibles anomalías operacionales y facilitar la toma de decisiones basada en datos, contribuyendo a la reducción de costos y del impacto ambiental de las operaciones de transporte.

---

## 📑 Tabla de contenidos

- [Descripción del proyecto](#descripción-del-proyecto)
- [Funcionalidades principales](#funcionalidades-principales)
- [Stack tecnológico](#stack-tecnológico)
- [Arquitectura del sistema](#arquitectura-del-sistema)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Equipo de desarrollo](#equipo-de-desarrollo)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Comandos útiles](#comandos-útiles)
- [Base de datos](#base-de-datos)
- [Contribución al proyecto](#contribución-al-proyecto)

---

## 📌 Descripción del proyecto

La gestión eficiente del combustible es un desafío relevante para las empresas de transporte, especialmente cuando necesitan supervisar múltiples vehículos, controlar sus gastos operacionales y evaluar el desempeño de sus flotas.

KUTROL aborda esta problemática mediante una plataforma que centraliza información sobre vehículos, conductores, rutas, viajes, abastecimientos, mantenciones y registros de telemetría.

A partir de estos datos, el sistema permite visualizar indicadores operacionales, analizar patrones de consumo y supervisar eventos que podrían requerir atención.

### Objetivos

- **Optimización operacional:** identificar oportunidades de mejora en el consumo de combustible.
- **Control de flota:** centralizar información de vehículos, conductores, rutas y viajes.
- **Monitoreo inteligente:** registrar eventos de telemetría y detectar posibles anomalías.
- **Análisis de datos:** proporcionar estadísticas e indicadores para apoyar decisiones informadas.
- **Sostenibilidad ambiental:** facilitar el seguimiento de métricas relacionadas con el consumo y las emisiones de CO₂.

## 🚀 Funcionalidades principales

| Módulo | Descripción |
|---|---|
| Dashboard ejecutivo | Visualización de indicadores clave de la operación. |
| Gestión de flota | Administración de flotas, camiones y conductores. |
| Rutas y viajes | Registro y consulta de recorridos y operaciones logísticas. |
| Estadísticas | Análisis de consumo, correlaciones y patrones de telemetría. |
| Alertas | Supervisión de anomalías y eventos que requieren atención. |
| Sostenibilidad ambiental | Seguimiento de métricas de consumo y emisiones de CO₂. |
| Configuración | Gestión de parámetros operacionales y de la empresa. |
| Autenticación | Acceso a las funcionalidades privadas de la plataforma. |

> **Nota:** La disponibilidad de cada funcionalidad depende de su estado de implementación dentro del proyecto.

---

## 🛠️ Stack tecnológico

La arquitectura utiliza tecnologías web modernas y una base de datos relacional para gestionar la información operacional.

| Capa | Tecnología | Propósito |
|---|---|---|
| Frontend | Next.js 16, React 19 | Construcción de la interfaz y navegación. |
| Enrutamiento | Next.js App Router | Organización de páginas y rutas. |
| Estilos | Tailwind CSS v4 | Diseño y adaptación de la interfaz. |
| Componentes UI | Material UI Icons, Lucide React | Iconografía y elementos visuales. |
| Backend | Next.js API Routes, Node.js | Implementación de endpoints y lógica del servidor. |
| Base de datos | PostgreSQL 16 | Almacenamiento de información relacional. |
| Contenedores | Docker, Docker Compose | Configuración y ejecución del entorno de desarrollo. |
| Simulación de datos | Python | Generación de datos sintéticos de telemetría. |

---

## 🏗️ Arquitectura del sistema

KUTROL organiza sus responsabilidades en capas para separar la interfaz, la lógica de negocio y el acceso a los datos.

```text
┌──────────────────────────────────────┐
│             PRESENTACIÓN             │
│       Next.js + React + Tailwind     │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│            API Y NEGOCIO             │
│  API Routes · Controllers · Services │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│            ACCESO A DATOS            │
│       Repositories · Queries         │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│              PERSISTENCIA            │
│            PostgreSQL 16             │
└──────────────────────────────────────┘
```

La plataforma también incorpora scripts SQL para definir el esquema, establecer reglas de negocio, crear índices, configurar auditorías y cargar datos iniciales.

Docker Compose permite ejecutar la aplicación y la base de datos dentro de un entorno coordinado.

---

## 📂 Estructura del repositorio

La siguiente estructura resume los principales directorios y archivos del proyecto.

```text
Kutrol/
├── database/
│   ├── sql/
│   │   ├── 00_kutrol_reset.sql
│   │   ├── 00_run_all.sql
│   │   ├── 01_base.sql
│   │   ├── 02_tablas.sql
│   │   ├── 03_indices.sql
│   │   ├── 04_triggers_auditoria.sql
│   │   ├── 05_reglas_negocio.sql
│   │   └── 06_datos_base.sql
│   ├── init.sql
│   └── seed.py
│
├── documents/
│   ├── Mapa de Actores.jpg
│   ├── Mapa de empatia.pdf
│   ├── Modelo Relacional.png
│   └── Paleta_de_colores.html
│
├── public/
│   └── images/
│       ├── empresa-defecto.svg
│       ├── logo-kutrol-completo-claro.svg
│       ├── logo-kutrol-completo.svg
│       └── logo-kutrol.svg
│
├── src/
│   ├── app/
│   │   ├── (Panel)/
│   │   │   ├── alerts/
│   │   │   ├── ambiente/
│   │   │   ├── configPanel/
│   │   │   ├── dashboard/
│   │   │   ├── gestion/
│   │   │   ├── route/
│   │   │   └── statistic/
│   │   ├── acerca_de/
│   │   ├── api/
│   │   │   ├── ambiente/metricas/
│   │   │   ├── auth/
│   │   │   ├── consumo/
│   │   │   ├── dashboard/
│   │   │   ├── data/
│   │   │   ├── estadisticas/
│   │   │   └── flota/
│   │   ├── login/
│   │   ├── register/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── components/
│   │   ├── AboutKutrol/
│   │   ├── alertas/
│   │   ├── ambiente/
│   │   ├── configuracion/
│   │   ├── dashboard/
│   │   ├── gestion/
│   │   ├── home/
│   │   ├── route/
│   │   ├── statistic/
│   │   └── ui/
│   │
│   ├── controllers/
│   ├── hooks/
│   ├── lib/
│   ├── repositories/
│   ├── schema/
│   ├── services/
│   └── utils/
│
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── next.config.mjs
├── package.json
└── README.md
```

### Organización de `src/`

- **`app/`**: páginas, layouts y endpoints de la aplicación.
- **`components/`**: componentes reutilizables de la interfaz, organizados por módulo.
- **`controllers/`**: coordinación de operaciones y lógica de control.
- **`hooks/`**: hooks personalizados de React.
- **`lib/`**: conexiones e infraestructura compartida, incluida la conexión a PostgreSQL.
- **`repositories/`**: consultas y operaciones de acceso a datos.
- **`schema/`**: esquemas de validación.
- **`services/`**: servicios y reglas de negocio.
- **`utils/`**: funciones auxiliares y de formateo.

---

## 👥 Equipo de desarrollo

| Integrante | Responsabilidad |
|---|---|
| **Carla Vargas** | Gestión de Requisitos y Relaciones Estratégicas |
| **Valentina Calderón** | Gestión de Requisitos y Arquitectura Documental |
| **Claudio Uribe** | Control de Calidad (QA) y Aseguramiento de Datos |
| **Cristóbal Oñate** | Control de Calidad (QA), Optimización y Frontend |

---

## 📋 Requisitos previos

Antes de ejecutar el proyecto, asegúrate de contar con las siguientes herramientas:

- [Docker Desktop](https://docs.docker.com/get-docker/): ejecución de contenedores.
- [Git](https://git-scm.com/): clonación y gestión del repositorio.
- [Node.js 22 o superior](https://nodejs.org/): necesario para ejecutar el proyecto directamente en el entorno local, fuera de Docker.

---

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/xCr1s12/Kutrol.git
cd Kutrol
```

### 2. Configurar las variables de entorno

Crea el archivo `.env` a partir de `.env.example` y configura las variables necesarias. Para conectar la aplicación a Neon, define allí la URL de conexión:

```env
DATABASE_URL=postgresql://...
```

No subas credenciales, contraseñas ni archivos `.env` con información sensible al repositorio.

### 3. Construir e iniciar los servicios

Con Docker Desktop abierto, ejecuta:

```bash
docker compose up -d --build
```

Este comando construye las imágenes necesarias e inicia los servicios definidos en `docker-compose.yml`.

### 4. Acceder a la aplicación

Abre el siguiente enlace en tu navegador:

**[http://localhost:3000](http://localhost:3000)**

Si la aplicación no está disponible inmediatamente, revisa los registros de los contenedores para identificar posibles errores de inicialización.

---

## 💻 Comandos útiles

### Docker

| Comando | Descripción |
|---|---|
| `docker compose up -d --build` | Construye las imágenes e inicia los servicios en segundo plano. |
| `docker compose down` | Detiene y elimina los contenedores del proyecto. |
| `docker compose logs -f nextjs` | Muestra los registros del servicio de la aplicación. |
| `docker compose ps` | Consulta el estado de los servicios. |

### Desarrollo local sin Docker

Si prefieres ejecutar Next.js directamente en tu equipo, instala las dependencias:

```bash
npm install
```

Configura las variables de entorno necesarias y asegúrate de que PostgreSQL esté disponible. Después, ejecuta:

```bash
npm run dev
```

Otros comandos útiles:

```bash
npm run build
npm run start
```

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la compilación para producción.
- `npm run start`: inicia la aplicación compilada para producción.

---

## 🗄️ Base de datos

KUTROL utiliza **PostgreSQL 16** como sistema de gestión de bases de datos relacionales. El esquema contempla 18 tablas organizadas en cuatro niveles funcionales.

| Nivel | Área | Tablas |
|---|---|---|
| 1 | Datos maestros | `EMPRESA`, `CONDUCTOR`, `CONDUCTOR_TELEFONO`, `CONDUCTOR_EMAIL` |
| 2 | Estructura y equipamiento | `TIPO`, `FLOTA`, `CAMION`, `SENSOR` |
| 3 | Operaciones y logística | `RUTA`, `PUNTO_CONTROL`, `VIAJE`, `CARGA`, `ASIGNACION` |
| 4 | Eventos y telemetría | `TELEMETRIA`, `ABASTECIMIENTO`, `MANTENCION`, `ANOMALIA`, `ALERTA` |

### Scripts SQL

Los scripts de `database/sql/` permiten organizar la inicialización y configuración del esquema:

| Archivo | Responsabilidad |
|---|---|
| `00_kutrol_reset.sql` | Reinicio del esquema de la base de datos. |
| `00_run_all.sql` | Ejecución consolidada de los scripts. |
| `01_base.sql` | Extensiones y configuraciones iniciales. |
| `02_tablas.sql` | Definición de las 18 tablas. |
| `03_indices.sql` | Creación de índices para optimizar consultas. |
| `04_triggers_auditoria.sql` | Configuración de triggers y auditoría. |
| `05_reglas_negocio.sql` | Implementación de validaciones en la base de datos. |
| `06_datos_base.sql` | Carga de datos iniciales. |

El archivo `database/seed.py` se utiliza para la simulación telemétrica.

> **Importante:** el script de reinicio puede eliminar estructuras o datos existentes. Ejecútalo únicamente cuando corresponda y después de verificar sus instrucciones.

---

## 🤝 Contribución al proyecto

Para mantener un desarrollo organizado y facilitar la integración de los cambios del equipo, se recomienda trabajar mediante ramas independientes y solicitudes de integración (*pull requests*).

Flujo de trabajo sugerido:

1. Actualizar la rama base del proyecto.
2. Crear una rama para la funcionalidad o corrección correspondiente.
3. Implementar los cambios y comprobar su funcionamiento.
4. Revisar las modificaciones antes de realizar el commit.
5. Publicar la rama y abrir un *pull request*.
6. Revisar y validar los cambios antes de integrarlos.

Se recomienda utilizar nombres descriptivos para las ramas, por ejemplo:

```text
feature/estadisticas
feature/metricas-ambiente
fix/validacion-consumo
docs/actualizacion-readme
```

---

<p align="center">
  <strong>KUTROL</strong><br />
  Gestión inteligente de combustible y telemetría vehicular<br />
  <em>Optimiza cada gota. Reduce tu huella.</em>
</p>
