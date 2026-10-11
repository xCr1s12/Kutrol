-- ==============================================================================
-- ARCHIVO 05/06: reglas de negocio (secciones 12 a 18)
-- ==============================================================================
SET search_path TO kutrol, public;

-- ==============================================================================
-- 12. REGLAS DE NEGOCIO: CAMION
-- ==============================================================================

-- 12.1 El año del camión no puede superar el año actual + 1 (no se usa CHECK por no ser determinista)
CREATE OR REPLACE FUNCTION fn_camion_validar_ano()
RETURNS TRIGGER AS
$$
BEGIN
    IF NEW.ano > EXTRACT(YEAR FROM CURRENT_DATE)::INT + 1 THEN
        RAISE EXCEPTION 'Año % inválido: no puede superar %.', NEW.ano, EXTRACT(YEAR FROM CURRENT_DATE)::INT + 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_camion_validar_ano
BEFORE INSERT OR UPDATE OF ano ON CAMION
FOR EACH ROW EXECUTE FUNCTION fn_camion_validar_ano();

-- 12.2 Si un camión cambia de flota, no puede cambiar de empresa si ya tiene viajes
CREATE OR REPLACE FUNCTION fn_camion_validar_cambio_flota()
RETURNS TRIGGER AS
$$
DECLARE
    v_empresa_nueva INTEGER;
BEGIN
    SELECT id_empresa INTO v_empresa_nueva FROM FLOTA WHERE id_flota = NEW.id_flota;

    IF EXISTS (SELECT 1 FROM VIAJE WHERE id_camion = NEW.id_camion AND id_empresa <> v_empresa_nueva) THEN
        RAISE EXCEPTION 'El camión % tiene viajes de otra empresa; no se puede mover a la flota % (empresa %).',
            NEW.id_camion, NEW.id_flota, v_empresa_nueva;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_camion_validar_cambio_flota
BEFORE UPDATE OF id_flota ON CAMION
FOR EACH ROW WHEN (OLD.id_flota IS DISTINCT FROM NEW.id_flota)
EXECUTE FUNCTION fn_camion_validar_cambio_flota();

-- 12.3 Recalcula el estado operativo del camión desde sus viajes (no toca MANTENCION ni FUERA_DE_SERVICIO)
CREATE OR REPLACE FUNCTION fn_camion_recalcular_estado(p_id_camion INTEGER)
RETURNS VOID AS
$$
DECLARE
    v_nuevo VARCHAR(20);
BEGIN
    IF EXISTS (SELECT 1 FROM VIAJE WHERE id_camion = p_id_camion AND estado = 'EN_CURSO') THEN
        v_nuevo := 'EN_RUTA';
    ELSE
        v_nuevo := 'DISPONIBLE';
    END IF;

    UPDATE CAMION
       SET estado = v_nuevo
     WHERE id_camion = p_id_camion
       AND estado IN ('DISPONIBLE','EN_RUTA')
       AND estado <> v_nuevo;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 13. REGLAS DE NEGOCIO: FLOTA, CONDUCTOR, SENSOR (integridad entre tablas)
-- ==============================================================================

-- 13.1 FLOTA: no cambiar de empresa si sus camiones ya tienen viajes de la empresa anterior
CREATE OR REPLACE FUNCTION fn_flota_validar_cambio_empresa()
RETURNS TRIGGER AS
$$
BEGIN
    IF EXISTS (SELECT 1
                 FROM VIAJE v
                 JOIN CAMION c ON c.id_camion = v.id_camion
                WHERE c.id_flota = NEW.id_flota
                  AND v.id_empresa <> NEW.id_empresa) THEN
        RAISE EXCEPTION 'La flota % tiene camiones con viajes de otra empresa; no se puede cambiar a la empresa %.',
            NEW.id_flota, NEW.id_empresa;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_flota_validar_cambio_empresa
BEFORE UPDATE OF id_empresa ON FLOTA
FOR EACH ROW WHEN (OLD.id_empresa IS DISTINCT FROM NEW.id_empresa)
EXECUTE FUNCTION fn_flota_validar_cambio_empresa();

-- 13.2 CONDUCTOR: no cambiar de empresa si ya tiene asignaciones en viajes de otra empresa
CREATE OR REPLACE FUNCTION fn_conductor_validar_cambio_empresa()
RETURNS TRIGGER AS
$$
BEGIN
    IF EXISTS (SELECT 1
                 FROM ASIGNACION a
                 JOIN VIAJE v ON v.id_viaje = a.id_viaje
                WHERE a.id_conductor = NEW.id_conductor
                  AND v.id_empresa <> NEW.id_empresa) THEN
        RAISE EXCEPTION 'El conductor % tiene asignaciones en viajes de otra empresa; no se puede cambiar a la empresa %.',
            NEW.id_conductor, NEW.id_empresa;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_conductor_validar_cambio_empresa
