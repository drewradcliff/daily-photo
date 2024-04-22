import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="h-64 w-72 rounded-xl" />
      <Skeleton className="h-64 w-72 rounded-xl" />
      <Skeleton className="h-64 w-72 rounded-xl" />
    </div>
  );
}
