import { sendResetPasswordEmail } from '@/actions/auth';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { headers } from 'next/headers';
import db from '../database';

export const auth = betterAuth({
  basePath: '/api/v1/auth',
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      await sendResetPasswordEmail({
        to: user.email,
        subject: 'Reset your password',
        url: url,
      });
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
          name: profile.name,
          email: profile.email,
          emailVerified: profile.email_verified ?? true,
          phone: null,
          role: 'USER',
          jobTitle: null,
          bio: null,
          institutionId: null,
        };
      },
    },
  },
  emailVerification: {
    sendOnSignUp: true,
  },
  emailMagicLink: {
    enabled: true,
  },

  user: {
    additionalFields: {
      firstName: {
        type: 'string',
        required: true,
      },
      lastName: {
        type: 'string',
        required: true,
      },
      phone: {
        type: 'string',
        required: false,
      },
      jobTitle: {
        type: 'string',
        required: false,
      },
      bio: {
        type: 'string',
        required: false,
      },
    },
  },

  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;

export async function getAuthUser(): Promise<User | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user as User;
  return user;
}
