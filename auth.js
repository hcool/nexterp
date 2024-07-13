import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Passkey from "next-auth/providers/passkey";

const prisma = new PrismaClient();

const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Passkey({
      formFields: {
        email: {
          label: "Username",
          required: true,
          autocomplete: "username webauthn",
        },
      },
    }),
  ],
  basePath: "/auth",
  callbacks: {
    async jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
  experimental: {
    enableWebAuthn: true,
  },
  debug: process.env.NODE_ENV !== "production",
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
