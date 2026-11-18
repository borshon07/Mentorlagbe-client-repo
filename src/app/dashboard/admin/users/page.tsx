"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import type { AppUser, Role } from "@/types";

const selectClass =
  "h-9 rounded-lg border bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch<AppUser[]>("/api/admin/users")
      .then(setUsers)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  const changeRole = async (id: string, role: Role) => {
    try {
      await authFetch(`/api/admin/users/${id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      });
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
      toast.success("Role updated");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  if (loading) return <div className="h-40 animate-pulse rounded-2xl bg-muted" />;

  const myEmail = session?.user.email;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      <div className="overflow-x-auto rounded-2xl border bg-card">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3 capitalize">{u.plan}</td>
                <td className="px-4 py-3">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <select
                    className={selectClass}
                    value={u.role}
                    disabled={u.email === myEmail}
                    onChange={(e) => changeRole(u._id, e.target.value as Role)}
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}