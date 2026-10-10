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

-- ==============================================================================
-- 20. search_path de la base (para que triggers y funciones encuentren el esquema kutrol
--     desde cualquier conexión nueva)
-- ==============================================================================
DO $$
BEGIN
    EXECUTE format('ALTER DATABASE %I SET search_path = kutrol, public', current_database());
END $$;
