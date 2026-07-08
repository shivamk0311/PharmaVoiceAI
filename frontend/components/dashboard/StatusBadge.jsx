"use client";

import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Clock3,
  CreditCard,
  Truck,
  Store,
  AlertTriangle,
} from "lucide-react";

const badgeConfig = {
  verified: {
    icon: CheckCircle2,
    label: "Verified",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  },

  failed: {
    icon: XCircle,
    label: "Failed",
    className:
      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  },

  confirmed: {
    icon: CheckCircle2,
    label: "Confirmed",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  },

  pending: {
    icon: Clock3,
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  },

  payment: {
    icon: CreditCard,
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },

  delivery: {
    icon: Truck,
    label: "Delivery",
    className:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  },

  pickup: {
    icon: Store,
    label: "Pickup",
    className:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  },

  followup: {
    icon: AlertTriangle,
    label: "Follow-up",
    className:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  },
};

export default function StatusBadge({ type, label }) {
  const badge = badgeConfig[type];

  if (!badge) return null;

  const Icon = badge.icon;

  return (
    <Badge
      variant="secondary"
      className={`gap-1 rounded-full px-3 py-1 text-xs font-medium ${badge.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {badge.label || label}
    </Badge>
  );
}