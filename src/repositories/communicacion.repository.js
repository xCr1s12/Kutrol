import pool from "@/lib/db";

export async function addTelefonosEmpresa(idEmpresa, telefonos, db = pool) {
  await db.query(
    `INSERT INTO empresa_telefono (id_empresa, telefono)
     SELECT $1, unnest($2::text[])`,
    [idEmpresa, telefonos],
  );
}

export async function addEmailsEmpresa(idEmpresa, emails, db = pool) {
  await db.query(
    `INSERT INTO empresa_email (id_empresa, email)
     SELECT $1, unnest($2::text[])`,
    [idEmpresa, emails],
  );
}