BEFORE UPDATE OF id_empresa ON CONDUCTOR
FOR EACH ROW WHEN (OLD.id_empresa IS DISTINCT FROM NEW.id_empresa)
EXECUTE FUNCTION fn_conductor_validar_cambio_empresa();

-- 13.3 CONDUCTOR: recalcula el estado desde sus asignaciones activas (no toca INACTIVO)
CREATE OR REPLACE FUNCTION fn_conductor_recalcular_estado(p_id_conductor INTEGER)
RETURNS VOID AS
$$
DECLARE
    v_nuevo VARCHAR(20);
BEGIN
    IF EXISTS (SELECT 1
                 FROM ASIGNACION a
                 JOIN VIAJE v ON v.id_viaje = a.id_viaje
                WHERE a.id_conductor = p_id_conductor
                  AND a.estado = 'ACTIVA'
                  AND v.estado = 'EN_CURSO') THEN
        v_nuevo := 'EN_RUTA';
    ELSE
        v_nuevo := 'ACTIVO';
    END IF;

    UPDATE CONDUCTOR
       SET estado = v_nuevo
     WHERE id_conductor = p_id_conductor
       AND estado IN ('ACTIVO','EN_RUTA')
       AND estado <> v_nuevo;
END;
$$ LANGUAGE plpgsql;

-- 13.4 SENSOR: no se puede cambiar de camión si ya tiene lecturas
CREATE OR REPLACE FUNCTION fn_sensor_validar_cambio_camion()
RETURNS TRIGGER AS
$$
BEGIN
    IF EXISTS (SELECT 1 FROM LECTURA WHERE id_sensor = NEW.id_sensor) THEN
        RAISE EXCEPTION 'El sensor % ya tiene lecturas; no se puede reasignar a otro camión.', NEW.id_sensor;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sensor_validar_cambio_camion
BEFORE UPDATE OF id_camion ON SENSOR
FOR EACH ROW WHEN (OLD.id_camion IS DISTINCT FROM NEW.id_camion)
EXECUTE FUNCTION fn_sensor_validar_cambio_camion();

-- ==============================================================================
-- 14. REGLAS DE NEGOCIO: VIAJE (fuente de verdad de los estados)
-- ==============================================================================

-- 14.1 Validaciones: camión de la misma empresa, camión operativo y capacidad de carga
CREATE OR REPLACE FUNCTION fn_viaje_validar()
RETURNS TRIGGER AS
$$
DECLARE
    v_empresa_camion INTEGER;
    v_estado_camion  VARCHAR(20);
    v_capacidad      NUMERIC;
    v_carga_total    NUMERIC;
    v_cambia_estado  BOOLEAN;
BEGIN
    SELECT f.id_empresa, c.estado, c.capacidad_carga_kg
      INTO v_empresa_camion, v_estado_camion, v_capacidad
      FROM CAMION c
      JOIN FLOTA f ON f.id_flota = c.id_flota
     WHERE c.id_camion = NEW.id_camion;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Camión % no existe.', NEW.id_camion;
    END IF;

    IF v_empresa_camion <> NEW.id_empresa THEN
        RAISE EXCEPTION 'El camión % pertenece a la empresa %, pero el viaje es de la empresa %.',
            NEW.id_camion, v_empresa_camion, NEW.id_empresa;
    END IF;

    -- Un viaje solo puede pasar a EN_CURSO si el camión está operativo
    IF TG_OP = 'INSERT' THEN
        v_cambia_estado := TRUE;
    ELSE
        v_cambia_estado := OLD.estado IS DISTINCT FROM NEW.estado;
    END IF;

    IF NEW.estado = 'EN_CURSO' AND v_cambia_estado
       AND v_estado_camion IN ('MANTENCION','FUERA_DE_SERVICIO') THEN
        RAISE EXCEPTION 'El camión % está en estado % y no puede iniciar un viaje.', NEW.id_camion, v_estado_camion;
    END IF;

    -- Si se cambia el camión de un viaje con carga, el nuevo camión debe soportarla
    IF TG_OP = 'UPDATE' THEN
        IF OLD.id_camion IS DISTINCT FROM NEW.id_camion THEN
            SELECT COALESCE(SUM(peso_kg), 0) INTO v_carga_total FROM CARGA WHERE id_viaje = NEW.id_viaje;
            IF v_carga_total > v_capacidad THEN
                RAISE EXCEPTION 'La carga del viaje (% kg) supera la capacidad del camión % (% kg).',
                    v_carga_total, NEW.id_camion, v_capacidad;
            END IF;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_viaje_validar
