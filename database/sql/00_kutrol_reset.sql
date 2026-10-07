-- ==============================================================================
-- KUTROL - RESET (BORRA TODO)
-- Elimina el esquema kutrol completo: tablas, particiones, funciones, triggers,
-- índices y secuencias. Los datos se pierden de forma irreversible.
--
-- Uso (luego de esto, ejecutar 00_run_all.sql):
--   psql -U kutrol -d bd_grupo1_Kutrol -f sql/00_kutrol_reset.sql
--
-- No elimina la extensión btree_gist (vive en public y 01_base.sql usa IF NOT EXISTS).
-- ==============================================================================
\set ON_ERROR_STOP on

BEGIN;

DROP SCHEMA IF EXISTS kutrol CASCADE;

-- Quita el search_path a nivel de base (lo vuelve a fijar 06_datos_base.sql)
DO $$
BEGIN
    EXECUTE format('ALTER DATABASE %I RESET search_path', current_database());
END $$;

COMMIT;
