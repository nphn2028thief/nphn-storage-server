import { sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { Type } from "../types/file";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("fullName").notNull(),
  email: text("email").notNull().unique(),
  avatar: text("avatar"),
  otpCode: text("otpCode"),
  token: text("token"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const typeEnum = pgEnum("type", [
  Type.DOCUMENT,
  Type.IMAGE,
  Type.VIDEO,
  Type.AUDIO,
  Type.OTHER,
]);

// Files table
export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  type: typeEnum("type").notNull(),
  extension: text("extension"),
  size: integer("size"),
  users: text("users")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  userId: integer("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  uploadedAt: timestamp("uploadedAt").notNull().defaultNow(),
});
