"use server";

import { userRoleEnum } from "@/db/schema";
import { currentUserRole } from "@/lib/auth";

export const admin = async () => {
  const role = await currentUserRole();

  if (role !== userRoleEnum.enumValues[0]) {
    return { error: "Forbidden Server Action: You are not an admin" };
  }
  return { success: "Allowed Server Action: You are an admin" };
};