BEFORE INSERT OR UPDATE OF id_camion, id_empresa, estado ON VIAJE
FOR EACH ROW EXECUTE FUNCTION fn_viaje_validar();

-- 14.2 VIAJE -> ASIGNACION: propaga cambios de fechas
CREATE OR REPLACE FUNCTION fn_viaje_propagar_fechas()
RETURNS TRIGGER AS
$$
BEGIN
    UPDATE ASIGNACION
       SET fecha_inicio_viaje = NEW.fecha_inicio,
           fecha_fin_viaje    = COALESCE(NEW.fecha_fin, NEW.fecha_fin_estimada)
     WHERE id_viaje = NEW.id_viaje;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_viaje_propagar_fechas
AFTER UPDATE OF fecha_inicio, fecha_fin, fecha_fin_estimada ON VIAJE
FOR EACH ROW
WHEN (OLD.fecha_inicio       IS DISTINCT FROM NEW.fecha_inicio
   OR OLD.fecha_fin          IS DISTINCT FROM NEW.fecha_fin
   OR OLD.fecha_fin_estimada IS DISTINCT FROM NEW.fecha_fin_estimada)
EXECUTE FUNCTION fn_viaje_propagar_fechas();

-- 14.3 VIAJE -> ASIGNACION / CAMION / CONDUCTOR: sincroniza estados
--      CANCELADO  -> asignaciones ACTIVA pasan a CANCELADA
--      COMPLETADO -> asignaciones ACTIVA pasan a COMPLETADA
--      EN_CURSO   -> camión EN_RUTA y conductor EN_RUTA (se revierte al terminar)
CREATE OR REPLACE FUNCTION fn_viaje_sincronizar_estados()
RETURNS TRIGGER AS
$$
DECLARE
    v_cambia_estado BOOLEAN;
    v_conductor     INTEGER;
BEGIN
    IF TG_OP = 'INSERT' THEN
        v_cambia_estado := FALSE;
    ELSE
        v_cambia_estado := OLD.estado IS DISTINCT FROM NEW.estado;
    END IF;

    IF v_cambia_estado THEN
        IF NEW.estado = 'CANCELADO' THEN
            UPDATE ASIGNACION SET estado = 'CANCELADA'
             WHERE id_viaje = NEW.id_viaje AND estado = 'ACTIVA';
        ELSIF NEW.estado = 'COMPLETADO' THEN
            UPDATE ASIGNACION SET estado = 'COMPLETADA'
             WHERE id_viaje = NEW.id_viaje AND estado = 'ACTIVA';
        END IF;
    END IF;

    PERFORM fn_camion_recalcular_estado(NEW.id_camion);
    IF TG_OP = 'UPDATE' THEN
        IF OLD.id_camion <> NEW.id_camion THEN
            PERFORM fn_camion_recalcular_estado(OLD.id_camion);
        END IF;
    END IF;

    FOR v_conductor IN SELECT DISTINCT id_conductor FROM ASIGNACION WHERE id_viaje = NEW.id_viaje LOOP
        PERFORM fn_conductor_recalcular_estado(v_conductor);
    END LOOP;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_viaje_sincronizar_estados
AFTER INSERT OR UPDATE OF estado, id_camion ON VIAJE
FOR EACH ROW EXECUTE FUNCTION fn_viaje_sincronizar_estados();

-- ==============================================================================
-- 15. REGLAS DE NEGOCIO: CARGA y ASIGNACION
-- ==============================================================================

-- 15.1 CARGA: la suma de pesos del viaje no puede superar la capacidad del camión
CREATE OR REPLACE FUNCTION fn_carga_validar_capacidad()
RETURNS TRIGGER AS
$$
DECLARE
    v_capacidad NUMERIC;
    v_otras     NUMERIC;
BEGIN
    -- Bloquea el viaje para serializar cargas concurrentes sobre el mismo viaje
    PERFORM 1 FROM VIAJE WHERE id_viaje = NEW.id_viaje FOR UPDATE;

    SELECT c.capacidad_carga_kg
      INTO v_capacidad
      FROM VIAJE v
      JOIN CAMION c ON c.id_camion = v.id_camion
     WHERE v.id_viaje = NEW.id_viaje;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Viaje % no existe.', NEW.id_viaje;
    END IF;

    IF TG_OP = 'INSERT' THEN
        SELECT COALESCE(SUM(peso_kg), 0) INTO v_otras
          FROM CARGA WHERE id_viaje = NEW.id_viaje;
    ELSE
        SELECT COALESCE(SUM(peso_kg), 0) INTO v_otras
          FROM CARGA WHERE id_viaje = NEW.id_viaje AND id_carga <> NEW.id_carga;
    END IF;

    IF v_otras + NEW.peso_kg > v_capacidad THEN
        RAISE EXCEPTION 'Sobrecarga: % kg (ya cargados % kg + nueva carga % kg) superan la capacidad del camión (% kg).',
            v_otras + NEW.peso_kg, v_otras, NEW.peso_kg, v_capacidad;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_carga_validar_capacidad
