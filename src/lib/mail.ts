import { env } from "@/env";
import { Resend } from "resend";
import { VerifyMagicLinkEmail } from "@/components/auth/confirm-email";
import { ResetPasswordMagicLinkEmail } from "@/components/auth/reset-email";

const resend = new Resend(env.RESEND_API_KEY);
/**
 * Sends a two-factor authentication token email to the specified email address.
 * @param email - The recipient's email address.
 * @param token - The two-factor authentication token.
 */
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Muswaddaty <noreply@muswaddaty.live>",
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
  const resetLink = `https://muswaddaty.live/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Muswaddaty <noreply@muswaddaty.live>",
    to: email,
    subject: "Reset your password",
    react: ResetPasswordMagicLinkEmail({ resetLink }),
  });
};

/**
 * Sends a verification email to the specified email address with a confirmation link.
 * @param email - The email address to send the verification email to.
 * @param token - The verification token to include in the confirmation link.
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `https://muswaddaty.live/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Muswaddaty <noreply@muswaddaty.live>",
    to: email,
    subject: "Confirm your email",
    react: VerifyMagicLinkEmail({ confirmLink }),
  });
};
