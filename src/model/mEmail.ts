import db from "../db/db";


// Guarda el email en la base de datos
const mEmail = {
  async saveEmail(email: string) {
    try {
      const query = "INSERT INTO interest_contact (contact_email) VALUES (?)";
      const [result] = await db.execute(query, [email]);
      return result;
    } catch (err) {
      console.log("Erro al guardar el email: ", email);
      throw err;
    }
  },
};

export default mEmail;