BEFORE INSERT OR UPDATE OF id_viaje, peso_kg ON CARGA
FOR EACH ROW EXECUTE FUNCTION fn_carga_validar_capacidad();

-- 15.2 CARGA -> ASIGNACION: refresca capacidad_utilizada_kg (el cálculo lo hace el trigger de ASIGNACION)
CREATE OR REPLACE FUNCTION fn_carga_refrescar_asignacion()
RETURNS TRIGGER AS
$$
BEGIN
    IF TG_OP IN ('UPDATE','DELETE') THEN
        UPDATE ASIGNACION SET capacidad_utilizada_kg = 0 WHERE id_viaje = OLD.id_viaje;
    END IF;
    IF TG_OP IN ('INSERT','UPDATE') THEN
        UPDATE ASIGNACION SET capacidad_utilizada_kg = 0 WHERE id_viaje = NEW.id_viaje;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_carga_refrescar_asignacion
AFTER INSERT OR UPDATE OF id_viaje, peso_kg OR DELETE ON CARGA
FOR EACH ROW EXECUTE FUNCTION fn_carga_refrescar_asignacion();

-- 15.3 ASIGNACION: misma empresa, conductor habilitado, licencia vigente,
--      sincronización de fechas y cálculo de capacidad utilizada.
--      Se ejecuta en TODO insert/update para que no se pueda evadir la lógica.
CREATE OR REPLACE FUNCTION fn_asignacion_validar_y_sincronizar()
RETURNS TRIGGER AS
$$
DECLARE
    v_inicio            TIMESTAMPTZ;
    v_fin_estimada      TIMESTAMPTZ;
    v_fin               TIMESTAMPTZ;
    v_estado_viaje      VARCHAR(20);
    v_empresa_camion    INTEGER;
    v_empresa_conductor INTEGER;
    v_estado_conductor  VARCHAR(20);
    v_venc_licencia     DATE;
    v_fecha_termino     DATE;
    v_cambio_relevante  BOOLEAN;
BEGIN
    SELECT v.fecha_inicio, v.fecha_fin_estimada, v.fecha_fin, v.estado, f.id_empresa
      INTO v_inicio, v_fin_estimada, v_fin, v_estado_viaje, v_empresa_camion
      FROM VIAJE v
      JOIN CAMION c ON c.id_camion = v.id_camion
      JOIN FLOTA  f ON f.id_flota  = c.id_flota
     WHERE v.id_viaje = NEW.id_viaje;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Viaje % no existe.', NEW.id_viaje;
    END IF;

    SELECT id_empresa, estado, fecha_venc_licencia
      INTO v_empresa_conductor, v_estado_conductor, v_venc_licencia
      FROM CONDUCTOR
     WHERE id_conductor = NEW.id_conductor;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Conductor % no existe.', NEW.id_conductor;
    END IF;

    IF v_empresa_conductor <> v_empresa_camion THEN
        RAISE EXCEPTION 'Asignación inválida: el conductor % es de la empresa % y el camión del viaje % es de la empresa %.',
            NEW.id_conductor, v_empresa_conductor, NEW.id_viaje, v_empresa_camion;
    END IF;

    -- Reglas de habilitación: solo al crear la asignación o al cambiar conductor/viaje/estado,
    -- para no bloquear actualizaciones posteriores (p. ej. si la licencia vence con el viaje en curso)
    IF TG_OP = 'INSERT' THEN
        v_cambio_relevante := TRUE;
    ELSE
        v_cambio_relevante := OLD.id_conductor IS DISTINCT FROM NEW.id_conductor
                           OR OLD.id_viaje     IS DISTINCT FROM NEW.id_viaje
                           OR OLD.estado       IS DISTINCT FROM NEW.estado;
    END IF;

    IF NEW.estado = 'ACTIVA' AND v_cambio_relevante THEN
        IF v_estado_viaje IN ('CANCELADO','COMPLETADO') THEN
            RAISE EXCEPTION 'No se puede dejar ACTIVA una asignación de un viaje % (viaje %).', v_estado_viaje, NEW.id_viaje;
        END IF;

        IF v_estado_conductor = 'INACTIVO' THEN
            RAISE EXCEPTION 'El conductor % está INACTIVO y no puede ser asignado.', NEW.id_conductor;
        END IF;

        -- La licencia debe estar vigente hasta el término del viaje (real, estimado o, en su defecto, el inicio)
        v_fecha_termino := (COALESCE(v_fin, v_fin_estimada, v_inicio) AT TIME ZONE 'America/Santiago')::date;
        IF v_venc_licencia < v_fecha_termino THEN
            RAISE EXCEPTION 'La licencia del conductor % vence el %, antes del término del viaje (%).',
                NEW.id_conductor, v_venc_licencia, v_fecha_termino;
        END IF;
    END IF;

    NEW.fecha_inicio_viaje := v_inicio;
    NEW.fecha_fin_viaje    := COALESCE(v_fin, v_fin_estimada);

    SELECT COALESCE(SUM(peso_kg), 0)
      INTO NEW.capacidad_utilizada_kg
      FROM CARGA
     WHERE id_viaje = NEW.id_viaje;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_asignacion_validar_y_sincronizar
