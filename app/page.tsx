import { UserButton, redirectToSignIn, auth } from "@clerk/nextjs";
import UploadButton from "./upload-button";
import NextImage from "next/image";
import { getImages } from "./utils";

export default async function Home() {
  const { userId } = auth();
  if (!userId) {
    redirectToSignIn();
    return null;
  }

  const data = await getImages(userId);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-5xl items-center justify-between pb-8">
        <p>daily photo</p>
        <UserButton />
      </div>
      <div className="grid grid-cols-1 gap-3 pb-8 md:grid-cols-2 lg:grid-cols-3">
        {data?.map(({ id, url }) => (
          <div key={id} className="relative h-64 w-72">
            <NextImage
              fill
              src={url}
              alt="Image"
              className="rounded-md object-cover"
            />
          </div>
        ))}
      </div>
      <UploadButton />
      <footer>
        <p>daily photo - Drew Radcliff © 2024</p>
      </footer>
    </main>
  );
}
