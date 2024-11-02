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
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, account, profile, email, credentials);

      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token, user }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
  events: {
    async signIn(message) { /* on successful sign in */ },
    async signOut(message) { /* on signout */ },
    async createUser(message) { /* user created */ },
    async updateUser(message) { /* user updated - e.g. their email was verified */ },
    async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
    async session(message) { /* session is active */ },
  }
}

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST }