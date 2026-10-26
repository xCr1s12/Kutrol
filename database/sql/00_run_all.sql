-- ==============================================================================
-- KUTROL - Script maestro (psql)
-- Ejecuta todos los archivos EN ORDEN y dentro de UNA sola transacción.
--
--   psql -U postgres -d bd_grupo1_Kutrol -f sql/00_run_all.sql
--
-- ORDEN (no cambiar: cada archivo depende de los anteriores)
--   01_base.sql                 esquema, extensión, funciones genéricas
--   02_tablas.sql               catálogos, tablas, particiones
--   03_indices.sql              índices
--   04_triggers_auditoria.sql   triggers de updated_at
--   05_reglas_negocio.sql       funciones y triggers de negocio
--   06_datos_base.sql           catálogo de mediciones y search_path de la BD
--   07_alerta_automatica.sql    cada anomalía nueva genera su alerta
--
-- Reiniciar desde cero: ejecutar antes 00_kutrol_reset.sql (BORRA TODO el esquema).
-- Nota: \ir resuelve la ruta relativa a ESTE archivo (no a la carpeta actual).
-- ==============================================================================
\set ON_ERROR_STOP on

BEGIN;

\ir 01_base.sql
\ir 02_tablas.sql
\ir 03_indices.sql
\ir 04_triggers_auditoria.sql
\ir 05_reglas_negocio.sql
\ir 06_datos_base.sql
\ir 07_alerta_automatica.sql

COMMIT;