BEFORE INSERT OR UPDATE ON ASIGNACION
FOR EACH ROW EXECUTE FUNCTION fn_asignacion_validar_y_sincronizar();

-- 15.4 ASIGNACION -> CONDUCTOR: recalcula el estado del conductor
CREATE OR REPLACE FUNCTION fn_asignacion_recalcular_estados()
RETURNS TRIGGER AS
$$
BEGIN
    IF TG_OP IN ('UPDATE','DELETE') THEN
        PERFORM fn_conductor_recalcular_estado(OLD.id_conductor);
    END IF;
    IF TG_OP IN ('INSERT','UPDATE') THEN
        PERFORM fn_conductor_recalcular_estado(NEW.id_conductor);
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_asignacion_recalcular_estados
AFTER INSERT OR UPDATE OF id_conductor, id_viaje, estado OR DELETE ON ASIGNACION
FOR EACH ROW EXECUTE FUNCTION fn_asignacion_recalcular_estados();

-- ==============================================================================
-- 16. REGLAS DE NEGOCIO: TELEMETRIA, LECTURA y ANOMALIA
-- ==============================================================================

-- 16.1 TELEMETRIA: el viaje debe ser del mismo camión que transmite
CREATE OR REPLACE FUNCTION fn_telemetria_validar_viaje()
RETURNS TRIGGER AS
$$
DECLARE
    v_camion_viaje INTEGER;
BEGIN
    IF NEW.id_viaje IS NOT NULL THEN
        SELECT id_camion INTO v_camion_viaje FROM VIAJE WHERE id_viaje = NEW.id_viaje;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Viaje % no existe.', NEW.id_viaje;
        END IF;
        IF v_camion_viaje <> NEW.id_camion THEN
            RAISE EXCEPTION 'El viaje % es del camión %, pero el paquete es del camión %.',
                NEW.id_viaje, v_camion_viaje, NEW.id_camion;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_telemetria_validar_viaje
BEFORE INSERT ON TELEMETRIA
FOR EACH ROW EXECUTE FUNCTION fn_telemetria_validar_viaje();

-- 16.2 TELEMETRIA: anomalías por velocidad (el dato se guarda siempre; se marca, no se rechaza)
CREATE OR REPLACE FUNCTION fn_telemetria_generar_anomalia()
RETURNS TRIGGER AS
$$
DECLARE
    c_vel_invalida CONSTANT NUMERIC := 150;   -- sobre esto el dato es sospechoso (GPS/sensor defectuoso)
    c_vel_limite   CONSTANT NUMERIC := 100;   -- límite operativo de la empresa (km/h)
BEGIN
    IF NEW.velocidad > c_vel_invalida THEN
        INSERT INTO ANOMALIA (id_telemetria, fecha_hora_telemetria, id_severidad, tipo, descripcion)
        VALUES (NEW.id_telemetria, NEW.fecha_hora, 2, 'VELOCIDAD_INVALIDA',
                format('Velocidad registrada de %s km/h supera el máximo plausible (%s km/h).', NEW.velocidad, c_vel_invalida));
    ELSIF NEW.velocidad > c_vel_limite THEN
        INSERT INTO ANOMALIA (id_telemetria, fecha_hora_telemetria, id_severidad, tipo, descripcion)
        VALUES (NEW.id_telemetria, NEW.fecha_hora, 3, 'EXCESO_VELOCIDAD',
                format('Velocidad de %s km/h supera el límite operativo (%s km/h).', NEW.velocidad, c_vel_limite));
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_telemetria_generar_anomalia
AFTER INSERT ON TELEMETRIA
FOR EACH ROW EXECUTE FUNCTION fn_telemetria_generar_anomalia();

-- 16.3 LECTURA (BEFORE): el sensor es del camión del paquete y se clasifica la calidad
CREATE OR REPLACE FUNCTION fn_lectura_validar_y_clasificar()
RETURNS TRIGGER AS
$$
DECLARE
    v_cam_sensor  INTEGER;
    v_cam_paquete INTEGER;
    v_min         NUMERIC;
    v_max         NUMERIC;
