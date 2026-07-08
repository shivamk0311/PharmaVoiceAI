import PatientCard from "./PatientCard";
import PatientCardSkeleton from "./PatientCardSkeleton";
import { PhoneOff } from "lucide-react";

export default function CallsGrid({
  calls = [],
  loading,
  onSelectCall,
}) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {Array.from({ length: 6 }).map((_, i) => (
          <PatientCardSkeleton key={i} />
        ))}

      </div>
    );
  }

  if (calls.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-16 text-center">

        <PhoneOff className="mx-auto mb-5 h-14 w-14 text-muted-foreground"/>

        <h2 className="text-2xl font-semibold">

          No Call Sessions

        </h2>

        <p className="mt-3 text-muted-foreground">

          Upload patients and begin your first AI refill campaign.

        </p>

      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {calls.map((call) => (
        <PatientCard
          key={call.id}
          call={call}
          onClick={onSelectCall}
        />
      ))}

    </div>
  );
}