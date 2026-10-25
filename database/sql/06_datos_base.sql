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

-- Coordenadas aproximadas de las capitales regionales y centros comunales.
-- Comunas: geo-chile, copyright (c) 2017 2x3, MIT,
-- commit e0260a9faa81be8c79f088c2caa13fc9fd9109bb.
-- Alhué y Lago Verde: OpenStreetMap contributors, ODbL 1.0.
INSERT INTO REGION (id_region, nombre, numero_romano, latitud, longitud)
OVERRIDING SYSTEM VALUE
VALUES
(15, 'Arica y Parinacota',                         'XV',   -18.47500000, -70.31444440),
(1,  'Tarapacá',                                   'I',    -20.21666670, -70.16666670),
(2,  'Antofagasta',                                'II',   -23.63333330, -70.40000000),
(3,  'Atacama',                                    'III',  -27.36666670, -70.31666670),
(4,  'Coquimbo',                                   'IV',   -29.90000000, -71.25000000),
(5,  'Valparaíso',                                 'V',    -33.04583330, -71.61638890),
(13, 'Metropolitana de Santiago',                  'RM',   -33.45000000, -70.66666670),
(6,  'Libertador General Bernardo O''Higgins',     'VI',   -34.16527780, -70.73972220),
(7,  'Maule',                                      'VII',  -35.43333330, -71.66666670),
(16, 'Ñuble',                                      'XVI',  -36.60000000, -72.11666670),
(8,  'Biobío',                                     'VIII', -36.83333330, -73.05000000),
(9,  'La Araucanía',                               'IX',   -38.75000000, -72.66666670),
(14, 'Los Ríos',                                   'XIV',  -39.80000000, -73.23333330),
(10, 'Los Lagos',                                  'X',    -41.46666670, -72.93333330),
(11, 'Aysén del General Carlos Ibáñez del Campo',  'XI',   -45.56666670, -72.06666670),
(12, 'Magallanes y de la Antártica Chilena',       'XII',  -53.16694440, -70.93361110);

-- Sincroniza el contador para que el próximo insert no choque con los ids existentes
ALTER TABLE REGION ALTER COLUMN id_region RESTART WITH 17;

INSERT INTO COMUNA (id_region, nombre, latitud, longitud) VALUES
-- XV Arica y Parinacota (4)
(15, 'Arica', -18.47500000, -70.31444440), (15, 'Camarones', -19.01666670, -69.86666670), (15, 'Putre', -18.19166670, -69.59777780), (15, 'General Lagos', -17.56666670, -69.50000000),

-- I Tarapacá (7)
(1, 'Iquique', -20.21666670, -70.16666670), (1, 'Alto Hospicio', -20.25000000, -70.11666670), (1, 'Pozo Almonte', -20.26666670, -69.78333330), (1, 'Camiña', -19.30000000, -69.41666670),
(1, 'Colchane', -19.26666670, -68.61666670), (1, 'Huara', -19.96666670, -69.76666670), (1, 'Pica', -20.50000000, -69.33333330),

-- II Antofagasta (9)
(2, 'Antofagasta', -23.63333330, -70.40000000), (2, 'Mejillones', -23.10000000, -70.45000000), (2, 'Sierra Gorda', -22.88333330, -69.31666670), (2, 'Taltal', -25.28333330, -69.76666670),
(2, 'Calama', -22.46666670, -68.91666670), (2, 'Ollagüe', -21.21666670, -68.26666670), (2, 'San Pedro de Atacama', -22.91666670, -68.21666670),
(2, 'Tocopilla', -22.06666670, -70.20000000), (2, 'María Elena', -22.35000000, -69.66666670),

-- III Atacama (9)
(3, 'Copiapó', -27.36666670, -70.31666670), (3, 'Caldera', -27.06666670, -70.81666670), (3, 'Tierra Amarilla', -27.46666670, -70.26666670), (3, 'Chañaral', -26.33333330, -70.60000000),
(3, 'Diego de Almagro', -26.36666670, -70.05000000), (3, 'Vallenar', -28.56666670, -70.75000000), (3, 'Alto del Carmen', -28.93361110, -70.46222220),
(3, 'Freirina', -28.50000000, -71.06666670), (3, 'Huasco', -28.45000000, -71.21666670),

