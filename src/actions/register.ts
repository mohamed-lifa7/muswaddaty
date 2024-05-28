"use server";

import type * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/server/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { generateRandomColor } from "@/lib/utils";

/**
 * Registers a new user with the provided values.
 * 
 * @param values - The user registration data.
 * @returns An object indicating the result of the registration process.
 *          If successful, it returns { success: "Confirmation email sent!" }.
 *          If there are invalid fields, it returns { error: "Invalid fields!" }.
 *          If the email is already in use, it returns { error: "Email already in use!" }.
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // generate a uniuqe color for the user
  const color = generateRandomColor();

  await db.user.create({
    data: {
      name,
      email,
      color,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  );

  return { success: "Confirmation email sent!" };
};
