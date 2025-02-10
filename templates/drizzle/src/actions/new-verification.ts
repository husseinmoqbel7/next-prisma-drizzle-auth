"use server";

import db from "@/db/drizzle";
import { getUserByEmail } from "@/db/queries/user";
import { getVerificationTokenByToken } from "@/db/queries/verification-token";
import { users, verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

export const NewVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return { error: "Token does not exist" };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "Email does not exist!" };

  try {
    await db
      .update(users)
      .set({ emailVerified: new Date(), email: existingToken.email })
      .where(eq(users.id, existingUser.id));

    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, existingToken.id));

    return { success: "Email verified!" };
  } catch (error) {
    return { error: "Something went wrong. Please try again later." };
  }
};
