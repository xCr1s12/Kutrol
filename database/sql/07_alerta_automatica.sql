-- ==============================================================================
-- KUTROL - Alerta automática
-- Cada anomalía nueva genera una ALERTA, para que aparezca en la página de Alertas
-- de la empresa dueña del camión, con el conductor del viaje si lo hay.
--
--   * Severidad INFORMATIVA (1): no genera alerta. Sirve para "apagar" una alerta
--     desde Configuración > Alertas.
--   * Sin duplicados: si el camión ya tiene una alerta abierta (GENERADA o
--     EN_REVISION) del mismo tipo, no se crea otra hasta que se resuelva o descarte.
--
-- Se puede ejecutar varias veces sin problema (no borra ni modifica datos).
-- ==============================================================================
SET search_path TO kutrol, public;

CREATE OR REPLACE FUNCTION fn_anomalia_generar_alerta()
RETURNS TRIGGER
SET search_path = kutrol, public
AS
$$
DECLARE
    v_camion     INTEGER;
    v_viaje      INTEGER;
    v_conductor  INTEGER;
    v_categoria  VARCHAR;
    v_tipo       VARCHAR(20);
    v_medicion   VARCHAR;
    v_unidad     VARCHAR;
    v_ubicacion  VARCHAR;
    v_valor      NUMERIC;
    v_umbral     NUMERIC;
    v_mensaje    TEXT;
BEGIN
    IF NEW.id_severidad <= 1 THEN
        RETURN NULL;
    END IF;

    SELECT t.id_camion, t.id_viaje
      INTO v_camion, v_viaje
      FROM TELEMETRIA t
     WHERE t.id_telemetria = NEW.id_telemetria
       AND t.fecha_hora = NEW.fecha_hora_telemetria;

    IF NEW.id_lectura IS NOT NULL THEN
        SELECT tm.categoria, tm.nombre, tm.unidad, s.ubicacion, l.valor,
               CASE NEW.tipo WHEN 'UMBRAL_MINIMO' THEN tm.umbral_min ELSE tm.umbral_max END
          INTO v_categoria, v_medicion, v_unidad, v_ubicacion, v_valor, v_umbral
          FROM LECTURA l
          JOIN SENSOR s         ON s.id_sensor = l.id_sensor
          JOIN TIPO_MEDICION tm ON tm.id_tipo_medicion = s.id_tipo_medicion
         WHERE l.id_lectura = NEW.id_lectura
           AND l.fecha_hora = NEW.fecha_hora_telemetria;
    END IF;

    -- tipo de la alerta (debe cumplir chk_alerta_tipo)
    v_tipo := CASE
        WHEN NEW.tipo IN ('EXCESO_VELOCIDAD', 'VELOCIDAD_INVALIDA') THEN 'VELOCIDAD'
        WHEN NEW.tipo = 'FUERA_RANGO_FISICO'                       THEN 'SENSOR'
        WHEN NEW.tipo = 'SOBRECARGA'                               THEN 'CARGA'
        WHEN NEW.tipo = 'POSIBLE_PERDIDA_COMBUSTIBLE'              THEN 'COMBUSTIBLE'
        ELSE COALESCE(v_categoria, 'SENSOR')
    END;

    -- evita llenar la página con la misma alerta en cada lectura
    IF EXISTS (
        SELECT 1
          FROM ALERTA al
          JOIN ANOMALIA an  ON an.id_anomalia = al.id_anomalia
          JOIN TELEMETRIA t ON t.id_telemetria = an.id_telemetria
                           AND t.fecha_hora = an.fecha_hora_telemetria
         WHERE t.id_camion = v_camion
           AND al.tipo = v_tipo
           AND an.tipo = NEW.tipo
           AND al.estado IN ('GENERADA', 'EN_REVISION')
    ) THEN
        RETURN NULL;
    END IF;

    -- conductor asignado al viaje en curso (si el camión transmite dentro de un viaje)
    IF v_viaje IS NOT NULL THEN
        SELECT a.id_conductor INTO v_conductor
          FROM ASIGNACION a
         WHERE a.id_viaje = v_viaje
           AND a.estado = 'ACTIVA'
         ORDER BY a.fecha_asignacion DESC
         LIMIT 1;
    END IF;

    -- mensaje legible: "Temperatura del refrigerante: 140 °C, sobre el máximo de 96 °C"
    -- el camión no se repite porque la página ya lo muestra en la columna Vehículo
    IF NEW.tipo IN ('UMBRAL_MINIMO', 'UMBRAL_MAXIMO') AND v_medicion IS NOT NULL THEN
        v_mensaje := format('%s%s: %s %s, %s de %s %s',
            v_medicion,
            -- con varios sensores iguales (neumáticos) se indica cuál
            CASE WHEN v_categoria = 'NEUMATICO' AND v_ubicacion IS NOT NULL
                 THEN ' (' || lower(replace(replace(replace(v_ubicacion,
                          '_IZQ', ' izquierdo'), '_DER', ' derecho'), '_', ' ')) || ')'
                 ELSE '' END,
            replace(trim_scale(v_valor)::text, '.', ','), v_unidad,
            CASE WHEN NEW.tipo = 'UMBRAL_MINIMO' THEN 'bajo el mínimo' ELSE 'sobre el máximo' END,
            replace(trim_scale(v_umbral)::text, '.', ','), v_unidad);
    ELSE
        v_mensaje := COALESCE(NEW.descripcion, NEW.tipo);
    END IF;

    INSERT INTO ALERTA (id_anomalia, id_conductor, tipo, estado, mensaje)
    VALUES (NEW.id_anomalia, v_conductor, v_tipo, 'GENERADA', v_mensaje);

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_anomalia_generar_alerta ON ANOMALIA;
CREATE TRIGGER trg_anomalia_generar_alerta
AFTER INSERT ON ANOMALIA
FOR EACH ROW EXECUTE FUNCTION fn_anomalia_generar_alerta();
