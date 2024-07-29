// src/libs/mysql.ts
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'nextmysqlcrud',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function getConnection() {
  return await pool.getConnection();
}

// export async function closePool() {
//   await pool.end();
// }
