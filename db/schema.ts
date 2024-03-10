import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: serial("id"),
  userId: text("user_id").notNull(),
  url: text("url").notNull(),
});
