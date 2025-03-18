import db from "../db/db";
import ContactEmail from "../interface/InferfaceContact";

const GetEmail = {
  async getEmail () {
    try {
      const query2 = "SELECT contact_email FROM interest_contact";
      const [rows] = await db.execute<ContactEmail[]>(query2);
      const emails = rows.map(rows => rows.contact_email);
      let list = [];
      for (let i:number = 0; i < emails.length; i++) {
        list[i] = emails[i];
        console.log(`Email numero ${i} es: ${list[i]}`);
      }
    } catch (err) {
      console.log(`Error al obtener los emails: ${err}`);
    }
  }
}

export default GetEmail;