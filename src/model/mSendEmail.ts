import db from "../db/db";
import ContactEmail from "../interfaces/Contact.interface";


const SendEmail = {
  async sendEmail() {
    try {
      const querySendEmail = "SELECT email FROM contacts;";
      const [emails] = await db.execute<ContactEmail[]>(querySendEmail);
      const publice = emails.map((email) => email.email);
      const list = publice[0];

      console.log(list);
    } catch (err) {
      
    }
  }
}

export default SendEmail;