import supabase from "../db/supabase";

/**
 * Utility object to handle email retrieval and backup operations.
 */
const GetEmail = {
  /**
   * Retrieves emails from the "interest_contact" table in the database
   * and saves them into the "contacts" table.
   *
   * @returns {Promise<string[]>} A promise that resolves to an array of email addresses.
   * @throws {Error} Throws an error if there is an issue with the database connection or operations.
   * @example
   * const emails = await GetEmail.getEmail();
   * console.log(emails);
   */
  async getEmail(): Promise<string[]> {
    try {
      // Fetch email addresses from the "interest_contact" table
      const { data, error } = await supabase
        .from("interest_contact")
        .select("contact_email");

      if (error) {
        throw error; // Throw an error if the query fails
      }

      // Extract email addresses from the query result
      const emails = data.map((item) => item.contact_email);

      // Save each email into the "contacts" table
      for (const email of emails) {
        try {
          const { error: insertError } = await supabase
            .from("contacts")
            .insert([{ email }]);

          if (insertError) {
            console.error(
              `Error inserting email ${email}:`,
              insertError.message
            );
          } else {
            console.log(`Email: ${email} backed up successfully.`);
          }
        } catch (err) {
          if (err instanceof Error) {
            console.error(`Error inserting email ${email}:`, err.message);
          } else {
            console.error(
              `Error inserting email ${email}:`,
              JSON.stringify(err)
            );
          }
        }
      }

      return emails; // Return the list of email addresses
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error connecting to Supabase:", err.message);
        throw new Error(`Error: ${err.message}`);
      } else {
        console.error("Error connecting to Supabase:", JSON.stringify(err));
        throw new Error(`Error: ${JSON.stringify(err)}`);
      }
    }
  },
};

export default GetEmail;
