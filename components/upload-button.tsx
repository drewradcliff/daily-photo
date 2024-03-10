"use client";

import { UploadThingButton } from "@/lib/utils";
import { revalidate } from "../app/actions";

export default function UploadButton() {
  return (
    <UploadThingButton
      endpoint="imageUploader"
      onClientUploadComplete={() => revalidate()}
      onUploadError={(error: Error) => {
        alert(error.message);
      }}
    />
  );
}
