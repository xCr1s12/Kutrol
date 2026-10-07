import pg from "pg";

<<<<<<< HEAD

const globalPool = globalThis;

const pool =
  globalPool.pgPool ??
  new pg.Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") {
  globalPool.pgPool = pool;
};
=======
pg.types.setTypeParser(1700, (v) => parseFloat(v));
pg.types.setTypeParser(20, (v) => parseInt(v, 10));
>>>>>>> FrontEnd

// En desarrollo, el hot reload re-ejecuta este módulo. Guardar el pool en
// globalThis evita abrir uno nuevo en cada recarga.
const globalForPg = globalThis;

const pool =
  globalForPg.pgPool ??
  new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pgPool = pool;
}

export const query = (text, params) => pool.query(text, params);

// Para operaciones que tocan varias tablas )
export async function withTransaction(fn) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export default pool;