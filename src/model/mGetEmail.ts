import db from "../db/db";
import ContactEmail from "../interfaces/contact.interface";

// Get the email od the form, in the database, to save it to a copy of the database.
const GetEmail = {
  async getEmail() {
    try {
      const query2 = "SELECT contact_email FROM interest_contact";
      const [rows] = await db.execute<ContactEmail[]>(query2);
      const emails = rows.map((rows) => rows.contact_email);
      let list = [];
      for (let i: number = 0; i < emails.length; i++) {
        list[i] = emails[i];
        const checkQuery = `SELECT email FROM contacts WHERE email = '${list[i]}'`;
        const [existingEmail] = await db.execute<ContactEmail[]>(checkQuery);

        if (existingEmail.length === 0) {
          const saveQuery = `INSERT INTO contacts (email) VALUES ('${list[i]}')`;
          const emails = await db.execute<ContactEmail[]>(saveQuery);
          return emails;
        } else {
          console.log("The mail already exists.");
        }
      }
    } catch (err) {
      console.log(`Error when getting the emails: ${err}`);
    }
  },
};

export default GetEmail;
