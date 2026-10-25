import pool from "@/lib/db";

// BUSQUEDA DE TODAS LAS REGIONES
export async function getAllRegiones(db = pool) {
  const { rows } = await db.query(
    `SELECT id_region AS region_id, nombre AS region_nombre, numero_romano,
            latitud, longitud
     FROM region 
     ORDER BY id_region`
  );
  return rows;
}

// BUSQUEDA DE UNA REGION POR ID
export async function getRegionById(id_region, db = pool) {
  const { rows } = await db.query(
    `SELECT id_region AS region_id, nombre AS region_nombre, numero_romano,
            latitud, longitud
     FROM region 
     WHERE id_region = $1`,
    [id_region]
  );
  return rows[0] || null; // Retorna la región encontrada o null si no existe
}

// BUSQUEDA DE UNA REGION POR NOMBRE
export async function getRegionByNombre(nombreRegion, db = pool) {
  const { rows } = await db.query(
    `SELECT id_region AS region_id, nombre AS region_nombre, numero_romano,
            latitud, longitud
     FROM region 
     WHERE nombre ILIKE $1`,
    [nombreRegion]
  );
  return rows[0] || null;
}

// BUSQUEDA DE SI EXISTE LA REGION POR ID
export async function existRegion(id_region, db = pool) {
  const { rows } = await db.query(
    "SELECT 1 FROM region WHERE id_region = $1",
    [id_region]
  );
  return rows.length > 0;
}

// BUSQUEDA DE SI EXISTE LA REGION POR NOMBRE
export async function existRegionByNombre(nombreRegion, db = pool) {
  const { rows } = await db.query(
    "SELECT 1 FROM region WHERE nombre ILIKE $1",
    [nombreRegion]
  );
  return rows.length > 0;
}