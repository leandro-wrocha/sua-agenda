import { storeUserUseCase } from '@/database';
import { googleClientId, googleClientSecret } from '@/env';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: 'openid email profile https://www.googleapis.com/auth/calendar'
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user, account, profile);
      if (account && profile && user) {
        if (!profile.email_verified) {
          return false;
        }

        const createUserOrReturn = await storeUserUseCase.execute({
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: user.email ?? '',
          avatar: user.image ?? '',
          refreshToken: account.refresh_token ?? '',
          accessToken: account.refresh_token ?? '',
          emailVerified: new Date()
        });

        console.log(createUserOrReturn);

        if (!createUserOrReturn) return false;

        return true;
      }

      return false;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('token', token);
      return token
    },
    async session({ session }) {
      console.log('session', session);
      return session
    }
  },
}

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST }