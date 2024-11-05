/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth, { Profile } from "next-auth";

declare module "next-auth" {
  interface Profile {
    given_name: string;
    family_name: string;
    email_verified: boolean;
  }
}