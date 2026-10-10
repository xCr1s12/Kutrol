import pool from "@/lib/db";

// BUSQUEDA de TODAS LAS REGIONES Y COMUNAS 
export async function findAllRegionesYComunas(db = pool) {
  const { rows } = await db.query(
<<<<<<< HEAD
    `SELECT r.id_region AS region_id, r.nombre AS region_nombre,
            c.id_comuna AS comuna_id, c.nombre AS comuna_nombre
     FROM region r
     JOIN comuna c ON c.id_region = r.id_region
     ORDER BY r.id_region, c.nombre`,
=======
    `SELECT r.id AS region_id, r.nombre AS region_nombre,
            c.id AS comuna_id, c.nombre AS comuna_nombre
     FROM region r
     JOIN comuna c ON c.id_region = r.id
     ORDER BY r.id, c.nombre`,
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
  );
  return rows;
}

<<<<<<< HEAD
// BUSQUEDA DE COMUNAS POR REGION
export async function getComunasbyRegion(regionId, db = pool) {
    const { rows } = await db.query(
        `SELECT r.id_region AS region_id,
                c.id_comuna AS comuna_id,
                c.nombre AS comuna_nombre
         FROM region AS r
         LEFT JOIN comuna AS c ON c.id_region = r.id_region
         WHERE r.id_region = $1
         ORDER BY c.nombre`,
        [regionId]
=======
// BUSQUEDA DE COMUNAS POR REGION (Corregido: bd -> db y agregada la coma)
export async function getComunasbyRegion(regionId, db = pool) {
    const { rows } = await db.query(
        `SELECT c.id AS comuna_id, c.nombre AS comuna_nombre 
         FROM COMUNA AS c
         WHERE c.id_region = $1
         ORDER BY c.nombre`,
        [regionId] // <--- Aquí estaba el error (faltaba la coma y el nombre de la variable era bd)
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
    );
    return rows;
}

// BUSQUEDA DE COMUNAS POR NOMBRE DE REGION
export async function getComunasByRegionNombre(regionNombre, db = pool) {
    const { rows } = await db.query(
<<<<<<< HEAD
      `SELECT c.id_comuna AS comuna_id, c.nombre AS comuna_nombre 
       FROM comuna AS c
       JOIN region AS r ON c.id_region = r.id_region
=======
      `SELECT c.id AS comuna_id, c.nombre AS comuna_nombre 
       FROM comuna AS c
       JOIN region AS r ON c.id_region = r.id
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
       WHERE r.nombre ILIKE $1
       ORDER BY c.nombre`,
      [regionNombre] 
    );
    return rows;
}

<<<<<<< HEAD
// BUSQUEDA DE UNA COMUNA POR ID
export async function getComunaById(id_comuna, db = pool) {
    const { rows } = await db.query(
        `SELECT c.id_comuna AS comuna_id, c.nombre AS comuna_nombre, c.id_region 
         FROM comuna AS c 
         WHERE c.id_comuna = $1`,
        [id_comuna]
    );
    return rows[0] || null; 
}

// BUSQUEDA DE SI EXISTE LA COMUNA POR ID
export async function existComuna(id_comuna, db = pool) {
    const { rows } = await db.query(
        "SELECT 1 FROM comuna WHERE id_comuna = $1",
=======
// BUSQUEDA DE SI EXISTE LA COMUNA POR ID
export async function existComuna(id_comuna, db = pool) {
    const { rows } = await db.query(
        "SELECT 1 FROM comuna WHERE id = $1",
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
        [id_comuna]
    );
    return rows.length > 0;
}

// BUSQUEDA DE SI EXISTE LA COMUNA POR NOMBRE
export async function existComunaByNombre(nombreComuna, db = pool) {
    const { rows } = await db.query(
<<<<<<< HEAD
        "SELECT 1 FROM comuna WHERE nombre ILIKE $1",
=======
        "SELECT 1 FROM comuna WHERE comuna.nombre ILIKE $1",
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
        [nombreComuna]
    );
    return rows.length > 0;
}