"use client";

import { UserButton } from "@clerk/nextjs";
import { UploadButton } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-5xl items-center justify-between">
        <p>daily photo</p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none dark:from-black dark:via-black">
          <UserButton />
        </div>
      </div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload complete");
        }}
        onUploadError={(error: Error) => {
          alert(error.message);
        }}
      />
      <footer>
        <p>daily photo - Drew Radcliff © 2024</p>
      </footer>
    </main>
  );
}
