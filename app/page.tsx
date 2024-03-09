import { UserButton } from "@clerk/nextjs";
import UploadButton from "./upload-button";
import { db } from "@/db";
import { type Image, images } from "@/db/schema";
import NextImage from "next/image";

export default async function Home() {
  const data: Image[] = await db.select().from(images);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-5xl items-center justify-between">
        <p>daily photo</p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <UserButton />
        </div>
      </div>
      {data.length ? (
        data.map(({ id, url }) => (
          <NextImage
            width={500}
            height={500}
            key={id}
            src={url}
            alt="Image"
            className="rounded-md object-cover"
          />
        ))
      ) : (
        <UploadButton />
      )}
      <footer>
        <p>daily photo - Drew Radcliff © 2024</p>
      </footer>
    </main>
  );
}
