import supabase from "../db/supabase";

// Get the email of the form, in the database, to save it to a copy of the database.
const GetEmail = {
  async getEmail() {
    try {
      const { data, error } = await supabase
        .from("interest_contact")
        .select('contact_email');

      if (error) {
        throw error; 
      }

      const emails = data.map((item) => item.contact_email);

      // Guardar cada email en la tabla "contacts"
      for (const email of emails) {
        try {
          const { error: insertError } = await supabase
            .from("contacts")
            .insert([{ email }]);

          if (insertError) {
            console.error(`Error inserting email ${email}:`, insertError.message);
          } else {
            console.log(`Email: ${email} respaldado.`);
          }
        } catch (err) {
          if (err instanceof Error) {
            console.error(`Error inserting email ${email}:`, err.message);
          } else {
            console.error(`Error inserting email ${email}:`, JSON.stringify(err));
          }
        }
      }

      return emails;
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