-- ==============================================================================
-- ARCHIVO 06/06: datos base y configuración de la BD (secciones 19 y 20)
-- ==============================================================================
SET search_path TO kutrol, public;

-- ==============================================================================
-- 19. CATÁLOGO DE MEDICIONES (definición del modelo de sensores)
--     id_severidad: 1 INFORMATIVA, 2 BAJA, 3 MEDIA, 4 ALTA, 5 CRITICA
-- ==============================================================================
INSERT INTO TIPO_MEDICION (codigo, nombre, categoria, unidad, valor_min_fisico, valor_max_fisico, umbral_min, umbral_max, id_severidad) VALUES
('NIVEL_COMBUSTIBLE',   'Nivel de combustible',          'COMBUSTIBLE', '%',     0,    100,     10,   NULL, 4),
('CONSUMO_INSTANTANEO', 'Consumo instantáneo',           'COMBUSTIBLE', 'L/h',   0,    200,     NULL, 60,   3),
('ODOMETRO',            'Odómetro',                      'COMBUSTIBLE', 'km',    0,    5000000, NULL, NULL, 1),
('RPM_MOTOR',           'Revoluciones del motor',        'MOTOR',       'rpm',   0,    4000,    NULL, 2500, 3),
('TEMP_MOTOR',          'Temperatura del refrigerante',  'MOTOR',       '°C',   -40,   150,     NULL, 105,  4),
('PRESION_ACEITE',      'Presión de aceite',             'MOTOR',       'kPa',   0,    1000,    150,  NULL, 5),
('CARGA_MOTOR',         'Carga del motor',               'MOTOR',       '%',     0,    100,     NULL, 95,   3),
('PRESION_NEUMATICO',   'Presión de neumático',          'NEUMATICO',   'psi',   0,    200,     95,   130,  4),
('TEMP_NEUMATICO',      'Temperatura de neumático',      'NEUMATICO',   '°C',   -40,   200,     NULL, 90,   4),
('EMISION_NOX',         'Emisión de NOx',                'EMISION',     'ppm',   0,    5000,    NULL, 900,  3),
('EMISION_CO2',         'Emisión de CO2',                'EMISION',     '%',     0,    20,      NULL, 12,   3),
('OPACIDAD_HUMO',       'Opacidad de humo',              'EMISION',     '%',     0,    100,     NULL, 30,   3),
('VOLTAJE_BATERIA',     'Voltaje de batería',            'ELECTRICO',   'V',     0,    36,      22,   30,   3),
('PESO_CARGA',          'Peso de carga a bordo',         'CARGA',       'kg',    0,    60000,   NULL, NULL, 3);

INSERT INTO REGION (id_region, nombre, numero_romano)
OVERRIDING SYSTEM VALUE
VALUES
(15, 'Arica y Parinacota',                         'XV'),
(1,  'Tarapacá',                                   'I'),
(2,  'Antofagasta',                                'II'),
(3,  'Atacama',                                    'III'),
(4,  'Coquimbo',                                   'IV'),
(5,  'Valparaíso',                                 'V'),
(13, 'Metropolitana de Santiago',                  'RM'),
(6,  'Libertador General Bernardo O''Higgins',     'VI'),
(7,  'Maule',                                      'VII'),
(16, 'Ñuble',                                      'XVI'),
(8,  'Biobío',                                     'VIII'),
(9,  'La Araucanía',                               'IX'),
(14, 'Los Ríos',                                   'XIV'),
(10, 'Los Lagos',                                  'X'),
(11, 'Aysén del General Carlos Ibáñez del Campo',  'XI'),
(12, 'Magallanes y de la Antártica Chilena',       'XII');

-- Sincroniza el contador para que el próximo insert no choque con los ids existentes
ALTER TABLE REGION ALTER COLUMN id_region RESTART WITH 17;

INSERT INTO COMUNA (id_region, nombre) VALUES
-- XV Arica y Parinacota (4)
(15, 'Arica'), (15, 'Camarones'), (15, 'Putre'), (15, 'General Lagos'),

-- I Tarapacá (7)
(1, 'Iquique'), (1, 'Alto Hospicio'), (1, 'Pozo Almonte'), (1, 'Camiña'),
(1, 'Colchane'), (1, 'Huara'), (1, 'Pica'),

-- II Antofagasta (9)
(2, 'Antofagasta'), (2, 'Mejillones'), (2, 'Sierra Gorda'), (2, 'Taltal'),
(2, 'Calama'), (2, 'Ollagüe'), (2, 'San Pedro de Atacama'),
(2, 'Tocopilla'), (2, 'María Elena'),

