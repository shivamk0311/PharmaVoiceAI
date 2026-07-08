import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PatientCardSkeleton() {
  return (
    <Card className="rounded-2xl">
      <CardContent className="space-y-6 p-6">

        <div className="flex items-center gap-4">

          <Skeleton className="h-14 w-14 rounded-full"/>

          <div className="flex-1 space-y-2">

            <Skeleton className="h-5 w-36"/>

            <Skeleton className="h-4 w-28"/>

          </div>

        </div>

        <Skeleton className="h-4 w-full"/>

        <Skeleton className="h-4 w-2/3"/>

        <div className="space-y-3">

          <Skeleton className="h-7 w-full"/>

          <Skeleton className="h-7 w-full"/>

          <Skeleton className="h-7 w-full"/>

          <Skeleton className="h-7 w-full"/>

        </div>

      </CardContent>
    </Card>
  );
}