-- IV Coquimbo (15)
(4, 'La Serena', -29.90000000, -71.25000000), (4, 'Coquimbo', -29.95000000, -71.33333330), (4, 'Andacollo', -30.21666670, -71.08333330), (4, 'La Higuera', -29.50000000, -71.26666670),
(4, 'Paiguano', -30.01666670, -70.51666670), (4, 'Vicuña', -30.01666670, -70.70000000), (4, 'Illapel', -31.61666670, -71.15000000), (4, 'Canela', -31.40000000, -71.45000000),
(4, 'Los Vilos', -31.90000000, -71.51666670), (4, 'Salamanca', -31.76666670, -70.96666670), (4, 'Ovalle', -30.58333330, -71.20000000), (4, 'Combarbalá', -31.16666670, -71.05000000),
(4, 'Monte Patria', -30.68333330, -70.93333330), (4, 'Punitaqui', -30.90000000, -71.26666670), (4, 'Río Hurtado', -30.26666670, -70.70000000),

-- V Valparaíso (38)
(5, 'Valparaíso', -33.04583330, -71.61638890), (5, 'Casablanca', -33.31666670, -71.41666670), (5, 'Concón', -32.91666670, -71.51666670), (5, 'Juan Fernández', -33.61666670, -78.86666670),
(5, 'Puchuncaví', -32.73333330, -71.41666670), (5, 'Quintero', -32.78333330, -71.53333330), (5, 'Viña del Mar', -33.03333330, -71.53333330), (5, 'Isla de Pascua', -27.08333330, -109.37500000),
(5, 'Los Andes', -32.81666670, -70.61666670), (5, 'Calle Larga', -32.85000000, -70.63333330), (5, 'Rinconada', -32.83333330, -70.70000000), (5, 'San Esteban', -32.80000000, -70.58333330),
(5, 'La Ligua', -32.45000000, -71.21666670), (5, 'Cabildo', -32.41666670, -71.13333330), (5, 'Papudo', -32.51666670, -71.45000000), (5, 'Petorca', -32.25000000, -70.93333330), (5, 'Zapallar', -32.53333330, -71.46666670),
(5, 'Quillota', -32.88333330, -71.26666670), (5, 'Calera', -32.78333330, -71.21666670), (5, 'Hijuelas', -32.80000000, -71.16666670), (5, 'La Cruz', -32.81666670, -71.23333330), (5, 'Nogales', -32.71666670, -71.23333330),
(5, 'San Antonio', -33.60000000, -71.61666670), (5, 'Algarrobo', -33.39111110, -71.69277780), (5, 'Cartagena', -33.55000000, -71.60000000), (5, 'El Quisco', -33.40000000, -71.70000000),
(5, 'El Tabo', -33.45000000, -71.66666670), (5, 'Santo Domingo', -33.63333330, -71.65000000),
(5, 'San Felipe', -32.75000000, -70.73333330), (5, 'Catemu', -32.63333330, -71.03333330), (5, 'Llaillay', -32.85000000, -70.96666670), (5, 'Panquehue', -32.80000000, -70.83333330),
(5, 'Putaendo', -32.63333330, -70.73333330), (5, 'Santa María', -32.75000000, -70.66666670),
(5, 'Quilpué', -33.05000000, -71.45000000), (5, 'Limache', -32.98333330, -71.28333330), (5, 'Olmué', -33.00000000, -71.20000000), (5, 'Villa Alemana', -33.05000000, -71.36666670),

