import { eq } from "drizzle-orm";
import db from "../drizzle";
import { twoFactorConfirmations } from "../schema";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db
      .select()
      .from(twoFactorConfirmations)
      .where(eq(twoFactorConfirmations.userId, userId))
      .limit(1);
    return twoFactorConfirmation.length > 0 ? twoFactorConfirmation[0] : null;
  } catch {
    return null;
  }
};
