import { Skeleton } from "./skeleton";

export default function SkeletonDemo() {
  return (
    <div className="space-y-4 p-4 max-w-sm border rounded-lg">
      <Skeleton className="h-32 w-full rounded-md" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
