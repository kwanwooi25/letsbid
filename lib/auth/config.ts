import { NextAuthConfig } from 'next-auth';
import Kakao from 'next-auth/providers/kakao';

const authConfig = {
  providers: [Kakao],
} satisfies NextAuthConfig;

export default authConfig;