BEGIN
    SELECT s.id_camion, tm.valor_min_fisico, tm.valor_max_fisico
      INTO v_cam_sensor, v_min, v_max
      FROM SENSOR s
      JOIN TIPO_MEDICION tm ON tm.id_tipo_medicion = s.id_tipo_medicion
     WHERE s.id_sensor = NEW.id_sensor;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Sensor % no existe.', NEW.id_sensor;
    END IF;

    SELECT id_camion INTO v_cam_paquete
      FROM TELEMETRIA
     WHERE id_telemetria = NEW.id_telemetria AND fecha_hora = NEW.fecha_hora;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Paquete de telemetría % (%) no existe.', NEW.id_telemetria, NEW.fecha_hora;
    END IF;

    IF v_cam_sensor <> v_cam_paquete THEN
        RAISE EXCEPTION 'El sensor % pertenece al camión %, pero el paquete es del camión %.',
            NEW.id_sensor, v_cam_sensor, v_cam_paquete;
    END IF;

    IF (v_min IS NOT NULL AND NEW.valor < v_min) OR (v_max IS NOT NULL AND NEW.valor > v_max) THEN
        NEW.calidad := 'FUERA_RANGO';
    ELSE
        NEW.calidad := 'OK';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_lectura_validar_y_clasificar
BEFORE INSERT ON LECTURA
FOR EACH ROW EXECUTE FUNCTION fn_lectura_validar_y_clasificar();

-- 16.4 LECTURA (AFTER): genera anomalías
--      a) lectura imposible (sensor defectuoso)   b) umbral mínimo/máximo del tipo de medición
--      c) sobrecarga (PESO_CARGA > capacidad)     d) posible pérdida de combustible
CREATE OR REPLACE FUNCTION fn_lectura_generar_anomalia()
RETURNS TRIGGER AS
$$
DECLARE
    c_caida_pct      CONSTANT NUMERIC  := 5;                -- puntos porcentuales de caída de nivel
    c_ventana        CONSTANT INTERVAL := INTERVAL '30 minutes';
    c_vel_detenido   CONSTANT NUMERIC  := 5;                -- km/h: bajo esto se considera detenido
    v_codigo     VARCHAR(40);
    v_unidad     VARCHAR(15);
    v_umbral_min NUMERIC;
    v_umbral_max NUMERIC;
    v_sev        SMALLINT;
    v_ubicacion  VARCHAR(50);
    v_camion     INTEGER;
    v_capacidad  NUMERIC;
    v_previo     NUMERIC;
    v_velocidad  NUMERIC;
BEGIN
    SELECT tm.codigo, tm.unidad, tm.umbral_min, tm.umbral_max, tm.id_severidad, s.ubicacion, s.id_camion
      INTO v_codigo, v_unidad, v_umbral_min, v_umbral_max, v_sev, v_ubicacion, v_camion
      FROM SENSOR s
      JOIN TIPO_MEDICION tm ON tm.id_tipo_medicion = s.id_tipo_medicion
     WHERE s.id_sensor = NEW.id_sensor;

    -- a) lectura físicamente imposible: se guarda y se marca; no se evalúa nada más
    IF NEW.calidad = 'FUERA_RANGO' THEN
        INSERT INTO ANOMALIA (id_telemetria, fecha_hora_telemetria, id_lectura, id_severidad, tipo, descripcion)
        VALUES (NEW.id_telemetria, NEW.fecha_hora, NEW.id_lectura, 2, 'FUERA_RANGO_FISICO',
                format('%s en %s: valor %s %s fuera del rango físico posible (sensor probablemente defectuoso).',
                       v_codigo, v_ubicacion, NEW.valor, v_unidad));
        RETURN NULL;
    END IF;

    -- b) umbrales
    IF v_umbral_min IS NOT NULL AND NEW.valor < v_umbral_min THEN
        INSERT INTO ANOMALIA (id_telemetria, fecha_hora_telemetria, id_lectura, id_severidad, tipo, descripcion)
        VALUES (NEW.id_telemetria, NEW.fecha_hora, NEW.id_lectura, v_sev, 'UMBRAL_MINIMO',
                format('%s en %s: %s %s está bajo el mínimo (%s %s).',
                       v_codigo, v_ubicacion, NEW.valor, v_unidad, v_umbral_min, v_unidad));
    ELSIF v_umbral_max IS NOT NULL AND NEW.valor > v_umbral_max THEN
        INSERT INTO ANOMALIA (id_telemetria, fecha_hora_telemetria, id_lectura, id_severidad, tipo, descripcion)
        VALUES (NEW.id_telemetria, NEW.fecha_hora, NEW.id_lectura, v_sev, 'UMBRAL_MAXIMO',
                format('%s en %s: %s %s supera el máximo (%s %s).',
                       v_codigo, v_ubicacion, NEW.valor, v_unidad, v_umbral_max, v_unidad));
    END IF;

    -- c) sobrecarga
    IF v_codigo = 'PESO_CARGA' THEN
        SELECT capacidad_carga_kg INTO v_capacidad FROM CAMION WHERE id_camion = v_camion;
        IF NEW.valor > v_capacidad THEN
            INSERT INTO ANOMALIA (id_telemetria, fecha_hora_telemetria, id_lectura, id_severidad, tipo, descripcion)
            VALUES (NEW.id_telemetria, NEW.fecha_hora, NEW.id_lectura, 4, 'SOBRECARGA',
                    format('Peso a bordo de %s kg supera la capacidad del camión (%s kg).', NEW.valor, v_capacidad));
        END IF;
    END IF;

    -- d) posible pérdida de combustible: el nivel cae bruscamente con el camión detenido
    IF v_codigo = 'NIVEL_COMBUSTIBLE' THEN
        SELECT l.valor
          INTO v_previo
          FROM LECTURA l
         WHERE l.id_sensor = NEW.id_sensor
           AND l.fecha_hora < NEW.fecha_hora
           AND l.fecha_hora >= NEW.fecha_hora - c_ventana
         ORDER BY l.fecha_hora DESC
         LIMIT 1;

        SELECT velocidad INTO v_velocidad
          FROM TELEMETRIA
         WHERE id_telemetria = NEW.id_telemetria AND fecha_hora = NEW.fecha_hora;

        IF v_previo IS NOT NULL AND v_velocidad <= c_vel_detenido AND (v_previo - NEW.valor) >= c_caida_pct THEN
            INSERT INTO ANOMALIA (id_telemetria, fecha_hora_telemetria, id_lectura, id_severidad, tipo, descripcion)
            VALUES (NEW.id_telemetria, NEW.fecha_hora, NEW.id_lectura, 5, 'POSIBLE_PERDIDA_COMBUSTIBLE',
                    format('El nivel de combustible bajó de %s %% a %s %% con el camión detenido (%s km/h).',
                           v_previo, NEW.valor, v_velocidad));
        END IF;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_lectura_generar_anomalia
AFTER INSERT ON LECTURA
FOR EACH ROW EXECUTE FUNCTION fn_lectura_generar_anomalia();

-- ==============================================================================
-- 17. REGLAS DE NEGOCIO: ABASTECIMIENTO, ALERTA y MANTENCION
-- ==============================================================================

-- 17.1 ABASTECIMIENTO: litros dentro de la capacidad del estanque; viaje y conductor coherentes con el camión
CREATE OR REPLACE FUNCTION fn_abastecimiento_validar()
RETURNS TRIGGER AS
$$
DECLARE
    v_estanque       NUMERIC;
    v_empresa_camion INTEGER;
    v_camion_viaje   INTEGER;
    v_empresa_cond   INTEGER;
BEGIN
    SELECT c.capacidad_estanque_l, f.id_empresa
      INTO v_estanque, v_empresa_camion
      FROM CAMION c
      JOIN FLOTA f ON f.id_flota = c.id_flota
     WHERE c.id_camion = NEW.id_camion;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Camión % no existe.', NEW.id_camion;
    END IF;

    IF NEW.litros > v_estanque THEN
        RAISE EXCEPTION 'Se cargaron % L pero el estanque del camión % es de % L.', NEW.litros, NEW.id_camion, v_estanque;
    END IF;

    IF NEW.id_viaje IS NOT NULL THEN
        SELECT id_camion INTO v_camion_viaje FROM VIAJE WHERE id_viaje = NEW.id_viaje;
        IF v_camion_viaje IS DISTINCT FROM NEW.id_camion THEN
            RAISE EXCEPTION 'El viaje % no corresponde al camión %.', NEW.id_viaje, NEW.id_camion;
        END IF;
    END IF;

    IF NEW.id_conductor IS NOT NULL THEN
        SELECT id_empresa INTO v_empresa_cond FROM CONDUCTOR WHERE id_conductor = NEW.id_conductor;
        IF v_empresa_cond IS DISTINCT FROM v_empresa_camion THEN
            RAISE EXCEPTION 'El conductor % no pertenece a la empresa del camión %.', NEW.id_conductor, NEW.id_camion;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_abastecimiento_validar
BEFORE INSERT OR UPDATE OF id_camion, id_viaje, id_conductor, litros ON ABASTECIMIENTO
FOR EACH ROW EXECUTE FUNCTION fn_abastecimiento_validar();

