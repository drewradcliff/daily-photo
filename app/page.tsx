import { UserButton, redirectToSignIn, auth } from "@clerk/nextjs";
import UploadButton from "../components/upload-button";
import NextImage from "next/image";
import { getImages } from "./utils";
import DropdownButton from "@/components/dropdown-button";

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
      {data.length > 0 && (
        <div className="grid grid-cols-1 gap-3 pb-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map(({ id, url, key }) => (
            <div key={id} className="relative h-64 w-72">
              <DropdownButton imageKey={key} />
              <NextImage
                src={url}
                alt="Image"
                className="rounded-md object-cover"
                fill
              />
            </div>
          ))}
        </div>
      )}
      <UploadButton />
      <footer>
        <p>daily photo - Drew Radcliff © 2024</p>
      </footer>
    </main>
  );
}
