import db from "../db/db";

// Connection to the Database

const Connetion = {
  async testConnection() {
    try {
      const connetion = await db.getConnection();
      console.log("Successful connection to the database.");
      connetion.release();
    } catch (err) {
      console.log(`Error connecting to the database: ${err}`);
    }
  },
};

export default Connetion;
