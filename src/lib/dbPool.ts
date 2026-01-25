
import { Pool } from "pg";

// Single shared pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
});

export default pool;
