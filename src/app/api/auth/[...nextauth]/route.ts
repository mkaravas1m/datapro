import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // logic to verify if user exists
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user) {
          // return user object with error message
          throw new Error("User not found.")
        }
        
        // This is a placeholder for password validation. 
        // In a real application, you would use a library like bcrypt to hash and compare passwords.
        const isPasswordValid = user.password === credentials.password

        if (!isPasswordValid) {
            throw new Error("Invalid password.")
        }

        // return user object if credentials are valid
        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
     async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
})
