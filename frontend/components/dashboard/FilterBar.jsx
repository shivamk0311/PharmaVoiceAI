"use client";

import { Search, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterBar({
  search,
  setSearch,
  status,
  setStatus,
  refresh,
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-2xl border bg-card p-5 shadow-sm md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          className="pl-10"
          placeholder="Search patient, phone, or medication..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-full md:w-56">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Calls</SelectItem>
          <SelectItem value="VERIFIED">Verified</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
          <SelectItem value="FOLLOWUP">Needs Follow-up</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={refresh}>
        <RefreshCcw className="mr-2 h-4 w-4" />
        Refresh
      </Button>
    </div>
  );
}