-- RM Metropolitana de Santiago (52)
(13, 'Santiago', -33.45000000, -70.66666670), (13, 'Cerrillos', -33.48333330, -70.70000000), (13, 'Cerro Navia', -33.41666670, -70.71666670), (13, 'Conchalí', -33.35000000, -70.61666670),
(13, 'El Bosque', -33.56666670, -70.70000000), (13, 'Estación Central', -33.46331500, -70.70297600), (13, 'Huechuraba', -33.35000000, -70.66666670),
(13, 'Independencia', -33.42198800, -70.65493200), (13, 'La Cisterna', -33.55000000, -70.68333330), (13, 'La Florida', -33.55000000, -70.56666670),
(13, 'La Granja', -33.58333330, -70.58333330), (13, 'La Pintana', -33.58333330, -70.61666670), (13, 'La Reina', -33.45000000, -70.55000000), (13, 'Las Condes', -33.41666670, -70.58333330),
(13, 'Lo Barnechea', -33.35000000, -70.51666670), (13, 'Lo Espejo', -33.53333330, -70.71666670), (13, 'Lo Prado', -33.43333330, -70.71666670), (13, 'Macul', -33.50000000, -70.56666670),
(13, 'Maipú', -33.51666670, -70.76666670), (13, 'Ñuñoa', -33.46666670, -70.60000000), (13, 'Pedro Aguirre Cerda', -33.49245500, -70.67808600), (13, 'Peñalolén', -33.48333330, -70.53333330),
(13, 'Providencia', -33.43333330, -70.61666670), (13, 'Pudahuel', -33.43333330, -70.71666670), (13, 'Quilicura', -33.36666670, -70.75000000), (13, 'Quinta Normal', -33.45000000, -70.70000000),
(13, 'Recoleta', -33.40814800, -70.63919200), (13, 'Renca', -33.40000000, -70.73333330), (13, 'San Joaquín', -33.50000000, -70.61666670), (13, 'San Miguel', -33.50000000, -70.66666670),
(13, 'San Ramón', -33.45000000, -70.50000000), (13, 'Vitacura', -33.40000000, -70.60000000),
(13, 'Puente Alto', -33.61666670, -70.58333330), (13, 'Pirque', -33.63333330, -70.55000000), (13, 'San José de Maipo', -33.63333330, -70.36666670),
(13, 'Colina', -33.20000000, -70.68333330), (13, 'Lampa', -33.28333330, -70.90000000), (13, 'Tiltil', -33.08333330, -70.93333330),
(13, 'San Bernardo', -33.60000000, -70.71666670), (13, 'Buin', -33.73333330, -70.75000000), (13, 'Calera de Tango', -33.65000000, -70.81666670), (13, 'Paine', -33.81666670, -70.75000000),
(13, 'Melipilla', -33.70000000, -71.21666670), (13, 'Alhué', -34.03699530, -71.08411920), (13, 'Curacaví', -33.40000000, -71.15000000), (13, 'María Pinto', -33.53333330, -71.13333330),
(13, 'San Pedro', -33.90000000, -71.46666670),
(13, 'Talagante', -33.66666670, -70.93333330), (13, 'El Monte', -33.68333330, -71.01666670), (13, 'Isla de Maipo', -33.75000000, -70.90000000),
(13, 'Padre Hurtado', -33.56666670, -70.83333330), (13, 'Peñaflor', -33.61666670, -70.91666670),

-- VI O'Higgins (33)
(6, 'Rancagua', -34.16527780, -70.73972220), (6, 'Codegua', -34.03333330, -70.66666670), (6, 'Coinco', -34.26666670, -70.96666670), (6, 'Coltauco', -34.28722900, -71.08572300),
(6, 'Doñihue', -34.23333330, -70.96666670), (6, 'Graneros', -34.06472220, -70.72666670), (6, 'Las Cabras', -34.30000000, -71.31666670), (6, 'Machalí', -34.18250000, -70.65111110),
(6, 'Malloa', -34.45000000, -70.95000000), (6, 'Mostazal', -33.98333330, -70.70000000), (6, 'Olivar', -34.21000000, -70.81750000), (6, 'Peumo', -34.40000000, -71.16666670),
(6, 'Pichidegua', -34.35000000, -71.30000000), (6, 'Quinta de Tilcoco', -34.35000000, -70.98333330), (6, 'Rengo', -34.41666670, -70.86666670), (6, 'Requínoa', -34.28333330, -70.83333330),
(6, 'San Vicente', -34.50000000, -71.13333330),
(6, 'Pichilemu', -34.38333330, -72.00000000), (6, 'La Estrella', -34.20000000, -71.66666670), (6, 'Litueche', -34.11666670, -71.73333330), (6, 'Marchihue', -34.40000000, -71.63333330),
(6, 'Navidad', -33.93333330, -71.83333330), (6, 'Paredones', -34.78333330, -71.16666670),
(6, 'San Fernando', -34.58333330, -70.96666670), (6, 'Chépica', -34.73333330, -71.28333330), (6, 'Chimbarongo', -34.70000000, -71.05000000), (6, 'Lolol', -34.72861110, -71.64472220),
(6, 'Nancagua', -34.66666670, -71.21666670), (6, 'Palmilla', -34.60000000, -71.36666670), (6, 'Peralillo', -34.48333330, -71.48333330), (6, 'Placilla', -34.63333330, -71.11666670),
(6, 'Pumanque', -34.60000000, -71.66666670), (6, 'Santa Cruz', -34.63333330, -71.36666670),

