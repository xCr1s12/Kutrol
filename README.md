# KUTROL — Gestión Inteligente de Combustible

> Optimiza cada gota. Reduce tu huella.

Sistema de gestión de combustible para flotas de transporte terrestre en la Provincia de Chiloé. Transforma datos crudos de telemetría en estadísticas accionables para erradicar la fuga de capital por robos e ineficiencia.

---

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js 16, React 19, Tailwind CSS v4 |
| Backend | Next.js API Routes |
| Base de datos | PostgreSQL 16 |
| Runtime | Node 22, Docker |

---

## Equipo

| Nombre | Rol |
|--------|-----|
| Carla Vargas | Gestión de Requisitos y Relaciones Estratégicas |
| Valentina Calderón | Gestión de Requisitos y Arquitectura Documental |
| Claudio Uribe | Control de Calidad (QA) y Aseguramiento de Datos |
| Cristóbal Oñate | Control de Calidad (QA) y Optimización / Frontend |

---

## Requisitos previos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Node.js 22+](https://nodejs.org/) (si trabajas fuera de Docker)
- Git

---

## Inicio rápido

```bash
#1. Clonar el repo
git clone <url-del-repo>
cd Kutrol

#2. Levantar todo (PostgreSQL + Next.js)
docker compose up -d

#3. Abrir en el navegador
open http://localhost:3000
```

La base de datos se inicializa automáticamente con datos de prueba al primer `docker compose up`.

### Solo la base de datos (sin Docker)

```bash
# Crear la BD
createdb bd_grupo1_Kutrol

# Ejecutar el schema
psql -d bd_grupo1_Kutrol -f database/Kutrol.sql

# Copiar variables de entorno
cp .env.example .env.local

# Instalar dependencias e iniciar
npm install
npm run dev
```

---

## Estructura del proyecto

```
Kutrol/
├── database/
│   └── Kutrol.sql              # Schema completo (18 tablas + seed data)
├── documents/                  # Diagramas y documentación del proyecto
├── public/                     # Assets estáticos
├── src/
│   ├── app/
│   │   ├── api/                # API routes (endpoints REST)
│   │   ├── dashboard/          # Páginas del dashboard
│   │   ├── page.js             # Landing page
│   │   └── layout.js           # Layout raíz
│   ├── components/
│   │   ├── ui/                 # Componentes atómicos (botones, inputs, cards)
│   │   └── layout/             # Sidebar, navbar, header
│   ├── lib/
│   │   └── db.js               # Pool de conexión PostgreSQL
│   ├── hooks/                  # Custom hooks de React
│   └── utils/                  # Helpers, formateo, cálculos
├── .env.example                # Template de variables de entorno
├── docker-compose.yml          # PostgreSQL + Next.js
└── package.json
```

---

## Base de datos

El schema tiene **18 tablas** organizadas en niveles:

| Nivel | Tablas |
|-------|--------|
| Maestras | EMPRESA, CONDUCTOR, CONDUCTOR_TELEFONO, CONDUCTOR_EMAIL |
| Estructura | TIPO, FLOTA, CAMION, SENSOR |
| Operaciones | RUTA, PUNTO_CONTROL, VIAJE, CARGA, ASIGNACION |
| Eventos | TELEMETRIA, ABASTECIMIENTO, MANTENCION, ANOMALIA, ALERTA |

Ver `database/Kutrol.sql` para el DDL completo con constraints, triggers y datos de prueba.

---

## Comandos útiles

```bash
# Desarrollo
docker compose up -d            # Levantar todo
docker compose down             # Detener todo
docker compose logs -f nextjs   # Ver logs de Next.js
docker compose logs -f postgres # Ver logs de PostgreSQL

# Base de datos
docker compose exec postgres psql -U kutrol -d bd_grupo1_Kutrol  # Entrar a psql

# Next.js (fuera de Docker)
npm run dev                     # Servidor de desarrollo
npm run build                   # Build de producción
npm run start                   # Iniciar en producción
npm run lint                    # Linting
```

---

## Convenciones

- **Branches:** `main` (producción), `develop` (integración), `feature/nombre` (nuevas features)
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `docs:`, `test:`
- **Archivos de entorno:** `.env.local` NUNCA se commitea
- **Componentes:** usar `@/components/...` con el alias de jsconfig.json

---

## Documentación del proyecto

- `documents/Mapa de Actores.jpg` — Mapa de actores del sistema
- `documents/Mapa de empatia.pdf` — Mapas de empatía por rol
- `documents/Modelo Relacional.png` — Diagrama ER
- `documents/Paleta_de_colores.html` — Paleta de colores del dashboard
