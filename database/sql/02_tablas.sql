-- ==============================================================================
-- ARCHIVO 02/06: catálogos, tablas y particiones (secciones 2 a 9)
-- ==============================================================================
SET search_path TO kutrol, public;

-- ==============================================================================
-- 2. CATÁLOGOS CON SIGNIFICADO (reemplazan números y textos sin significado)
-- ==============================================================================

-- Nivel jerárquico del encargado de empresa
CREATE TABLE NIVEL_JERARQUICO (
    id_nivel_jerarquico  SMALLINT    PRIMARY KEY,
    nombre               VARCHAR(30) NOT NULL,
    CONSTRAINT uq_nivel_jerarquico_nombre UNIQUE (nombre)
);
INSERT INTO NIVEL_JERARQUICO (id_nivel_jerarquico, nombre) VALUES
    (1, 'DUEÑO'),
    (2, 'ADMINISTRADOR'),
    (3, 'EMPLEADO');

-- Severidad de una anomalía
CREATE TABLE SEVERIDAD (
    id_severidad  SMALLINT    PRIMARY KEY,
    nombre        VARCHAR(30) NOT NULL,
    CONSTRAINT uq_severidad_nombre UNIQUE (nombre)
);
INSERT INTO SEVERIDAD (id_severidad, nombre) VALUES
    (1, 'INFORMATIVA'),
    (2, 'BAJA'),
    (3, 'MEDIA'),
    (4, 'ALTA'),
    (5, 'CRITICA');

-- ==============================================================================
-- 3. División Político-Administrativa
-- ==============================================================================
CREATE TABLE REGION (
    id_region      INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre         VARCHAR(100) NOT NULL,
    numero_romano  VARCHAR(4)   NOT NULL,
    CONSTRAINT uq_region_nombre UNIQUE (nombre),
    CONSTRAINT uq_region_numero_romano UNIQUE (numero_romano),
    CONSTRAINT chk_region_numero_romano CHECK (numero_romano ~ '^(RM|[IVXL]+)$')
);

CREATE TABLE COMUNA (
    id_comuna  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_region  INTEGER      NOT NULL,
    nombre     VARCHAR(100) NOT NULL,
    CONSTRAINT fk_comuna_region FOREIGN KEY (id_region)
        REFERENCES REGION(id_region) ON DELETE RESTRICT,
    CONSTRAINT uq_comuna_region_nombre UNIQUE (id_region, nombre)
);

-- ==============================================================================
-- 4. Empresa, Contacto y Conductores
-- ==============================================================================
CREATE TABLE EMPRESA (
    id_empresa   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_comuna    INTEGER      NOT NULL,
    nombre       VARCHAR(100) NOT NULL,
    rut          VARCHAR(12)  NOT NULL,   -- formato/dígito verificador: se valida en el backend
    direccion    VARCHAR(200) NOT NULL,
    descripcion  VARCHAR(255),
    url_imagen   TEXT,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at   TIMESTAMPTZ,
    CONSTRAINT uq_empresa_rut UNIQUE (rut),
    CONSTRAINT fk_empresa_comuna FOREIGN KEY (id_comuna)
        REFERENCES COMUNA(id_comuna) ON DELETE RESTRICT,
    CONSTRAINT chk_empresa_url_imagen CHECK (url_imagen IS NULL OR url_imagen ~* '^https?://')
);

CREATE TABLE EMPRESA_EMAIL (
    id_empresa  INTEGER      NOT NULL,
    email       VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_empresa, email),
    CONSTRAINT fk_empresa_email_empresa FOREIGN KEY (id_empresa)
        REFERENCES EMPRESA(id_empresa) ON DELETE CASCADE,
    CONSTRAINT chk_empresa_email_formato CHECK (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$')
);
CREATE UNIQUE INDEX uq_empresa_email_email ON EMPRESA_EMAIL (lower(email));