-- 17.2 ALERTA: fija/limpia fecha_resolucion según el estado
CREATE OR REPLACE FUNCTION fn_alerta_fijar_resolucion()
RETURNS TRIGGER AS
$$
BEGIN
    IF NEW.estado IN ('RESUELTA','DESCARTADA') THEN
        NEW.fecha_resolucion := COALESCE(NEW.fecha_resolucion, CURRENT_TIMESTAMP);
    ELSE
        NEW.fecha_resolucion := NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_alerta_fijar_resolucion
BEFORE INSERT OR UPDATE OF estado ON ALERTA
FOR EACH ROW EXECUTE FUNCTION fn_alerta_fijar_resolucion();

-- 17.3 MANTENCION: el camión de la alerta debe ser el mismo de la mantención
--      Ruta: id_alerta -> ANOMALIA -> TELEMETRIA -> id_camion
CREATE OR REPLACE FUNCTION fn_mantencion_validar_camion_alerta()
RETURNS TRIGGER AS
$$
DECLARE
    v_camion_alerta INTEGER;
BEGIN
    IF NEW.id_alerta IS NOT NULL THEN
        SELECT t.id_camion
          INTO v_camion_alerta
          FROM ALERTA     a
          JOIN ANOMALIA   an ON an.id_anomalia   = a.id_anomalia
          JOIN TELEMETRIA t  ON t.id_telemetria  = an.id_telemetria
                            AND t.fecha_hora     = an.fecha_hora_telemetria
         WHERE a.id_alerta = NEW.id_alerta;

        IF NOT FOUND THEN
            RAISE EXCEPTION 'No se pudo determinar el camión de la alerta %.', NEW.id_alerta;
        END IF;

        IF v_camion_alerta <> NEW.id_camion THEN
            RAISE EXCEPTION 'Mantención inválida: la alerta % fue originada por el camión %, pero la mantención es para el camión %.',
                NEW.id_alerta, v_camion_alerta, NEW.id_camion;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_mantencion_validar_camion_alerta
BEFORE INSERT OR UPDATE OF id_alerta, id_camion ON MANTENCION
FOR EACH ROW EXECUTE FUNCTION fn_mantencion_validar_camion_alerta();

-- ==============================================================================
-- 18. ENCARGADO_EMPRESA: usuario <nombre>_<apellido>_<empresa>
--     Ej: Carla Vargas Soto, "Transportes Kutrol SpA" -> carla_vargas_transportes_kutrol_spa
--     Si existe, agrega sufijo numérico (_2, _3). Solo se genera en el INSERT.
--     Un advisory lock por usuario base evita duplicados con inserciones concurrentes.
-- ==============================================================================
CREATE OR REPLACE FUNCTION fn_encargado_empresa_generar_usuario()
RETURNS TRIGGER AS
$$
DECLARE
    v_empresa  VARCHAR(100);
    v_base     TEXT;
    v_usuario  TEXT;
    v_n        INTEGER := 1;
BEGIN
    -- Si se entrega un usuario explícito se respeta (igual debe cumplir el CHECK de formato)
    IF NEW.usuario IS NOT NULL THEN
        RETURN NEW;
    END IF;

    SELECT nombre INTO v_empresa FROM EMPRESA WHERE id_empresa = NEW.id_empresa;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Empresa % no existe.', NEW.id_empresa;
    END IF;

    v_base := concat_ws('_',
                  fn_normalizar_texto(NEW.primer_nombre),
                  fn_normalizar_texto(split_part(btrim(NEW.apellidos), ' ', 1)),
                  fn_normalizar_texto(v_empresa));
    v_base := regexp_replace(v_base, '_+', '_', 'g');
    v_base := rtrim(left(v_base, 90), '_');   -- deja espacio para el sufijo numérico

    IF v_base IS NULL OR v_base = '' THEN
        RAISE EXCEPTION 'No se pudo generar el usuario con los datos entregados.';
    END IF;

    -- Serializa la generación para el mismo usuario base (se libera al terminar la transacción)
    PERFORM pg_advisory_xact_lock(hashtext('encargado_empresa_usuario:' || v_base));

    v_usuario := v_base;
    WHILE EXISTS (SELECT 1 FROM ENCARGADO_EMPRESA WHERE usuario = v_usuario) LOOP
        v_n := v_n + 1;
        v_usuario := v_base || '_' || v_n;
    END LOOP;

    NEW.usuario := v_usuario;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_encargado_empresa_generar_usuario
BEFORE INSERT ON ENCARGADO_EMPRESA
FOR EACH ROW EXECUTE FUNCTION fn_encargado_empresa_generar_usuario();
