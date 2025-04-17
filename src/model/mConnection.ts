import { supabase } from "@db";

/**
 * Connection module to interact with the Supabase database.
 */
const Connection = {
  /**
   * Tests the connection to the Supabase database by querying the "interest_contact" table.
   *
   * @throws {Error} Throws an error if the connection to Supabase fails or if the query encounters an issue.
   * @returns {Promise<void>} Resolves if the connection is successful.
   */
  async testConnection(): Promise<void> {
    try {
      const { data, error } = await supabase
        .from("interest_contact")
        .select("*")
        .limit(1);

      if (error) {
        throw error;
      }

      console.log("Successful connection to Supabase.");
    } catch (err) {
      console.log(
        `Error connecting to Supabase: ${JSON.stringify(err, null, 2)}`
      );
      throw err;
    }
  },
};

export default Connection;
