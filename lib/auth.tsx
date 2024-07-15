import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: process.env.NEXT_PUBLIC_BASE_URL + "/signup",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch =
          existingUser.password &&
          (await compare(credentials.password, existingUser.password));

        if (!passwordMatch) {
          return null;
        }

        return {
          id: `${existingUser.uid}`,
          uid: `${existingUser.uid}`,
          name: existingUser.name,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("Generated Token : ", token, "By User : ", user);
      if (user) {
        return {
          ...token,
          uid: user.uid,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          uid: token.uid,
        },
      };
    },
  },
};
