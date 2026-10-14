-- ==============================================================================
-- ARCHIVO 04/06: triggers de auditoría (sección 11)
-- ==============================================================================
SET search_path TO kutrol, public;

-- ==============================================================================
-- 11. TRIGGERS DE AUDITORÍA (updated_at)
--     TELEMETRIA y LECTURA no tienen updated_at: son tablas de solo inserción.
-- ==============================================================================
CREATE TRIGGER trg_empresa_updated_at           BEFORE UPDATE ON EMPRESA           FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_encargado_empresa_updated_at BEFORE UPDATE ON ENCARGADO_EMPRESA FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_conductor_updated_at         BEFORE UPDATE ON CONDUCTOR         FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_flota_updated_at             BEFORE UPDATE ON FLOTA             FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_camion_updated_at            BEFORE UPDATE ON CAMION            FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_sensor_updated_at            BEFORE UPDATE ON SENSOR            FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_ruta_updated_at              BEFORE UPDATE ON RUTA              FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_viaje_updated_at             BEFORE UPDATE ON VIAJE             FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_carga_updated_at             BEFORE UPDATE ON CARGA             FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_asignacion_updated_at        BEFORE UPDATE ON ASIGNACION        FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_abastecimiento_updated_at    BEFORE UPDATE ON ABASTECIMIENTO    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_anomalia_updated_at          BEFORE UPDATE ON ANOMALIA          FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_alerta_updated_at            BEFORE UPDATE ON ALERTA            FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_mantencion_updated_at        BEFORE UPDATE ON MANTENCION        FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
