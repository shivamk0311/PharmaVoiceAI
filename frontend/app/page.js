"use client";

import { useMemo, useState } from "react";

import { useCalls } from "@/hooks/useCalls";

import Header from "@/components/layout/Header";
import DashboardStats from "@/components/dashboard/DashboardStats";
import FilterBar from "@/components/dashboard/FilterBar";
import CallsGrid from "@/components/dashboard/CallsGrid";
import CallDetailsSheet from "@/components/call/CallDetailsSheet";

export default function Home() {
  const { calls, loading, refresh, lastUpdated } = useCalls();

  const [selectedCall, setSelectedCall] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filteredCalls = useMemo(() => {
    return calls.filter((call) => {
      const patient = call.patient || {};

      const query = search.toLowerCase();

      const matchesSearch =
        patient.fullName?.toLowerCase().includes(query) ||
        patient.phoneNumber?.includes(search) ||
        patient.medicationName?.toLowerCase().includes(query);

      let matchesStatus = true;

      switch (status) {
        case "VERIFIED":
          matchesStatus = call.verificationPassed;
          break;

        case "COMPLETED":
          matchesStatus = call.conversationState === "COMPLETED";
          break;

        case "FOLLOWUP":
          matchesStatus = call.needsFollowUp;
          break;

        case "PENDING":
          matchesStatus = call.conversationState !== "COMPLETED";
          break;

        default:
          matchesStatus = true;
      }

      return matchesSearch && matchesStatus;
    });
  }, [calls, search, status]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-screen-2xl px-10 py-10">
        <Header
          refresh={refresh}
          lastUpdated={lastUpdated}
          loading={loading}
        />

        <DashboardStats calls={calls} />

        <FilterBar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          refresh={refresh}
        />

        <CallsGrid
          calls={filteredCalls}
          loading={loading}
          onSelectCall={(call) => {
            setSelectedCall(call);
            setSheetOpen(true);
          }}
        />

        <CallDetailsSheet
          call={selectedCall}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
        />

        <footer className="mt-16 border-t pt-6 text-center text-sm text-muted-foreground">
          PharmaVoice AI v1.0 · Built with Next.js, Express, Prisma, and Vapi
        </footer>
      </div>
    </div>
  );
}