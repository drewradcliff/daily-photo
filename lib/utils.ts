import { UploadRouter } from "@/app/api/uploadthing/core";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const UploadThingButton = generateUploadButton<UploadRouter>();
export const UploadThingDropzone = generateUploadDropzone<UploadRouter>();
