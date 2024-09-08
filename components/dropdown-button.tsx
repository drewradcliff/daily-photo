"use client";

import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { deleteImage, setActive } from "@/app/actions";

export default function DropdownButton({ imageKey }: { imageKey: string }) {
  return (
    <div className="absolute right-1 top-1 z-10">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="h-5 w-5 rounded-full bg-gray-200 text-gray-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setActive(imageKey)}>
            Set Active
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => deleteImage(imageKey)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
