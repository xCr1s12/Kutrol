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

export class ConflictError extends AppError {
  constructor(message = "El recurso ya existe") {
    super(message, 409, "CONFLICT");
  }
}

// 
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
}