import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      roles: string[];
      organization?: string;
    } & DefaultSession["user"];
  }

  interface User {
    roles?: string[];
    organization?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    roles?: string[];
    organization?: string;
  }
}
