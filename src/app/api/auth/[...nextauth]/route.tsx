import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
// import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID!,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    // }),
    // AppleProvider({
    //   clientId: process.env.APPLE_CLIENT_ID!,
    //   clientSecret: process.env.APPLE_CLIENT_SECRET!,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace this with your actual authentication logic (we'll skip for now)
        return { id: "1", name: credentials?.email }; // Dummy response
      },  
    }),
  ],
  pages: {
    signIn: "/auth/login", // Redirect to your custom login page
    signOut: "/auth/logout",
    error: "/auth/error",
    // Add more pages as necessary
  },
  session: {
    strategy: "jwt", // Use JWT for sessions
  },
  callbacks: {

    async signIn({ user }) {
      try {
        const res = await fetch("http://localhost:8080/users/verifyUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });
        const data = await res.json();

        if (data.success) {
          // User exists, continue login
          return true;
        } else {
          // User does not exist, create a new entry
          const newUser = await fetch("http://localhost:8080/users/saveUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              password: null, // Google users don’t have passwords
            }),
          });

          const newUserData = await newUser.json();
          if (newUserData.success) {
            console.log("New user created:", newUserData);
            return true;
          } // Redirect to Profile Page
        }
      } catch (error) {
        console.error("Error in signIn:", error);
      }
      return false;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
