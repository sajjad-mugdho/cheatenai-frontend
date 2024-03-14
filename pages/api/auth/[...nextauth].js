import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Add additional fields as needed
      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter your email and password");
        }

        console.log(credentials.email, credentials.password);

        const emailExist = await db.User.findUnique({
          where: { email: credentials.email },
        });

        console.log("emailExist", emailExist);

        if (!emailExist) {
          throw new Error("Email not found");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          emailExist.password
        );

        if (!passwordMatch) {
          throw new Error("Password is incorrect");
        }

        return emailExist;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn(user, account, profile) {
      console.log("signIn", user, account, profile);
      return Promise.resolve(true);
    },
    // async redirect(url, baseUrl) {
    //   console.log("redirect", url, baseUrl);
    //   return Promise.resolve(baseUrl);
    // },
    async session(session, user) {
      console.log("session", session, user);
      return Promise.resolve(session);
    },
    async jwt(token, user, account, profile, isNewUser) {
      console.log("jwt", token, user, account, profile, isNewUser);
      return Promise.resolve(token);
    },
  },
};

export default NextAuth(authOptions);
