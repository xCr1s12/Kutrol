import pool from "@/lib/db";

export async function create(
    { id_comuna, nombre, rut, direccion, descripcion, url_imagen },
    db = pool
) {
    const { rows } = await db.query(
        `INSERT INTO empresa (id_comuna, nombre, rut, direccion, descripcion, url_imagen)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id_empresa, id_comuna, nombre, rut, direccion, descripcion, url_imagen, created_at`,
        [id_comuna, nombre, rut, direccion, descripcion || null, url_imagen || null],
    );
    return rows[0];
}


export async function findByIdEmpresa(id_empresa, db = pool) {
    const { rows } = await db.query(
        `SELECT
            e.id_empresa,
            e.nombre,
            e.rut,
            e.direccion,
            e.descripcion,
            e.url_imagen,
            c.nombre AS comuna,
            r.nombre AS region,
            COALESCE(
                (SELECT array_agg(ee.email ORDER BY ee.email)
                 FROM empresa_email ee
                 WHERE ee.id_empresa = e.id_empresa),
                '{}'
            ) AS emails,
            COALESCE(
                (SELECT array_agg(et.telefono ORDER BY et.telefono)
                 FROM empresa_telefono et
                 WHERE et.id_empresa = e.id_empresa),
                '{}'
            ) AS telefonos
         FROM empresa e
         LEFT JOIN comuna c ON c.id_comuna = e.id_comuna
         LEFT JOIN region r ON r.id_region = c.id_region
         WHERE e.id_empresa = $1
           AND e.deleted_at IS NULL`,
        [id_empresa],
    );
    return rows[0] || null;
}

export async function findImageUrlByIdEmpresa(id_empresa, db = pool) {
    const { rows } = await db.query(
        `SELECT url_imagen
         FROM empresa
         WHERE id_empresa = $1
           AND deleted_at IS NULL`,
        [id_empresa],
    );
    return rows[0]?.url_imagen ?? null;
}