CREATE TABLE EMPRESA_TELEFONO (
    id_empresa  INTEGER     NOT NULL,
    telefono    VARCHAR(15) NOT NULL,
    PRIMARY KEY (id_empresa, telefono),
    CONSTRAINT fk_empresa_telefono_empresa FOREIGN KEY (id_empresa)
        REFERENCES EMPRESA(id_empresa) ON DELETE CASCADE,
    CONSTRAINT chk_empresa_telefono_formato CHECK (telefono ~ '^\+?[0-9]{8,14}$')
);

CREATE TABLE ENCARGADO_EMPRESA (
    id_encargado         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_empresa           INTEGER      NOT NULL,
    id_nivel_jerarquico  SMALLINT     NOT NULL,
    usuario              VARCHAR(100) NOT NULL,   -- generado por trigger: <nombre>_<apellido>_<empresa>
    primer_nombre        VARCHAR(50)  NOT NULL,
    apellidos            VARCHAR(100) NOT NULL,
    email                VARCHAR(100) NOT NULL,   -- contacto y recuperación de clave
    cargo                VARCHAR(100) NOT NULL,
    password_hash        VARCHAR(255) NOT NULL,
    created_at           TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_encargado_empresa_usuario UNIQUE (usuario),
    CONSTRAINT fk_encargado_empresa_empresa FOREIGN KEY (id_empresa)
        REFERENCES EMPRESA(id_empresa) ON DELETE RESTRICT,
    CONSTRAINT fk_encargado_empresa_nivel_jer FOREIGN KEY (id_nivel_jerarquico)
        REFERENCES NIVEL_JERARQUICO(id_nivel_jerarquico) ON DELETE RESTRICT,
    CONSTRAINT chk_encargado_empresa_usuario_formato CHECK (usuario ~ '^[a-z0-9]+(_[a-z0-9]+)*$'),
    CONSTRAINT chk_encargado_empresa_email_formato CHECK (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$')
);
CREATE UNIQUE INDEX uq_encargado_empresa_email ON ENCARGADO_EMPRESA (lower(email));

CREATE TABLE CONDUCTOR (
    id_conductor         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_empresa           INTEGER      NOT NULL,
    primer_nombre        VARCHAR(50)  NOT NULL,
    apellidos            VARCHAR(100) NOT NULL,
    run                  VARCHAR(12)  NOT NULL,   -- formato/dígito verificador: se valida en el backend
    licencia             VARCHAR(20)  NOT NULL,
    fecha_venc_licencia  DATE         NOT NULL,
    estado               VARCHAR(20)  NOT NULL DEFAULT 'ACTIVO',
    created_at           TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at           TIMESTAMPTZ,
    CONSTRAINT uq_conductor_run UNIQUE (run),
    CONSTRAINT uq_conductor_licencia UNIQUE (licencia),
    CONSTRAINT fk_conductor_empresa FOREIGN KEY (id_empresa)
        REFERENCES EMPRESA(id_empresa) ON DELETE RESTRICT,
    CONSTRAINT chk_conductor_estado CHECK (estado IN ('INACTIVO','ACTIVO','EN_RUTA'))
);

CREATE TABLE CONDUCTOR_TELEFONO (
    id_conductor  INTEGER     NOT NULL,
    telefono      VARCHAR(15) NOT NULL,
    PRIMARY KEY (id_conductor, telefono),
    CONSTRAINT fk_conductor_telefono_conductor FOREIGN KEY (id_conductor)
        REFERENCES CONDUCTOR(id_conductor) ON DELETE CASCADE,
    CONSTRAINT chk_conductor_telefono_formato CHECK (telefono ~ '^\+?[0-9]{8,14}$')
);

CREATE TABLE CONDUCTOR_EMAIL (
    id_conductor  INTEGER      NOT NULL,
    email         VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_conductor, email),
    CONSTRAINT fk_conductor_email_conductor FOREIGN KEY (id_conductor)
        REFERENCES CONDUCTOR(id_conductor) ON DELETE CASCADE,
    CONSTRAINT chk_conductor_email_formato CHECK (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$')
);
CREATE UNIQUE INDEX uq_conductor_email_email ON CONDUCTOR_EMAIL (lower(email));

-- ==============================================================================
-- 5. Flotas y Vehículos
-- ==============================================================================
CREATE TABLE TIPO_FLOTA (
    id_tipo_flota  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre         VARCHAR(50) NOT NULL,
    descripcion    TEXT,
    CONSTRAINT uq_tipo_flota_nombre UNIQUE (nombre)
);

CREATE TABLE FLOTA (
    id_flota       INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_empresa     INTEGER      NOT NULL,
    id_tipo_flota  INTEGER      NOT NULL,
    nombre         VARCHAR(100) NOT NULL,
    descripcion    TEXT,
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at     TIMESTAMPTZ,
    CONSTRAINT uq_flota_empresa_nombre UNIQUE (id_empresa, nombre),
    CONSTRAINT fk_flota_empresa FOREIGN KEY (id_empresa)
        REFERENCES EMPRESA(id_empresa) ON DELETE RESTRICT,
    CONSTRAINT fk_flota_tipo_flota FOREIGN KEY (id_tipo_flota)
        REFERENCES TIPO_FLOTA(id_tipo_flota) ON DELETE RESTRICT
);

CREATE TABLE CAMION (
    id_camion                 INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_flota                  INTEGER       NOT NULL,
<<<<<<< HEAD
    patente                   VARCHAR(10)   NOT NULL,
=======
    patente                   VARCHAR(10)   NOT NULL,   -- formato: se valida en el backend
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
    codigo_dispositivo        VARCHAR(50)   NOT NULL,
    marca                     VARCHAR(50)   NOT NULL,
    modelo                    VARCHAR(50)   NOT NULL,
    ano                       INTEGER       NOT NULL,
    capacidad_carga_kg        NUMERIC(8,2)  NOT NULL,
    capacidad_estanque_l      NUMERIC(7,2)  NOT NULL,
    tipo_combustible          VARCHAR(15)   NOT NULL DEFAULT 'DIESEL',
<<<<<<< HEAD
=======
    rendimiento_esperado_kml  NUMERIC(5,2)  NOT NULL,   -- km por litro esperados (referencia para detectar mermas)
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
    estado                    VARCHAR(20)   NOT NULL DEFAULT 'DISPONIBLE',
    created_at                TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at                TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at                TIMESTAMPTZ,
    CONSTRAINT uq_camion_patente UNIQUE (patente),
    CONSTRAINT uq_camion_codigo_dispositivo UNIQUE (codigo_dispositivo),
    CONSTRAINT fk_camion_flota FOREIGN KEY (id_flota)
        REFERENCES FLOTA(id_flota) ON DELETE RESTRICT,
<<<<<<< HEAD
    CONSTRAINT chk_camion_ano CHECK (ano BETWEEN 1990 AND 2100),
    CONSTRAINT chk_camion_capacidad_carga_kg CHECK (capacidad_carga_kg > 0),
    CONSTRAINT chk_camion_capacidad_estanque_l CHECK (capacidad_estanque_l > 0),
=======
    -- Límite superior dinámico (año actual + 1) se valida en trigger; aquí solo un tope fijo
    CONSTRAINT chk_camion_ano CHECK (ano BETWEEN 1990 AND 2100),
    CONSTRAINT chk_camion_capacidad_carga_kg CHECK (capacidad_carga_kg > 0),
    CONSTRAINT chk_camion_capacidad_estanque_l CHECK (capacidad_estanque_l > 0),
    CONSTRAINT chk_camion_rendimiento_esperado_kml CHECK (rendimiento_esperado_kml > 0),
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
    CONSTRAINT chk_camion_tipo_combustible CHECK (tipo_combustible IN ('DIESEL','GASOLINA','GNC','GLP','ELECTRICO')),
    CONSTRAINT chk_camion_estado CHECK (estado IN ('DISPONIBLE','EN_RUTA','MANTENCION','FUERA_DE_SERVICIO'))
);

-- ==============================================================================
-- 6. Equipamiento: catálogo de mediciones y sensores
-- ==============================================================================
CREATE TABLE TIPO_MEDICION (
    id_tipo_medicion  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_severidad      SMALLINT      NOT NULL DEFAULT 3,   -- severidad de la anomalía si se cruza un umbral
    codigo            VARCHAR(40)   NOT NULL,
    nombre            VARCHAR(100)  NOT NULL,
    categoria         VARCHAR(20)   NOT NULL,
    unidad            VARCHAR(15)   NOT NULL,
    valor_min_fisico  NUMERIC(12,3),   -- fuera de este rango la lectura es físicamente imposible (sensor defectuoso)
    valor_max_fisico  NUMERIC(12,3),
    umbral_min        NUMERIC(12,3),   -- bajo este valor se genera anomalía
    umbral_max        NUMERIC(12,3),   -- sobre este valor se genera anomalía
    CONSTRAINT uq_tipo_medicion_codigo UNIQUE (codigo),
    CONSTRAINT fk_tipo_medicion_severidad FOREIGN KEY (id_severidad)
        REFERENCES SEVERIDAD(id_severidad) ON DELETE RESTRICT,
    CONSTRAINT chk_tipo_medicion_categoria
        CHECK (categoria IN ('COMBUSTIBLE','MOTOR','NEUMATICO','EMISION','ELECTRICO','CARGA')),
    CONSTRAINT chk_tipo_medicion_rango_fisico
        CHECK (valor_min_fisico IS NULL OR valor_max_fisico IS NULL OR valor_min_fisico < valor_max_fisico),
    CONSTRAINT chk_tipo_medicion_umbrales
        CHECK (umbral_min IS NULL OR umbral_max IS NULL OR umbral_min < umbral_max)
);

CREATE TABLE SENSOR (
    id_sensor         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_camion         INTEGER      NOT NULL,
    id_tipo_medicion  INTEGER      NOT NULL,
    ubicacion         VARCHAR(50)  NOT NULL,
    estado            VARCHAR(20)  NOT NULL DEFAULT 'ACTIVO',
    created_at        TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at        TIMESTAMPTZ,
    CONSTRAINT uq_sensor_camion_tipo_ubicacion UNIQUE (id_camion, id_tipo_medicion, ubicacion),
    CONSTRAINT fk_sensor_camion FOREIGN KEY (id_camion)
        REFERENCES CAMION(id_camion) ON DELETE RESTRICT,
    CONSTRAINT fk_sensor_tipo_med FOREIGN KEY (id_tipo_medicion)
        REFERENCES TIPO_MEDICION(id_tipo_medicion) ON DELETE RESTRICT,
    CONSTRAINT chk_sensor_estado CHECK (estado IN ('ACTIVO','INACTIVO','FALLA'))
);

-- ==============================================================================
-- 7. Rutas, Viajes y Operaciones
-- ==============================================================================
CREATE TABLE RUTA (
    id_ruta            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_comuna_origen   INTEGER       NOT NULL,
    id_comuna_destino  INTEGER       NOT NULL,
    distancia_km       NUMERIC(8,2)  NOT NULL,
    created_at         TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_ruta_origen_destino UNIQUE (id_comuna_origen, id_comuna_destino),
    CONSTRAINT fk_ruta_comuna_origen FOREIGN KEY (id_comuna_origen)
        REFERENCES COMUNA(id_comuna) ON DELETE RESTRICT,
    CONSTRAINT fk_ruta_comuna_destino FOREIGN KEY (id_comuna_destino)
        REFERENCES COMUNA(id_comuna) ON DELETE RESTRICT,
    CONSTRAINT chk_ruta_distancia_km CHECK (distancia_km > 0),
    CONSTRAINT chk_ruta_origen_destino CHECK (id_comuna_origen <> id_comuna_destino)
);

CREATE TABLE PUNTO_CONTROL (
    id_punto   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_ruta    INTEGER       NOT NULL,
    nombre     VARCHAR(100)  NOT NULL,
    latitud    NUMERIC(10,8) NOT NULL,
    longitud   NUMERIC(11,8) NOT NULL,
    orden      INTEGER       NOT NULL,
    CONSTRAINT fk_punto_control_ruta FOREIGN KEY (id_ruta)
        REFERENCES RUTA(id_ruta) ON DELETE CASCADE,   -- puntos de control son parte de la definición de la ruta
    CONSTRAINT uq_punto_control_ruta_orden UNIQUE (id_ruta, orden),
    CONSTRAINT chk_punto_control_orden CHECK (orden > 0),
    CONSTRAINT chk_punto_control_latitud CHECK (latitud BETWEEN -90 AND 90),
    CONSTRAINT chk_punto_control_longitud CHECK (longitud BETWEEN -180 AND 180)
);

CREATE TABLE VIAJE (
    id_viaje             INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_camion            INTEGER      NOT NULL,
    id_ruta              INTEGER      NOT NULL,
    id_empresa           INTEGER      NOT NULL,
    fecha_inicio         TIMESTAMPTZ  NOT NULL,
    fecha_fin_estimada   TIMESTAMPTZ,   -- obligatoria en PROGRAMADO: define el rango reservado del camión
    fecha_fin            TIMESTAMPTZ,   -- fecha real de término
    estado               VARCHAR(20)  NOT NULL DEFAULT 'PROGRAMADO',
    created_at           TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_viaje_empresa FOREIGN KEY (id_empresa)
        REFERENCES EMPRESA(id_empresa) ON DELETE RESTRICT,
    CONSTRAINT fk_viaje_camion FOREIGN KEY (id_camion)
        REFERENCES CAMION(id_camion) ON DELETE RESTRICT,
    CONSTRAINT fk_viaje_ruta FOREIGN KEY (id_ruta)
        REFERENCES RUTA(id_ruta) ON DELETE RESTRICT,
    CONSTRAINT chk_viaje_estado CHECK (estado IN ('EN_CURSO','PROGRAMADO','CANCELADO','COMPLETADO')),
    CONSTRAINT chk_viaje_fechas CHECK (fecha_fin IS NULL OR fecha_fin > fecha_inicio),
    CONSTRAINT chk_viaje_fecha_fin_estimada CHECK (fecha_fin_estimada IS NULL OR fecha_fin_estimada > fecha_inicio),
    CONSTRAINT chk_viaje_programado_estimada CHECK (estado <> 'PROGRAMADO' OR fecha_fin_estimada IS NOT NULL),
    CONSTRAINT chk_viaje_completado_fin CHECK (estado <> 'COMPLETADO' OR fecha_fin IS NOT NULL),
    CONSTRAINT chk_viaje_abierto_sin_fin CHECK (estado NOT IN ('PROGRAMADO','EN_CURSO') OR fecha_fin IS NULL),
    -- Un camión no puede tener dos viajes solapados. El rango infinito solo ocurre en EN_CURSO sin estimación.
    CONSTRAINT excl_viaje_camion_sin_solape EXCLUDE USING gist (
        id_camion WITH =,
        tstzrange(fecha_inicio, COALESCE(fecha_fin, fecha_fin_estimada, 'infinity'::timestamptz)) WITH &&
    ) WHERE (estado <> 'CANCELADO')
);

CREATE TABLE CARGA (
    id_carga     INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_viaje     INTEGER       NOT NULL,
    tipo_carga   VARCHAR(100)  NOT NULL,
    peso_kg      NUMERIC(8,2)  NOT NULL,
    descripcion  TEXT,
    created_at   TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_carga_viaje FOREIGN KEY (id_viaje)
        REFERENCES VIAJE(id_viaje) ON DELETE RESTRICT,
    CONSTRAINT chk_carga_peso_kg CHECK (peso_kg > 0)
);

CREATE TABLE ASIGNACION (
    id_asignacion           INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_conductor            INTEGER       NOT NULL,
    id_viaje                INTEGER       NOT NULL,
    fecha_asignacion        TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado                  VARCHAR(20)   NOT NULL DEFAULT 'ACTIVA',
    capacidad_utilizada_kg  NUMERIC(8,2)  NOT NULL DEFAULT 0,   -- derivado: lo calcula el trigger desde CARGA
    fecha_inicio_viaje      TIMESTAMPTZ   NOT NULL,              -- copia mantenida por trigger (para el EXCLUDE)
    fecha_fin_viaje         TIMESTAMPTZ,                         -- copia: fecha_fin real o estimada del viaje
    created_at              TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_asignacion_conductor FOREIGN KEY (id_conductor)
        REFERENCES CONDUCTOR(id_conductor) ON DELETE RESTRICT,
    CONSTRAINT fk_asignacion_viaje FOREIGN KEY (id_viaje)
        REFERENCES VIAJE(id_viaje) ON DELETE RESTRICT,
    CONSTRAINT chk_asignacion_estado CHECK (estado IN ('CANCELADA','COMPLETADA','ACTIVA')),
    CONSTRAINT chk_asignacion_capacidad_utilizada_kg CHECK (capacidad_utilizada_kg >= 0),
    CONSTRAINT excl_asignacion_conductor_sin_solape EXCLUDE USING gist (
        id_conductor WITH =,
        tstzrange(fecha_inicio_viaje, COALESCE(fecha_fin_viaje, 'infinity'::timestamptz)) WITH &&
    ) WHERE (estado <> 'CANCELADA')
);

CREATE UNIQUE INDEX uq_asignacion_viaje_activa
    ON ASIGNACION (id_viaje) WHERE estado = 'ACTIVA';

-- ==============================================================================
-- 8. Telemetría (paquetes) y Lecturas (una fila por sensor dentro del paquete)
--    Tablas de alto volumen: particionadas por mes sobre fecha_hora.
-- ==============================================================================
CREATE TABLE TELEMETRIA (
    id_telemetria    BIGINT GENERATED ALWAYS AS IDENTITY,
    fecha_hora       TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,   -- hora del paquete (reloj del dispositivo)
    id_camion        INTEGER       NOT NULL,
    id_viaje         INTEGER,                                            -- NULL si el camión transmite fuera de un viaje
    fecha_recepcion  TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,   -- hora en que llegó al servidor
    velocidad        NUMERIC(6,2)  NOT NULL,   -- sin tope: un valor absurdo se guarda y genera anomalía
    latitud          NUMERIC(10,8) NOT NULL,
    longitud         NUMERIC(11,8) NOT NULL,
    CONSTRAINT pk_telemetria PRIMARY KEY (id_telemetria, fecha_hora),
    CONSTRAINT uq_telemetria_camion_fecha UNIQUE (id_camion, fecha_hora),   -- evita paquetes duplicados
    CONSTRAINT fk_telemetria_camion FOREIGN KEY (id_camion)
        REFERENCES CAMION(id_camion) ON DELETE RESTRICT,
    CONSTRAINT fk_telemetria_viaje FOREIGN KEY (id_viaje)
        REFERENCES VIAJE(id_viaje) ON DELETE RESTRICT,
    CONSTRAINT chk_telemetria_velocidad CHECK (velocidad >= 0),
    CONSTRAINT chk_telemetria_latitud CHECK (latitud BETWEEN -90 AND 90),
    CONSTRAINT chk_telemetria_longitud CHECK (longitud BETWEEN -180 AND 180)
) PARTITION BY RANGE (fecha_hora);

CREATE TABLE LECTURA (
    id_lectura     BIGINT GENERATED ALWAYS AS IDENTITY,
    fecha_hora     TIMESTAMPTZ   NOT NULL,   -- misma fecha_hora del paquete (necesaria por el particionado)
    id_telemetria  BIGINT        NOT NULL,
    id_sensor      INTEGER       NOT NULL,
    valor          NUMERIC(12,3) NOT NULL,
    calidad        VARCHAR(12)   NOT NULL DEFAULT 'OK',
    CONSTRAINT pk_lectura PRIMARY KEY (id_lectura, fecha_hora),
    CONSTRAINT uq_lectura_telemetria_sensor UNIQUE (id_telemetria, fecha_hora, id_sensor),
    CONSTRAINT fk_lectura_telem FOREIGN KEY (id_telemetria, fecha_hora)
        REFERENCES TELEMETRIA(id_telemetria, fecha_hora) ON DELETE RESTRICT,
    CONSTRAINT fk_lectura_sensor FOREIGN KEY (id_sensor)
        REFERENCES SENSOR(id_sensor) ON DELETE RESTRICT,
    CONSTRAINT chk_lectura_calidad CHECK (calidad IN ('OK','FUERA_RANGO'))
) PARTITION BY RANGE (fecha_hora);

-- Partición por defecto (red de seguridad) y creación de particiones mensuales
CREATE TABLE TELEMETRIA_DEFAULT PARTITION OF TELEMETRIA DEFAULT;
CREATE TABLE LECTURA_DEFAULT    PARTITION OF LECTURA    DEFAULT;

CREATE OR REPLACE FUNCTION fn_telemetria_crear_particion(p_mes DATE)
RETURNS VOID AS
$$
DECLARE
    v_ini  TIMESTAMPTZ := (date_trunc('month', p_mes)::timestamp) AT TIME ZONE 'America/Santiago';
    v_fin  TIMESTAMPTZ := ((date_trunc('month', p_mes) + INTERVAL '1 month')::timestamp) AT TIME ZONE 'America/Santiago';
    v_suf  TEXT        := to_char(p_mes, 'YYYY_MM');
BEGIN
    EXECUTE format('CREATE TABLE IF NOT EXISTS %I.%I PARTITION OF %I.telemetria FOR VALUES FROM (%L) TO (%L)',
                   'kutrol', 'telemetria_' || v_suf, 'kutrol', v_ini, v_fin);
    EXECUTE format('CREATE TABLE IF NOT EXISTS %I.%I PARTITION OF %I.lectura FOR VALUES FROM (%L) TO (%L)',
                   'kutrol', 'lectura_' || v_suf, 'kutrol', v_ini, v_fin);
END;
$$ LANGUAGE plpgsql;

-- Mes anterior, actual y 3 siguientes. Luego hay que crear los meses nuevos
-- (por ejemplo con un job mensual o pg_cron):  SELECT fn_telemetria_crear_particion(DATE '2027-03-01');
DO $$
BEGIN
    FOR i IN -1..3 LOOP
        PERFORM fn_telemetria_crear_particion((CURRENT_DATE + make_interval(months => i))::date);
    END LOOP;
END $$;

-- ==============================================================================
-- 9. Abastecimiento, Anomalías, Alertas y Mantención
-- ==============================================================================
CREATE TABLE ABASTECIMIENTO (
    id_abastecimiento  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_camion          INTEGER       NOT NULL,
    id_conductor       INTEGER,
    id_viaje           INTEGER,
    fecha              TIMESTAMPTZ   NOT NULL,
    litros             NUMERIC(8,2)  NOT NULL,
    precio_litro       NUMERIC(10,2) NOT NULL,
    costo              NUMERIC(12,2) NOT NULL,
    odometro_km        NUMERIC(10,1) NOT NULL,
    estanque_lleno     BOOLEAN       NOT NULL DEFAULT FALSE,   -- TRUE permite calcular rendimiento real entre cargas
    estacion           VARCHAR(100),
    created_at         TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_abastecimiento_camion FOREIGN KEY (id_camion)
        REFERENCES CAMION(id_camion) ON DELETE RESTRICT,
    CONSTRAINT fk_abastecimiento_conductor FOREIGN KEY (id_conductor)
        REFERENCES CONDUCTOR(id_conductor) ON DELETE RESTRICT,
    CONSTRAINT fk_abastecimiento_viaje FOREIGN KEY (id_viaje)
        REFERENCES VIAJE(id_viaje) ON DELETE RESTRICT,
    CONSTRAINT chk_abastecimiento_litros CHECK (litros > 0),
    CONSTRAINT chk_abastecimiento_precio_litro CHECK (precio_litro >= 0),
    CONSTRAINT chk_abastecimiento_costo CHECK (costo >= 0),
    CONSTRAINT chk_abastecimiento_odometro_km CHECK (odometro_km >= 0)
);

CREATE TABLE ANOMALIA (
    id_anomalia            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_telemetria          BIGINT       NOT NULL,
    fecha_hora_telemetria  TIMESTAMPTZ  NOT NULL,   -- parte de la FK compuesta (particionado)
    id_lectura             BIGINT,                  -- lectura concreta que originó la anomalía (NULL si viene del GPS/velocidad)
    id_severidad           SMALLINT     NOT NULL,
    tipo                   VARCHAR(40)  NOT NULL,
    descripcion            TEXT,
    fecha_hora             TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,   -- momento de detección
    created_at             TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_anomalia_telem FOREIGN KEY (id_telemetria, fecha_hora_telemetria)
        REFERENCES TELEMETRIA(id_telemetria, fecha_hora) ON DELETE RESTRICT,
    CONSTRAINT fk_anomalia_lectura FOREIGN KEY (id_lectura, fecha_hora_telemetria)
        REFERENCES LECTURA(id_lectura, fecha_hora) ON DELETE RESTRICT,
    CONSTRAINT fk_anomalia_severidad FOREIGN KEY (id_severidad)
        REFERENCES SEVERIDAD(id_severidad) ON DELETE RESTRICT,
    CONSTRAINT chk_anomalia_tipo CHECK (tipo IN (
        'FUERA_RANGO_FISICO',          -- lectura imposible: probable sensor defectuoso
        'UMBRAL_MINIMO',               -- lectura bajo el umbral del tipo de medición
        'UMBRAL_MAXIMO',               -- lectura sobre el umbral del tipo de medición
        'SOBRECARGA',                  -- peso a bordo mayor que la capacidad del camión
        'POSIBLE_PERDIDA_COMBUSTIBLE', -- caída brusca de nivel con el camión detenido
        'EXCESO_VELOCIDAD',
        'VELOCIDAD_INVALIDA'))
);

CREATE TABLE ALERTA (
    id_alerta          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_anomalia        INTEGER      NOT NULL,
    id_conductor       INTEGER,
    id_encargado       INTEGER,                 -- encargado que resolvió o descartó la alerta
    fecha_hora         TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_resolucion   TIMESTAMPTZ,
    tipo               VARCHAR(20)  NOT NULL,
    estado             VARCHAR(20)  NOT NULL DEFAULT 'GENERADA',
    mensaje            TEXT         NOT NULL,
    created_at         TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_alerta_anomalia FOREIGN KEY (id_anomalia)
        REFERENCES ANOMALIA(id_anomalia) ON DELETE RESTRICT,
    CONSTRAINT fk_alerta_conductor FOREIGN KEY (id_conductor)
        REFERENCES CONDUCTOR(id_conductor) ON DELETE SET NULL,
    CONSTRAINT fk_alerta_encargado FOREIGN KEY (id_encargado)
        REFERENCES ENCARGADO_EMPRESA(id_encargado) ON DELETE SET NULL,
    CONSTRAINT chk_alerta_tipo CHECK (tipo IN
        ('COMBUSTIBLE','MOTOR','NEUMATICO','EMISION','ELECTRICO','CARGA','VELOCIDAD','SENSOR')),
    CONSTRAINT chk_alerta_estado CHECK (estado IN ('GENERADA','EN_REVISION','RESUELTA','DESCARTADA')),
    CONSTRAINT chk_alerta_resolucion CHECK (
        (estado IN ('RESUELTA','DESCARTADA')) = (fecha_resolucion IS NOT NULL)),
    CONSTRAINT chk_alerta_fecha_resolucion CHECK (fecha_resolucion IS NULL OR fecha_resolucion >= fecha_hora)
);

CREATE TABLE MANTENCION (
    id_mantencion  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_camion      INTEGER       NOT NULL,
    id_alerta      INTEGER,
    fecha          TIMESTAMPTZ   NOT NULL,
    tipo           VARCHAR(20)   NOT NULL,
    descripcion    TEXT,
    costo          NUMERIC(10,2) NOT NULL,
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_mantencion_camion FOREIGN KEY (id_camion)
        REFERENCES CAMION(id_camion) ON DELETE RESTRICT,
    CONSTRAINT fk_mantencion_alerta FOREIGN KEY (id_alerta)
        REFERENCES ALERTA(id_alerta) ON DELETE SET NULL,
    CONSTRAINT chk_mantencion_tipo CHECK (tipo IN ('PREVENTIVA','CORRECTIVA','INSPECCION')),
    CONSTRAINT chk_mantencion_costo CHECK (costo >= 0)
);
