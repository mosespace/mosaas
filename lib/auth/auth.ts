import { sendOtpEmail, sendResetPasswordEmail } from "@/actions/auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { headers } from "next/headers";
import db from "../database";

// const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
//   apiVersion: "2026-01-28.clover",
// });

export const auth = betterAuth({
  basePath: "/api/v1/auth",
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      await sendResetPasswordEmail({
        to: user.email,
        subject: "Reset your password",
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
      scope: [
        // LinkedIn scopes for events and posting
        "r_events",
        "w_member_social",
      ],
      mapProfileToUser: (profile: any) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
          name: profile.name,
          email: profile.email,
          emailVerified: profile.email_verified ?? true,
          phone: null,
          role: "USER",
          jobTitle: null,
          bio: null,
          institutionId: null,
        };
      },
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  emailMagicLink: {
    enabled: true,
  },
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
      phone: {
        type: "string",
        required: false,
      },
      jobTitle: {
        type: "string",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [
    nextCookies(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          try {
            const result = await sendOtpEmail({
              email: email,
              subject: "Your verification code",
              otp: otp,
            });
            // console.log('Resend result:', result);
          } catch (error) {
            console.error("Resend error:", error);
            throw error;
          }
        }
      },
    }),

    // stripe({
    //   stripeClient,
    //   stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    //   createCustomerOnSignUp: true,
    //   schema: {
    //     subscription: {
    //       modelName: 'StripeSubscription',
    //     },
    //   },
    //   subscription: {
    //     enabled: true,
    //     plans: async () => {
    //       const plans = await db.plan.findMany({ where: { active: true } });
    //       const configuredPlans = plans
    //         .filter(
    //           (p) =>
    //             (p as { stripePriceId?: string | null }).stripePriceId != null,
    //         )
    //         .map((p) => ({
    //           name: p.name,
    //           priceId: (p as unknown as { stripePriceId: string })
    //             .stripePriceId,
    //           limits: {},
    //         }));
    //       // console.log('BetterAuth Stripe Plans configured (backend):', configuredPlans);
    //       return configuredPlans;
    //     },
    //     onSubscriptionComplete: async ({
    //       subscription, // This `subscription` object is from better-auth's internal representation
    //       stripeSubscription, // This `stripeSubscription` is the raw Stripe API Subscription object
    //       plan,
    //     }) => {
    //       // Look up the plan by name (plan is the plan name string from Better Auth)
    //       const planName =
    //         typeof plan === 'string' ? plan : (plan as any)?.name;
    //       const dbPlan = await db.plan.findFirst({
    //         where: { name: planName },
    //       });

    //       if (!dbPlan) {
    //         console.error(`Plan not found: ${planName}`);
    //         return;
    //       }

    //       const periodStart =
    //         subscription.periodStart ??
    //         (stripeSubscription
    //           ? new Date(
    //               (stripeSubscription as any).current_period_start * 1000,
    //             )
    //           : new Date());
    //       const periodEnd =
    //         subscription.periodEnd ??
    //         (stripeSubscription
    //           ? new Date((stripeSubscription as any).current_period_end * 1000)
    //           : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

    //       // Check if subscription already exists (upsert pattern)
    //       const existingSubscription = await db.stripeSubscription.findFirst({
    //         where: {
    //           stripeSubscriptionId:
    //             subscription.stripeSubscriptionId || undefined,
    //         },
    //       });

    //       if (existingSubscription) {
    //         // Update existing subscription
    //         await db.stripeSubscription.update({
    //           where: { id: existingSubscription.id },
    //           data: {
    //             planId: dbPlan.id,
    //             status: subscription.status,
    //             periodStart,
    //             periodEnd,
    //             stripeCustomerId:
    //               subscription.stripeCustomerId ||
    //               existingSubscription.stripeCustomerId,
    //             stripeSubscriptionId:
    //               subscription.stripeSubscriptionId ||
    //               existingSubscription.stripeSubscriptionId,
    //             cancelAtPeriodEnd: subscription.cancelAtPeriodEnd ?? false,
    //             cancelAt: subscription.cancelAt,
    //             canceledAt: subscription.canceledAt,
    //             endedAt: subscription.endedAt,
    //           },
    //         });
    //       } else {
    //         // Create new subscription
    //         // Note: subscription.referenceId is the user ID from Better Auth
    //         await db.stripeSubscription.create({
    //           data: {
    //             referenceId: subscription.referenceId,
    //             planId: dbPlan.id,
    //             plan: dbPlan.name,
    //             status: subscription.status,
    //             periodStart,
    //             periodEnd,
    //             stripeCustomerId: subscription.stripeCustomerId,
    //             stripeSubscriptionId: subscription.stripeSubscriptionId,
    //             cancelAtPeriodEnd: subscription.cancelAtPeriodEnd ?? false,
    //             cancelAt: subscription.cancelAt,
    //             canceledAt: subscription.canceledAt,
    //             endedAt: subscription.endedAt,
    //           },
    //         });
    //       }

    //       // Add initial credits if plan has creditsPerMonth
    //       if (dbPlan.creditsPerMonth) {
    //         const user = await db.user.findUnique({
    //           where: { id: subscription.referenceId },
    //         });
    //         if (user) {
    //           await addCredits(
    //             subscription.referenceId,
    //             dbPlan.creditsPerMonth,
    //             'subscription_activation',
    //             `Initial credits from ${dbPlan.name} plan activation`,
    //           );
    //         }
    //       }
    //     },
    //     onSubscriptionUpdate: async ({ subscription }) => {
    //       if (!subscription.stripeSubscriptionId) return;
    //       await db.stripeSubscription.updateMany({
    //         where: { stripeSubscriptionId: subscription.stripeSubscriptionId },
    //         data: {
    //           status: subscription.status,
    //           ...(subscription.periodStart != null && {
    //             periodStart: subscription.periodStart,
    //           }),
    //           ...(subscription.periodEnd != null && {
    //             periodEnd: subscription.periodEnd,
    //           }),
    //           cancelAtPeriodEnd: subscription.cancelAtPeriodEnd ?? false,
    //           ...(subscription.cancelAt != null && {
    //             cancelAt: subscription.cancelAt,
    //           }),
    //           ...(subscription.canceledAt != null && {
    //             canceledAt: subscription.canceledAt,
    //           }),
    //           ...(subscription.endedAt != null && {
    //             endedAt: subscription.endedAt,
    //           }),
    //         },
    //       });
    //     },
    //     onSubscriptionDeleted: async ({ subscription }) => {
    //       if (!subscription.stripeSubscriptionId) return;
    //       await db.stripeSubscription.updateMany({
    //         where: { stripeSubscriptionId: subscription.stripeSubscriptionId },
    //         data: {
    //           status: 'canceled',
    //           endedAt: subscription.endedAt ?? new Date(),
    //         } as any,
    //       });
    //     },
    //   },
    //   onEvent: async (event) => {
    //     if (event.type !== 'invoice.payment_succeeded') return;
    //     const invoice = event.data.object as Stripe.Invoice;
    //     const subscriptionId = (invoice as any).subscription as
    //       | string
    //       | undefined;
    //     if (!subscriptionId || invoice.billing_reason !== 'subscription_cycle')
    //       return;
    //     const sub = await db.stripeSubscription.findFirst({
    //       where: { stripeSubscriptionId: subscriptionId },
    //       // include: { plan: true, user: true },
    //     });
    //     // get user
    //     const user = await db.user.findUnique({
    //       where: { id: sub?.referenceId },
    //     });

    //     const dbPlan = await db.plan.findFirst({
    //       where: {
    //         name: {
    //           equals: sub?.plan,
    //           mode: 'insensitive',
    //         },
    //       },
    //     });
    //     if (dbPlan?.creditsPerMonth && user) {
    //       await addCredits(
    //         user.id,
    //         dbPlan.creditsPerMonth,
    //         'subscription_renewal',
    //         `Monthly credits from ${dbPlan.name} plan renewal`,
    //       );
    //     }
    //   },
    // }),
  ],
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
