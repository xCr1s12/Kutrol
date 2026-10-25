import "server-only";
import bcrypt from "bcryptjs";
import * as usuariosRepo from "@/repositories/usuarios.repository";
import { NIVELES } from "@/schema/usuario.schema";
import { ConflictError, NotFoundError } from "@/utils/errors";
import { NIVEL_DUENIO, exigirGestionDeUsuarios } from "@/lib/permisos";

const SALT_ROUNDS = 10;

function nombreNivel(id_nivel_jerarquico) {
    const nivel = NIVELES.find((n) => n.id === Number(id_nivel_jerarquico));
    return nivel?.nombre ?? null;
}

function mapearUsuario(row) {
    return {
        id: row.id_encargado,
        nombre: `${row.primer_nombre} ${row.apellidos}`,
        primer_nombre: row.primer_nombre,
        apellidos: row.apellidos,
        correo: row.email,
        cargo: row.cargo,
        rol: row.nivel ?? nombreNivel(row.id_nivel_jerarquico),
        usuario: row.usuario,
    };
}

export async function getUsuariosByEmpresa(id_empresa, db) {
    const rows = await usuariosRepo.findUsuariosByEmpresa(id_empresa, db);
    return rows.map(mapearUsuario);
}

export async function createUsuario(datos, id_empresa, session, db) {
    exigirGestionDeUsuarios(session, { nivelObjetivo: datos.id_nivel_jerarquico });
    const { password, ...resto } = datos;
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    const row = await usuariosRepo.insertUsuario({ ...resto, id_empresa, password_hash }, db);
    return mapearUsuario(row);
}

export async function updateUsuario(id_encargado, id_empresa, datos, session, db) {
    const { password, ...resto } = datos;
    const cambios = { ...resto };

    const actual = await usuariosRepo.findNivelById(id_encargado, id_empresa, db);
    if (!actual) {
        throw new NotFoundError("El usuario no existe");
    }

    exigirGestionDeUsuarios(session, {
        nivelObjetivo: cambios.id_nivel_jerarquico,
        objetivoEsDuenio: Number(actual.id_nivel_jerarquico) === NIVEL_DUENIO,
    });

    const saleDeDuenio =
        cambios.id_nivel_jerarquico !== undefined &&
        Number(cambios.id_nivel_jerarquico) !== NIVEL_DUENIO;
    if (saleDeDuenio && Number(actual.id_nivel_jerarquico) === NIVEL_DUENIO) {
        const duenios = await usuariosRepo.contarDuenios(id_empresa, db);
        if (duenios <= 1) {
            throw new ConflictError("La empresa necesita al menos un DUEÑO");
        }
    }

    if (password) {
        cambios.password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const row = await usuariosRepo.updateUsuario(id_encargado, id_empresa, cambios, db);
    return mapearUsuario(row);
}
