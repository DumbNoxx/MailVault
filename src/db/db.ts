import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const db_name = process.env.DB_NAME;

/**
 * Use your data such as the user of your database
 * and password, also the host
 */
const pool: mysql.Pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Initialize the database

const initializeDatabase = async () => {
  try {
    if (!db_name){
      throw new Error('The db_name is not defined'); 
    }
    const sqFilePath = path.join(__dirname, "db.sql");
    let sqFileContent = fs.readFileSync(sqFilePath, "utf-8");
    sqFileContent = sqFileContent.replace(/\$\{DB_NAME\}/g, db_name);
    // console.log("Content of file SQL:", sqFileContent); // debugging
    const connection = await pool.getConnection();
    const queries = sqFileContent
      .split(";")
      .map((query) => query.trim())
      .filter((query) => query !== "");
    for (const query of queries) {
      // console.log("Performing conultation:", query); //Debugging
      await connection.query(query);
    }
    // console.log("Database successfully created"); //Debugging
    connection.release();
  } catch (err) {
    console.log(`Error creating database: ${err}`);
  }
};

initializeDatabase();

export default pool;
