import { env } from "@/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

const domain = env.NEXT_PUBLIC_APP_URL;

/**
 * Sends a two-factor authentication token email to the specified email address.
 * @param email - The recipient's email address.
 * @param token - The two-factor authentication token.
 */
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

/**
 * Sends a password reset email to the specified email address.
 * @param email - The email address to send the password reset email to.
 * @param token - The token used for password reset.
 * @returns A promise that resolves when the email is sent successfully.
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

/**
 * Sends a verification email to the specified email address with a confirmation link.
 * @param email - The email address to send the verification email to.
 * @param token - The verification token to include in the confirmation link.
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
