import { db } from "@/db";
import { images } from "@/db/schema";
import { and, eq, gt } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const [activeImage] = await db
    .select()
    .from(images)
    .where(and(eq(images.isActive, true), eq(images.userId, params.id)))
    .limit(1);

  if (activeImage) {
    const timeSinceActivated = Date.now() - activeImage.updatedAt.getTime();

    // check if 24 hours have passed since the image was last updated
    if (timeSinceActivated >= 86_400_000) {
      await db
        .update(images)
        .set({ isActive: false })
        .where(eq(images.id, activeImage.id));

      const [nextImage] = await db
        .select()
        .from(images)
        .where(and(eq(images.userId, params.id), gt(images.id, activeImage.id)))
        .orderBy(images.id)
        .limit(1);

      if (nextImage) {
        await db
          .update(images)
          .set({ isActive: true, updatedAt: new Date() })
          .where(eq(images.id, nextImage.id));
        return Response.json({ activeImage: nextImage.url });
      } else {
        const [firstImage] = await db
          .select()
          .from(images)
          .where(eq(images.userId, params.id))
          .orderBy(images.id)
          .limit(1);

        await db
          .update(images)
          .set({ isActive: true, updatedAt: new Date() })
          .where(eq(images.id, firstImage.id));
        return Response.json({ activeImage: firstImage.url });
      }
    }
    return Response.json({ activeImage: activeImage.url });
  }
  return Response.json({ activeImage: "" });
}