-- VII Maule (30)
(7, 'Talca', -35.43333330, -71.66666670), (7, 'Constitución', -35.33333330, -72.41666670), (7, 'Curepto', -35.08333330, -72.01666670), (7, 'Empedrado', -35.60000000, -72.28333330),
(7, 'Maule', -35.53333330, -71.70000000), (7, 'Pelarco', -35.38333330, -71.45000000), (7, 'Pencahue', -35.40000000, -71.81666670), (7, 'Río Claro', -35.28333330, -71.26666670),
(7, 'San Clemente', -35.55000000, -71.48333330), (7, 'San Rafael', -35.31666670, -71.53333330),
(7, 'Cauquenes', -35.96666670, -72.35000000), (7, 'Chanco', -35.73333330, -72.53333330), (7, 'Pelluhue', -35.83333330, -72.63333330),
(7, 'Curicó', -34.98333330, -71.23333330), (7, 'Hualañé', -34.97666670, -71.80472220), (7, 'Licantén', -34.98333330, -72.00000000), (7, 'Molina', -34.11666670, -71.28333330), (7, 'Rauco', -34.93333330, -71.31666670),
(7, 'Romeral', -34.96666670, -71.13333330), (7, 'Sagrada Familia', -35.00000000, -71.38333330), (7, 'Teno', -34.86666670, -71.18333330), (7, 'Vichuquén', -34.88333330, -72.00000000),
(7, 'Linares', -35.85000000, -71.60000000), (7, 'Colbún', -35.70000000, -71.41666670), (7, 'Longaví', -35.96666670, -71.68333330), (7, 'Parral', -36.15000000, -71.83333330), (7, 'Retiro', -36.05000000, -71.76666670),
(7, 'San Javier', -35.60000000, -71.75000000), (7, 'Villa Alegre', -35.66666670, -71.75000000), (7, 'Yerbas Buenas', -35.75000000, -71.58333330),

-- XVI Ñuble (21)
(16, 'Chillán', -36.60000000, -72.11666670), (16, 'Bulnes', -36.74198700, -72.30142900), (16, 'Chillán Viejo', -36.61666670, -72.13333330), (16, 'El Carmen', -36.89944400, -72.03231300),
(16, 'Pemuco', -36.96666670, -72.10000000), (16, 'Pinto', -36.70000000, -71.90000000), (16, 'Quillón', -36.73333330, -72.46666670), (16, 'San Ignacio', -36.80000000, -72.03333330),
(16, 'Yungay', -37.11666670, -72.01666670),
(16, 'Quirihue', -36.28333330, -72.53333330), (16, 'Cobquecura', -36.13333330, -72.78333330), (16, 'Coelemu', -36.48333330, -72.70000000), (16, 'Ninhue', -36.40000000, -72.40000000),
(16, 'Portezuelo', -36.53333330, -72.43333330), (16, 'Ránquil', -36.65000000, -72.55000000), (16, 'Treguaco', -36.43333330, -72.66666670),
(16, 'San Carlos', -36.42472220, -71.95805560), (16, 'Coihueco', -36.61666670, -71.83333330), (16, 'Ñiquén', -36.30000000, -71.90000000), (16, 'San Fabián', -36.55000000, -71.55000000),
(16, 'San Nicolás', -36.50000000, -72.21666670),

