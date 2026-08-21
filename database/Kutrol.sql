-- ==============================================================================
-- Script DDL [Eficiencia de Combustible y Control de Pérdidas]
-- Grupo: 1 [KUTROL]
-- Integrantes: Carla Vargas, Claudio Uribe, Valentina Calderon, Cristobal Oñate
-- Fecha: 07/07/2026
-- SGBD: PostgreSQL 16
-- Base: bd_grupo1_Kutrol
-- ==============================================================================
DROP TABLE IF EXISTS ALERTA CASCADE;
DROP TABLE IF EXISTS ANOMALIA CASCADE;
DROP TABLE IF EXISTS TELEMETRIA CASCADE;
DROP TABLE IF EXISTS MANTENCION CASCADE;
DROP TABLE IF EXISTS ABASTECIMIENTO CASCADE;
DROP TABLE IF EXISTS ASIGNACION CASCADE;
DROP TABLE IF EXISTS CARGA CASCADE;
DROP TABLE IF EXISTS VIAJE CASCADE;
DROP TABLE IF EXISTS PUNTO_CONTROL CASCADE;
DROP TABLE IF EXISTS RUTA CASCADE;
DROP TABLE IF EXISTS SENSOR CASCADE;
DROP TABLE IF EXISTS CAMION CASCADE;
DROP TABLE IF EXISTS FLOTA CASCADE;
DROP TABLE IF EXISTS TIPO CASCADE;
DROP TABLE IF EXISTS CONDUCTOR_EMAIL CASCADE;
DROP TABLE IF EXISTS CONDUCTOR_TELEFONO CASCADE;
DROP TABLE IF EXISTS CONDUCTOR CASCADE;
DROP TABLE IF EXISTS EMPRESA CASCADE;


-- =====================
-- Extension btree gist
-- =====================
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- ==============================================================================
-- Entidades Nivel 1: Maestras y Contacto
-- ==============================================================================

CREATE TABLE EMPRESA (
    id_empresa SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    rut VARCHAR(12) NOT NULL UNIQUE,
    direccion VARCHAR(200) NOT NULL
);

CREATE TABLE CONDUCTOR (
    id_conductor SERIAL PRIMARY KEY,
	id_empresa INTEGER NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    run VARCHAR(12) NOT NULL UNIQUE,
    licencia VARCHAR(20) NOT NULL,
    fecha_venc_licencia DATE NOT NULL,
	CONSTRAINT fk_conductor_empresa FOREIGN KEY (id_empresa) REFERENCES EMPRESA(id_empresa) ON DELETE RESTRICT
);

CREATE TABLE CONDUCTOR_TELEFONO (
    id_conductor INTEGER NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    PRIMARY KEY (id_conductor, telefono),
    CONSTRAINT fk_tel_conductor FOREIGN KEY (id_conductor) REFERENCES CONDUCTOR(id_conductor) ON DELETE CASCADE
);

CREATE TABLE CONDUCTOR_EMAIL (
    id_conductor INTEGER NOT NULL,
    email VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_conductor, email),
    CONSTRAINT fk_email_conductor FOREIGN KEY (id_conductor) REFERENCES CONDUCTOR(id_conductor) ON DELETE CASCADE
);

-- ==============================================================================
-- Entidades Nivel 2: Estructuras de Flotas y Vehículos
-- ==============================================================================

