import { z } from "zod";
import { mensajePassword } from "@/lib/passwordPolicy";

// catalogo cerrado de NIVEL_JERARQUICO sembrado en la base
export const NIVELES = [
  { id: 1, nombre: "DUEÑO" },
  { id: 2, nombre: "ADMINISTRADOR" },
  { id: 3, nombre: "EMPLEADO" },
];

const idsNivel = NIVELES.map((nivel) => nivel.id);

const reglasPassword = (valor, ctx) => {
  const mensaje = mensajePassword(valor);
  if (mensaje) ctx.addIssue({ code: z.ZodIssueCode.custom, message: mensaje });
};

const campos = {
  primer_nombre: z
    .string({ error: "El nombre es obligatorio" })
    .trim()
    .min(2, "El nombre es obligatorio")
    .max(50, "El nombre no puede superar 50 caracteres"),
  apellidos: z
    .string({ error: "Los apellidos son obligatorios" })
    .trim()
    .min(2, "Los apellidos son obligatorios")
    .max(100, "Los apellidos no pueden superar 100 caracteres"),
  email: z
    .string({ error: "El correo es obligatorio" })
    .trim()
    .toLowerCase()
    .max(100, "El correo no puede superar 100 caracteres")
    .email("Revisa el correo"),
  cargo: z
    .string({ error: "El cargo es obligatorio" })
    .trim()
    .min(2, "El cargo es obligatorio")
    .max(100, "El cargo no puede superar 100 caracteres"),
  id_nivel_jerarquico: z.coerce
    .number({ error: "Selecciona un rol" })
    .int("Selecciona un rol válido")
    .refine((valor) => idsNivel.includes(valor), "Selecciona un rol válido"),
};

export const UsuarioSchema = z.object({
  ...campos,
  password: z
    .string({ error: "La contraseña es obligatoria" })
    .superRefine(reglasPassword),
});

// al editar todo es opcional y la contraseña vacia significa "no la cambies"
export const UsuarioUpdateSchema = z.object({
  primer_nombre: campos.primer_nombre.optional(),
  apellidos: campos.apellidos.optional(),
  email: campos.email.optional(),
  cargo: campos.cargo.optional(),
  id_nivel_jerarquico: campos.id_nivel_jerarquico.optional(),
  password: z
    .string()
    .superRefine((valor, ctx) => {
      if (valor === "") return;
      reglasPassword(valor, ctx);
    })
    .optional(),
});
