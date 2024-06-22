import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Facebook],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      console.log("jwt-account", account?.type);
      if (account?.access_token) {
        console.log("jwt-account", account);
        token.access_token = account.access_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
        session.accessToken = token.access_token as string;
        console.log("session", session);
        return session;
    },
  },
});
