import pkg from 'pg';
const { Pool } = pkg;
const connectionString = process.env.PSQL_CONNECTION;
const pool = new Pool({
  connectionString,
});

export function query(text, params) { return pool.query(text, params); }