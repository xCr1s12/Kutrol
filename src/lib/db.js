import pg from "pg";


const globalPool = globalThis;

const pool =
  globalPool.pgPool ??
  new pg.Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") {
  globalPool.pgPool = pool;
};

export default pool;
