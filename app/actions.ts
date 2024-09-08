"use server";

import { UTApi } from "uploadthing/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { images } from "@/db/schema";
import { eq, ne } from "drizzle-orm";

const utapi = new UTApi();

export async function revalidate() {
  revalidatePath("/");
}

export async function deleteImage(key: string) {
  await utapi.deleteFiles(key);
  await db.delete(images).where(eq(images.key, key));
  revalidatePath("/");
}

export async function setActive(key: string) {
  await db.transaction(async (tx) => {
    await tx.update(images).set({ isActive: true }).where(eq(images.key, key));
    await tx.update(images).set({ isActive: false }).where(ne(images.key, key));
  });
  revalidatePath("/");
}
