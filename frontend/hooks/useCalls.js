"use client";

import { useEffect, useState } from "react";
import { getCalls } from "@/lib/api";

export function useCalls() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] =
    useState(null);

  const refresh = async () => {
    try {
      const data = await getCalls();

      setCalls(data.calls || []);

      setLastUpdated(new Date());

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    refresh();

    const interval = setInterval(
      refresh,
      30000
    );

    return () => clearInterval(interval);

  }, []);

  return {
    calls,
    loading,
    refresh,
    lastUpdated,
  };
}