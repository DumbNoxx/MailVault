import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

/**
 * Use your data such as the user of your database 
 * and password, also the host
 */
const pool: mysql.Pool = mysql.createPool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "emails",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Initialize the database

const initializeDatabase = async () => {
  try {
    const sqFilePath = path.join(__dirname, "db.sql");
    const sqFileContent = fs.readFileSync(sqFilePath, "utf-8");
    // console.log("Contenido del archivo SQL:", sqFileContent); // Depuración
    const connection = await pool.getConnection();
    const queries = sqFileContent.split(";")
    .map(query => query.trim())
    .filter(query => query !== "");
    for (const query of queries) {
      // console.log("Ejecutando consulta:", query); 
      await connection.query(query);
    }
    // console.log("Base de datos creadas correctamente");
    connection.release();
  } catch (err) {
    console.log(`Error al crear la base de datos: ${err}`);
  }
};

initializeDatabase();

export default pool;
