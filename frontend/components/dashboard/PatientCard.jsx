"use client";

import { Card, CardContent } from "@/components/ui/card";

import {
  Phone,
  Pill,
  DollarSign,
  ChevronRight,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

function pretty(value) {
  if (!value) return "Pending";

  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, l => l.toUpperCase());
}

export default function PatientCard({
  call,
  onClick,
}) {

  const patient = call.patient;

  let border = "border-l-blue-500";

  if (call.needsFollowUp)
    border = "border-l-orange-500";

  if (call.conversationState === "COMPLETED")
    border = "border-l-green-500";

  return (

    <Card

      onClick={() => onClick?.(call)}

      className={`
      cursor-pointer
      border-l-4
      ${border}
      rounded-2xl
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-primary
      hover:shadow-xl
      `}

    >

      <CardContent className="p-6">

        {/* Header */}

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">

            {patient.fullName
              .split(" ")
              .map(n => n[0])
              .join("")}

          </div>

          <div>

            <h2 className="text-xl font-bold">

              {patient.fullName}

            </h2>

            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">

              <Phone className="h-4 w-4"/>

              {patient.phoneNumber}

            </div>

          </div>

        </div>

        {/* Medication */}

        <div className="mt-6 rounded-xl bg-muted/50 p-4">

          <div className="flex items-center gap-2">

            <Pill className="h-4 w-4 text-blue-500"/>

            {patient.medicationName}

          </div>

          <div className="mt-2 flex items-center gap-2">

            <DollarSign className="h-4 w-4 text-green-500"/>

            ${patient.copayAmount}

          </div>

        </div>

        {/* Workflow */}

        <div className="mt-6 space-y-4 text-sm">

          <WorkflowRow
            title="Verification"
            badge={
              call.verificationPassed
                ? <StatusBadge type="verified"/>
                : <StatusBadge type="failed"/>
            }
          />

          <WorkflowRow
            title="Refill"
            badge={
              call.refillConfirmed
                ? <StatusBadge
                    type="confirmed"
                    label="Confirmed"
                  />
                : <StatusBadge type="pending"/>
            }
          />

          <WorkflowRow
            title="Payment"
            badge={
              <StatusBadge
                type="payment"
                label={pretty(call.paymentChoice)}
              />
            }
          />

          <WorkflowRow
            title="Fulfillment"
            badge={
              call.fulfillmentChoice==="DELIVERY"

              ?

              <StatusBadge
                type="delivery"
                label="Home Delivery"
              />

              :

              call.fulfillmentChoice==="PICKUP"

              ?

              <StatusBadge
                type="pickup"
                label="Store Pickup"
              />

              :

              <StatusBadge type="pending"/>

            }
          />

        </div>

        {/* Follow up */}

        {call.needsFollowUp && (

          <div className="mt-6 rounded-xl bg-orange-100 p-3 text-sm font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">

            Pharmacy staff follow-up required

          </div>

        )}

        {/* Footer */}

        <div className="mt-8 flex items-center justify-between border-t pt-5 text-sm font-semibold text-primary">

          <span>

            View Details

          </span>

          <ChevronRight className="h-5 w-5"/>

        </div>

      </CardContent>

    </Card>

  );

}

function WorkflowRow({
  title,
  badge,
}) {

  return (

    <div className="flex items-center justify-between">

      <span className="text-muted-foreground">

        {title}

      </span>

      {badge}

    </div>

  );

}