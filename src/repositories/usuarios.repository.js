import pool from "@/lib/db";
import { NotFoundError } from "@/utils/errors";

export async function findUsuariosByEmpresa(id_empresa, db = pool) {
    const { rows } = await db.query(
        `SELECT enc.id_encargado, enc.primer_nombre, enc.apellidos, enc.email,
                enc.cargo, enc.usuario, nivel.nombre AS nivel
         FROM encargado_empresa enc
         JOIN nivel_jerarquico nivel ON nivel.id_nivel_jerarquico = enc.id_nivel_jerarquico
         WHERE enc.id_empresa = $1
         ORDER BY enc.id_encargado`,
        [id_empresa]
    );
    return rows;
}

// el usuario de acceso lo genera el trigger a partir del nombre y la empresa
export async function insertUsuario(datos, db = pool) {
    const { rows } = await db.query(
        `INSERT INTO encargado_empresa
           (id_empresa, id_nivel_jerarquico, primer_nombre, apellidos, email, cargo, password_hash)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id_encargado, id_empresa, id_nivel_jerarquico,
                   primer_nombre, apellidos, email, cargo, usuario`,
        [
            datos.id_empresa,
            datos.id_nivel_jerarquico,
            datos.primer_nombre,
            datos.apellidos,
            datos.email,
            datos.cargo,
            datos.password_hash,
        ]
    );
    return rows[0];
}

// COALESCE deja intacto lo que no venga en el cuerpo del PATCH
export async function updateUsuario(id_encargado, id_empresa, datos, db = pool) {
    const { rows } = await db.query(
        `UPDATE encargado_empresa enc SET
           primer_nombre = COALESCE($3, primer_nombre),
           apellidos = COALESCE($4, apellidos),
           email = COALESCE($5, email),
           cargo = COALESCE($6, cargo),
           id_nivel_jerarquico = COALESCE($7, id_nivel_jerarquico),
           password_hash = COALESCE($8, password_hash),
           updated_at = CURRENT_TIMESTAMP
         WHERE id_encargado = $1 AND id_empresa = $2
         RETURNING id_encargado, id_empresa, id_nivel_jerarquico,
                   primer_nombre, apellidos, email, cargo, usuario`,
        [
            id_encargado,
            id_empresa,
            datos.primer_nombre ?? null,
            datos.apellidos ?? null,
            datos.email ?? null,
            datos.cargo ?? null,
            datos.id_nivel_jerarquico ?? null,
            datos.password_hash ?? null,
        ]
    );
    if (!rows[0]) {
        throw new NotFoundError("El usuario no existe");
    }
    return rows[0];
}

export async function findNivelById(id_encargado, id_empresa, db = pool) {
    const { rows } = await db.query(
        `SELECT id_nivel_jerarquico
         FROM encargado_empresa
         WHERE id_encargado = $1 AND id_empresa = $2`,
        [id_encargado, id_empresa]
    );
    return rows[0];
}

export async function contarDuenios(id_empresa, db = pool) {
    const { rows } = await db.query(
        `SELECT COUNT(*)::int AS total
         FROM encargado_empresa
         WHERE id_empresa = $1 AND id_nivel_jerarquico = 1`,
        [id_empresa]
    );
    return Number(rows[0]?.total ?? 0);
}
