import { eq } from "drizzle-orm";
import db from "../drizzle";
import { twoFactorTokens } from "../schema";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db
      .select()
      .from(twoFactorTokens)
      .where(eq(twoFactorTokens.token, token))
      .limit(1);
    return twoFactorToken.length > 0 ? twoFactorToken[0] : null;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db
      .select()
      .from(twoFactorTokens)
      .where(eq(twoFactorTokens.email, email))
      .limit(1);
    return twoFactorToken.length > 0 ? twoFactorToken[0] : null;
  } catch {
    return null;
  }
};
