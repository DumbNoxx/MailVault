import { supabase } from "@db";
import { ContactEmail } from "@interfaces";

/**
 * Model for handling email-related database operations.
 */
const mEmail = {
  /**
   * Saves an email address in the "interest_contact" table of the database.
   *
   * @param {string} email - The email address to be saved.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   * @throws {Error} Throws an error if the database operation fails.
   *
   * @example
   * ```typescript
   * try {
   *   const result = await mEmail.saveEmail("example@example.com");
   *   console.log("Email saved:", result);
   * } catch (error) {
   *   console.error("Error saving the email:", error);
   * }
   * ```
   */
  async saveEmail(email: string): Promise<void> {
    try {
      const contact: ContactEmail = { contact_email: email }; // Use the interface to type the object
      const { error } = await supabase
        .from("interest_contact")
        .insert([contact]);

      if (error) {
        throw error;
      }
    } catch (err) {
      console.log("Error saving the email:", email, err);
      throw err;
    }
  },
};

export default mEmail;
