import { redirectToSignIn, auth } from "@clerk/nextjs";
import NextImage from "next/image";
import { getImages } from "./utils";
import DropdownButton from "@/components/dropdown-button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

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
          {data.map(({ id, url, key, isActive }) => (
            <div key={id} className="relative h-64 w-72">
              <DropdownButton imageKey={key} />
              <NextImage
                src={url}
                alt="Image"
                className={cn([
                  "rounded-md object-cover",
                  isActive && "p-[1px] ring-4 ring-blue-500",
                ])}
                fill
              />
              {isActive && (
                <div className="absolute left-1 top-1 rounded-full bg-blue-500 p-1 text-primary-foreground">
                  <Star className="h-4 w-4 fill-current" />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="italic">No images yet</p>
      )}
    </>
  );
}
