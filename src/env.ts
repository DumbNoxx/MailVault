import "dotenv/config";

/**
 * Environment configuration object.
 *
 * This object contains both public and private environment variables
 * loaded from the `.env` file using `dotenv`. It ensures type safety
 * by explicitly casting the variables to strings.
 */
export const ENV = {
  /**
   * Public environment variables.
   * These variables can be safely exposed to the frontend.
   */
  PUBLIC: {
    /** The frontend URL. */
    FRONTEND: process.env.FRONT as string,
    /** The port number for the application. */
    PORT: process.env.PORT as string,
  },
  /**
   * Private environment variables.
   * These variables should not be exposed to the frontend.
   */
  PRIVATE: {
    /** API key for the Resend service. */
    RESEND: process.env.RESEND_API_KEY as string,
    /** Admin email address. */
    ADMIN: process.env.ADMINEMAIL as string,
    /** Supabase backend URL. */
    SUPABASE: process.env.SUPABASE_URL as string,
    /** Supabase public anonymous key. */
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  },
} as const;
