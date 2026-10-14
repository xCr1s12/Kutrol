import bcrypt from "bcryptjs";
import { withTransaction } from "@/lib/db";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
import * as comunasRepository from "@/repositories/Comunas.repository";
import * as empresaRepository from "@/repositories/Empresa.repository";
import * as encargadoRepository from "@/repositories/Encargado.repository";
import * as comunicacionRepository from "@/repositories/communicacion.repository";
import { validateCompanyRut } from "@/lib/validateCompanyRut";
import { toConflictError, ValidationError } from "@/utils/errors";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
import { UnauthorizedError } from "@/utils/errors";

const SALT_ROUNDS = 10;
const NIVEL_JERARQUICO_DUENO = 1;

function normalizeRegistration(registration) {
  const empresa = registration?.empresa ?? registration?.Empresa;
  const encargado = registration?.encargado ?? registration?.Encargado;
  const errors = {};

  const requiredString = (value, field, label, minLength, maxLength) => {
    if (typeof value !== "string") {
      errors[field] = `${label} es obligatorio`;
      return "";
    }

    const normalized = value.trim();
    if (normalized.length < minLength) {
      errors[field] = `${label} debe tener al menos ${minLength} caracteres`;
    } else if (normalized.length > maxLength) {
      errors[field] = `${label} no puede superar ${maxLength} caracteres`;
    }
    return normalized;
  };

  if (!empresa || typeof empresa !== "object") {
    errors.empresa = "Los datos de la empresa son obligatorios";
  }
  if (!encargado || typeof encargado !== "object") {
    errors.encargado = "Los datos del encargado son obligatorios";
  }
  if (Object.keys(errors).length) {
    throw new ValidationError("Datos inválidos", errors);
  }

  const empresaNormalizada = {
    nombre: requiredString(empresa.nombre, "empresa.nombre", "El nombre de la empresa", 2, 100),
    rut: requiredString(empresa.rut, "empresa.rut", "El RUT de la empresa", 1, 12),
    direccion: requiredString(empresa.direccion, "empresa.direccion", "La dirección", 5, 200),
  };

  const rutError = validateCompanyRut(empresaNormalizada.rut);
  if (rutError) errors["empresa.rut"] = rutError;
  empresaNormalizada.rut = empresaNormalizada.rut.replace(/\./g, "").toUpperCase();

  if (empresa.descripcion !== undefined && typeof empresa.descripcion !== "string") {
    errors["empresa.descripcion"] = "La descripción debe ser texto";
  }
  const descripcion = typeof empresa.descripcion === "string" ? empresa.descripcion.trim() : "";
  if (descripcion.length > 255) {
    errors["empresa.descripcion"] = "La descripción no puede superar 255 caracteres";
  }
  empresaNormalizada.descripcion = descripcion || null;

  if (empresa.url_imagen !== undefined && typeof empresa.url_imagen !== "string") {
    errors["empresa.url_imagen"] = "La URL de la imagen debe ser texto";
  }
  const urlImagen = typeof empresa.url_imagen === "string" ? empresa.url_imagen.trim() : "";
  if (urlImagen) {
    try {
      const url = new URL(urlImagen);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    } catch {
      errors["empresa.url_imagen"] = "La URL de la imagen debe ser válida y usar HTTP o HTTPS";
    }
  }
  empresaNormalizada.url_imagen = urlImagen || null;

  const idComuna = Number(empresa.id_comuna);
  if (!Number.isInteger(idComuna) || idComuna <= 0) {
    errors["empresa.id_comuna"] = "Selecciona una comuna válida";
  }
  empresaNormalizada.id_comuna = idComuna;

  for (const field of ["telefonos", "emails"]) {
    if (!Array.isArray(empresa[field]) || empresa[field].length < 1 || empresa[field].length > 5) {
      errors[`empresa.${field}`] = `Ingresa entre 1 y 5 ${field === "telefonos" ? "teléfonos" : "emails"}`;
    }
  }

  empresaNormalizada.telefonos = Array.isArray(empresa.telefonos)
    ? empresa.telefonos.map((telefono, index) => {
        if (typeof telefono !== "string") {
          errors[`empresa.telefonos.${index}`] = "Teléfono inválido";
          return "";
        }
        const normalized = telefono.replace(/[\s-]/g, "");
        if (!/^\+?[0-9]{8,14}$/.test(normalized)) {
          errors[`empresa.telefonos.${index}`] = "Teléfono inválido";
        }
        return normalized;
      })
    : [];
  if (
    new Set(empresaNormalizada.telefonos).size !== empresaNormalizada.telefonos.length
  ) {
    errors["empresa.telefonos"] = "No repitas teléfonos";
  }

  empresaNormalizada.emails = Array.isArray(empresa.emails)
    ? empresa.emails.map((email, index) => {
        if (typeof email !== "string") {
          errors[`empresa.emails.${index}`] = "Email inválido";
          return "";
        }
        const normalized = email.trim().toLowerCase();
        if (normalized.length > 100 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalized)) {
          errors[`empresa.emails.${index}`] = "Email inválido";
        }
        return normalized;
      })
    : [];
  if (new Set(empresaNormalizada.emails).size !== empresaNormalizada.emails.length) {
    errors["empresa.emails"] = "No repitas emails";
  }

  const password = typeof encargado.password === "string" ? encargado.password : "";
  if (password.length < 8) {
    errors["encargado.password"] = "La contraseña debe tener al menos 8 caracteres";
  } else if (Buffer.byteLength(password, "utf8") > 72) {
    errors["encargado.password"] = "La contraseña no puede superar 72 bytes";
  }

  const encargadoNormalizado = {
    primer_nombre: requiredString(encargado.primer_nombre, "encargado.primer_nombre", "El primer nombre", 2, 50),
    apellidos: requiredString(encargado.apellidos, "encargado.apellidos", "Los apellidos", 2, 100),
    email: requiredString(encargado.email, "encargado.email", "El email", 1, 100).toLowerCase(),
    cargo: requiredString(encargado.cargo, "encargado.cargo", "El cargo", 2, 100),
    password,
  };

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(encargadoNormalizado.email)) {
    errors["encargado.email"] = "Email inválido";
  }

  if (Object.keys(errors).length) {
    throw new ValidationError("Datos inválidos", errors);
  }

  return { empresa: empresaNormalizada, encargado: encargadoNormalizado };
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
=======
import * as companyRepository from "@/repositories/company.repository";
import * as managerRepository from "@/repositories/manager.repository";
import { ConflictError } from "@/utils/errors";
=======
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)

