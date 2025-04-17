/// <reference types="node" />
/**
 * Extends the NodeJS `ProcessEnv` interface to define the required environment variables
 * for the MailVault application. Each variable is critical for the application's configuration.
 */
declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The administrator's email address used for notifications or system alerts.
     */
    ADMINEMAIL: string;

    /**
     * The frontend URL of the application.
     */
    FRONT: string;

    /**
     * Public Supabase anonymous key for accessing the Supabase API.
     */
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;

    /**
     * Public Supabase URL for accessing the Supabase API.
     */
    NEXT_PUBLIC_SUPABASE_URL: string;

    /**
     * Name of the PostgreSQL database.
     */
    POSTGRES_DATABASE: string;

    /**
     * Host address of the PostgreSQL database.
     */
    POSTGRES_HOST: string;

    /**
     * Password for the PostgreSQL database user.
     */
    POSTGRES_PASSWORD: string;

    /**
     * Prisma connection URL for the PostgreSQL database.
     */
    POSTGRES_PRISMA_URL: string;

    /**
     * General connection URL for the PostgreSQL database.
     */
    POSTGRES_URL: string;

    /**
     * Non-pooling connection URL for the PostgreSQL database.
     */
    POSTGRES_URL_NON_POOLING: string;

    /**
     * Username for the PostgreSQL database.
     */
    POSTGRES_USER: string;

    /**
     * API key for the Resend email service.
     */
    RESEND_API_KEY: string;

    /**
     * Supabase anonymous key for server-side operations.
     */
    SUPABASE_ANON_KEY: string;

    /**
     * JWT secret used for Supabase authentication.
     */
    SUPABASE_JWT_SECRET: string;

    /**
     * Supabase service role key for privileged operations.
     */
    SUPABASE_SERVICE_ROLE_KEY: string;

    /**
     * Supabase base URL for API access.
     */
    SUPABASE_URL: string;
  }
}
