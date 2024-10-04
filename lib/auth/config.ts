import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Kakao from 'next-auth/providers/kakao';
import { prisma } from '../prisma';

const authConfig = {
  providers: [
    Kakao,
    Credentials({
      authorize: async (credentials) => {
        return JSON.parse(credentials.user as string);
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async session({ session, token }) {
      if (!token.sub) return Promise.resolve(session);

      const user = await prisma.user.findUnique({ where: { id: token.sub } });

      if (!user) return Promise.resolve(session);

      session.user = user;
      return Promise.resolve(session);
    },
    async jwt({ token }) {
      return Promise.resolve(token);
    },
  },
  pages: {
    signIn: '/auth/sign-in',
  },
} satisfies NextAuthConfig;

export default authConfig;
