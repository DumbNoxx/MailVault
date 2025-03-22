import supabase from "../db/supabase";
import ContactEmail from "../interfaces/contact.interface";

// Save the email in the database
const mEmail = {
  async saveEmail(email: string) {
    try {
      const { data, error } = await supabase
        .from("interest_contact")
        .insert([{ contact_email: email }]);

      if (error) {
        throw error;
      }

      return data;
    } catch (err) {
      console.log("Error al guardar el email:", email, err);
      throw err;
    }
  },
};

export default mEmail;
