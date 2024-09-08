import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  isActive: boolean("is_active").default(false),
  url: text("url").notNull(),
  key: text("key").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
