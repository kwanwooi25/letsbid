import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import { prisma } from '../prisma';
import authConfig from './config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      if (!token.sub) return Promise.resolve(session);

      const user = await prisma.user.findUnique({
        where: { id: token.sub },
      });
      if (!user) return Promise.resolve(session);

      session.user = user;
      return Promise.resolve(session);
    },
  },
  ...authConfig,
});
