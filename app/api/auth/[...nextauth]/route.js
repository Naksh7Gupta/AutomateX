import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import User from "@/app/models/User";
import { connectDB } from "@/app/connectDB";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
  async signIn({ user }) {
    await connectDB();

    const existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
      await User.create({
        name: user.name,
        email: user.email,
        image: user.image,
      });
    }

    return true;
  },

  async session({ session }) {
    await connectDB();
    const dbUser = await User.findOne({ email: session.user.email });

    session.user.id = dbUser._id;
    session.user.name = dbUser.name || "";
    session.user.bio = dbUser.bio || "";

    return session;
  },
},

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