-- VIII Biobío (33)
(8, 'Concepción', -36.83333330, -73.05000000), (8, 'Coronel', -37.01666670, -73.13333330), (8, 'Chiguayante', -36.91666670, -73.01666670), (8, 'Florida', -36.81666670, -72.66666670),
(8, 'Hualqui', -36.96666670, -72.93333330), (8, 'Lota', -37.08707300, -73.15605600), (8, 'Penco', -36.73333330, -72.98333330), (8, 'San Pedro de la Paz', -36.83333330, -73.11666670),
(8, 'Santa Juana', -37.16666670, -72.93333330), (8, 'Talcahuano', -36.71666670, -73.11666670), (8, 'Tomé', -36.61666670, -72.95000000), (8, 'Hualpén', -36.78333330, -73.08333330),
(8, 'Lebu', -37.61666670, -73.65000000), (8, 'Arauco', -37.25000000, -73.31666670), (8, 'Cañete', -37.80000000, -73.38333330), (8, 'Contulmo', -38.00000000, -73.23333330),
(8, 'Curanilahue', -37.46666670, -73.35000000), (8, 'Los Álamos', -37.61666670, -73.46666670), (8, 'Tirúa', -38.33333330, -73.50000000),
(8, 'Los Ángeles', -37.46666670, -72.35000000), (8, 'Antuco', -37.33333330, -71.68333330), (8, 'Cabrero', -37.03333330, -72.40000000), (8, 'Laja', -37.26666670, -72.70000000),
(8, 'Mulchén', -37.71666670, -72.23333330), (8, 'Nacimiento', -37.50000000, -72.66666670), (8, 'Negrete', -37.58333330, -72.51666670), (8, 'Quilaco', -37.66666670, -71.98333330),
(8, 'Quilleco', -37.46666670, -71.96666670), (8, 'San Rosendo', -37.26666670, -72.71666670), (8, 'Santa Bárbara', -37.66666670, -72.01666670), (8, 'Tucapel', -37.28333330, -71.95000000),
(8, 'Yumbel', -37.13333330, -72.53333330), (8, 'Alto Biobío', -38.05000000, -71.31666670),

-- IX La Araucanía (32)
(9, 'Temuco', -38.75000000, -72.66666670), (9, 'Carahue', -38.70000000, -73.16666670), (9, 'Cunco', -38.91666670, -72.03333330), (9, 'Curarrehue', -39.35000000, -71.58333330),
(9, 'Freire', -38.95000000, -72.63333330), (9, 'Galvarino', -38.40000000, -72.78333330), (9, 'Gorbea', -39.10000000, -72.68333330), (9, 'Lautaro', -38.52916670, -72.43500000),
(9, 'Loncoche', -39.36666670, -72.63333330), (9, 'Melipeuco', -38.85000000, -71.70000000), (9, 'Nueva Imperial', -38.73333330, -72.95000000),
(9, 'Padre Las Casas', -38.76666670, -72.60000000), (9, 'Perquenco', -38.41666670, -72.38333330), (9, 'Pitrufquén', -38.98333330, -72.65000000), (9, 'Pucón', -39.26666670, -71.96666670),
(9, 'Saavedra', -38.78333330, -73.40000000), (9, 'Teodoro Schmidt', -38.96666670, -73.05000000), (9, 'Toltén', -39.21666670, -73.23333330), (9, 'Vilcún', -39.11833330, -72.37944440),
(9, 'Villarrica', -39.26666670, -72.21666670), (9, 'Cholchol', -38.60000000, -72.85000000),
(9, 'Angol', -37.80000000, -72.71666670), (9, 'Collipulli', -37.95000000, -72.43333330), (9, 'Curacautín', -38.43333330, -71.88333330), (9, 'Ercilla', -38.05000000, -72.38333330),
(9, 'Lonquimay', -38.43333330, -71.23333330), (9, 'Los Sauces', -37.96666670, -72.83333330), (9, 'Lumaco', -38.15000000, -72.91666670), (9, 'Purén', -38.01666670, -73.08333330),
(9, 'Renaico', -37.66666670, -72.58333330), (9, 'Traiguén', -38.25000000, -72.68333330), (9, 'Victoria', -38.21666670, -72.33333330),

