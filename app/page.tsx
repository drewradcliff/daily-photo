import { redirectToSignIn, auth } from "@clerk/nextjs";
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
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
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
      ) : (
        <p>No images yet</p>
      )}
    </>
  );
}
