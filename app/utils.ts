import { db } from "@/db";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getImages = cache(
  async (userId: string) =>
    await db
      .select()
      .from(images)
      .orderBy(images.id)
      .where(eq(images.userId, userId)),
);
