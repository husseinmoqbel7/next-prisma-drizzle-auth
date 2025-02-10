import { eq } from "drizzle-orm";
import db from "../drizzle";
import { passwordResetTokens } from "../schema";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token))
      .limit(1);
    return passwordResetToken.length > 0 ? passwordResetToken[0] : null;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.email, email))
      .limit(1);
    return passwordResetToken.length > 0 ? passwordResetToken[0] : null;
  } catch {
    return null;
  }
};