-- III Atacama (9)
(3, 'Copiapó'), (3, 'Caldera'), (3, 'Tierra Amarilla'), (3, 'Chañaral'),
(3, 'Diego de Almagro'), (3, 'Vallenar'), (3, 'Alto del Carmen'),
(3, 'Freirina'), (3, 'Huasco'),

-- IV Coquimbo (15)
(4, 'La Serena'), (4, 'Coquimbo'), (4, 'Andacollo'), (4, 'La Higuera'),
(4, 'Paiguano'), (4, 'Vicuña'), (4, 'Illapel'), (4, 'Canela'),
(4, 'Los Vilos'), (4, 'Salamanca'), (4, 'Ovalle'), (4, 'Combarbalá'),
(4, 'Monte Patria'), (4, 'Punitaqui'), (4, 'Río Hurtado'),

-- V Valparaíso (38)
(5, 'Valparaíso'), (5, 'Casablanca'), (5, 'Concón'), (5, 'Juan Fernández'),
(5, 'Puchuncaví'), (5, 'Quintero'), (5, 'Viña del Mar'), (5, 'Isla de Pascua'),
(5, 'Los Andes'), (5, 'Calle Larga'), (5, 'Rinconada'), (5, 'San Esteban'),
(5, 'La Ligua'), (5, 'Cabildo'), (5, 'Papudo'), (5, 'Petorca'), (5, 'Zapallar'),
(5, 'Quillota'), (5, 'Calera'), (5, 'Hijuelas'), (5, 'La Cruz'), (5, 'Nogales'),
(5, 'San Antonio'), (5, 'Algarrobo'), (5, 'Cartagena'), (5, 'El Quisco'),
(5, 'El Tabo'), (5, 'Santo Domingo'),
(5, 'San Felipe'), (5, 'Catemu'), (5, 'Llaillay'), (5, 'Panquehue'),
(5, 'Putaendo'), (5, 'Santa María'),
(5, 'Quilpué'), (5, 'Limache'), (5, 'Olmué'), (5, 'Villa Alemana'),

-- RM Metropolitana de Santiago (52)
(13, 'Santiago'), (13, 'Cerrillos'), (13, 'Cerro Navia'), (13, 'Conchalí'),
(13, 'El Bosque'), (13, 'Estación Central'), (13, 'Huechuraba'),
(13, 'Independencia'), (13, 'La Cisterna'), (13, 'La Florida'),
(13, 'La Granja'), (13, 'La Pintana'), (13, 'La Reina'), (13, 'Las Condes'),
(13, 'Lo Barnechea'), (13, 'Lo Espejo'), (13, 'Lo Prado'), (13, 'Macul'),
(13, 'Maipú'), (13, 'Ñuñoa'), (13, 'Pedro Aguirre Cerda'), (13, 'Peñalolén'),
(13, 'Providencia'), (13, 'Pudahuel'), (13, 'Quilicura'), (13, 'Quinta Normal'),
(13, 'Recoleta'), (13, 'Renca'), (13, 'San Joaquín'), (13, 'San Miguel'),
(13, 'San Ramón'), (13, 'Vitacura'),
(13, 'Puente Alto'), (13, 'Pirque'), (13, 'San José de Maipo'),
(13, 'Colina'), (13, 'Lampa'), (13, 'Tiltil'),
(13, 'San Bernardo'), (13, 'Buin'), (13, 'Calera de Tango'), (13, 'Paine'),
(13, 'Melipilla'), (13, 'Alhué'), (13, 'Curacaví'), (13, 'María Pinto'),
(13, 'San Pedro'),
(13, 'Talagante'), (13, 'El Monte'), (13, 'Isla de Maipo'),
(13, 'Padre Hurtado'), (13, 'Peñaflor'),

-- VI O'Higgins (33)
(6, 'Rancagua'), (6, 'Codegua'), (6, 'Coinco'), (6, 'Coltauco'),
(6, 'Doñihue'), (6, 'Graneros'), (6, 'Las Cabras'), (6, 'Machalí'),
(6, 'Malloa'), (6, 'Mostazal'), (6, 'Olivar'), (6, 'Peumo'),
(6, 'Pichidegua'), (6, 'Quinta de Tilcoco'), (6, 'Rengo'), (6, 'Requínoa'),
(6, 'San Vicente'),
(6, 'Pichilemu'), (6, 'La Estrella'), (6, 'Litueche'), (6, 'Marchihue'),
(6, 'Navidad'), (6, 'Paredones'),
(6, 'San Fernando'), (6, 'Chépica'), (6, 'Chimbarongo'), (6, 'Lolol'),
(6, 'Nancagua'), (6, 'Palmilla'), (6, 'Peralillo'), (6, 'Placilla'),
(6, 'Pumanque'), (6, 'Santa Cruz'),

