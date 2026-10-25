import bcrypt from "bcryptjs";
import { withTransaction } from "@/lib/db";
import * as comunasRepository from "@/repositories/Comunas.repository";
import * as empresaRepository from "@/repositories/Empresa.repository";
import * as encargadoRepository from "@/repositories/Encargado.repository";
import * as comunicacionRepository from "@/repositories/communicacion.repository";
import { registerEmpresaAndEncargadoSchema } from "@/schema/auth.schema";
import { toConflictError, ValidationError } from "@/utils/errors";
import { UnauthorizedError } from "@/utils/errors";

const SALT_ROUNDS = 10;
const NIVEL_JERARQUICO_DUENO = 1;

function mapearErroresZod(error) {
  const errores = {};
  for (const issue of error.issues) {
    const [seccion, ...resto] = issue.path;
    const clave = [String(seccion).toLowerCase(), ...resto].join(".");
    if (!errores[clave]) errores[clave] = issue.message;
  }
  return errores;
}

function normalizeRegistration(registration) {
  const entrada = {
    Encargado: registration?.Encargado ?? registration?.encargado,
    Empresa: registration?.Empresa ?? registration?.empresa,
  };

  if (!entrada.Encargado || typeof entrada.Encargado !== "object") {
    throw new ValidationError("Datos inválidos", {
      encargado: "Los datos del encargado son obligatorios",
    });
  }
  if (!entrada.Empresa || typeof entrada.Empresa !== "object") {
    throw new ValidationError("Datos inválidos", {
      empresa: "Los datos de la empresa son obligatorios",
    });
  }

  const resultado = registerEmpresaAndEncargadoSchema.safeParse(entrada);
  if (!resultado.success) {
    throw new ValidationError("Datos inválidos", mapearErroresZod(resultado.error));
  }

  const { Encargado: encargado, Empresa: empresa } = resultado.data;
  const telefonos = empresa.telefonos.map((telefono) => telefono.replace(/[\s-]/g, ""));
  const emails = empresa.emails.map((email) => email.toLowerCase());

  const errores = {};
  if (new Set(telefonos).size !== telefonos.length) {
    errores["empresa.telefonos"] = "No repitas teléfonos";
  }
  if (new Set(emails).size !== emails.length) {
    errores["empresa.emails"] = "No repitas emails";
  }
  if (Object.keys(errores).length) {
    throw new ValidationError("Datos inválidos", errores);
  }

  return {
    empresa: {
      nombre: empresa.nombre,
      rut: empresa.rut.replace(/\./g, "").toUpperCase(),
      direccion: empresa.direccion,
      descripcion: empresa.descripcion || null,
      url_imagen: empresa.url_imagen || null,
      id_comuna: empresa.id_comuna,
      telefonos,
      emails,
    },
    encargado: {
      primer_nombre: encargado.primer_nombre,
      apellidos: encargado.apellidos,
      email: encargado.email.toLowerCase(),
      cargo: encargado.cargo,
      password: encargado.password,
    },
  };
}

export async function CreateEmpresaWithEncargado(registration) {
  const { empresa, encargado } = normalizeRegistration(registration);
  const passwordHash = await bcrypt.hash(encargado.password, SALT_ROUNDS);

  try {
    return await withTransaction(async (client) => {
      const comunaExiste = await comunasRepository.existComuna(empresa.id_comuna, client);
      if (!comunaExiste) {
        throw new ValidationError("La comuna seleccionada no existe", {
          "empresa.id_comuna": "Selecciona una comuna válida",
        });
      }

      const nuevaEmpresa = await empresaRepository.create(
        {
          id_comuna: empresa.id_comuna,
          nombre: empresa.nombre,
          rut: empresa.rut,
          direccion: empresa.direccion,
          descripcion: empresa.descripcion,
          url_imagen: empresa.url_imagen,
        },
        client,
      );

      await comunicacionRepository.addTelefonosEmpresa(
        nuevaEmpresa.id_empresa,
        empresa.telefonos,
        client,
      );
      await comunicacionRepository.addEmailsEmpresa(
        nuevaEmpresa.id_empresa,
        empresa.emails,
        client,
      );

      const nuevoEncargado = await encargadoRepository.create(
        {
          ...encargado,
          passwordHash,
          idEmpresa: nuevaEmpresa.id_empresa,
          idNivelJerarquico: NIVEL_JERARQUICO_DUENO,
        },
        client,
      );

      return { empresa: nuevaEmpresa, encargado: nuevoEncargado };
    });
  } catch (error) {
    throw toConflictError(error);
  }
}



export async function login(user, password) {
  const encargado = await encargadoRepository.findByUsuario(user);
  const hashValido = encargado
    ? await bcrypt.compare(password, encargado.password_hash)
    : false;

  if (!hashValido) {
    throw new UnauthorizedError("Usuario o contraseña incorrectos");
  }

  return {
    id_encargado: encargado.id_encargado,
    id_empresa: encargado.id_empresa,
    id_nivel_jerarquico: encargado.id_nivel_jerarquico,
    usuario: encargado.usuario,
  };
}

import { deleteSession } from "@/lib/tokenSession";

export async function logoutService() {
  await deleteSession();
}