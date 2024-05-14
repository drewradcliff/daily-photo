import { db } from "@/db";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db
      .select()
      .from(images)
      .where(eq(images.isActive, true));

    if (data.length === 0) {
      return Response.json({ error: "No daily photo found" }, { status: 500 });
    }

    return Response.json({ imageUrl: data[0].url });
  } catch (error) {
    return Response.json({ error: "Error fetching database" }, { status: 500 });
  }
}
