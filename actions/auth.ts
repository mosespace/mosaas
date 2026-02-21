"use server";

import { APIError } from "better-auth";
import { Resend } from "resend";

import ResetPasswordEmail from "@/components/emails/reset-password";
import WelcomeEmail from "@/components/emails/welcome";
import { auth } from "@/lib/auth/auth";
import { siteConfig } from "@/lib/constants";
import type {
  ForgotPasswordFormValues,
  LoginFormValues,
  RegisterFormValues,
} from "@/types/auth-user.schema";
import VerifyEmailOtp from "@/components/emails/verify-email";

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.BETTER_AUTH_URL || "";

export async function registerUser(data: RegisterFormValues, plan: string) {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      },
    });

    const { user, token } = result;

    //  send welcome email to user
    await resend.emails.send({
      from: `${siteConfig.name} <info@${siteConfig.resend_domain}.com>`,
      to: user.email,
      subject: `Welcome to ${siteConfig.name}`,
      react: WelcomeEmail({
        email: user.email,
        name: user.firstName,
      }),
    });

    return {
      success: true,
      data: data,
      error: null,
    };
  } catch (error) {
    console.error("❌ Signup error:", error);
    if (error instanceof APIError) {
      if (error.status === "UNPROCESSABLE_ENTITY") {
        const errorMsg =
          error.message === "Failed to create user"
            ? "Phone Number is Already Taken"
            : "Email is Already Taken";
        return {
          success: false,
          data: null,
          error: errorMsg,
          status: error.status,
        };
      }
      return {
        success: false,
        data: null,
        error: error.message || "Authentication error occurred",
        status: error.status,
      };
    }
    return {
      success: false,
      data: null,
      error: "Something went wrong",
    };
  }
}

export async function loginUser(data: LoginFormValues) {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });
    // console.log('[LOG] ✅ Login successful:', result);
    return {
      success: true,
      data: data,
      error: null,
    };
  } catch (error) {
    // Log the full error object to see what we're dealing with
    console.error("[ERROR] ❌ Login error:", error);
    console.error("[ERROR] Error type:", error?.constructor?.name);
    console.error("[ERROR] Error keys:", Object.keys(error || {}));
    if (error instanceof APIError) {
      // console.log('[ERROR] 📛 APIError details:', {
      //   message: error.message,
      //   status: error.status,
      //   body: (error as any).body,
      // });
      if (error.status === "UNAUTHORIZED") {
        return {
          success: false,
          data: null,
          error: error.message,
          status: error.status,
        };
      }
      // Handle other API errors
      return {
        success: false,
        data: null,
        error: error.message || "Authentication failed",
        status: error.status,
      };
    }
    // Log non-APIError errors with more detail
    console.info("[INFO] 🔍 Non-APIError caught:", {
      message: (error as any)?.message,
      stack: (error as any)?.stack,
      error: error,
    });
    return {
      success: false,
      data: null,
      error: (error as any)?.message || "Something went wrong",
    };
  }
}

export async function sendResetPasswordEmail(data: {
  to: string;
  subject: string;
  url: string;
}) {
  try {
    const { data: resData, error } = await resend.emails.send({
      from: `${siteConfig.name} <info@${siteConfig.resend_domain}.com>`,
      to: data.to,
      subject: data.subject,
      react: ResetPasswordEmail({
        userEmail: data.to,
        resetLink: data.url,
        expirationTime: "10 Mins",
      }),
    });

    if (error) {
      // console.log('ERROR', error);
      return {
        success: false,
        error: error,
        data: null,
      };
    }

    // console.log('[LOG] SUCCESS DATA', data);
    return {
      success: false,
      error: null,
      data: resData,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      data: null,
    };
  }
}

export async function sendForgotPasswordToken(
  formData: ForgotPasswordFormValues,
) {
  try {
    const data = await auth.api.requestPasswordReset({
      body: {
        email: formData.email,
        redirectTo: `${baseUrl}/reset-password`,
      },
    });
    // Others
    return {
      success: true,
      error: null,
    };
  } catch (error) {
    if (error instanceof APIError) {
      // console.log(error.message, error.status);
      if (error.status === "UNAUTHORIZED") {
        return {
          success: false,
          data: null,
          error: error.message,
          status: error.status,
        };
      }
    }
    return {
      success: false,
      data: null,
      error: "Something went wrong",
    };
  }
}

export async function resetPassword(formData: {
  newPassword: string;
  token: string;
}) {
  try {
    const data = await auth.api.resetPassword({
      body: {
        newPassword: formData.newPassword,
        token: formData.token,
      },
    });

    return {
      success: true,
      data: data,
      error: null,
    };
  } catch (error) {
    if (error instanceof APIError) {
      // console.log(error.message, error.status);
      if (error.status === "UNAUTHORIZED") {
        return {
          success: false,
          data: null,
          error: error.message,
          status: error.status,
        };
      }
    }
    return {
      success: false,
      data: null,
      error: "Something went wrong",
    };
  }
}

export async function sendOtpEmail(data: {
  email: string;
  subject: string;
  otp: string;
}) {
  try {
    const { data: resData, error } = await resend.emails.send({
      from: `${siteConfig.name} <info@${siteConfig.resend_domain}>`,
      to: data.email,
      subject: data.subject,
      react: VerifyEmailOtp({
        otp: data.otp,
        email: data.email,
      }),
    });

    if (error) {
      // console.log('ERROR', error);
      return {
        success: false,
        error: error,
        data: null,
      };
    }

    return {
      success: false,
      error: null,
      data: resData,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      data: null,
    };
  }
}
