-- ==============================================================================
-- ARCHIVO 03/06: índices (sección 10)
-- ==============================================================================
SET search_path TO kutrol, public;

-- ==============================================================================
-- 10. ÍNDICES (las FK y las consultas frecuentes)
--     Los EXCLUDE ya generan índices GiST parciales (solo sirven con su WHERE), por eso
--     se mantienen idx_viaje_id_camion e idx_asignacion_id_conductor. Verificar con EXPLAIN.
-- ==============================================================================
CREATE INDEX idx_comuna_id_region              ON COMUNA(id_region);
CREATE INDEX idx_empresa_id_comuna             ON EMPRESA(id_comuna);
CREATE INDEX idx_encargado_empresa_id_empresa  ON ENCARGADO_EMPRESA(id_empresa);
CREATE INDEX idx_encargado_empresa_id_nivel    ON ENCARGADO_EMPRESA(id_nivel_jerarquico);
CREATE INDEX idx_conductor_id_empresa          ON CONDUCTOR(id_empresa);
CREATE INDEX idx_flota_id_tipo_flota           ON FLOTA(id_tipo_flota);
CREATE INDEX idx_camion_id_flota               ON CAMION(id_flota);
CREATE INDEX idx_sensor_id_tipo_medicion       ON SENSOR(id_tipo_medicion);
CREATE INDEX idx_tipo_medicion_id_severidad    ON TIPO_MEDICION(id_severidad);
CREATE INDEX idx_ruta_id_comuna_destino        ON RUTA(id_comuna_destino);
CREATE INDEX idx_viaje_id_camion               ON VIAJE(id_camion);
CREATE INDEX idx_viaje_id_ruta                 ON VIAJE(id_ruta);
CREATE INDEX idx_viaje_id_empresa              ON VIAJE(id_empresa);
CREATE INDEX idx_viaje_estado_fecha_inicio     ON VIAJE(estado, fecha_inicio);
CREATE INDEX idx_carga_id_viaje                ON CARGA(id_viaje);
CREATE INDEX idx_asignacion_id_conductor       ON ASIGNACION(id_conductor);
CREATE INDEX idx_asignacion_id_viaje           ON ASIGNACION(id_viaje);
CREATE INDEX idx_telemetria_id_viaje           ON TELEMETRIA(id_viaje);
CREATE INDEX idx_telemetria_fecha_hora         ON TELEMETRIA USING brin (fecha_hora);
CREATE INDEX idx_lectura_id_sensor_fecha       ON LECTURA(id_sensor, fecha_hora);
CREATE INDEX idx_abastecimiento_id_camion_fecha ON ABASTECIMIENTO(id_camion, fecha);
CREATE INDEX idx_abastecimiento_id_conductor   ON ABASTECIMIENTO(id_conductor);
CREATE INDEX idx_abastecimiento_id_viaje       ON ABASTECIMIENTO(id_viaje);
CREATE INDEX idx_anomalia_id_telemetria        ON ANOMALIA(id_telemetria, fecha_hora_telemetria);
CREATE INDEX idx_anomalia_id_lectura           ON ANOMALIA(id_lectura, fecha_hora_telemetria);
CREATE INDEX idx_anomalia_id_severidad         ON ANOMALIA(id_severidad);
CREATE INDEX idx_alerta_id_anomalia            ON ALERTA(id_anomalia);
CREATE INDEX idx_alerta_id_conductor           ON ALERTA(id_conductor);
CREATE INDEX idx_alerta_id_encargado           ON ALERTA(id_encargado);
CREATE INDEX idx_alerta_abiertas               ON ALERTA(estado) WHERE estado IN ('GENERADA','EN_REVISION');
CREATE INDEX idx_mantencion_id_camion          ON MANTENCION(id_camion);
CREATE INDEX idx_mantencion_id_alerta          ON MANTENCION(id_alerta);
