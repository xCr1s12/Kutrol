-- ==============================================================================
-- Script DDL [Eficiencia de Combustible y Control de Pérdidas] - v4
-- Grupo: 1 [KUTROL]
-- Integrantes: Carla Vargas, Claudio Uribe, Valentina Calderon, Cristobal Oñate
-- SGBD: PostgreSQL 16
-- Base: bd_grupo1_Kutrol          Esquema: kutrol
-- ------------------------------------------------------------------------------
-- ARCHIVO 01/06: esquema, extensiones y funciones genéricas
-- (el BEGIN/COMMIT está en 00_run_all.sql)
--
-- ESTÁNDAR DE NOMENCLATURA
--   Tablas ............ MAYÚSCULAS, singular. Multivaluadas: ENTIDAD_ATRIBUTO
--   Columnas .......... snake_case. PK: id_<tabla>. FK: mismo nombre que la PK referenciada
--   Constraints ....... uq_<tabla>_<campo>      chk_<tabla>_<campo|regla>
--                       excl_<tabla>_<regla>     fk_<tabla_origen>_<tabla_ref>
--                       - Si la tabla referenciada es larga se abrevia:
--                         telem (TELEMETRIA), tipo_med (TIPO_MEDICION),
--                         nivel_jer (NIVEL_JERARQUICO), encargado (ENCARGADO_EMPRESA)
--                       - Si hay 2+ FK a la misma tabla se agrega distintivo:
--                         fk_ruta_comuna_origen, fk_ruta_comuna_destino
--   Índices ........... idx_<tabla>_<campo>
--   Triggers .......... trg_<tabla>_<accion>
--   Funciones ......... fn_<tabla>_<accion>  (genérica: fn_set_updated_at)
--
-- DECISIONES DE DISEÑO
--   * Validación de RUT/RUN y formato de patente: se hacen en el backend (no hay CHECK).
--   * Fuente de verdad de los estados: VIAJE.estado. Los estados de ASIGNACION, CAMION
--     y CONDUCTOR se derivan por trigger.
--   * Nada se borra físicamente: los datos históricos usan ON DELETE RESTRICT y las bajas
--     se manejan con estado o deleted_at. CASCADE solo en tablas de contacto.
--   * Fechas operativas en TIMESTAMPTZ. Zona de negocio: America/Santiago.
--   * TELEMETRIA y LECTURA están particionadas por mes (fecha_hora). Por eso sus PK y FK
--     incluyen fecha_hora.
--   * Sin roles/permisos ni datos semilla de REGION/COMUNA (pendiente).
-- ==============================================================================

-- ==============================================================================
-- 0. ESQUEMA Y EXTENSIONES
-- ==============================================================================
CREATE SCHEMA kutrol;
<<<<<<< HEAD
CREATE SCHEMA IF NOT EXISTS public;          -- <-- nueva
SET search_path TO kutrol, public;

CREATE EXTENSION IF NOT EXISTS btree_gist SCHEMA public;
=======
SET search_path TO kutrol, public;

CREATE EXTENSION IF NOT EXISTS btree_gist SCHEMA public;

>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
-- ==============================================================================
-- 1. FUNCIONES GENÉRICAS
-- ==============================================================================
CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Normaliza texto para identificadores: minúscula, sin tildes/ñ, solo [a-z0-9] separado por '_'
-- Ej: 'Pérez Muñoz' -> 'perez_munoz'.  STABLE porque lower() depende de la collation.
CREATE OR REPLACE FUNCTION fn_normalizar_texto(p_texto TEXT)
RETURNS TEXT AS
$$
    SELECT btrim(
               regexp_replace(
                   translate(lower(p_texto), 'áéíóúüñàèìòùâêîôûä', 'aeiouunaeiouaeioua'),
                   '[^a-z0-9]+', '_', 'g'),
               '_');
$$ LANGUAGE sql STABLE;
