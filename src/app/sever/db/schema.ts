import { drizzle } from "drizzle-orm/vercel-postgres";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "@vercel/postgres";

export const user = pgTable("user", {
  id: serial("id"),
  clerkUserId: text("clerk_user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const product = pgTable("product", {
  id: serial("id"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const schema = {
  user,
  product,
};

export const db = drizzle(sql, { schema });