-- VII Maule (30)
(7, 'Talca'), (7, 'Constitución'), (7, 'Curepto'), (7, 'Empedrado'),
(7, 'Maule'), (7, 'Pelarco'), (7, 'Pencahue'), (7, 'Río Claro'),
(7, 'San Clemente'), (7, 'San Rafael'),
(7, 'Cauquenes'), (7, 'Chanco'), (7, 'Pelluhue'),
(7, 'Curicó'), (7, 'Hualañé'), (7, 'Licantén'), (7, 'Molina'), (7, 'Rauco'),
(7, 'Romeral'), (7, 'Sagrada Familia'), (7, 'Teno'), (7, 'Vichuquén'),
(7, 'Linares'), (7, 'Colbún'), (7, 'Longaví'), (7, 'Parral'), (7, 'Retiro'),
(7, 'San Javier'), (7, 'Villa Alegre'), (7, 'Yerbas Buenas'),

-- XVI Ñuble (21)
(16, 'Chillán'), (16, 'Bulnes'), (16, 'Chillán Viejo'), (16, 'El Carmen'),
(16, 'Pemuco'), (16, 'Pinto'), (16, 'Quillón'), (16, 'San Ignacio'),
(16, 'Yungay'),
(16, 'Quirihue'), (16, 'Cobquecura'), (16, 'Coelemu'), (16, 'Ninhue'),
(16, 'Portezuelo'), (16, 'Ránquil'), (16, 'Treguaco'),
(16, 'San Carlos'), (16, 'Coihueco'), (16, 'Ñiquén'), (16, 'San Fabián'),
(16, 'San Nicolás'),

-- VIII Biobío (33)
(8, 'Concepción'), (8, 'Coronel'), (8, 'Chiguayante'), (8, 'Florida'),
(8, 'Hualqui'), (8, 'Lota'), (8, 'Penco'), (8, 'San Pedro de la Paz'),
(8, 'Santa Juana'), (8, 'Talcahuano'), (8, 'Tomé'), (8, 'Hualpén'),
(8, 'Lebu'), (8, 'Arauco'), (8, 'Cañete'), (8, 'Contulmo'),
(8, 'Curanilahue'), (8, 'Los Álamos'), (8, 'Tirúa'),
(8, 'Los Ángeles'), (8, 'Antuco'), (8, 'Cabrero'), (8, 'Laja'),
(8, 'Mulchén'), (8, 'Nacimiento'), (8, 'Negrete'), (8, 'Quilaco'),
(8, 'Quilleco'), (8, 'San Rosendo'), (8, 'Santa Bárbara'), (8, 'Tucapel'),
(8, 'Yumbel'), (8, 'Alto Biobío'),

-- IX La Araucanía (32)
(9, 'Temuco'), (9, 'Carahue'), (9, 'Cunco'), (9, 'Curarrehue'),
(9, 'Freire'), (9, 'Galvarino'), (9, 'Gorbea'), (9, 'Lautaro'),
(9, 'Loncoche'), (9, 'Melipeuco'), (9, 'Nueva Imperial'),
(9, 'Padre Las Casas'), (9, 'Perquenco'), (9, 'Pitrufquén'), (9, 'Pucón'),
(9, 'Saavedra'), (9, 'Teodoro Schmidt'), (9, 'Toltén'), (9, 'Vilcún'),
(9, 'Villarrica'), (9, 'Cholchol'),
(9, 'Angol'), (9, 'Collipulli'), (9, 'Curacautín'), (9, 'Ercilla'),
(9, 'Lonquimay'), (9, 'Los Sauces'), (9, 'Lumaco'), (9, 'Purén'),
(9, 'Renaico'), (9, 'Traiguén'), (9, 'Victoria'),

-- XIV Los Ríos (12)
(14, 'Valdivia'), (14, 'Corral'), (14, 'Lanco'), (14, 'Los Lagos'),
(14, 'Máfil'), (14, 'Mariquina'), (14, 'Paillaco'), (14, 'Panguipulli'),
(14, 'La Unión'), (14, 'Futrono'), (14, 'Lago Ranco'), (14, 'Río Bueno'),

