import supabase from "../db/supabase";
// Connection to the Database

const Connection = {
  async testConnection() {
    try {
      const { data, error } = await supabase
        .from('interest_contact') 
        .select('*')
        .limit(1);

      if (error) {
        throw error;
      }

      console.log("Successful connection to Supabase.");
    } catch (err) {
      console.log(`Error connecting to Supabase: ${err}`);
    }
  },
};

export default Connection;