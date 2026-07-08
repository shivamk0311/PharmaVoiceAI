"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import StaffActions from "./StaffActions";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Phone,
  Pill,
  DollarSign,
  MapPin,
  AlertTriangle,
  ClipboardCheck,
} from "lucide-react";

import StatusBadge from "@/components/dashboard/StatusBadge";

function pretty(value) {
  if (!value) return "Pending";

  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function CallDetailsSheet({ open, onOpenChange, call, refresh }) {
  if (!call) return null;

  const patient = call.patient;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="px-4 w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="text-2xl">{patient.fullName}</SheetTitle>
          <p className="text-sm text-muted-foreground">
            Detailed AI call outcome and staff actions.
          </p>
        </SheetHeader>

        <div className="mt-8 space-y-5">
          {call.needsFollowUp && (
            <div className="rounded-xl border border-orange-200 bg-orange-100 p-4 text-sm font-medium text-orange-700 dark:border-orange-900 dark:bg-orange-900/30 dark:text-orange-300">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Pharmacy staff follow-up required
              </div>
              {call.followUpReason && (
                <p className="mt-2 text-sm">{call.followUpReason}</p>
              )}
            </div>
          )}

          <InfoCard title="Patient Information">
            <InfoRow icon={Phone} label="Phone" value={patient.phoneNumber} />
          </InfoCard>

          <InfoCard title="Medication Details">
            <InfoRow icon={Pill} label="Medication" value={patient.medicationName} />
            <InfoRow icon={DollarSign} label="Copay" value={`$${patient.copayAmount}`} />
          </InfoCard>

          <InfoCard title="Workflow Summary">
            <div className="flex flex-wrap gap-2">
              {call.verificationPassed ? (
                <StatusBadge type="verified" />
              ) : (
                <StatusBadge type="failed" />
              )}

              {call.refillConfirmed ? (
                <StatusBadge type="verified" label="Refill Confirmed" />
              ) : (
                <StatusBadge type="pending" />
              )}

              <StatusBadge type="payment" label={pretty(call.paymentChoice)} />

              {call.fulfillmentChoice === "DELIVERY" ? (
                <StatusBadge type="delivery" label="Home Delivery" />
              ) : call.fulfillmentChoice === "PICKUP" ? (
                <StatusBadge type="pickup" label="Store Pickup" />
              ) : (
                <StatusBadge type="pending" />
              )}
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <DetailLine label="Call Status" value={pretty(call.status)} />
              <DetailLine label="Conversation State" value={pretty(call.conversationState)} />
              <DetailLine label="Payment Status" value={pretty(call.paymentStatus)} />
            </div>
          </InfoCard>

          {call.fulfillmentChoice === "DELIVERY" && (
            <InfoCard title="Delivery Information">
              <InfoRow
                icon={MapPin}
                label="Delivery Address"
                value={call.deliveryAddress || "No delivery address recorded"}
              />
            </InfoCard>
          )}

          <InfoCard title="Manual Staff Actions">
            <StaffActions call={call} onCompleted={refresh} />
          </InfoCard>

          <InfoCard title="Transcript">
            <div className="max-h-72 overflow-y-auto rounded-xl bg-muted p-4 text-sm leading-6 text-muted-foreground">
              {call.transcript || "Transcript not available yet."}
            </div>
          </InfoCard>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function InfoCard({ title, children }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <ClipboardCheck className="h-4 w-4 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />

      <div>
        <p className="font-medium">{label}</p>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

function DetailLine({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}