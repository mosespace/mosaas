import { stripeClient } from "@better-auth/stripe/client";
import {
  adminClient,
  emailOTPClient,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const base_url = process.env.NEXT_PUBLIC_APP_URL;
export const authClient = createAuthClient({
  baseURL:
    `${base_url}/api/v1/auth` ||
    "http://localhost:3000" ||
    "http://localhost:3001",
  plugins: [
    emailOTPClient(),
    adminClient(),
    stripeClient({
      subscription: true,
    }),
    organizationClient(),
  ],
});

// Export individual methods
export const { signIn, signUp, useSession, signOut, emailOtp } = authClient;

// Export organization methods from authClient
export const organization = authClient.organization;
