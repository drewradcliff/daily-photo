"use client";

import { UploadThingButton } from "@/lib/utils";

export default function UploadButton() {
  return (
    <UploadThingButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        alert("Upload complete");
      }}
      onUploadError={(error: Error) => {
        alert(error.message);
      }}
    />
  );
}
