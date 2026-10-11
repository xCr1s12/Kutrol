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







-- ==============================================================================
-- 20. search_path de la base (para que triggers y funciones encuentren el esquema kutrol
--     desde cualquier conexión nueva)
-- ==============================================================================
DO $$
BEGIN
    EXECUTE format('ALTER DATABASE %I SET search_path = kutrol, public', current_database());
END $$;




