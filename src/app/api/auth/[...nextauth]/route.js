// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

const handler = NextAuth(authOptions);

// Export GET and POST methods for NextAuth
export { handler as GET, handler as POST };