-- XIV Los Ríos (12)
(14, 'Valdivia', -39.80000000, -73.23333330), (14, 'Corral', -39.86666670, -73.43333330), (14, 'Lanco', -39.43333330, -72.76666670), (14, 'Los Lagos', -39.85000000, -72.83333330),
(14, 'Máfil', -39.65000000, -72.95000000), (14, 'Mariquina', -39.51666670, -72.96666670), (14, 'Paillaco', -40.06666670, -72.88333330), (14, 'Panguipulli', -39.63333330, -72.33333330),
(14, 'La Unión', -40.28333330, -73.08333330), (14, 'Futrono', -40.13333330, -72.40000000), (14, 'Lago Ranco', -40.31666670, -72.50000000), (14, 'Río Bueno', -40.31666670, -72.96666670),

-- X Los Lagos (30)
(10, 'Puerto Montt', -41.46666670, -72.93333330), (10, 'Calbuco', -41.76666670, -73.13333330), (10, 'Cochamó', -41.50000000, -72.31666670), (10, 'Fresia', -41.15000000, -73.45000000),
(10, 'Frutillar', -41.11666670, -73.10000000), (10, 'Los Muermos', -41.40000000, -73.48333330), (10, 'Llanquihue', -41.25000000, -73.01666670), (10, 'Maullín', -41.61666670, -73.60000000),
(10, 'Puerto Varas', -41.31666670, -72.98333330),
(10, 'Castro', -42.46666670, -73.80000000), (10, 'Ancud', -41.86666670, -73.83333330), (10, 'Chonchi', -42.61666670, -73.81666670), (10, 'Curaco de Vélez', -42.43333330, -73.58333330),
(10, 'Dalcahue', -42.36666670, -73.70000000), (10, 'Puqueldón', -42.58333330, -73.63333330), (10, 'Queilén', -42.86666670, -73.46666670), (10, 'Quellón', -43.10000000, -73.60000000),
(10, 'Quemchi', -42.13333330, -73.51666670), (10, 'Quinchao', -42.53333330, -73.41666670),
(10, 'Osorno', -40.56666670, -73.15000000), (10, 'Puerto Octay', -40.96666670, -72.90000000), (10, 'Purranque', -40.91666670, -73.16666670), (10, 'Puyehue', -40.66666670, -72.61666670),
(10, 'Río Negro', -40.78333330, -73.23333330), (10, 'San Juan de la Costa', -40.51666670, -73.40000000), (10, 'San Pablo', -40.40000000, -73.01666670),
(10, 'Chaitén', -42.91944440, -72.70888890), (10, 'Futaleufú', -43.16666670, -71.85000000), (10, 'Hualaihué', -42.01666670, -72.68333330), (10, 'Palena', -43.61666670, -71.80000000),

-- XI Aysén (10)
(11, 'Coyhaique', -45.56666670, -72.06666670), (11, 'Lago Verde', -44.24021470, -71.84927790), (11, 'Aysén', -45.40000000, -72.70000000), (11, 'Cisnes', -44.75000000, -72.70000000),
(11, 'Guaitecas', -43.88333330, -73.73333330), (11, 'Cochrane', -47.26666670, -72.55000000), (11, 'O''Higgins', -48.46666670, -72.56666670), (11, 'Tortel', -47.83333330, -73.56666670),
(11, 'Chile Chico', -46.55000000, -71.73333330), (11, 'Río Ibáñez', -46.30000000, -71.93333330),

