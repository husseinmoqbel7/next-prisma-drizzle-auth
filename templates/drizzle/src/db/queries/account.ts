import { eq } from "drizzle-orm";
import db from "../drizzle";
import { accounts } from "../schema";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, userId))
      .limit(1);
    return account.length > 0 ? account[0] : null;
  } catch {
    return null;
  }
};