-- X Los Lagos (30)
(10, 'Puerto Montt'), (10, 'Calbuco'), (10, 'Cochamó'), (10, 'Fresia'),
(10, 'Frutillar'), (10, 'Los Muermos'), (10, 'Llanquihue'), (10, 'Maullín'),
(10, 'Puerto Varas'),
(10, 'Castro'), (10, 'Ancud'), (10, 'Chonchi'), (10, 'Curaco de Vélez'),
(10, 'Dalcahue'), (10, 'Puqueldón'), (10, 'Queilén'), (10, 'Quellón'),
(10, 'Quemchi'), (10, 'Quinchao'),
(10, 'Osorno'), (10, 'Puerto Octay'), (10, 'Purranque'), (10, 'Puyehue'),
(10, 'Río Negro'), (10, 'San Juan de la Costa'), (10, 'San Pablo'),
(10, 'Chaitén'), (10, 'Futaleufú'), (10, 'Hualaihué'), (10, 'Palena'),

-- XI Aysén (10)
(11, 'Coyhaique'), (11, 'Lago Verde'), (11, 'Aysén'), (11, 'Cisnes'),
(11, 'Guaitecas'), (11, 'Cochrane'), (11, 'O''Higgins'), (11, 'Tortel'),
(11, 'Chile Chico'), (11, 'Río Ibáñez'),

-- XII Magallanes (11)
(12, 'Punta Arenas'), (12, 'Laguna Blanca'), (12, 'Río Verde'),
(12, 'San Gregorio'), (12, 'Cabo de Hornos'), (12, 'Antártica'),
(12, 'Porvenir'), (12, 'Primavera'), (12, 'Timaukel'),
(12, 'Natales'), (12, 'Torres del Paine');

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ==============================================================================
-- 1. Tipos de flota y empresa
-- ==============================================================================
INSERT INTO TIPO_FLOTA (nombre, descripcion) VALUES
    ('CARGA_GENERAL', 'Transporte de carga seca y paletizada'),
    ('REFRIGERADA',   'Transporte con cadena de frío'),
    ('GRANELES',      'Transporte de graneles sólidos o líquidos');

INSERT INTO EMPRESA (id_comuna, nombre, rut, direccion, descripcion)
VALUES (
    (SELECT id_comuna FROM COMUNA WHERE nombre = 'Puerto Montt'),
    'Transportes del Sur SpA',
    '76.123.456-0',
    'Av. Presidente Ibáñez 1500, Puerto Montt',
    'Empresa de transporte de carga de la zona sur (datos de prueba)'
);

INSERT INTO EMPRESA_EMAIL (id_empresa, email)
SELECT id_empresa, 'contacto@transportesdelsur.cl' FROM EMPRESA WHERE rut = '76.123.456-0';

INSERT INTO EMPRESA_TELEFONO (id_empresa, telefono)
SELECT id_empresa, t FROM EMPRESA, (VALUES ('+56652123456'), ('+56987654321')) AS x(t)
WHERE rut = '76.123.456-0';

-- ==============================================================================
-- 2. Usuario administrador  (usuario: admin / contraseña: admin)
--    Nivel 1 = DUEÑO. El hash es bcrypt generado con pgcrypto ($2a$, compatible
--    con bcrypt/bcryptjs de Node).
-- ==============================================================================
INSERT INTO ENCARGADO_EMPRESA
    (id_empresa, id_nivel_jerarquico, usuario, primer_nombre, apellidos, email, cargo, password_hash)
VALUES (
    (SELECT id_empresa FROM EMPRESA WHERE rut = '76.123.456-0'),
    1,
    'admin',
    'Admin',
    'Sistema',
    'admin@kutrol.cl',
    'Administrador del sistema',
    crypt('admin', gen_salt('bf', 10))
);

UPDATE ENCARGADO_EMPRESA SET usuario = 'admin' WHERE email = 'admin@kutrol.cl';

-- ==============================================================================
-- 3. Conductores
-- ==============================================================================
INSERT INTO CONDUCTOR (id_empresa, primer_nombre, apellidos, run, licencia, fecha_venc_licencia, estado)
SELECT e.id_empresa, d.nombre, d.apellidos, d.run, d.licencia, d.venc::date, d.estado
FROM EMPRESA e
CROSS JOIN (VALUES
    ('Juan',  'Pérez Soto',    '12.345.678-5', 'A5-100234', '2028-05-30', 'EN_RUTA'),
    ('María', 'González Rojas','9.876.543-3',  'A5-100871', '2028-11-15', 'ACTIVO'),
    ('Pedro', 'Muñoz Vera',    '15.432.109-8', 'A4-200456', '2027-09-01', 'ACTIVO')
) AS d(nombre, apellidos, run, licencia, venc, estado)
WHERE e.rut = '76.123.456-0';

