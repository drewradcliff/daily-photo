import { db } from "@/db";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const allImages = await db
    .select({ id: images.id, isActive: images.isActive, url: images.url })
    .from(images);

  const activeIndex = allImages.findIndex((image) => image.isActive);
  const nextIndex = activeIndex < allImages.length - 1 ? activeIndex + 1 : 0;

  try {
    await db.transaction(async (tx) => {
      await tx.update(images).set({ isActive: false });
      await tx
        .update(images)
        .set({ isActive: true })
        .where(eq(images.id, allImages[nextIndex].id));
    });

    return Response.json({ message: "Success", url: allImages[nextIndex].url });
  } catch (error) {
    return Response.json({ error: "Error updating database" }, { status: 500 });
  }
}
