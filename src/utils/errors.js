import { ZodError } from "zod";

/* ------------------------------------------------------------------ */
/* Errores propios de la aplicación                                    */
/* ------------------------------------------------------------------ */

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

export class ConflictError extends AppError {
  constructor(message = "El recurso ya existe", details = null) {
    super(message, 409, "CONFLICT", details);
  }
}

const UNIQUE_MESSAGES = [
  ["rut", "El RUT ya está registrado en otra empresa"],
  ["email", "El correo ya está registrado"],
  ["usuario", "El nombre de usuario ya existe"],
  ["patente", "La patente ya está en uso por otro camión"],
  ["dispositivo", "Ese dispositivo ya está asignado"],
  ["flota", "Ya tienes una flota con ese nombre"],
];

export function toConflictError(error) {
  if (error?.code !== "23505") return error;

  const constraint = error.constraint ?? "";
  const match = UNIQUE_MESSAGES.find(([key]) => constraint.includes(key));
  const message = match ? match[1] : "Ya existe un registro con esos datos";

  const details = constraint.includes("rut") ? { "empresa.rut": message } : null;

  return new ConflictError(message, details);
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
}