INSERT INTO CONDUCTOR_TELEFONO (id_conductor, telefono)
SELECT c.id_conductor, d.tel
FROM CONDUCTOR c
JOIN (VALUES ('12.345.678-5', '+56911111111'),
             ('9.876.543-3',  '+56922222222'),
             ('15.432.109-8', '+56933333333')) AS d(run, tel) ON d.run = c.run;

INSERT INTO CONDUCTOR_EMAIL (id_conductor, email)
SELECT c.id_conductor, d.mail
FROM CONDUCTOR c
JOIN (VALUES ('12.345.678-5', 'juan.perez@transportesdelsur.cl'),
             ('9.876.543-3',  'maria.gonzalez@transportesdelsur.cl'),
             ('15.432.109-8', 'pedro.munoz@transportesdelsur.cl')) AS d(run, mail) ON d.run = c.run;

-- ==============================================================================
-- 4. Flotas y camiones
-- ==============================================================================
INSERT INTO FLOTA (id_empresa, id_tipo_flota, nombre, descripcion)
SELECT e.id_empresa, tf.id_tipo_flota, d.nombre, d.descripcion
FROM EMPRESA e
JOIN (VALUES ('Flota Sur',  'CARGA_GENERAL', 'Camiones de carga general'),
             ('Flota Frío', 'REFRIGERADA',   'Camiones con equipo de frío')) AS d(nombre, tipo, descripcion) ON TRUE
JOIN TIPO_FLOTA tf ON tf.nombre = d.tipo
WHERE e.rut = '76.123.456-0';

INSERT INTO CAMION
    (id_flota, patente, codigo_dispositivo, marca, modelo, ano,
     capacidad_carga_kg, capacidad_estanque_l, tipo_combustible, estado)
VALUES
    ((SELECT id_flota FROM FLOTA WHERE nombre = 'Flota Sur'),
     'LRTS45', 'KT-0042', 'Volvo', 'FH 460', 2021, 12000.00, 400.00, 'DIESEL', 'EN_RUTA'),
    ((SELECT id_flota FROM FLOTA WHERE nombre = 'Flota Frío'),
     'KDPX82', 'KT-0043', 'Mercedes-Benz', 'Actros 2645', 2022, 15000.00, 450.00, 'DIESEL', 'DISPONIBLE');

-- ==============================================================================
-- 5. Sensores
-- ==============================================================================
INSERT INTO SENSOR (id_camion, id_tipo_medicion, ubicacion)
SELECT c.id_camion, tm.id_tipo_medicion, d.ubicacion
FROM CAMION c
CROSS JOIN (VALUES
    ('NIVEL_COMBUSTIBLE', 'ESTANQUE'),
    ('TEMP_MOTOR',        'MOTOR'),
    ('PRESION_ACEITE',    'MOTOR'),
    ('RPM_MOTOR',         'MOTOR'),
    ('PRESION_NEUMATICO', 'DELANTERO_IZQ'),
    ('PRESION_NEUMATICO', 'DELANTERO_DER'),
    ('PRESION_NEUMATICO', 'TRASERO_IZQ'),
    ('PRESION_NEUMATICO', 'TRASERO_DER'),
    ('VOLTAJE_BATERIA',   'BATERIA'),
    ('PESO_CARGA',        'CARROCERIA')
) AS d(codigo, ubicacion)
JOIN TIPO_MEDICION tm ON tm.codigo = d.codigo
WHERE c.patente IN ('LRTS45', 'KDPX82');

-- ==============================================================================
-- 6. Rutas y puntos de control (con coordenadas para todas las rutas)
-- ==============================================================================
INSERT INTO RUTA (id_comuna_origen, id_comuna_destino, distancia_km)
SELECT o.id_comuna, d.id_comuna, x.km
FROM (VALUES ('Puerto Montt', 'Osorno',       112.00),
             ('Osorno',       'Puerto Montt', 112.00),
             ('Puerto Montt', 'Temuco',       375.00)) AS x(origen, destino, km)
JOIN COMUNA o ON o.nombre = x.origen
JOIN COMUNA d ON d.nombre = x.destino;

