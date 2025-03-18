import { RowDataPacket } from "mysql2";


interface ContactEmail extends RowDataPacket {
  contact_email: string;
}

export default ContactEmail;