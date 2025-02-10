import { eq } from "drizzle-orm";
import db from "../drizzle";
import { verificationTokens } from "../schema";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.email, email))
      .limit(1);
    return verificationToken.length > 0 ? verificationToken[0] : null;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.token, token))
      .limit(1);
    return verificationToken.length > 0 ? verificationToken[0] : null;
  } catch {
    return null;
  }
};