-- Ruta 1: Puerto Montt -> Osorno
INSERT INTO PUNTO_CONTROL (id_ruta, nombre, latitud, longitud, orden)
SELECT r.id_ruta, p.nombre, p.lat, p.lng, p.orden
FROM RUTA r
JOIN COMUNA o ON o.id_comuna = r.id_comuna_origen  AND o.nombre = 'Puerto Montt'
JOIN COMUNA d ON d.id_comuna = r.id_comuna_destino AND d.nombre = 'Osorno'
CROSS JOIN (VALUES
    ('Puerto Varas',   -41.31900000, -72.98500000, 1),
    ('Frutillar',      -41.12600000, -73.06000000, 2),
    ('Entrada Osorno', -40.57400000, -73.13400000, 3)
) AS p(nombre, lat, lng, orden);

-- Ruta 2: Osorno -> Puerto Montt
INSERT INTO PUNTO_CONTROL (id_ruta, nombre, latitud, longitud, orden)
SELECT r.id_ruta, p.nombre, p.lat, p.lng, p.orden
FROM RUTA r
JOIN COMUNA o ON o.id_comuna = r.id_comuna_origen  AND o.nombre = 'Osorno'
JOIN COMUNA d ON d.id_comuna = r.id_comuna_destino AND d.nombre = 'Puerto Montt'
CROSS JOIN (VALUES
    ('Entrada Osorno', -40.57400000, -73.13400000, 1),
    ('Frutillar',      -41.12600000, -73.06000000, 2),
    ('Puerto Varas',   -41.31900000, -72.98500000, 3)
) AS p(nombre, lat, lng, orden);

-- Ruta 3: Puerto Montt -> Temuco
INSERT INTO PUNTO_CONTROL (id_ruta, nombre, latitud, longitud, orden)
SELECT r.id_ruta, p.nombre, p.lat, p.lng, p.orden
FROM RUTA r
JOIN COMUNA o ON o.id_comuna = r.id_comuna_origen  AND o.nombre = 'Puerto Montt'
JOIN COMUNA d ON d.id_comuna = r.id_comuna_destino AND d.nombre = 'Temuco'
CROSS JOIN (VALUES
    ('Puerto Montt', -41.46890000, -72.94110000, 1),
    ('Osorno',       -40.57390000, -73.13350000, 2),
    ('Valdivia',     -39.81420000, -73.24590000, 3),
    ('Temuco',       -38.73590000, -72.59040000, 4)
) AS p(nombre, lat, lng, orden);

-- ==============================================================================
-- 7. Viajes, cargas y asignaciones
-- ==============================================================================
INSERT INTO VIAJE (id_camion, id_ruta, id_empresa, fecha_inicio, fecha_fin_estimada, fecha_fin, estado)
SELECT c.id_camion, r.id_ruta, e.id_empresa, v.inicio::timestamptz, v.fin_est::timestamptz, v.fin::timestamptz, v.estado
FROM EMPRESA e
JOIN (VALUES
    ('LRTS45', 'Osorno',       'Puerto Montt', '2026-10-08 07:00:00-03', '2026-10-08 11:00:00-03', '2026-10-08 10:30:00-03', 'COMPLETADO'),
    ('LRTS45', 'Puerto Montt', 'Osorno',       '2026-10-12 08:00:00-03', '2026-10-12 12:00:00-03', NULL,                     'EN_CURSO'),
    ('KDPX82', 'Puerto Montt', 'Temuco',       '2026-10-15 06:00:00-03', '2026-10-15 18:00:00-03', NULL,                     'PROGRAMADO')
) AS v(patente, origen, destino, inicio, fin_est, fin, estado) ON TRUE
JOIN CAMION c ON c.patente = v.patente
JOIN COMUNA o ON o.nombre = v.origen
JOIN COMUNA d ON d.nombre = v.destino
JOIN RUTA   r ON r.id_comuna_origen = o.id_comuna AND r.id_comuna_destino = d.id_comuna
WHERE e.rut = '76.123.456-0';

INSERT INTO CARGA (id_viaje, tipo_carga, peso_kg, descripcion)
SELECT v.id_viaje, x.tipo, x.peso, x.descripcion
FROM VIAJE v
JOIN CAMION c ON c.id_camion = v.id_camion
JOIN (VALUES
    ('LRTS45', 'COMPLETADO',  'Alimentos secos',      6200.00, 'Cajas paletizadas'),
    ('LRTS45', 'EN_CURSO',    'Materiales de construcción', 5000.00, 'Sacos de cemento'),
    ('LRTS45', 'EN_CURSO',    'Ferretería',           3450.00, 'Herramientas y fijaciones'),
    ('KDPX82', 'PROGRAMADO',  'Productos del mar congelados', 9800.00, 'Cámara de frío a -18 °C')
) AS x(patente, estado, tipo, peso, descripcion) ON x.patente = c.patente AND x.estado = v.estado;

INSERT INTO ASIGNACION (id_conductor, id_viaje, estado, capacidad_utilizada_kg, fecha_inicio_viaje, fecha_fin_viaje)
SELECT cd.id_conductor, v.id_viaje, x.estado_asig,
       COALESCE((SELECT SUM(peso_kg) FROM CARGA WHERE id_viaje = v.id_viaje), 0),
       v.fecha_inicio,
       COALESCE(v.fecha_fin, v.fecha_fin_estimada)
FROM VIAJE v
JOIN CAMION c ON c.id_camion = v.id_camion
JOIN (VALUES
    ('12.345.678-5', 'LRTS45', 'COMPLETADO', 'COMPLETADA'),
    ('12.345.678-5', 'LRTS45', 'EN_CURSO',   'ACTIVA'),
    ('9.876.543-3',  'KDPX82', 'PROGRAMADO', 'ACTIVA')
) AS x(run, patente, estado_viaje, estado_asig) ON x.patente = c.patente AND x.estado_viaje = v.estado
JOIN CONDUCTOR cd ON cd.run = x.run;

-- ==============================================================================
-- 8. Telemetría + lecturas del viaje en curso
-- ==============================================================================
DO $$
DECLARE
    v_camion  INTEGER;
    v_viaje   INTEGER;
    v_tel     BIGINT;
    p         RECORD;
BEGIN
    SELECT id_camion INTO v_camion FROM CAMION WHERE patente = 'LRTS45';
    SELECT id_viaje  INTO v_viaje  FROM VIAJE  WHERE id_camion = v_camion AND estado = 'EN_CURSO';

    FOR p IN
        SELECT * FROM (VALUES
          (timestamptz '2026-10-12 08:30:00-03', 62.0::numeric, -41.31900000::numeric, -72.98500000::numeric,
           62.4::numeric, 88.0::numeric, 310.0::numeric, 1450::numeric, 106.2::numeric, 105.8::numeric, 108.0::numeric, 107.6::numeric, 24.1::numeric, 8450.0::numeric),
          (timestamptz '2026-10-12 09:00:00-03', 78.5, -41.12600000, -73.06000000,
           61.1, 90.5, 305.0, 1520, 106.0, 105.7, 107.9, 107.5, 24.1, 8450.0),
          (timestamptz '2026-10-12 09:30:00-03', 80.2, -40.93500000, -73.09000000,
           59.8, 91.5, 308.0, 1480, 105.8, 105.6, 107.8, 107.4, 24.0, 8450.0),
          (timestamptz '2026-10-12 10:00:00-03', 74.9, -40.74000000, -73.12000000,
           58.3, 92.0, 300.0, 1500,  88.5, 105.4, 107.6, 107.3, 24.0, 8450.0)
        ) AS t(ts, vel, lat, lng, fuel, temp, oil, rpm, tfl, tfr, trl, trr, volt, peso)
    LOOP
        INSERT INTO TELEMETRIA (fecha_hora, id_camion, id_viaje, velocidad, latitud, longitud)
        VALUES (p.ts, v_camion, v_viaje, p.vel, p.lat, p.lng)
        RETURNING id_telemetria INTO v_tel;

        INSERT INTO LECTURA (fecha_hora, id_telemetria, id_sensor, valor)
        SELECT p.ts, v_tel, s.id_sensor, m.valor
        FROM (VALUES
            ('NIVEL_COMBUSTIBLE', 'ESTANQUE',      p.fuel),
            ('TEMP_MOTOR',        'MOTOR',         p.temp),
            ('PRESION_ACEITE',    'MOTOR',         p.oil),
            ('RPM_MOTOR',         'MOTOR',         p.rpm),
            ('PRESION_NEUMATICO', 'DELANTERO_IZQ', p.tfl),
            ('PRESION_NEUMATICO', 'DELANTERO_DER', p.tfr),
            ('PRESION_NEUMATICO', 'TRASERO_IZQ',   p.trl),
            ('PRESION_NEUMATICO', 'TRASERO_DER',   p.trr),
            ('VOLTAJE_BATERIA',   'BATERIA',       p.volt),
            ('PESO_CARGA',        'CARROCERIA',    p.peso)
        ) AS m(codigo, ubicacion, valor)
        JOIN TIPO_MEDICION tm ON tm.codigo = m.codigo
        JOIN SENSOR s ON s.id_tipo_medicion = tm.id_tipo_medicion
                     AND s.id_camion = v_camion
                     AND s.ubicacion = m.ubicacion;
    END LOOP;
