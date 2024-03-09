import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: integer("id").primaryKey(),
  userId: text("user_id").notNull(),
  url: text("url").notNull(),
});

export type Image = typeof images.$inferSelect;
