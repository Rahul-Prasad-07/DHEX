import { authConfig } from "@/app/lib/auth";
import NextAuth from "next-auth";

// Signup and SignIn with google : here we can add more providers like facebook, github, etc
// https://next-auth.js.org/providers/google


const handler = NextAuth(authConfig)

export { handler as GET, handler as POST };

// console.log({
//     GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? "",
//     GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? ""
// })

