"use client";

import { useState } from "react";
import { CheckCircle2, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markStaffComplete } from "@/lib/api";

export default function StaffActions({ call, onCompleted }) {
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    try {
      setLoading(true);
      await markStaffComplete(call.id);
      onCompleted?.();
    } finally {
      setLoading(false);
    }
  };

  if (call.staffCompleted) {
    return (
      <div className="rounded-xl border bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">
        <div className="flex items-center gap-2 font-medium">
          <CheckCircle2 className="h-4 w-4" />
          Staff workflow completed
        </div>

        {call.staffCompletedAt && (
          <p className="mt-1 text-xs">
            Completed at {new Date(call.staffCompletedAt).toLocaleString()}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-yellow-50 p-4 text-sm text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
        <div className="flex items-center gap-2 font-medium">
          <Clock3 className="h-4 w-4" />
          Pending staff completion
        </div>

        <p className="mt-2">
          Complete the requested payment and fulfillment steps in the pharmacy
          system, then mark this workflow complete.
        </p>
      </div>

      <Button onClick={handleComplete} disabled={loading} className="w-full">
        <CheckCircle2 className="mr-2 h-4 w-4" />
        {loading ? "Marking Complete..." : "Mark Workflow Complete"}
      </Button>
    </div>
  );
}