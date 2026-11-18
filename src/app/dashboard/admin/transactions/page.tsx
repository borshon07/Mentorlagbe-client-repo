"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import type { Payment } from "@/types";

export default function AdminTransactionsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch<Payment[]>("/api/admin/payments")
      .then(setPayments)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-40 animate-pulse rounded-2xl bg-muted" />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transactions</h1>

      {payments.length === 0 ? (
        <div className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
          No payments yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{p.userName}</td>
                  <td className="px-4 py-3">{p.userEmail}</td>
                  <td className="px-4 py-3 capitalize">{p.userRole}</td>
                  <td className="px-4 py-3">{p.planName}</td>
                  <td className="px-4 py-3">${p.amount}</td>
                  <td className="max-w-[180px] truncate px-4 py-3 text-xs">
                    {p.transactionId}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(p.paidAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}