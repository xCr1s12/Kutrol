import bcrypt from "bcryptjs";
import { withTransaction } from "@/lib/db";
import * as companyRepository from "@/repositories/company.repository";
import * as managerRepository from "@/repositories/manager.repository";
import { ConflictError } from "@/utils/errors";

const SALT_ROUNDS = 10;
const NIVEL_JERARQUICO_INICIAL = 1; // quien registra la empresa es el nivel base

export async function registerCompanyAndManager({ manager, company }) {
  // bcrypt es lento a propósito. Lo hacemos ANTES de la transacción para no
  // mantener una conexión de la base ocupada mientras se calcula el hash.
  const passwordHash = await bcrypt.hash(manager.password, SALT_ROUNDS);

  try {
    return await withTransaction(async (client) => {
      const newCompany = await companyRepository.create(company, client);

      const newManager = await managerRepository.create(
        {
          ...manager,
          passwordHash,
          idEmpresa: newCompany.id, // el id sale de la inserción anterior
          idNivelJerarquico: NIVEL_JERARQUICO_INICIAL,
        },
        client,
      );

      return { company: newCompany, manager: newManager };
    });
  } catch (err) {
    if (err.code === "23505") {
      // err.constraint dice QUÉ restricción UNIQUE falló
      const c = err.constraint ?? "";
      if (c.includes("rut")) throw new ConflictError("El RUT de la empresa ya está registrado");
      if (c.includes("email")) throw new ConflictError("El correo ya está registrado");
      if (c.includes("usuario")) throw new ConflictError("El nombre de usuario ya existe");
      throw new ConflictError("Ya existe un registro con esos datos");
    }
    throw err;
  }
}