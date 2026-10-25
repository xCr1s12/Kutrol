import pool from "@/lib/db";

export async function getFlotasByEmpresa(id_empresa, db = pool) {
    const { rows } = await db.query(
        `SELECT id_flota, id_empresa, id_tipo_flota, nombre, descripcion,
                created_at, updated_at, deleted_at
         FROM flota
         WHERE id_empresa = $1
           AND deleted_at IS NULL
         ORDER BY nombre`,
        [id_empresa]
    );
    return rows;
}

export async function createFlota(
    { id_empresa, id_tipo_flota, nombre, descripcion = null },
    db = pool
) {
    const { rows } = await db.query(
        `INSERT INTO flota (id_empresa, id_tipo_flota, nombre, descripcion)
         VALUES ($1, $2, $3, $4)
         RETURNING id_flota, id_empresa, id_tipo_flota, nombre, descripcion,
                   created_at, updated_at, deleted_at`,
        [id_empresa, id_tipo_flota, nombre, descripcion]
    );
    return rows[0];
}


export async function getTiposFlota(db = pool) {
    const { rows } = await db.query(
        `SELECT id_tipo_flota, nombre
         FROM tipo_flota
         ORDER BY id_tipo_flota`
    );
    return rows;
}


export async function perteneceAEmpresa(id_flota, id_empresa, db = pool) {
    const { rows } = await db.query(
        `SELECT 1
         FROM flota
         WHERE id_flota = $1
           AND id_empresa = $2
           AND deleted_at IS NULL`,
        [id_flota, id_empresa]
    );
    return rows.length > 0;
}


export async function dataFlota(flota_id, db=pool) {
    const { rows } = await db.query(
        `SELECT *
         FROM flota
         WHERE id_flota = $1
           AND deleted_at IS NULL`,
        [flota_id],
    );
    return rows[0];
}