import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

import { UserRole } from "@/lib/user-role";
import { nanoid } from "nanoid";

// Generate a random ID
const createId = () => nanoid();

export const userRoleEnum = pgEnum("UserRole", [UserRole.ADMIN, UserRole.USER]);

export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  image: text("image"),
  password: text("password"),
  role: userRoleEnum("role").default(UserRole.USER),
  isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false),
});

export const accounts = pgTable(
  "accounts",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (table) => ({
    uniqueProvider: unique().on(table.provider, table.providerAccountId),
  })
);

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    email: text("email").notNull(),
    token: text("token").notNull().unique(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (table) => ({
    uniqueEmailToken: unique().on(table.email, table.token),
  })
);

export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    email: text("email").notNull(),
    token: text("token").notNull().unique(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (table) => ({
    uniqueEmailToken: unique().on(table.email, table.token),
  })
);

export const twoFactorTokens = pgTable(
  "two_factor_tokens",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    email: text("email").notNull(),
    token: text("token").notNull().unique(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (table) => ({
    uniqueEmailToken: unique().on(table.email, table.token),
  })
);

export const twoFactorConfirmations = pgTable(
  "two_factor_confirmations",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => ({
    uniqueUserId: unique().on(table.userId),
  })
);
