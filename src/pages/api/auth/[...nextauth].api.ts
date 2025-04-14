import NextAuth, { type NextAuthOptions } from 'next-auth'
import Google from 'next-auth/providers/google'
import { env } from '../../../env'
import { PrismaAdapter } from '../../../lib/auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (
        !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
      ) {
        return '/register/connect-calendar/?error=permissions'
      }

      return true
    },
  },
}

export default NextAuth(authOptions)