END $$;

-- ==============================================================================
-- 9. Abastecimientos
-- ==============================================================================
INSERT INTO ABASTECIMIENTO
    (id_camion, id_conductor, id_viaje, fecha, litros, precio_litro, costo, odometro_km, estanque_lleno, estacion)
SELECT c.id_camion,
       (SELECT id_conductor FROM CONDUCTOR WHERE run = '12.345.678-5'),
       NULL,
       x.fecha::timestamptz, x.litros, x.precio, x.litros * x.precio, x.odo, TRUE, x.estacion
FROM CAMION c
JOIN (VALUES
    ('LRTS45', '2026-10-08 06:15:00-03', 180.00, 1050.00, 152300.0, 'Copec Ruta 5 Sur, Puerto Montt'),
    ('LRTS45', '2026-10-12 06:30:00-03', 165.00, 1060.00, 152760.0, 'Shell Av. Salvador, Puerto Montt')
) AS x(patente, fecha, litros, precio, odo, estacion) ON x.patente = c.patente;

-- ==============================================================================
-- 10. Anomalía y alerta de ejemplo
-- ==============================================================================
INSERT INTO ANOMALIA (id_telemetria, fecha_hora_telemetria, id_lectura, id_severidad, tipo, descripcion)
SELECT l.id_telemetria, l.fecha_hora, l.id_lectura, tm.id_severidad, 'UMBRAL_MINIMO',
       'Presión del neumático delantero izquierdo bajo el umbral mínimo'
FROM LECTURA l
JOIN SENSOR s         ON s.id_sensor = l.id_sensor
JOIN TIPO_MEDICION tm ON tm.id_tipo_medicion = s.id_tipo_medicion
JOIN CAMION c         ON c.id_camion = s.id_camion
WHERE c.patente = 'LRTS45'
  AND tm.codigo = 'PRESION_NEUMATICO'
  AND s.ubicacion = 'DELANTERO_IZQ'
  AND l.valor < tm.umbral_min
  AND NOT EXISTS (SELECT 1 FROM ANOMALIA a
                  WHERE a.id_lectura = l.id_lectura AND a.fecha_hora_telemetria = l.fecha_hora);

INSERT INTO ALERTA (id_anomalia, id_conductor, tipo, estado, mensaje)
SELECT a.id_anomalia,
       (SELECT id_conductor FROM CONDUCTOR WHERE run = '12.345.678-5'),
       'NEUMATICO', 'GENERADA',
       'Presión baja (88.5 psi) en neumático delantero izquierdo del camión LRTS45'
FROM ANOMALIA a
JOIN LECTURA l ON l.id_lectura = a.id_lectura AND l.fecha_hora = a.fecha_hora_telemetria
JOIN SENSOR s  ON s.id_sensor = l.id_sensor
JOIN CAMION c  ON c.id_camion = s.id_camion
WHERE c.patente = 'LRTS45'
  AND s.ubicacion = 'DELANTERO_IZQ'
  AND a.tipo = 'UMBRAL_MINIMO'
  AND NOT EXISTS (SELECT 1 FROM ALERTA al WHERE al.id_anomalia = a.id_anomalia);

-- ==============================================================================
-- 11. Mantenciones
-- ==============================================================================
INSERT INTO MANTENCION (id_camion, fecha, tipo, descripcion, costo)
SELECT c.id_camion, x.fecha::timestamptz, x.tipo, x.descripcion, x.costo
FROM CAMION c
JOIN (VALUES
    ('LRTS45', '2026-08-14 10:00:00-04', 'CORRECTIVA', 'Cambio de pastillas de freno delanteras', 420000.00),
    ('KDPX82', '2026-09-20 09:00:00-03', 'PREVENTIVA', 'Cambio de aceite y filtros (revisión 30.000 km)', 185000.00)
) AS x(patente, fecha, tipo, descripcion, costo) ON x.patente = c.patente;

-- ==============================================================================
-- 20. search_path de la base
-- ==============================================================================
DO $$
BEGIN
    EXECUTE format('ALTER DATABASE %I SET search_path = kutrol, public', current_database());
END $$;