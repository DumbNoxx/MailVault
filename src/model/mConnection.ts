import db from "../db/db";


// Connection to the Database

const Connetion = {
  async testConnection() {
    try {
      const connetion = await db.getConnection();
      console.log("Conexion establecida a la base de datos");
      connetion.release();
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
}

export default Connetion;