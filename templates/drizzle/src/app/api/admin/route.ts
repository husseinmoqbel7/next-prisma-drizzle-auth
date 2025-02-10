import { currentUserRole } from "@/lib/auth";
import { UserRole } from "@/lib/user-role";
import { NextResponse } from "next/server";

export async function GET() {
  const role = await currentUserRole();

  if (role !== UserRole.ADMIN) {
    return new NextResponse(null, { status: 403 });
  }
  return new NextResponse(null, { status: 200 });
}
