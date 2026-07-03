"use client";

import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5001";

export default function Home() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCalls = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/calls`);
      const data = await res.json();
      setCalls(data.calls || []);
    } catch (error) {
      console.error("Failed to fetch calls:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">
          PharmaVoice AI Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Review AI call outcomes and pharmacy staff follow-up actions.
        </p>

        <div className="mt-8 rounded-xl bg-white shadow">
          <div className="border-b p-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Call Sessions
            </h2>
          </div>

          {loading ? (
            <p className="p-4 text-gray-600">Loading calls...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Medication</th>
                    <th className="px-4 py-3">Copay</th>
                    <th className="px-4 py-3">Call Status</th>
                    <th className="px-4 py-3">Verified</th>
                    <th className="px-4 py-3">Refill</th>
                    <th className="px-4 py-3">Payment</th>
                    <th className="px-4 py-3">Fulfillment</th>
                    <th className="px-4 py-3">Follow-up</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {calls.map((call) => (
                    <tr key={call.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {call.patient?.fullName}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {call.patient?.phoneNumber}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {call.patient?.medicationName}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        ${call.patient?.copayAmount}
                      </td>
                      <td className="px-4 py-3">{call.status}</td>
                      <td className="px-4 py-3">
                        {call.verificationPassed ? "✅" : "❌"}
                      </td>
                      <td className="px-4 py-3">
                        {call.refillConfirmed === true
                          ? "Confirmed"
                          : call.refillConfirmed === false
                          ? "Declined"
                          : "Pending"}
                      </td>
                      <td className="px-4 py-3">
                        {call.paymentChoice || "Pending"}
                      </td>
                      <td className="px-4 py-3">
                        {call.fulfillmentChoice || "Pending"}
                      </td>
                      <td className="px-4 py-3">
                        {call.needsFollowUp ? "⚠️ Yes" : "No"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {calls.length === 0 && (
                <p className="p-4 text-gray-600">No calls found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}