-- XII Magallanes (11)
(12, 'Punta Arenas', -53.16694440, -70.93361110), (12, 'Laguna Blanca', -52.25000000, -71.91666670), (12, 'Río Verde', -52.65000000, -71.48333330),
(12, 'San Gregorio', -52.31666670, -69.68333330), (12, 'Cabo de Hornos', -54.93333330, -67.61666670), (12, 'Antártica', -75.00000000, -71.50000000),
(12, 'Porvenir', -53.30000000, -70.36666670), (12, 'Primavera', -52.71666670, -69.25000000), (12, 'Timaukel', -53.66666670, -69.90000000),
(12, 'Natales', -51.73333330, -72.51666670), (12, 'Torres del Paine', -51.26666670, -72.35000000);

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
    ('PESO_CARGA',        'CARROCERIA'),
    ('EMISION_CO2',       'ESCAPE'),
    ('CONSUMO_INSTANTANEO','MOTOR')
) AS d(codigo, ubicacion)
JOIN TIPO_MEDICION tm ON tm.codigo = d.codigo
WHERE c.patente IN ('LRTS45', 'KDPX82');

-- ==============================================================================
-- 6. Rutas y puntos de control (con coordenadas para todas las rutas)
-- ==============================================================================
INSERT INTO RUTA (id_empresa, id_comuna_origen, id_comuna_destino, distancia_km)
SELECT e.id_empresa, o.id_comuna, d.id_comuna, x.km
FROM EMPRESA e
CROSS JOIN (VALUES ('Puerto Montt', 'Osorno',       112.00),
             ('Osorno',       'Puerto Montt', 112.00),
             ('Puerto Montt', 'Temuco',       375.00)) AS x(origen, destino, km)
JOIN COMUNA o ON o.nombre = x.origen
JOIN COMUNA d ON d.nombre = x.destino
WHERE e.rut = '76.123.456-0';

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
-- 8. Telemetría + lecturas completas (7 días x 24 horas)
-- ==============================================================================
DO $$
DECLARE
    v_camion_1 INTEGER;
    v_camion_2 INTEGER;
    v_viaje_1  INTEGER;
    v_tel      BIGINT;
    v_fecha    TIMESTAMPTZ;
    v_dia      INTEGER;
    v_hora     INTEGER;
    v_vel      NUMERIC;
    v_fuel     NUMERIC;
    v_co2      NUMERIC;
    v_temp     NUMERIC;
    v_oil      NUMERIC;
    v_rpm      NUMERIC;
    v_volt     NUMERIC;
