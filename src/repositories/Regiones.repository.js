import pool from "@/lib/db";

// BUSQUEDA DE TODAS LAS REGIONES
export async function getAllRegiones(db = pool) {
  const { rows } = await db.query(
<<<<<<< HEAD
<<<<<<< HEAD
    `SELECT id_region AS region_id, nombre AS region_nombre, numero_romano 
     FROM region 
     ORDER BY id_region`
=======
    `SELECT id AS region_id, nombre AS region_nombre 
     FROM region 
     ORDER BY id`
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
=======
    `SELECT id_region AS region_id, nombre AS region_nombre, numero_romano 
     FROM region 
     ORDER BY id_region`
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
  );
  return rows;
}

// BUSQUEDA DE UNA REGION POR ID
<<<<<<< HEAD
<<<<<<< HEAD
export async function getRegionById(id_region, db = pool) {
  const { rows } = await db.query(
    `SELECT id_region AS region_id, nombre AS region_nombre, numero_romano 
     FROM region 
     WHERE id_region = $1`,
    [id_region]
=======
export async function getRegionById(regionId, db = pool) {
=======
export async function getRegionById(id_region, db = pool) {
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
  const { rows } = await db.query(
    `SELECT id_region AS region_id, nombre AS region_nombre, numero_romano 
     FROM region 
<<<<<<< HEAD
     WHERE id = $1`,
    [regionId]
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
=======
     WHERE id_region = $1`,
    [id_region]
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
  );
  return rows[0] || null; // Retorna la región encontrada o null si no existe
}

// BUSQUEDA DE UNA REGION POR NOMBRE
<<<<<<< HEAD
<<<<<<< HEAD
export async function getRegionByNombre(nombreRegion, db = pool) {
  const { rows } = await db.query(
    `SELECT id_region AS region_id, nombre AS region_nombre, numero_romano 
     FROM region 
     WHERE nombre ILIKE $1`,
    [nombreRegion]
=======
export async function getRegionByNombre(regionNombre, db = pool) {
=======
export async function getRegionByNombre(nombreRegion, db = pool) {
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
  const { rows } = await db.query(
    `SELECT id_region AS region_id, nombre AS region_nombre, numero_romano 
     FROM region 
     WHERE nombre ILIKE $1`,
<<<<<<< HEAD
    [regionNombre]
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
=======
    [nombreRegion]
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
  );
  return rows[0] || null;
}

// BUSQUEDA DE SI EXISTE LA REGION POR ID
export async function existRegion(id_region, db = pool) {
  const { rows } = await db.query(
<<<<<<< HEAD
<<<<<<< HEAD
    "SELECT 1 FROM region WHERE id_region = $1",
=======
    "SELECT 1 FROM region WHERE id = $1",
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
=======
    "SELECT 1 FROM region WHERE id_region = $1",
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
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