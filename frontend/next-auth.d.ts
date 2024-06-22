import "next-auth/jwt"
import type { DefaultSession } from "next-auth";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    userRole?: string
    userId?: string
  }
}


declare module "next-auth" {
  interface Session {
		user?: DefaultSession["user"] & {
			id?: string;
		};
    accessToken?: string
    accessTokenExpires?: number
    idToken?: string
	}
}