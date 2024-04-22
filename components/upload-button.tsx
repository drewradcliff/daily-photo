"use client";

import { CloudUpload, Loader } from "lucide-react";
import { revalidate } from "../app/actions";
import { generateReactHelpers } from "@uploadthing/react";
import { useRef, useState } from "react";

export default function UploadButton() {
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const { useUploadThing } = generateReactHelpers();

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onUploadBegin: () => setLoading(true),
    onClientUploadComplete: () => {
      setLoading(false);
      revalidate();
    },
    onUploadError: () => setLoading(false),
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files!);
    startUpload(files);
  };

  return (
    <div className="flex items-center">
      <input
        ref={ref}
        className="hidden"
        type="file"
        accept={fileTypes.join(", ")}
        onChange={handleUpload}
      />
      {loading ? (
        <div className="animate-spin">
          <Loader size={20} />
        </div>
      ) : (
        <CloudUpload
          className="hover:cursor-pointer hover:text-stone-500"
          size={20}
          onClick={() => ref.current?.click()}
        />
      )}
    </div>
  );
}