BEGIN
    SELECT id_camion INTO v_camion_1 FROM CAMION WHERE patente = 'LRTS45';
    SELECT id_camion INTO v_camion_2 FROM CAMION WHERE patente = 'KDPX82';
    SELECT id_viaje  INTO v_viaje_1  FROM VIAJE  WHERE id_camion = v_camion_1 AND estado = 'EN_CURSO';

    -- Generación de telemetría y lecturas para los 7 días de la semana y las 24 horas del día
    FOR v_dia IN 0..6 LOOP
        FOR v_hora IN 0..23 LOOP
            v_fecha := date_trunc('week', CURRENT_TIMESTAMP) + (v_dia || ' days')::INTERVAL + (v_hora || ' hours')::INTERVAL;

            -- Perfiles dinámicos según franja horaria
            IF v_hora BETWEEN 7 AND 18 THEN
                -- Horario Operativo de Alta Exigencia (Emisiones elevadas/moderadas)
                v_vel  := 55.0 + (v_hora % 5) * 6.5;
                v_co2  := 11.5 + (v_hora % 4) * 2.1;
                v_fuel := 75.0 - (v_hora * 1.8);
                v_temp := 88.0 + (v_hora % 3) * 2.0;
                v_oil  := 310.0 - (v_hora % 4) * 2.0;
                v_rpm  := 1400 + (v_hora % 5) * 120;
                v_volt := 24.1;
            ELSIF v_hora BETWEEN 19 AND 22 THEN
                -- Horario Nocturno Moderado
                v_vel  := 40.0 + (v_hora % 3) * 5.0;
                v_co2  := 6.5 + (v_hora % 3) * 1.5;
                v_fuel := 45.0 - (v_hora * 0.5);
                v_temp := 84.0;
                v_oil  := 300.0;
                v_rpm  := 1100;
                v_volt := 24.0;
            ELSE
                -- Madrugada / Apagado o Ralentí Eficiente
                v_vel  := 0.0;
                v_co2  := 1.2;
                v_fuel := 38.0;
                v_temp := 40.0;
                v_oil  := 250.0;
                v_rpm  := 0;
                v_volt := 23.8;
            END IF;

            -- 1. Paquete para Camión LRTS45
            INSERT INTO TELEMETRIA (fecha_hora, id_camion, id_viaje, velocidad, latitud, longitud)
            VALUES (v_fecha, v_camion_1, v_viaje_1, v_vel, -41.3190, -72.9850)
            RETURNING id_telemetria INTO v_tel;

            INSERT INTO LECTURA (fecha_hora, id_telemetria, id_sensor, valor)
            SELECT v_fecha, v_tel, s.id_sensor, m.valor
            FROM (VALUES
                ('NIVEL_COMBUSTIBLE', 'ESTANQUE',       v_fuel),
                ('TEMP_MOTOR',        'MOTOR',          v_temp),
                ('PRESION_ACEITE',    'MOTOR',          v_oil),
                ('RPM_MOTOR',         'MOTOR',          v_rpm),
                ('PRESION_NEUMATICO', 'DELANTERO_IZQ', 106.0),
                ('PRESION_NEUMATICO', 'DELANTERO_DER', 105.7),
                ('PRESION_NEUMATICO', 'TRASERO_IZQ',   107.9),
                ('PRESION_NEUMATICO', 'TRASERO_DER',   107.5),
                ('VOLTAJE_BATERIA',   'BATERIA',        v_volt),
                ('PESO_CARGA',        'CARROCERIA',     8450.0),
                ('EMISION_CO2',       'ESCAPE',         v_co2),
                ('CONSUMO_INSTANTANEO','MOTOR',         v_co2 * 2.2)
            ) AS m(codigo, ubicacion, valor)
            JOIN TIPO_MEDICION tm ON tm.codigo = m.codigo
            JOIN SENSOR s ON s.id_tipo_medicion = tm.id_tipo_medicion
                         AND s.id_camion = v_camion_1
                         AND s.ubicacion = m.ubicacion;

            -- 2. Paquete para Camión KDPX82
            INSERT INTO TELEMETRIA (fecha_hora, id_camion, id_viaje, velocidad, latitud, longitud)
            VALUES (v_fecha, v_camion_2, NULL, v_vel * 0.85, -40.5739, -73.1335)
            RETURNING id_telemetria INTO v_tel;

            INSERT INTO LECTURA (fecha_hora, id_telemetria, id_sensor, valor)
            SELECT v_fecha, v_tel, s.id_sensor, m.valor
            FROM (VALUES
                ('NIVEL_COMBUSTIBLE', 'ESTANQUE',       v_fuel + 5.0),
                ('TEMP_MOTOR',        'MOTOR',          v_temp),
                ('PRESION_ACEITE',    'MOTOR',          v_oil),
                ('RPM_MOTOR',         'MOTOR',          v_rpm * 0.9),
                ('PRESION_NEUMATICO', 'DELANTERO_IZQ', 105.0),
                ('PRESION_NEUMATICO', 'DELANTERO_DER', 105.0),
                ('PRESION_NEUMATICO', 'TRASERO_IZQ',   107.0),
                ('PRESION_NEUMATICO', 'TRASERO_DER',   107.0),
                ('VOLTAJE_BATERIA',   'BATERIA',        v_volt),
                ('PESO_CARGA',        'CARROCERIA',     9800.0),
                ('EMISION_CO2',       'ESCAPE',         v_co2 * 0.85),
                ('CONSUMO_INSTANTANEO','MOTOR',         v_co2 * 1.9)
            ) AS m(codigo, ubicacion, valor)
            JOIN TIPO_MEDICION tm ON tm.codigo = m.codigo
            JOIN SENSOR s ON s.id_tipo_medicion = tm.id_tipo_medicion
                         AND s.id_camion = v_camion_2
                         AND s.ubicacion = m.ubicacion;

        END LOOP;
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