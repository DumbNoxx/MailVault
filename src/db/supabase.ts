/**
 * Initializes and exports a Supabase client instance.
 *
 * This module uses the `@supabase/supabase-js` library to create a client
 * for interacting with a Supabase backend. The Supabase URL and Anon Key
 * are retrieved from environment variables, and an error is thrown if
 * either of these variables is not defined.
 *
 * @remarks Ensure that the environment variables are properly configured.
 */

import { createClient } from "@supabase/supabase-js";
import { ENV } from "@env";

/**
 * The Supabase project URL, retrieved from environment variables.
 * @type {string}
 */
const supabaseUrl: string = ENV.PRIVATE.SUPABASE;

/**
 * The Supabase anonymous key, retrieved from environment variables.
 * @type {string}
 */
const supabaseKey: string = ENV.PRIVATE.SUPABASE_ANON_KEY;

// Validate that the required environment variables are defined.
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL or Anon Key is not defined in environment variables."
  );
}

/**
 * The Supabase client instance used to interact with the database.
 * @type {import("@supabase/supabase-js").SupabaseClient}
 */
const supabase: import("@supabase/supabase-js").SupabaseClient = createClient(
  supabaseUrl,
  supabaseKey
);

export default supabase;