CREATE TABLE TIPO (
    id_tipo SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

CREATE TABLE FLOTA (
    id_flota SERIAL PRIMARY KEY,
    id_empresa INTEGER NOT NULL,
    id_tipo INTEGER NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    CONSTRAINT fk_flota_empresa FOREIGN KEY (id_empresa) REFERENCES EMPRESA(id_empresa) ON DELETE RESTRICT,
    CONSTRAINT fk_flota_tipo FOREIGN KEY (id_tipo) REFERENCES TIPO(id_tipo) ON DELETE RESTRICT
);

CREATE TABLE CAMION (
    id_camion SERIAL PRIMARY KEY,
    id_flota INTEGER NOT NULL,
    patente VARCHAR(10) NOT NULL UNIQUE,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    ano INTEGER NOT NULL CHECK (ano >= 1990),
    capacidad_carga NUMERIC(8,2) NOT NULL CHECK (capacidad_carga > 0),
    estado VARCHAR(20) NOT NULL DEFAULT 'DISPONIBLE',
    CONSTRAINT fk_camion_flota FOREIGN KEY (id_flota) REFERENCES FLOTA(id_flota) ON DELETE RESTRICT
--===
);


-- ==============================================================================
-- Entidades Nivel 3: Equipamiento
-- ==============================================================================

CREATE TABLE SENSOR (
    id_sensor SERIAL PRIMARY KEY,
    id_camion INTEGER NOT NULL,
    tipo_sensor VARCHAR(50) NOT NULL,
    ubicacion VARCHAR(50) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    CONSTRAINT fk_sensor_camion FOREIGN KEY (id_camion) REFERENCES CAMION(id_camion) ON DELETE CASCADE
);

-- ==============================================================================
-- Entidades Nivel 4: Rutas, Viajes y Operaciones
-- ==============================================================================

CREATE TABLE RUTA (
    id_ruta SERIAL PRIMARY KEY,
    origen VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    distancia_km NUMERIC(8,2) NOT NULL CHECK (distancia_km > 0)
);

CREATE TABLE PUNTO_CONTROL (
    id_punto SERIAL PRIMARY KEY,
    id_ruta INTEGER NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    latitud NUMERIC(10,8) NOT NULL,
    longitud NUMERIC(11,8) NOT NULL,
    orden INTEGER NOT NULL CHECK (orden > 0),
    CONSTRAINT fk_punto_ruta FOREIGN KEY (id_ruta) REFERENCES RUTA(id_ruta) ON DELETE CASCADE
);

CREATE TABLE VIAJE (
    id_viaje SERIAL PRIMARY KEY,
    id_camion INTEGER NOT NULL,
    id_ruta INTEGER NOT NULL,
	id_empresa INTEGER NOT NULL,
	fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP,
    estado VARCHAR(20) NOT NULL DEFAULT 'PROGRAMADO',
    CONSTRAINT fk_viaje_empresa FOREIGN KEY (id_empresa) REFERENCES EMPRESA(id_empresa) ON DELETE RESTRICT,
	CONSTRAINT fk_viaje_camion FOREIGN KEY (id_camion) REFERENCES CAMION(id_camion) ON DELETE RESTRICT,
    CONSTRAINT fk_viaje_ruta FOREIGN KEY (id_ruta) REFERENCES RUTA(id_ruta) ON DELETE RESTRICT


);

-- La tabla CARGA se movió aquí porque requiere que la tabla VIAJE exista primero.
CREATE TABLE CARGA (
    id_carga SERIAL PRIMARY KEY,
    id_viaje INTEGER NOT NULL,
    tipo_carga VARCHAR(100) NOT NULL,
    peso NUMERIC(8,2) NOT NULL CHECK (peso > 0),
    descripcion TEXT,
    CONSTRAINT fk_carga_viaje FOREIGN KEY (id_viaje) REFERENCES VIAJE(id_viaje) ON DELETE CASCADE
);

CREATE TABLE ASIGNACION (
    id_asignacion SERIAL PRIMARY KEY,
    id_conductor INTEGER NOT NULL,
    id_viaje INTEGER NOT NULL,
    fecha_asignacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVA',
    capacidad_utilizada_kg NUMERIC(8,2) NOT NULL CHECK (capacidad_utilizada_kg >= 0),
	CONSTRAINT fk_asig_conductor FOREIGN KEY (id_conductor) REFERENCES CONDUCTOR(id_conductor) ON DELETE RESTRICT,
    CONSTRAINT fk_asig_viaje FOREIGN KEY (id_viaje) REFERENCES VIAJE(id_viaje) ON DELETE CASCADE
);

-- ==============================================================================
-- Entidades Nivel 5: Telemetría, Mantenimiento y Eventos
-- ==============================================================================

CREATE TABLE TELEMETRIA (
    id_telemetria SERIAL PRIMARY KEY,
    id_viaje INTEGER,
    id_sensor INTEGER NOT NULL,
    fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    velocidad NUMERIC(5,2) NOT NULL CHECK (velocidad >= 0),
    latitud NUMERIC(10,8) NOT NULL,
    longitud NUMERIC(11,8) NOT NULL,
    CONSTRAINT fk_telem_viaje FOREIGN KEY (id_viaje) REFERENCES VIAJE(id_viaje) ON DELETE CASCADE,
    CONSTRAINT fk_telem_sensor FOREIGN KEY (id_sensor) REFERENCES SENSOR(id_sensor) ON DELETE RESTRICT
);

CREATE TABLE ABASTECIMIENTO (
    id_abastecimiento SERIAL PRIMARY KEY,
    id_camion INTEGER NOT NULL,
    fecha TIMESTAMP NOT NULL,
    cantidad_combustible NUMERIC(8,2) NOT NULL CHECK (cantidad_combustible > 0),
    costo NUMERIC(10,2) NOT NULL CHECK (costo >= 0),
    CONSTRAINT fk_abasto_camion FOREIGN KEY (id_camion) REFERENCES CAMION(id_camion) ON DELETE CASCADE
);

CREATE TABLE MANTENCION (
    id_mantencion SERIAL PRIMARY KEY,
    id_camion INTEGER NOT NULL,
    fecha TIMESTAMP NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    descripcion TEXT,
    costo NUMERIC(10,2) NOT NULL CHECK (costo >= 0),
    CONSTRAINT fk_manten_camion FOREIGN KEY (id_camion) REFERENCES CAMION(id_camion) ON DELETE CASCADE
);

CREATE TABLE ANOMALIA (
    id_anomalia SERIAL PRIMARY KEY,
    id_telemetria INTEGER NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    descripcion TEXT,
    fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    nivel INTEGER NOT NULL CHECK (nivel BETWEEN 1 AND 5),
    CONSTRAINT fk_anomalia_telem FOREIGN KEY (id_telemetria) REFERENCES TELEMETRIA(id_telemetria) ON DELETE CASCADE
);

CREATE TABLE ALERTA (
    id_alerta SERIAL PRIMARY KEY,
    id_anomalia INTEGER NOT NULL,
    id_mantencion INTEGER,
	id_conductor INTEGER,
	fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(50) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'GENERADA',
    mensaje TEXT NOT NULL,
    CONSTRAINT fk_alerta_anomalia FOREIGN KEY (id_anomalia) REFERENCES ANOMALIA(id_anomalia) ON DELETE CASCADE,
    CONSTRAINT fk_alerta_manten FOREIGN KEY (id_mantencion) REFERENCES MANTENCION(id_mantencion) ON DELETE SET NULL,
	CONSTRAINT fk_alerta_conductor FOREIGN KEY (id_conductor) REFERENCES CONDUCTOR(id_conductor) ON DELETE SET NULL
);

-- Índices B-tree para optimización de JOINs y WHERE
CREATE INDEX idx_viaje_camion ON VIAJE(id_camion);
CREATE INDEX idx_telemetria_viaje ON TELEMETRIA(id_viaje);
CREATE INDEX idx_telemetria_sensor ON TELEMETRIA(id_sensor);
CREATE INDEX idx_asig_conductor ON ASIGNACION(id_conductor);




-- ====================================================
-- ALTER TABLE (reglas de negocio)
-- ====================================================

ALTER TABLE CAMION ADD CONSTRAINT chk_camion_estado
  CHECK (estado IN ('DISPONIBLE','EN_RUTA','MANTENCION','FUERA_DE_SERVICIO'));

ALTER TABLE VIAJE ADD CONSTRAINT chk_viaje_estado
	CHECK (estado IN ('EN_CURSO','PROGRAMADO','CANCELADO', 'COMPLETADO'));

ALTER TABLE ASIGNACION ADD CONSTRAINT chk_asignacion_estado
	CHECK (estado IN ('CANCELADA','COMPLETADA','ACTIVA'));

ALTER TABLE sensor ADD CONSTRAINT chk_sensor_estado 
	CHECK (estado IN ('ACTIVO','INACTIVO','FALLA'));

ALTER TABLE alerta ADD CONSTRAINT chk_alerta_estado 
	CHECK(estado IN ('GENERADA','EN_REVISION','RESUELTA','DESCARTADA'));

ALTER TABLE VIAJE ADD CONSTRAINT chk_fecha_viaje
	CHECK (fecha_fin IS NULL OR fecha_fin > fecha_inicio);

ALTER TABLE CAMION ADD CONSTRAINT chk_camion_ano_coherente
	CHECK (ano <= EXTRACT(YEAR FROM CURRENT_DATE)::INT + 1);

ALTER TABLE TELEMETRIA ADD CONSTRAINT chk_telemetria_velocidad_max
	CHECK (velocidad <= 150);

ALTER TABLE PUNTO_CONTROL ADD CONSTRAINT uq_punto_control_ruta_orden
UNIQUE (id_ruta, orden);


CREATE UNIQUE INDEX uq_asignacion_activa_por_viaje
ON ASIGNACION (id_viaje)
WHERE estado = 'ACTIVA';

ALTER TABLE VIAJE
ADD CONSTRAINT excl_viaje_camion_sin_solape
EXCLUDE USING gist (
	id_camion WITH =,
    tsrange(
        fecha_inicio,
        COALESCE(fecha_fin, 'infinity'::timestamp)
    ) WITH &&) WHERE (estado <> 'CANCELADO');

ALTER TABLE ASIGNACION
ADD COLUMN fecha_inicio_viaje TIMESTAMP;

ALTER TABLE ASIGNACION
ADD COLUMN fecha_fin_viaje TIMESTAMP;


CREATE OR REPLACE FUNCTION sync_fechas_asignacion()
RETURNS TRIGGER AS
$$
BEGIN
    SELECT
        fecha_inicio,
        fecha_fin
    INTO
        NEW.fecha_inicio_viaje,
        NEW.fecha_fin_viaje
    FROM viaje
    WHERE id_viaje = NEW.id_viaje;

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_fechas_asignacion
BEFORE INSERT OR UPDATE OF id_viaje
ON ASIGNACION
FOR EACH ROW
EXECUTE FUNCTION sync_fechas_asignacion();

ALTER TABLE ASIGNACION
ADD CONSTRAINT excl_asignacion_conductor_sin_solape
EXCLUDE USING gist (
    id_conductor WITH =,
    tsrange(
        fecha_inicio_viaje,
        COALESCE(fecha_fin_viaje, 'infinity'::timestamp)
    ) WITH &&
)
WHERE (estado <> 'CANCELADA');


-- ==============================================================================
-- Datos de prueba
-- 1. EMPRESA (4 registros)
-- ==============================================================================
INSERT INTO EMPRESA (nombre, rut, direccion) VALUES
('Transportes Andina Ltda.',        '76123456-7', 'Av. Providencia 1234, Santiago'),
('Logística del Sur SpA',           '77234567-8', 'Camino a Coronel 4521, Concepción'),
('Transportes Patagonia S.A.',      '78345678-9', 'Ruta 7 Km 15, Puerto Montt'),
('Rentas y Cargas Norte Ltda.',     '79456789-0', 'Av. Argentina 890, Antofagasta');
-- id_empresa: 1=Andina, 2=Logística del Sur, 3=Patagonia, 4=Rentas Norte
 
-- ==============================================================================
-- 2. CONDUCTOR (20 registros)
-- ==============================================================================
INSERT INTO CONDUCTOR (id_empresa, nombre, run, licencia, fecha_venc_licencia) VALUES
(1, 'Juan Pérez González',        '10234567-8', 'A-4', '2027-05-10'),
(1, 'María Fernanda Soto',        '11345678-9', 'A-3', '2026-11-20'),
(1, 'Carlos Muñoz Rojas',         '12456789-0', 'A-5', '2028-02-15'),
(1, 'Patricia Silva Vera',        '13567890-1', 'A-4', '2027-08-01'),
(1, 'Luis Alberto Contreras',     '14678901-2', 'A-5', '2029-01-30'),
(2, 'Camila Andrea Reyes',        '15789012-3', 'A-3', '2026-12-05'),
(2, 'Francisco Javier Torres',    '16890123-4', 'A-4', '2027-06-18'),
(2, 'Daniela Paz Fuentes',        '17901234-5', 'A-2', '2026-09-25'),
(2, 'Rodrigo Andrés Morales',     '18012345-6', 'A-5', '2028-04-12'),
(2, 'Javiera Ignacia Castro',     '19123456-7', 'A-3', '2027-03-22'),
(3, 'Sebastián Ignacio Vásquez',  '20234567-8', 'A-4', '2027-10-14'),
(3, 'Antonia Belén Herrera',      '21345678-9', 'A-3', '2026-10-30'),
(3, 'Matías Alejandro Poblete',   '22456789-0', 'A-5', '2028-07-19'),
(3, 'Fernanda Alejandra Bravo',   '23567890-1', 'A-4', '2027-01-09'),
(3, 'Cristian Eduardo Sepúlveda', '24678901-2', 'A-2', '2026-08-17'),
(4, 'Valeria Constanza Araya',    '25789012-3', 'A-4', '2027-12-02'),
(4, 'Diego Armando Cárdenas',     '26890123-4', 'A-5', '2029-03-25'),
(4, 'Josefina Isidora Leiva',     '27901234-5', 'A-3', '2026-11-11'),
(4, 'Nicolás Esteban Flores',     '28012345-6', 'A-4', '2027-09-08'),
(4, 'Trinidad Paz Gutiérrez',     '29123456-7', 'A-2', '2026-08-28');
-- id_conductor: 1..20 en el mismo orden
 
-- ==============================================================================
-- 3. CONDUCTOR_TELEFONO (20 registros)
-- ==============================================================================
INSERT INTO CONDUCTOR_TELEFONO (id_conductor, telefono) VALUES
(1,'+56912345601'),(2,'+56912345602'),(3,'+56912345603'),(4,'+56912345604'),(5,'+56912345605'),
(6,'+56912345606'),(7,'+56912345607'),(8,'+56912345608'),(9,'+56912345609'),(10,'+56912345610'),
(11,'+56912345611'),(12,'+56912345612'),(13,'+56912345613'),(14,'+56912345614'),(15,'+56912345615'),
(16,'+56912345616'),(17,'+56912345617'),(18,'+56912345618'),(19,'+56912345619'),(20,'+56912345620');
 
-- ==============================================================================
-- 4. CONDUCTOR_EMAIL (20 registros)
-- ==============================================================================
INSERT INTO CONDUCTOR_EMAIL (id_conductor, email) VALUES
(1,'juan.perez@transandina.cl'),
(2,'maria.soto@transandina.cl'),
(3,'carlos.munoz@transandina.cl'),
(4,'patricia.silva@transandina.cl'),
(5,'luis.contreras@transandina.cl'),
(6,'camila.reyes@logisur.cl'),
(7,'francisco.torres@logisur.cl'),
(8,'daniela.fuentes@logisur.cl'),
(9,'rodrigo.morales@logisur.cl'),
(10,'javiera.castro@logisur.cl'),
(11,'sebastian.vasquez@transpatagonia.cl'),
(12,'antonia.herrera@transpatagonia.cl'),
(13,'matias.poblete@transpatagonia.cl'),
(14,'fernanda.bravo@transpatagonia.cl'),
(15,'cristian.sepulveda@transpatagonia.cl'),
(16,'valeria.araya@rentasnorte.cl'),
(17,'diego.cardenas@rentasnorte.cl'),
(18,'josefina.leiva@rentasnorte.cl'),
(19,'nicolas.flores@rentasnorte.cl'),
(20,'trinidad.gutierrez@rentasnorte.cl');
 
-- ==============================================================================
-- 5. TIPO (4 registros)
-- ==============================================================================
INSERT INTO TIPO (nombre, descripcion) VALUES
('Carga Pesada',        'Transporte de carga general de alto tonelaje'),
('Refrigerado',         'Transporte de mercancías con cadena de frío'),
('Minero',              'Transporte de minerales y concentrados'),
('Combustible Líquido', 'Transporte de combustibles líquidos a granel');
-- id_tipo: 1=Carga Pesada, 2=Refrigerado, 3=Minero, 4=Combustible Líquido
 
-- ==============================================================================
-- 6. FLOTA (5 registros)
-- ==============================================================================
INSERT INTO FLOTA (id_empresa, id_tipo, nombre, descripcion) VALUES
(1, 1, 'Flota Norte Pesada',            'Camiones de carga pesada zona central'),
(2, 2, 'Flota Sur Refrigerada',         'Camiones refrigerados zona sur'),
(3, 3, 'Flota Patagonia Minera',        'Camiones para transporte minero en Patagonia'),
(4, 4, 'Flota Combustibles Antofagasta','Camiones estanque para combustible en el norte'),
(1, 1, 'Flota Andina Mixta',            'Camiones de carga mixta para la zona centro-sur');
-- id_flota: 1..5
 
-- ==============================================================================
-- 7. CAMION (20 registros)
-- ==============================================================================
INSERT INTO CAMION (id_flota, patente, marca, modelo, ano, capacidad_carga, estado) VALUES
(1, 'HTKL54', 'Volvo',          'FH16',        2020, 28000.00, 'DISPONIBLE'),
(1, 'JSPK12', 'Scania',         'R450',        2019, 26000.00, 'EN_RUTA'),
(1, 'RBVM87', 'Mercedes-Benz',  'Actros',      2021, 27000.00, 'DISPONIBLE'),
(1, 'LKTX33', 'MAN',            'TGX',         2018, 25000.00, 'DISPONIBLE'),
(2, 'DFGH21', 'Freightliner',   'Cascadia',    2022, 30000.00, 'DISPONIBLE'),
(2, 'PLMN65', 'Kenworth',       'T800',        2017, 24000.00, 'DISPONIBLE'),
(2, 'QWER98', 'International', 'ProStar',     2020, 26500.00, 'DISPONIBLE'),
(2, 'ASDF76', 'Volvo',          'FH16',        2023, 29000.00, 'DISPONIBLE'),
(3, 'ZXCV43', 'Iveco',          'Stralis',     2016, 22000.00, 'DISPONIBLE'),
(3, 'TYUI29', 'DAF',            'XF',          2019, 25500.00, 'DISPONIBLE'),
(3, 'GHJK58', 'Hino',           '500',         2021, 20000.00, 'DISPONIBLE'),
(3, 'BNMV14', 'Scania',         'R450',        2015, 23000.00, 'MANTENCION'),
(4, 'CVBN82', 'Mercedes-Benz',  'Actros',      2020, 27500.00, 'DISPONIBLE'),
(4, 'XZAS67', 'Volvo',          'FH16',        2018, 28500.00, 'DISPONIBLE'),
(4, 'POIU39', 'MAN',            'TGX',         2022, 26000.00, 'EN_RUTA'),
(4, 'LKJH25', 'Freightliner',   'Cascadia',    2024, 31000.00, 'DISPONIBLE'),
(5, 'MNBV71', 'Kenworth',       'T800',        2019, 24500.00, 'DISPONIBLE'),
(5, 'WERT46', 'Iveco',          'Stralis',     2021, 22500.00, 'DISPONIBLE'),
(5, 'YUIO83', 'DAF',            'XF',          2014, 21000.00, 'FUERA_DE_SERVICIO'),
(5, 'FGHJ19', 'Hino',           '500',         2017, 19500.00, 'MANTENCION');
-- id_camion: 1..20
 
-- ==============================================================================
-- 8. SENSOR (40 registros - 2 por camión: GPS y COMBUSTIBLE)
-- ==============================================================================
INSERT INTO SENSOR (id_camion, tipo_sensor, ubicacion, estado) VALUES
(1,'GPS','CABINA','ACTIVO'),        (1,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(2,'GPS','CABINA','ACTIVO'),        (2,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(3,'GPS','CABINA','ACTIVO'),        (3,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(4,'GPS','CABINA','ACTIVO'),        (4,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(5,'GPS','CABINA','ACTIVO'),        (5,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(6,'GPS','CABINA','ACTIVO'),        (6,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(7,'GPS','CABINA','ACTIVO'),        (7,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(8,'GPS','CABINA','ACTIVO'),        (8,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(9,'GPS','CABINA','ACTIVO'),        (9,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(10,'GPS','CABINA','ACTIVO'),       (10,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(11,'GPS','CABINA','ACTIVO'),       (11,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(12,'GPS','CABINA','FALLA'),        (12,'COMBUSTIBLE','ESTANQUE','FALLA'),
(13,'GPS','CABINA','ACTIVO'),       (13,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(14,'GPS','CABINA','ACTIVO'),       (14,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(15,'GPS','CABINA','ACTIVO'),       (15,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(16,'GPS','CABINA','ACTIVO'),       (16,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(17,'GPS','CABINA','ACTIVO'),       (17,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(18,'GPS','CABINA','ACTIVO'),       (18,'COMBUSTIBLE','ESTANQUE','ACTIVO'),
(19,'GPS','CABINA','INACTIVO'),     (19,'COMBUSTIBLE','ESTANQUE','INACTIVO'),
(20,'GPS','CABINA','FALLA'),        (20,'COMBUSTIBLE','ESTANQUE','ACTIVO');
-- id_sensor: 1..40 (sensor GPS del camión N = 2N-1, sensor COMBUSTIBLE del camión N = 2N)
 
-- ==============================================================================
-- 9. RUTA (5 registros)
-- ==============================================================================
INSERT INTO RUTA (origen, destino, distancia_km) VALUES
('Santiago', 'Valparaíso',    120.50),
('Concepción', 'Temuco',      280.30),
('Puerto Montt', 'Coyhaique', 630.00),
('Antofagasta', 'Calama',     215.40),
('Santiago', 'Concepción',    500.20);
-- id_ruta: 1..5
 
-- ==============================================================================
-- 10. PUNTO_CONTROL (20 registros - 4 por ruta)
-- ==============================================================================
INSERT INTO PUNTO_CONTROL (id_ruta, nombre, latitud, longitud, orden) VALUES
(1, 'Santiago Terminal',          -33.44890000, -70.66930000, 1),
(1, 'Peaje Lo Prado',             -33.40000000, -71.05000000, 2),
(1, 'Casablanca',                 -33.32000000, -71.41000000, 3),
(1, 'Valparaíso Puerto',          -33.04720000, -71.61270000, 4),
(2, 'Concepción Terminal',        -36.82010000, -73.04440000, 1),
(2, 'Los Ángeles',                -37.46920000, -72.35350000, 2),
(2, 'Victoria',                   -38.23170000, -72.33530000, 3),
(2, 'Temuco Terminal',            -38.73590000, -72.59040000, 4),
(3, 'Puerto Montt Terminal',      -41.46930000, -72.94240000, 1),
(3, 'Hornopirén',                 -41.93330000, -72.43330000, 2),
(3, 'Chaitén Control',            -42.91670000, -72.70000000, 3),
(3, 'Coyhaique Terminal',         -45.57520000, -72.06620000, 4),
(4, 'Antofagasta Terminal',       -23.65090000, -70.39750000, 1),
(4, 'Baquedano',                  -23.31670000, -69.83330000, 2),
(4, 'Sierra Gorda',               -22.88330000, -69.31670000, 3),
(4, 'Calama Terminal',            -22.46670000, -68.93330000, 4),
(5, 'Santiago Terminal Sur',      -33.44890000, -70.66930000, 1),
(5, 'Rancagua',                   -34.17080000, -70.74440000, 2),
(5, 'Chillán',                    -36.60670000, -72.10340000, 3),
(5, 'Concepción Terminal Norte',  -36.82010000, -73.04440000, 4);
-- id_punto: 1..20
 
-- ==============================================================================
-- 11. VIAJE (20 registros)
-- Regla crítica: para un mismo id_camion las ventanas de tiempo NO se solapan.
-- ==============================================================================
INSERT INTO VIAJE (id_camion, id_ruta, id_empresa, fecha_inicio, fecha_fin, estado) VALUES
(1,  1, 1, '2026-01-05 08:00', '2026-01-05 20:00', 'COMPLETADO'),  -- V1
(1,  1, 1, '2026-03-12 08:00', '2026-03-12 21:00', 'COMPLETADO'),  -- V2 (después de V1)
(2,  5, 1, '2026-01-10 06:00', '2026-01-12 18:00', 'COMPLETADO'),  -- V3
(2,  5, 1, '2026-07-01 06:00', NULL,                'EN_CURSO'),   -- V4 (después de V3, abierto)
(3,  2, 1, '2026-02-01 07:00', '2026-02-03 19:00', 'COMPLETADO'),  -- V5
(4,  3, 1, '2026-02-15 05:00', '2026-02-20 22:00', 'COMPLETADO'),  -- V6
(5,  1, 2, '2026-01-20 09:00', '2026-01-20 21:00', 'COMPLETADO'),  -- V7
(6,  2, 2, '2026-03-05 08:00', '2026-03-07 20:00', 'COMPLETADO'),  -- V8
(7,  4, 2, '2026-04-01 07:00', '2026-04-02 15:00', 'COMPLETADO'),  -- V9
(8,  5, 2, '2026-05-10 06:00', '2026-05-12 20:00', 'COMPLETADO'),  -- V10
(9,  3, 3, '2026-01-15 06:00', '2026-01-21 18:00', 'COMPLETADO'),  -- V11
(10, 1, 3, '2026-04-10 08:00', '2026-04-10 20:00', 'COMPLETADO'),  -- V12
(11, 2, 3, '2026-05-01 07:00', '2026-05-03 19:00', 'COMPLETADO'),  -- V13
(12, 4, 3, '2026-06-01 07:00', '2026-06-02 15:00', 'CANCELADO'),   -- V14
(13, 5, 4, '2026-02-25 06:00', '2026-02-27 20:00', 'COMPLETADO'),  -- V15
(14, 1, 4, '2026-06-15 08:00', '2026-06-15 20:00', 'COMPLETADO'),  -- V16
(15, 3, 4, '2026-07-05 06:00', NULL,                'EN_CURSO'),   -- V17 (abierto)
(16, 4, 4, '2026-08-01 07:00', '2026-08-02 15:00', 'PROGRAMADO'),  -- V18 (futuro)
(17, 2, 1, '2026-08-10 08:00', '2026-08-12 20:00', 'PROGRAMADO'),  -- V19 (futuro)
(18, 1, 1, '2026-03-20 08:00', '2026-03-20 20:00', 'COMPLETADO');  -- V20
-- id_viaje: 1..20 (camiones 19 y 20 quedan sin viajes asignados)
 
-- ==============================================================================
-- 12. CARGA (20 registros, una por viaje)
-- ==============================================================================
INSERT INTO CARGA (id_viaje, tipo_carga, peso, descripcion) VALUES
(1,  'Materiales de Construcción', 18000.00, 'Áridos y cemento para obra'),
(2,  'Maquinaria Industrial',      20000.00, 'Repuestos y maquinaria pesada'),
(3,  'Contenedor Refrigerado',     15000.00, 'Productos lácteos'),
(4,  'Alimentos Perecederos',      16000.00, 'Frutas y verduras'),
(5,  'Mineral de Cobre',           22000.00, 'Concentrado de cobre'),
(6,  'Combustible Diesel',         19000.00, 'Petróleo diésel a granel'),
(7,  'Materiales de Construcción', 24000.00, 'Fierros y estructuras metálicas'),
(8,  'Maquinaria Industrial',      18000.00, 'Equipos agrícolas'),
(9,  'Mineral de Cobre',           21000.00, 'Concentrado de cobre'),
(10, 'Combustible Diesel',         23000.00, 'Petróleo diésel a granel'),
(11, 'Mineral de Cobre',           17000.00, 'Cátodos de cobre'),
(12, 'Contenedor Refrigerado',     14000.00, 'Productos cárnicos'),
(13, 'Alimentos Perecederos',      12000.00, 'Productos del mar'),
(14, 'Materiales de Construcción', 15000.00, 'Carga cancelada antes de despacho'),
(15, 'Combustible Diesel',         20000.00, 'Petróleo diésel a granel'),
(16, 'Maquinaria Industrial',      21000.00, 'Componentes industriales'),
(17, 'Mineral de Cobre',           19000.00, 'Concentrado de cobre'),
(18, 'Materiales de Construcción', 25000.00, 'Carga programada de áridos'),
(19, 'Combustible Diesel',         18000.00, 'Petróleo diésel a granel'),
(20, 'Contenedor Refrigerado',     16000.00, 'Productos congelados');
 
-- ==============================================================================
-- 13. ASIGNACION (20 registros)
-- Nota: fecha_inicio_viaje / fecha_fin_viaje se completan automáticamente
--       por el trigger trg_sync_fechas_asignacion, no se insertan a mano.
-- Regla crítica: un mismo id_conductor nunca queda con ventanas solapadas.
-- ==============================================================================
INSERT INTO ASIGNACION (id_conductor, id_viaje, estado, capacidad_utilizada_kg) VALUES
(1,  1,  'COMPLETADA', 18000.00),  -- V1
(1,  2,  'COMPLETADA', 20000.00),  -- V2 (conductor1, no se solapa con V1)
(2,  3,  'COMPLETADA', 15000.00),  -- V3
(5,  4,  'ACTIVA',     16000.00),  -- V4 (conductor exclusivo por ser viaje abierto)
(3,  5,  'COMPLETADA', 22000.00),  -- V5
(4,  6,  'COMPLETADA', 19000.00),  -- V6
(6,  7,  'COMPLETADA', 24000.00),  -- V7
(7,  8,  'COMPLETADA', 18000.00),  -- V8
(8,  9,  'COMPLETADA', 21000.00),  -- V9
(9,  10, 'COMPLETADA', 23000.00),  -- V10
(11, 11, 'COMPLETADA', 17000.00),  -- V11
(12, 12, 'COMPLETADA', 14000.00),  -- V12
(13, 13, 'COMPLETADA', 12000.00),  -- V13
(14, 14, 'CANCELADA',  15000.00),  -- V14 (viaje cancelado)
(16, 15, 'COMPLETADA', 20000.00),  -- V15
(17, 16, 'COMPLETADA', 21000.00),  -- V16
(19, 17, 'ACTIVA',     19000.00),  -- V17 (conductor exclusivo por ser viaje abierto)
(18, 18, 'ACTIVA',     25000.00),  -- V18 (futuro)
(3,  19, 'ACTIVA',     18000.00),  -- V19 (conductor3, no se solapa con V5)
(2,  20, 'COMPLETADA', 16000.00);  -- V20 (conductor2, no se solapa con V3)
 
-- ==============================================================================
-- 14. TELEMETRIA (22 registros)
-- ==============================================================================
INSERT INTO TELEMETRIA (id_viaje, id_sensor, fecha_hora, velocidad, latitud, longitud) VALUES
(1,  1,  '2026-01-05 12:00', 85.50, -33.20000000, -71.10000000),
(2,  1,  '2026-03-12 14:00', 90.20, -33.10000000, -71.30000000),
(3,  3,  '2026-01-10 10:00', 78.00, -37.50000000, -72.80000000),
(3,  3,  '2026-01-11 15:00', 95.30, -38.00000000, -72.60000000),
(4,  3,  '2026-07-01 10:00', 82.10, -34.50000000, -71.90000000),
(4,  3,  '2026-07-06 09:00', 88.40, -35.80000000, -72.30000000),
(5,  5,  '2026-02-01 12:00', 70.00, -37.20000000, -73.00000000),
(6,  7,  '2026-02-16 08:00', 65.50, -42.00000000, -72.80000000),
(6,  7,  '2026-02-19 10:00', 72.30, -44.50000000, -72.50000000),
(7,  9,  '2026-01-20 14:00', 100.00,-33.30000000, -71.20000000),
(8,  11, '2026-03-06 09:00', 68.70, -37.60000000, -72.90000000),
(9,  13, '2026-04-01 12:00', 75.20, -23.80000000, -69.90000000),
(10, 15, '2026-05-11 08:00', 60.10, -34.80000000, -72.00000000),
(11, 17, '2026-01-16 09:00', 55.00, -41.80000000, -72.90000000),
(11, 17, '2026-01-19 16:00', 62.40, -44.20000000, -72.60000000),
(12, 19, '2026-04-10 13:00', 92.00, -33.35000000, -71.15000000),
(13, 21, '2026-05-02 10:00', 71.80, -37.70000000, -72.85000000),
(15, 25, '2026-02-26 09:00', 66.60, -35.00000000, -72.10000000),
(16, 27, '2026-06-15 11:00', 89.90, -33.25000000, -71.25000000),
(17, 29, '2026-07-05 10:00', 58.00, -41.90000000, -72.95000000),
(17, 29, '2026-07-06 14:00', 63.20, -42.80000000, -72.75000000),
(20, 35, '2026-03-20 12:00', 84.00, -33.28000000, -71.18000000);
-- id_telemetria: 1..22
 
-- ==============================================================================
-- 15. ABASTECIMIENTO (20 registros)
-- ==============================================================================
INSERT INTO ABASTECIMIENTO (id_camion, fecha, cantidad_combustible, costo) VALUES
(1,  '2026-01-04 07:30', 280.00, 266000.00),
(1,  '2026-03-11 07:15', 300.00, 285000.00),
(2,  '2026-01-09 06:00', 350.00, 332500.00),
(2,  '2026-06-30 06:30', 400.00, 380000.00),
(3,  '2026-01-31 08:00', 260.00, 247000.00),
(4,  '2026-02-14 06:45', 310.00, 294500.00),
(5,  '2026-01-19 08:30', 270.00, 256500.00),
(6,  '2026-03-04 07:00', 290.00, 275500.00),
(7,  '2026-03-31 06:15', 250.00, 237500.00),
(8,  '2026-05-09 07:45', 330.00, 313500.00),
(9,  '2026-01-14 06:00', 340.00, 323000.00),
(10, '2026-04-09 08:15', 260.00, 247000.00),
(11, '2026-04-30 07:30', 300.00, 285000.00),
(13, '2026-02-24 07:00', 280.00, 266000.00),
(15, '2026-07-04 06:30', 320.00, 304000.00),
(12, '2026-05-20 07:00', 240.00, 228000.00),
(14, '2026-06-01 08:00', 310.00, 294500.00),
(16, '2026-07-02 07:30', 350.00, 332500.00),
(17, '2026-06-15 06:00', 270.00, 256500.00),
(18, '2026-03-19 07:15', 260.00, 247000.00);
INSERT INTO ABASTECIMIENTO (id_camion, fecha, cantidad_combustible, costo) VALUES
(2,  '2026-01-11 12:00', 320.00, 304000.00),  -- durante V3 (01-10 a 01-12)
(4,  '2026-02-17 10:00', 300.00, 285000.00),  -- durante V6 (02-15 a 02-20)
(9,  '2026-01-18 11:00', 310.00, 294500.00),  -- durante V11 (01-15 a 01-21)
(13, '2026-02-26 09:30', 290.00, 275500.00);  -- durante V15 (02-25 a 02-27)
 
-- ==============================================================================
-- 16. MANTENCION (20 registros)
-- ==============================================================================
INSERT INTO MANTENCION (id_camion, fecha, tipo, descripcion, costo) VALUES
(1,  '2026-01-15 09:00', 'PREVENTIVA',        'Cambio de aceite y filtros', 85000.00),
(2,  '2026-06-25 10:00', 'CORRECTIVA',        'Reparación sistema de frenos', 250000.00),
(3,  '2026-02-10 09:30', 'CAMBIO_NEUMATICOS', 'Cambio de neumáticos delanteros', 320000.00),
(4,  '2026-02-25 08:00', 'PREVENTIVA',        'Mantención preventiva 20.000 km', 95000.00),
(9,  '2026-01-10 09:00', 'REVISION_FRENOS',   'Revisión y ajuste de frenos', 60000.00),
(12, '2026-06-05 08:30', 'CORRECTIVA',        'Falla en motor, reparación mayor', 780000.00),
(13, '2026-02-20 09:00', 'PREVENTIVA',        'Mantención preventiva', 90000.00),
(15, '2026-06-30 10:30', 'CAMBIO_ACEITE',     'Cambio de aceite de motor', 70000.00),
(19, '2026-05-15 09:00', 'CORRECTIVA',        'Revisión general por inactividad prolongada', 150000.00),
(20, '2026-06-10 08:00', 'CORRECTIVA',        'Reparación de transmisión', 420000.00),
(5,  '2026-01-05 09:00', 'PREVENTIVA',        'Revisión de niveles y presión de neumáticos', 55000.00),
(6,  '2026-02-20 09:30', 'CAMBIO_ACEITE',     'Cambio de aceite y filtro de aire', 68000.00),
(7,  '2026-03-15 08:30', 'PREVENTIVA',        'Mantención preventiva 30.000 km', 92000.00),
(8,  '2026-04-20 09:00', 'REVISION_FRENOS',   'Revisión sistema de frenos ABS', 75000.00),
(10, '2026-03-25 08:00', 'CAMBIO_NEUMATICOS', 'Cambio de neumáticos traseros', 340000.00),
(11, '2026-04-15 09:00', 'CORRECTIVA',        'Reparación de sistema eléctrico', 180000.00),
(14, '2026-05-20 09:30', 'PREVENTIVA',        'Mantención preventiva general', 88000.00),
(16, '2026-05-25 08:00', 'CAMBIO_ACEITE',     'Cambio de aceite y filtros', 72000.00),
(17, '2026-06-01 09:00', 'REVISION_FRENOS',   'Revisión de frenos y suspensión', 65000.00),
(18, '2026-03-01 08:30', 'PREVENTIVA',        'Mantención preventiva 15.000 km', 80000.00);
-- id_mantencion: 1..20
 
-- ==============================================================================
-- 17. ANOMALIA (20 registros)
-- ==============================================================================
INSERT INTO ANOMALIA (id_telemetria, tipo, descripcion, fecha_hora, nivel) VALUES
(2,  'EXCESO_VELOCIDAD',     'Velocidad sobre el límite permitido en ruta interurbana', '2026-03-12 14:00', 2),
(6,  'CONSUMO_ANORMAL',      'Consumo de combustible superior al promedio histórico',   '2026-07-06 09:00', 3),
(9,  'DESVIO_RUTA',          'Desviación respecto de la ruta planificada',               '2026-02-19 10:00', 2),
(10, 'EXCESO_VELOCIDAD',     'Velocidad elevada detectada por sensor GPS',               '2026-01-20 14:00', 4),
(16, 'EXCESO_VELOCIDAD',     'Velocidad sobre el límite en tramo urbano',                '2026-04-10 13:00', 3),
(19, 'FRENADO_BRUSCO',       'Frenado brusco detectado por telemetría',                  '2026-06-15 11:00', 2),
(21, 'TEMPERATURA_ANORMAL',  'Temperatura de motor fuera de rango esperado',             '2026-07-06 14:00', 1),
(1,  'EXCESO_VELOCIDAD',     'Velocidad levemente sobre el límite en tramo urbano',      '2026-01-05 12:00', 1),
(3,  'CONSUMO_ANORMAL',      'Consumo irregular detectado al inicio del viaje',          '2026-01-10 10:00', 2),
(4,  'DESVIO_RUTA',          'Pequeña desviación respecto al trazado planificado',       '2026-01-11 15:00', 1),
(5,  'FRENADO_BRUSCO',       'Frenado brusco registrado por sensor GPS',                 '2026-07-01 10:00', 2),
(7,  'TEMPERATURA_ANORMAL',  'Temperatura del motor sobre el rango normal',              '2026-02-01 12:00', 3),
(8,  'EXCESO_VELOCIDAD',     'Velocidad sobre el límite en zona de curvas',              '2026-02-16 08:00', 1),
(11, 'CONSUMO_ANORMAL',      'Consumo superior al promedio en tramo plano',              '2026-03-06 09:00', 2),
(12, 'DESVIO_RUTA',          'Desvío significativo respecto de la ruta asignada',        '2026-04-01 12:00', 3),
(13, 'FRENADO_BRUSCO',       'Frenado brusco detectado en descenso',                     '2026-05-11 08:00', 1),
(14, 'TEMPERATURA_ANORMAL',  'Temperatura elevada en sistema de refrigeración',          '2026-01-16 09:00', 2),
(15, 'EXCESO_VELOCIDAD',     'Velocidad muy sobre el límite permitido',                  '2026-01-19 16:00', 4),
(17, 'CONSUMO_ANORMAL',      'Consumo anómalo asociado a posible fuga menor',            '2026-05-02 10:00', 2),
(18, 'DESVIO_RUTA',          'Desviación menor por corte parcial de camino',             '2026-02-26 09:00', 1);
-- id_anomalia: 1..20
 
-- ==============================================================================
-- 18. ALERTA (20 registros)
-- ==============================================================================
INSERT INTO ALERTA (id_anomalia, id_mantencion, id_conductor, tipo, estado, mensaje) VALUES
(1,  NULL, 1,  'EXCESO_VELOCIDAD',    'RESUELTA',    'Se notificó al conductor y se registró amonestación leve'),
(2,  2,    5,  'CONSUMO_ANORMAL',     'EN_REVISION', 'Consumo anómalo asociado a posible falla mecánica, en revisión con mantención'),
(3,  NULL, 4,  'DESVIO_RUTA',         'DESCARTADA',  'Desvío justificado por corte de ruta, alerta descartada'),
(4,  NULL, 6,  'EXCESO_VELOCIDAD',    'GENERADA',    'Alerta generada automáticamente, pendiente de revisión'),
(5,  NULL, 12, 'EXCESO_VELOCIDAD',    'RESUELTA',    'Conductor advertido, evento cerrado sin incidentes'),
(6,  NULL, 17, 'FRENADO_BRUSCO',      'EN_REVISION', 'Evento en análisis para descartar riesgo de fatiga del conductor'),
(7,  8,    19, 'TEMPERATURA_ANORMAL', 'GENERADA',    'Posible relación con mantención reciente del sistema de refrigeración'),
(8,  1,    1,  'EXCESO_VELOCIDAD',    'RESUELTA',    'Evento menor, se recuerda al conductor el límite en zona urbana'),
(9,  2,    2,  'CONSUMO_ANORMAL',     'EN_REVISION', 'Se solicita revisión de inyectores en próxima mantención'),
(10, NULL, 2,  'DESVIO_RUTA',         'DESCARTADA',  'Desvío mínimo dentro de tolerancia operativa'),
(11, NULL, 5,  'FRENADO_BRUSCO',      'GENERADA',    'Alerta generada automáticamente, pendiente de revisión'),
(12, 3,    3,  'TEMPERATURA_ANORMAL', 'EN_REVISION', 'Se coordina revisión del sistema de refrigeración del motor'),
(13, 4,    4,  'EXCESO_VELOCIDAD',    'RESUELTA',    'Conductor advertido, evento cerrado sin incidentes'),
(14, NULL, 7,  'CONSUMO_ANORMAL',     'GENERADA',    'Alerta generada automáticamente, pendiente de revisión'),
(15, NULL, 8,  'DESVIO_RUTA',         'EN_REVISION', 'Se verifica motivo del desvío con el conductor'),
(16, NULL, 9,  'FRENADO_BRUSCO',      'DESCARTADA',  'Frenado justificado por obstáculo en la vía'),
(17, 5,    11, 'TEMPERATURA_ANORMAL', 'RESUELTA',    'Falla corregida durante mantención programada'),
(18, NULL, 11, 'EXCESO_VELOCIDAD',    'GENERADA',    'Alerta generada automáticamente, pendiente de revisión'),
(19, NULL, 13, 'CONSUMO_ANORMAL',     'EN_REVISION', 'Consumo bajo observación durante los próximos viajes'),
(20, 7,    16, 'DESVIO_RUTA',         'DESCARTADA',  'Desvío justificado por corte parcial de camino');
 
COMMIT;


--=====================================================
--CONSULTAS 
--=====================================================
--1

SELECT patente, capacidad_carga
FROM CAMION
WHERE estado = 'DISPONIBLE'

--2

SELECT nombre 
FROM CONDUCTOR
WHERE fecha_venc_licencia < '2027-12-31'

--3

SELECT co.nombre, c.patente, v.id_viaje 
FROM CONDUCTOR as co
JOIN ASIGNACION a ON a.id_conductor = co.id_conductor 
JOIN VIAJE v ON a.id_viaje = v.id_viaje 
JOIN CAMION c ON v.id_camion = c.id_camion

--4

SELECT c.patente, c.marca,
COALESCE(SUM(a.cantidad_combustible), 0) AS total_litros_combustible, 
COALESCE(SUM(a.costo), 0) AS costo_total_dinero
FROM CAMION c
LEFT JOIN ABASTECIMIENTO a ON c.id_camion = a.id_camion
GROUP BY c.id_camion, c.patente, c.marca
ORDER BY costo_total_dinero DESC;

--5

SELECT an.id_anomalia, c.patente, s.tipo_sensor, an.nivel AS gravedad,an.tipo AS tipo_anomalia,an.descripcion,an.fecha_hora
FROM ANOMALIA an
JOIN TELEMETRIA t ON an.id_telemetria = t.id_telemetria
JOIN SENSOR s ON t.id_sensor = s.id_sensor
JOIN CAMION c ON s.id_camion = c.id_camion
ORDER BY an.nivel DESC, an.fecha_hora DESC;

--6

SELECT c.patente, COUNT(m.id_mantencion) AS cantidad_mantenciones, COALESCE(SUM(m.costo), 0) AS costo_total_mantencion
FROM CAMION c
LEFT JOIN MANTENCION m ON c.id_camion = m.id_camion
GROUP BY c.id_camion, c.patente
ORDER BY costo_total_mantencion DESC;


-- 7

SELECT c.patente, ROUND(AVG(CASE WHEN t.id_viaje IS NOT NULL THEN t.velocidad END), 2) AS vel_promedio_en_viaje, ROUND(AVG(CASE WHEN t.id_viaje IS NULL THEN t.velocidad END), 2) AS vel_promedio_sin_viaje
FROM CAMION c
JOIN SENSOR s ON c.id_camion = s.id_camion
JOIN TELEMETRIA t ON s.id_sensor = t.id_sensor
GROUP BY c.id_camion, c.patente;

-- 8

SELECT
    c.id_camion,
    c.patente,
    c.marca,
    c.modelo,
    COALESCE(ab.total_combustible, 0) AS costo_combustible,
    COALESCE(mt.total_mantencion, 0)  AS costo_mantencion,
    COALESCE(ab.total_combustible, 0) + COALESCE(mt.total_mantencion, 0) AS costo_total
FROM CAMION c
LEFT JOIN (
    SELECT id_camion, SUM(costo) AS total_combustible
    FROM ABASTECIMIENTO
    GROUP BY id_camion
) ab ON ab.id_camion = c.id_camion
LEFT JOIN (
    SELECT id_camion, SUM(costo) AS total_mantencion
    FROM MANTENCION
    GROUP BY id_camion
) mt ON mt.id_camion = c.id_camion
ORDER BY costo_total DESC;


-- 9

SELECT
    c.id_camion,
    c.patente,
    COUNT(al.id_alerta) AS total_alertas
FROM CAMION c
JOIN SENSOR s      ON s.id_camion = c.id_camion
JOIN TELEMETRIA t  ON t.id_sensor = s.id_sensor
JOIN ANOMALIA an   ON an.id_telemetria = t.id_telemetria
JOIN ALERTA al     ON al.id_anomalia = an.id_anomalia
GROUP BY c.id_camion, c.patente
HAVING COUNT(al.id_alerta) > 2
ORDER BY total_alertas DESC;


-- 10

WITH consumo_viaje AS (
    SELECT
        v.id_viaje,
        v.id_camion,
        COALESCE(SUM(a.cantidad_combustible), 0) AS combustible_consumido
    FROM VIAJE v
    LEFT JOIN ABASTECIMIENTO a
        ON a.id_camion = v.id_camion
       AND a.fecha BETWEEN v.fecha_inicio
                        AND COALESCE(v.fecha_fin, 'infinity'::timestamp)
    GROUP BY v.id_viaje, v.id_camion
)
SELECT
    id_viaje,
    id_camion,
    combustible_consumido
FROM consumo_viaje
WHERE combustible_consumido > (SELECT AVG(combustible_consumido) FROM consumo_viaje)
ORDER BY combustible_consumido DESC;