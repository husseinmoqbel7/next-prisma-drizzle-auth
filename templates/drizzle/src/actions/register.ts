"use server";

import db from "@/db/drizzle";
import { getUserByEmail } from "@/db/queries/user";
import { users } from "@/db/schema";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { RegisterSchema } from "../lib/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const existingUser = await getUserByEmail(values.email);

  if (existingUser) {
    return { error: "Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(values.password, 10);

  await db.insert(users).values({
    email: values.email,
    password: hashedPassword,
    name: values.name,
  });

  const verificationToken = await generateVerificationToken(values.email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
