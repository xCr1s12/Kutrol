<<<<<<< HEAD
<<<<<<< HEAD
export class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
=======
import { ZodError } from "zod";

/* ------------------------------------------------------------------ */
/* Errores propios de la aplicación                                    */
/* ------------------------------------------------------------------ */

=======
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
export class AppError extends Error {
  constructor(message, status = 500, code = "INTERNAL_ERROR", details = null) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class ValidationError extends AppError {
  constructor(message = "Datos inválidos", details = null) {
    super(message, 400, "VALIDATION_ERROR", details);
  }
}

<<<<<<< HEAD
export class UnauthorizedError extends AppError {
  constructor(message = "Debes iniciar sesión") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "No tienes permiso para realizar esta acción") {
    super(message, 403, "FORBIDDEN");
  }
}

export class NotFoundError extends AppError {
  constructor(message = "El recurso no existe") {
    super(message, 404, "NOT_FOUND");
  }
}

=======
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
export class ConflictError extends AppError {
  constructor(message = "El recurso ya existe") {
    super(message, 409, "CONFLICT");
  }
}

<<<<<<< HEAD
<<<<<<< HEAD
const UNIQUE_MESSAGES = [
  ["rut", "El RUT de la empresa ya está registrado"],
  ["email", "El correo ya está registrado"],
  ["usuario", "El nombre de usuario ya existe"],
  ["patente", "La patente ya está en uso por otro camión"],
  ["dispositivo", "Ese dispositivo ya está asignado"],
];

=======
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
export function toConflictError(error) {
  if (error?.code !== "23505") return error;

  const constraint = error.constraint ?? "";
<<<<<<< HEAD
  const match = UNIQUE_MESSAGES.find(([key]) => constraint.includes(key));

  return new ConflictError(
    match ? match[1] : "Ya existe un registro con esos datos",
  );
}

export function fromDatabaseError(error) {
  switch (error?.code) {
    // unique_violation
    case "23505":
      return toConflictError(error);

    // foreign_key_violation
    case "23503":
      if ((error.constraint ?? "").includes("flota")) {
        return new NotFoundError("La flota indicada no existe");
      }
      return new ConflictError(
        "La operación referencia un registro que no existe o que está en uso",
      );

    // not_null_violation
    case "23502":
      return new ValidationError("Falta un campo obligatorio");

    // check_violation
    case "23514":
      return new ValidationError("Un valor no cumple las reglas permitidas");

    // invalid_text_representation, string_data_right_truncation, numeric_value_out_of_range
    case "22P02":
    case "22001":
    case "22003":
      return new ValidationError("Algún dato tiene un formato inválido");

    default:
      return error;
  }
}

export function fromZodError(error) {
  return new ValidationError(
    "Datos inválidos",
    error.issues.map((issue) => ({
      campo: issue.path.join("."),
      mensaje: issue.message,
    })),
  );
}
export function normalizeError(err) {
  if (err instanceof AppError) return err;

  if (err instanceof ZodError) return fromZodError(err);

  if (err instanceof SyntaxError && err.message.includes("JSON")) {
    return new AppError("El cuerpo no es JSON válido", 400, "INVALID_JSON");
  }

  return fromDatabaseError(err);
}

export function toErrorResponse(err) {
  const error = normalizeError(err);

  if (error instanceof AppError) {
    return {
      status: error.status,
      body: {
        ok: false,
        error: {
          code: error.code,
          message: error.message,
          ...(error.details && { details: error.details }),
        },
      },
    };
  }

  console.error(err);
  return {
    status: 500,
    body: {
      ok: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "Error interno del servidor",
      },
    },
  };
>>>>>>> FrontEnd
=======
// 
=======
  if (constraint.includes("rut")) {
    return new ConflictError("El RUT de la empresa ya está registrado");
  }
  if (constraint.includes("email")) {
    return new ConflictError("El correo ya está registrado");
  }
  if (constraint.includes("usuario")) {
    return new ConflictError("El nombre de usuario ya existe");
  }
  return new ConflictError("Ya existe un registro con esos datos");
}

>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
export function toErrorResponse(err) {
  if (err instanceof AppError) {
    return {
      status: err.status,
      body: { error: { code: err.code, message: err.message, details: err.details } },
    };
  }
  if (err instanceof SyntaxError) {
    return {
      status: 400,
      body: { error: { code: "INVALID_JSON", message: "El cuerpo no es JSON válido" } },
    };
  }
  console.error(err); // error inesperado: se loguea, NO se expone al cliente
  return {
    status: 500,
    body: { error: { code: "INTERNAL_ERROR", message: "Error interno del servidor" } },
  };
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
}