import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import { prisma } from '../prisma';
import authConfig from './config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      if (!user) return Promise.resolve(session);

      session.user = user;
      return Promise.resolve(session);
    },
  },
  ...authConfig,
});
