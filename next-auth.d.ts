import NextAuth from 'next-auth';

/**
 * Extend NextAuth types to include user ID in session
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

