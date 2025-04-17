/**
 * Represents a contact email record retrieved from the database.
 * Extends the RowDataPacket interface from mysql2 to include database row metadata.
 */
interface ContactEmail {
  /**
   * The email address of the contact.
   */
  contact_email: string;
}

export default ContactEmail;
