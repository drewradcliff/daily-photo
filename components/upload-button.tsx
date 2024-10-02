"use client";

import { CloudUpload, Loader } from "lucide-react";
import { revalidate } from "../app/actions";
import { generateReactHelpers } from "@uploadthing/react";
import { useCallback, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  PercentCrop,
  PixelCrop,
  type Crop,
} from "react-image-crop";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import "react-image-crop/dist/ReactCrop.css";

export default function UploadButton() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setSelectedFile(event.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSelectedImage(reader.result?.toString() || null);
        setIsOpen(true);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedImage(null);
      setCroppedImage(null);
      setCrop(undefined);
      ref.current!.value = "";
    }
    setIsOpen(open);
  };

  const handleCropComplete = useCallback(
    (_croppedArea: PixelCrop, croppedAreaPixels: PercentCrop) => {
      if (selectedImage) {
        const image = new Image();
        image.src = selectedImage;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = image.width * (croppedAreaPixels.width / 100);
          canvas.height = image.height * (croppedAreaPixels.height / 100);
          ctx.drawImage(
            image,
            image.width * (croppedAreaPixels.x / 100),
            image.height * (croppedAreaPixels.y / 100),
            image.width * (croppedAreaPixels.width / 100),
            image.height * (croppedAreaPixels.height / 100),
            0,
            0,
            canvas.width,
            canvas.height,
          );
          setCroppedImage(canvas.toDataURL("image/jpeg", 0.2));
        }
      }
    },
    [selectedImage],
  );

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: width, naturalHeight: height } = event.currentTarget;
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 100,
        },
        3 / 4,
        width,
        height,
      ),
      width,
      height,
    );
    setCrop(crop);
  };

  const handleUpload = () => {
    if (croppedImage && selectedFile) {
      // convert base64 to file
      const byteString = atob(croppedImage.split(",")[1]);
      const mimeString = croppedImage.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const fileName =
        selectedFile.name.replace(/\.[^/.]+$/, "") + "_cropped.jpg";
      const file = new File([blob], fileName, { type: mimeString });
      startUpload([file]);
      setIsOpen(false);
      setSelectedImage(null);
      setCroppedImage(null);
      setCrop(undefined);
    }
  };

  return (
    <div className="flex items-center">
      <input
        ref={ref}
        className="hidden"
        type="file"
        accept={fileTypes.join(", ")}
        onChange={handleFileChange}
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
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent aria-describedby="">
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
          </DialogHeader>
          <div>
            {selectedImage && (
              <ReactCrop
                crop={crop}
                onChange={(_crop, percentageCrop) => setCrop(percentageCrop)}
                onComplete={handleCropComplete}
                aspect={3 / 4}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImage}
                  alt="Selected Image"
                  className="h-auto max-w-full"
                  onLoad={handleImageLoad}
                />
              </ReactCrop>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleUpload}>Upload Image</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