const SALT_ROUNDS = 10;
const NIVEL_JERARQUICO_DUENO = 1;

function normalizeRegistration(registration) {
  const empresa = registration?.empresa ?? registration?.Empresa;
  const encargado = registration?.encargado ?? registration?.Encargado;
  const errors = {};

  const requiredString = (value, field, label, minLength, maxLength) => {
    if (typeof value !== "string") {
      errors[field] = `${label} es obligatorio`;
      return "";
    }

    const normalized = value.trim();
    if (normalized.length < minLength) {
      errors[field] = `${label} debe tener al menos ${minLength} caracteres`;
    } else if (normalized.length > maxLength) {
      errors[field] = `${label} no puede superar ${maxLength} caracteres`;
    }
    return normalized;
  };

  if (!empresa || typeof empresa !== "object") {
    errors.empresa = "Los datos de la empresa son obligatorios";
  }
  if (!encargado || typeof encargado !== "object") {
    errors.encargado = "Los datos del encargado son obligatorios";
  }
  if (Object.keys(errors).length) {
    throw new ValidationError("Datos inválidos", errors);
  }

  const empresaNormalizada = {
    nombre: requiredString(empresa.nombre, "empresa.nombre", "El nombre de la empresa", 2, 100),
    rut: requiredString(empresa.rut, "empresa.rut", "El RUT de la empresa", 1, 12),
    direccion: requiredString(empresa.direccion, "empresa.direccion", "La dirección", 5, 200),
  };

  const rutError = validateCompanyRut(empresaNormalizada.rut);
  if (rutError) errors["empresa.rut"] = rutError;
  empresaNormalizada.rut = empresaNormalizada.rut.replace(/\./g, "").toUpperCase();

  if (empresa.descripcion !== undefined && typeof empresa.descripcion !== "string") {
    errors["empresa.descripcion"] = "La descripción debe ser texto";
  }
  const descripcion = typeof empresa.descripcion === "string" ? empresa.descripcion.trim() : "";
  if (descripcion.length > 255) {
    errors["empresa.descripcion"] = "La descripción no puede superar 255 caracteres";
  }
  empresaNormalizada.descripcion = descripcion || null;

  if (empresa.url_imagen !== undefined && typeof empresa.url_imagen !== "string") {
    errors["empresa.url_imagen"] = "La URL de la imagen debe ser texto";
  }
  const urlImagen = typeof empresa.url_imagen === "string" ? empresa.url_imagen.trim() : "";
  if (urlImagen) {
    try {
      const url = new URL(urlImagen);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    } catch {
      errors["empresa.url_imagen"] = "La URL de la imagen debe ser válida y usar HTTP o HTTPS";
    }
  }
  empresaNormalizada.url_imagen = urlImagen || null;

  const idComuna = Number(empresa.id_comuna);
  if (!Number.isInteger(idComuna) || idComuna <= 0) {
    errors["empresa.id_comuna"] = "Selecciona una comuna válida";
  }
  empresaNormalizada.id_comuna = idComuna;

  for (const field of ["telefonos", "emails"]) {
    if (!Array.isArray(empresa[field]) || empresa[field].length < 1 || empresa[field].length > 5) {
      errors[`empresa.${field}`] = `Ingresa entre 1 y 5 ${field === "telefonos" ? "teléfonos" : "emails"}`;
    }
  }

  empresaNormalizada.telefonos = Array.isArray(empresa.telefonos)
    ? empresa.telefonos.map((telefono, index) => {
        if (typeof telefono !== "string") {
          errors[`empresa.telefonos.${index}`] = "Teléfono inválido";
          return "";
        }
        const normalized = telefono.replace(/[\s-]/g, "");
        if (!/^\+?[0-9]{8,14}$/.test(normalized)) {
          errors[`empresa.telefonos.${index}`] = "Teléfono inválido";
        }
        return normalized;
      })
    : [];
  if (
    new Set(empresaNormalizada.telefonos).size !== empresaNormalizada.telefonos.length
  ) {
    errors["empresa.telefonos"] = "No repitas teléfonos";
  }

  empresaNormalizada.emails = Array.isArray(empresa.emails)
    ? empresa.emails.map((email, index) => {
        if (typeof email !== "string") {
          errors[`empresa.emails.${index}`] = "Email inválido";
          return "";
        }
        const normalized = email.trim().toLowerCase();
        if (normalized.length > 100 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalized)) {
          errors[`empresa.emails.${index}`] = "Email inválido";
        }
        return normalized;
      })
    : [];
  if (new Set(empresaNormalizada.emails).size !== empresaNormalizada.emails.length) {
    errors["empresa.emails"] = "No repitas emails";
  }

  const password = typeof encargado.password === "string" ? encargado.password : "";
  if (password.length < 8) {
    errors["encargado.password"] = "La contraseña debe tener al menos 8 caracteres";
  } else if (Buffer.byteLength(password, "utf8") > 72) {
    errors["encargado.password"] = "La contraseña no puede superar 72 bytes";
  }

  const encargadoNormalizado = {
    primer_nombre: requiredString(encargado.primer_nombre, "encargado.primer_nombre", "El primer nombre", 2, 50),
    apellidos: requiredString(encargado.apellidos, "encargado.apellidos", "Los apellidos", 2, 100),
    email: requiredString(encargado.email, "encargado.email", "El email", 1, 100).toLowerCase(),
    cargo: requiredString(encargado.cargo, "encargado.cargo", "El cargo", 2, 100),
    password,
  };

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(encargadoNormalizado.email)) {
    errors["encargado.email"] = "Email inválido";
  }

  if (Object.keys(errors).length) {
    throw new ValidationError("Datos inválidos", errors);
  }

  return { empresa: empresaNormalizada, encargado: encargadoNormalizado };
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
<<<<<<< HEAD
          ...manager,
          passwordHash,
          idEmpresa: newCompany.id, // el id sale de la inserción anterior
          idNivelJerarquico: NIVEL_JERARQUICO_INICIAL,
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
=======
          id_comuna: empresa.id_comuna,
          nombre: empresa.nombre,
          rut: empresa.rut,
          direccion: empresa.direccion,
          descripcion: empresa.descripcion,
          url_imagen: empresa.url_imagen,
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
        },
        client,
      );

<<<<<<< HEAD
<<<<<<< HEAD
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
<<<<<<< HEAD
}

import { deleteSession } from "@/lib/tokenSession";

export async function logoutService() {
  await deleteSession();
=======
      return { company: newCompany, manager: newManager };
=======
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
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
    });
  } catch (error) {
    throw toConflictError(error);
  }
<<<<<<< HEAD
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
}
=======
}
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
=======
}
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
