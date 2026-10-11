import pool from "@/lib/db";

export async function create({ id_comuna,nombre, rut, direccion, descripcion, url_imagen }, db = pool) {
    const { rows } = await db.query(
        `INSERT INTO empresa (id_comuna, nombre, rut, direccion, descripcion, url_imagen)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, id_comuna, nombre, rut, direccion`,
        [id_comuna, nombre, rut, direccion, descripcion || null, url_imagen || null],
    );
    return rows[0];
}