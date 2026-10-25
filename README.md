
# KUTROL — Gestión Inteligente de Combustible

> **Optimiza cada gota. Reduce tu huella.**

KUTROL es una plataforma web de gestión de combustible y telemetría vehicular para flotas de transporte terrestre de la Provincia de Chiloé. Transforma datos operacionales en información útil mediante estadísticas, análisis de telemetría y métricas de sostenibilidad ambiental.

Permite identificar ineficiencias en el consumo, detectar anomalías operacionales y tomar decisiones basadas en datos, con el fin de reducir costos y el impacto ambiental del transporte.

---

## Tabla de contenidos

- [Descripción y objetivos](#descripción-y-objetivos)
- [Ficha técnica y enlaces](#ficha-técnica-y-enlaces)
- [Funcionalidades](#funcionalidades)
- [Stack tecnológico](#stack-tecnológico)
- [Arquitectura N-Capas y flujo de una petición](#arquitectura-n-capas-y-flujo-de-una-petición)
- [Modelo de datos (PostgreSQL)](#modelo-de-datos-postgresql)
- [Contrato de API REST](#contrato-de-api-rest)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Equipo y roles](#equipo-y-roles)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Variables de entorno](#variables-de-entorno)
- [Comandos útiles y pruebas](#comandos-útiles-y-pruebas)
- [Contribución al proyecto](#contribución-al-proyecto)

---

## Descripción y objetivos

La gestión eficiente del combustible es un desafío para las empresas de transporte, sobre todo cuando deben supervisar varios vehículos, controlar sus gastos y evaluar el desempeño de sus flotas. KUTROL centraliza la información de vehículos, conductores, rutas, viajes, abastecimientos, mantenciones y telemetría, y a partir de ella muestra indicadores, patrones de consumo y eventos que requieren atención.

- **Optimización operacional:** encontrar oportunidades de mejora en el consumo de combustible.
- **Control de flota:** centralizar vehículos, conductores, rutas y viajes.
- **Monitoreo inteligente:** registrar eventos de telemetría y detectar anomalías.
- **Análisis de datos:** entregar estadísticas e indicadores para decidir con respaldo.
- **Sostenibilidad ambiental:** seguir el consumo y las emisiones de CO₂.

---

## Ficha técnica y enlaces

| Recurso | Detalle |
|---|---|
| **Aplicación en producción** | https://kutrol.vercel.app |
| **API REST en producción** | https://kutrol.vercel.app/api |
| **Base de datos** | PostgreSQL en Neon |
| **Visor de datos (NocoDB)** | [Abrir visor](https://app.nocodb.com/invite/oZLF_MGM60xMSs2o31tB_QID008uM-m-1og7d2SDVF8) |
| **Repositorio** | https://github.com/xCr1s12/Kutrol |
| **Usuario de prueba** | `admin` |
| **Contraseña de prueba** | `admin` |

El "backend" son las API Routes de Next.js, que se despliegan en el mismo dominio de Vercel que el frontend. La base de datos es externa (Neon).

---

## Funcionalidades

| Módulo | Descripción |
|---|---|
| **Dashboard** | Indicadores de consumo, gasto total, rendimiento (km/L) y ranking de conductores. |
| **Gestión de flota** | Flotas, vehículos, conductores e historiales. |
| **Rutas** | Registro y consulta de rutas con origen y destino. |
| **Estadísticas** | Consumo y gasto por período (semanal, mensual y anual). |
| **Alertas** | Alertas y anomalías con su nivel de severidad. |
| **Sostenibilidad** | Estimación de CO₂ emitido y mapa de calor ambiental. |
| **Configuración** | Edición de los datos de la empresa (nombre, contacto, imagen). |
| **Autenticación** | Sesión con JWT en cookie `httpOnly` y protección de rutas en `proxy.js`. |

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19 |
| **Estilos y visualización** | Tailwind CSS v4, Material UI Icons, Leaflet, Chart.js |
| **Backend** | Next.js API Routes (Node.js) |
| **Seguridad y validación** | `jose` (JWT), `bcryptjs`, Zod |
| **Base de datos** | PostgreSQL 16, driver `pg` con consultas parametrizadas |
| **Imágenes** | Cloudinary |
| **Despliegue** | Vercel (aplicación) y Neon (base de datos) |
| **Desarrollo local** | Docker y Docker Compose |

---

## Arquitectura N-Capas y flujo de una petición

```mermaid
flowchart TD
    A["Presentación<br/>React: src/app, src/components"] -->|"fetch() + cookie kutrol_session"| B["Seguridad<br/>src/proxy.js: valida JWT y pertenencia"]
    B -->|"NextResponse.next()"| C["Rutas<br/>src/app/api/**/route.js"]
    C --> D["Controladores<br/>src/controllers: Zod y códigos HTTP"]
    D --> E["Servicios<br/>src/services/server: reglas de negocio"]
    E --> F["Repositorios<br/>src/repositories: SQL parametrizado"]
    F -->|"SQL con $1, $2..."| G[("PostgreSQL 16")]
    G -->|"filas"| F
    F --> E
    E --> D
    D -->|"JSON + código HTTP"| A
```

### Ejemplo paso a paso: `GET /api/data/vehiculos?flota_id=1`

1. **Presentación.** El componente `tablaCamiones.jsx` llama a `fetch` y el navegador envía la cookie `kutrol_session`.
2. **Seguridad.** `proxy.js` valida el JWT. Si la flota pedida no pertenece a la empresa del usuario, responde `403`.
3. **Ruta.** `app/api/data/vehiculos/route.js` exporta el manejador `GET` y lo delega en el controlador.
4. **Controlador.** `vehiculos.controller.js` valida `flota_id` con Zod. Si es inválido responde `400`.
5. **Servicio.** `vehiculos.service.js` aplica las reglas de negocio.
6. **Repositorio.** `Vehiculos.repository.js` ejecuta la consulta parametrizada y excluye los registros con `deleted_at` no nulo.
7. **Respuesta.** Los datos suben por las mismas capas y el controlador responde `200` con JSON.

Los errores no controlados pasan por `toErrorResponse` (`src/utils/errors.js`), que traduce las excepciones a códigos HTTP (400, 401, 403, 404, 409, 500) sin exponer detalles internos.

---

## Modelo de datos (PostgreSQL)

El esquema `kutrol` tiene **27 tablas** en 5 áreas. Los diagramas completos están en [`documents/`](documents/) (`Modelo Relacional.png`).

| Área | Tablas |
|---|---|
| **Ubicación** | `region`, `comuna` |
| **Empresa y personas** | `empresa`, `empresa_email`, `empresa_telefono`, `encargado_empresa`, `nivel_jerarquico`, `conductor`, `conductor_email`, `conductor_telefono` |
| **Flota y equipamiento** | `tipo_flota`, `flota`, `camion`, `sensor`, `tipo_medicion`, `severidad` |
| **Operación y logística** | `ruta`, `punto_control`, `viaje`, `carga`, `asignacion`, `abastecimiento` |
| **Monitoreo y alertas** | `telemetria`, `lectura`, `anomalia`, `alerta`, `mantencion` |

### Relaciones principales

```mermaid
erDiagram
    REGION ||--o{ COMUNA : tiene
    COMUNA ||--o{ EMPRESA : ubica
    EMPRESA ||--o{ ENCARGADO_EMPRESA : tiene
    NIVEL_JERARQUICO ||--o{ ENCARGADO_EMPRESA : clasifica
    EMPRESA ||--o{ CONDUCTOR : emplea
    EMPRESA ||--o{ FLOTA : posee
    TIPO_FLOTA ||--o{ FLOTA : clasifica
    FLOTA ||--o{ CAMION : agrupa
    CAMION ||--o{ SENSOR : equipa
    TIPO_MEDICION ||--o{ SENSOR : mide
    SEVERIDAD ||--o{ TIPO_MEDICION : define
    RUTA ||--o{ PUNTO_CONTROL : contiene
    COMUNA ||--o{ RUTA : "origen y destino"
    EMPRESA ||--o{ VIAJE : realiza
    CAMION ||--o{ VIAJE : cumple
    RUTA ||--o{ VIAJE : recorre
    VIAJE ||--o{ CARGA : transporta
    VIAJE ||--o{ ASIGNACION : tiene
    CONDUCTOR ||--o{ ASIGNACION : recibe
    VIAJE ||--o{ ABASTECIMIENTO : registra
    CAMION ||--o{ ABASTECIMIENTO : carga
    CONDUCTOR ||--o{ ABASTECIMIENTO : realiza
    VIAJE ||--o{ TELEMETRIA : genera
    CAMION ||--o{ TELEMETRIA : emite
    TELEMETRIA ||--o{ LECTURA : contiene
    SENSOR ||--o{ LECTURA : produce
    LECTURA ||--o{ ANOMALIA : origina
    SEVERIDAD ||--o{ ANOMALIA : clasifica
    ANOMALIA ||--o{ ALERTA : dispara
    ALERTA ||--o{ MANTENCION : deriva
    CAMION ||--o{ MANTENCION : recibe
```

### Scripts SQL (`database/sql/`)

| Archivo | Responsabilidad |
|---|---|
| `00_kutrol_reset.sql` | Reinicia el esquema (elimina datos y estructuras existentes) |
| `00_run_all.sql` | Ejecuta los scripts 01 a 06 en orden |
| `01_base.sql` | Extensiones y esquema `kutrol` |
| `02_tablas.sql` | Definición de las 27 tablas |
| `03_indices.sql` | Índices para optimizar consultas |
| `04_triggers_auditoria.sql` | Triggers de auditoría |
| `05_reglas_negocio.sql` | Validaciones y reglas en la base de datos |
| `06_datos_base.sql` | Datos maestros iniciales |

> **Cuidado:** `00_kutrol_reset.sql` borra datos. Ejecútalo solo cuando lo necesites.

### Integridad y optimización

- **Referencial:** `ON DELETE RESTRICT` en las tablas principales y `CASCADE` en teléfonos y correos.
- **CHECK:** capacidades mayores que 0, latitud entre −90 y 90, estados válidos de vehículo (`DISPONIBLE`, `EN_RUTA`, `MANTENCION`, `FUERA_DE_SERVICIO`) y formatos de texto con expresiones regulares.
- **UNIQUE:** RUT de empresa, RUN de conductor, patente de vehículo y código de dispositivo.
- **Borrado lógico:** columna `deleted_at` para conservar el historial.
- **Particionado:** `telemetria` y `lectura` están particionadas por mes.

---

## Contrato de API REST

Todas las respuestas son JSON. Las rutas privadas exigen la cookie de sesión `kutrol_session` (`httpOnly`, `sameSite=lax`); el cliente no envía encabezados de autorización. Los cuerpos con datos usan `Content-Type: application/json`, salvo la subida de imágenes (`multipart/form-data`).

### Autenticación y datos públicos

| Método | Ruta | Acceso | Descripción | Respuestas |
|---|---|---|---|---|
| POST | `/api/auth/register` | Público | Registra empresa, contacto y encargado en una transacción | 201, 400, 409 (RUT o correo repetido) |
| POST | `/api/auth/login` | Público | Autentica y establece la cookie JWT | 200, 400, 401 |
| POST | `/api/auth/logout` | Público | Elimina la cookie de sesión | 200, 500 |
| GET | `/api/auth/session` | Público | Estado de autenticación y datos del usuario | 200, 401 |
| GET | `/api/regiones` | Público | Lista las regiones de Chile | 200, 500 |
| GET | `/api/comunas?regionId={id}` | Público | Lista las comunas de una región | 200, 400, 404 |

### Datos de la empresa

| Método | Ruta | Acceso | Descripción | Respuestas |
|---|---|---|---|---|
| GET | `/api/data/empresa` | Privado | Datos de la empresa de la sesión | 200, 401, 404 |
| PUT | `/api/data/empresa` | Privado | Actualiza los datos de la empresa de la sesión | 200, 400, 401, 409 |
| GET | `/api/flota` | Privado | Flotas de la empresa de la sesión | 200, 401, 403 |
| POST | `/api/flota` | Privado | Crea una flota | 201, 400, 401 |
| GET | `/api/tipos-flota` | Privado | Lista los tipos de flota | 200, 401 |
| GET | `/api/data/vehiculos?flota_id={id}` | Privado | Vehículos activos de una flota | 200, 400, 401, 403 |
| POST | `/api/data/vehiculos` | Privado | Registra un vehículo (valida patente chilena) | 201, 400, 401, 409 (patente repetida) |
| GET | `/api/data/rutas` | Privado | Rutas de la empresa | 200, 401, 500 |
| POST | `/api/data/rutas` | Privado | Registra una ruta | 201, 401, 500 |
| GET | `/api/alerts` | Privado | Alertas de la empresa | 200, 401, 500 |

### Métricas, estadísticas y sostenibilidad

| Método | Ruta | Acceso | Descripción | Respuestas |
|---|---|---|---|---|
| GET | `/api/dashboard/metricas` | Privado | Resumen ejecutivo: vehículos, gasto y km/L | 200, 401, 500 |
| GET | `/api/ambiente/metricas` | Privado | Emisiones de CO₂ calculadas desde el combustible | 200, 401, 500 |
| GET | `/api/ambiente/mapa-calor` | Privado | Datos geográficos para el mapa de calor de la empresa | 200, 401, 500 |
| GET | `/api/estadisticas` | Privado | Métricas avanzadas para la vista de estadísticas | 200, 401, 500 |
| GET | `/api/consumo?periodo={p}` | Privado | Litros por período: `semanal`, `mensual` o `anual` | 200, 401, 500 |

### Imágenes

| Método | Ruta | Acceso | Descripción | Respuestas |
|---|---|---|---|---|
| POST | `/api/upload` | Público | Sube una imagen a Cloudinary (JPG, PNG o WEBP, máx. 5 MB) | 201, 400 |
| DELETE | `/api/upload` | Privado | Elimina la imagen asociada a la empresa | 200, 401, 404 |

### Ejemplos de respuesta

```json
// 200 — GET /api/data/vehiculos?flota_id=1
{ "ok": true, "data": [ { "id_camion": 1, "patente": "ABCD12", "estado": "DISPONIBLE" } ] }
```

```json
// 403 — flota de otra empresa
{ "ok": false, "error": { "code": "FORBIDDEN", "message": "No tienes permiso para acceder a esta flota" } }
```

---

## Estructura del repositorio

```text
Kutrol/
├── database/
│   ├── init.sql                      # Carga el esquema al crear el contenedor
│   └── sql/
│       ├── 00_kutrol_reset.sql       # Limpieza completa del esquema
│       ├── 00_run_all.sql            # Ejecuta los scripts 01 a 06 en orden
│       ├── 01_base.sql               # Extensiones y esquema kutrol
│       ├── 02_tablas.sql             # Las 27 tablas
│       ├── 03_indices.sql            # Índices
│       ├── 04_triggers_auditoria.sql # Triggers de auditoría
│       ├── 05_reglas_negocio.sql     # Reglas de negocio y restricciones
│       └── 06_datos_base.sql         # Datos maestros iniciales
├── documents/                        # Modelo relacional y material de diseño
├── public/                           # Logotipos e isotipos (SVG)
├── src/
│   ├── app/
│   │   ├── (Panel)/                  # Vistas protegidas
│   │   │   ├── alerts/
│   │   │   ├── ambiente/
│   │   │   ├── configPanel/
│   │   │   ├── dashboard/
│   │   │   ├── gestion/
│   │   │   ├── route/
│   │   │   └── statistic/
│   │   ├── acerca_de/
│   │   ├── api/                      # Rutas de la API REST
│   │   ├── login/
│   │   └── register/
│   ├── components/                   # Componentes de interfaz
│   ├── controllers/                  # Validación con Zod y códigos HTTP
│   ├── hooks/                        # Hooks de React
│   ├── lib/                          # Sesión, JWT y conexión a la base
│   ├── repositories/                 # Consultas SQL parametrizadas
│   ├── schema/                       # Esquemas Zod
│   ├── services/                     # client/ y server/
│   ├── utils/                        # Manejo de errores (errors.js)
│   └── proxy.js                      # Middleware de autenticación y autorización
├── tests/                            # Pruebas automatizadas
├── .env.example                      # Plantilla de variables de entorno
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

---

## Equipo y roles

| Integrante | Rol | Responsabilidades |
|---|---|---|
| Cristóbal Oñate | Backend | API REST, autenticación JWT, seguridad en `proxy.js` e integración cliente-servidor |
| Valentina Calderón | Frontend (UI/UX) | Prototipo en Figma, sistema de componentes, vistas de configuración y alertas, portada |
| Carla Vargas | QA | Pruebas de integración, vistas de sostenibilidad ambiental y estadísticas |
| Claudio Uribe | Database / DevOps | Modelo de datos, despliegue, evaluación de usabilidad y refactorización de hooks |

---

## Requisitos previos

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) 22 o superior (para ejecutar sin Docker)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (para ejecutar con contenedores)
- PostgreSQL 16 (solo si no usas Docker)

---

## Instalación y ejecución

### Opción A: Docker Compose (recomendada)

```bash
git clone https://github.com/xCr1s12/Kutrol.git
cd Kutrol
cp .env.example .env      # luego completa AUTH_SECRET y CLOUDINARY_URL
docker compose up -d --build
```

Abre http://localhost:3000. Al crear el contenedor, la base se carga sola con `database/init.sql`.

Los servicios se llaman `postgres` y `nextjs`.

### Opción B: Node.js y PostgreSQL locales

```bash
git clone https://github.com/xCr1s12/Kutrol.git
cd Kutrol
npm install
cp .env.example .env      # apunta DATABASE_URL a tu PostgreSQL local
```

Crea la base y carga el esquema (el script resuelve sus rutas por sí mismo):

```bash
createdb -U <usuario> bd_grupo1_Kutrol
psql -U <usuario> -d bd_grupo1_Kutrol -f database/sql/00_run_all.sql
```

Inicia el servidor:

```bash
npm run dev
```

Abre http://localhost:3000.

---

## Variables de entorno

Crea un archivo `.env` en la raíz, basado en `.env.example`:

```bash
# Conexión a PostgreSQL
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@localhost:5432/bd_grupo1_Kutrol"

# Clave para firmar los JWT. Generar con:
# node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
AUTH_SECRET="reemplazar_por_una_clave_aleatoria"

# Cloudinary: cloudinary://API_KEY:API_SECRET@CLOUD_NAME
CLOUDINARY_URL="cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
```

> El archivo `.env` está en `.gitignore` y no debe subirse al repositorio. En producción, las credenciales se configuran en las variables de entorno de Vercel.

---

## Comandos útiles y pruebas

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación para producción |
| `npm run start` | Ejecuta la compilación |
| `npm test` | Ejecuta las pruebas de la carpeta `tests/` |
| `npm run lint` | Revisa el código con ESLint |

### Docker

| Comando | Descripción |
|---|---|
| `docker compose up -d --build` | Construye y levanta los servicios |
| `docker compose down` | Detiene y elimina los contenedores |
| `docker compose logs -f nextjs` | Logs de la aplicación |
| `docker compose logs -f postgres` | Logs de la base de datos |
| `docker compose exec postgres psql -U kutrol -d bd_grupo1_Kutrol` | Consola de PostgreSQL |

---

## Contribución al proyecto

Trabajamos con ramas independientes y *pull requests*:

1. Actualizar la rama base.
2. Crear una rama para la funcionalidad o corrección.
3. Implementar los cambios y comprobar que funcionan (`npm test`).
4. Revisar los cambios antes de hacer commit.
5. Publicar la rama y abrir un *pull request*.
6. Revisar y validar antes de integrar.

Nombres de rama sugeridos:

```text
feature/estadisticas
fix/validacion-consumo
docs/actualizacion-readme
```

<p align="center">
  <strong>KUTROL</strong><br />
  Gestión inteligente de combustible y telemetría vehicular<br />
  <em>Optimiza cada gota. Reduce tu huella.</em>
</p>
