import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions';

// NextAuth route handler for authentication
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

