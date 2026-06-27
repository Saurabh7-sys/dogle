"use client";

import { useState, useEffect } from "react";
import useUiStore from "@/app/store/useUiStore";
import Skeleton from "react-loading-skeleton";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useUiStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        showToast(data.error || "Failed to load users", "error");
      }
    } catch (error) {
      showToast("Network error loading users", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="w-[90%] max-w-none mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Skeleton width={300} height={32} />
          <Skeleton width={400} height={20} className="mt-1" />
        </div>
        <div className="glass-panel sm:rounded-xl overflow-hidden p-4">
          <Skeleton count={5} height={65} className="mb-2" />
        </div>
      </main>
    );
  }

  return (
    <main className="w-[90%] max-w-none mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--admin-text-primary)]">Registered Users & Dogs</h1>
        <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
          A list of all users and their registered dogs on the platform.
        </p>
      </div>

      <div className="glass-panel sm:rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--admin-border)]">
            <thead className="bg-[var(--admin-panel-hover)]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider">Owner / Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider">Dog Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider">Breed / Age</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider">Vaccinated</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)] glass-panel">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[var(--admin-panel-hover)] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        {user.photoURL ? (
                          <img className="h-10 w-10 rounded-full border border-[var(--admin-border)] object-cover" src={user.photoURL} alt="" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-[var(--admin-accent-light)] flex items-center justify-center border border-[var(--admin-accent-light)]">
                            <span className="material-symbols-outlined text-[var(--admin-accent)] text-sm">person</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[var(--admin-text-primary)]">{user.name || "Anonymous"}</div>
                        <div className="text-sm text-[var(--admin-text-muted)]">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-[var(--admin-text-primary)]">{user.dogName || "N/A"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[var(--admin-text-primary)]">{user.dogBreed || "N/A"}</div>
                    <div className="text-sm text-[var(--admin-text-muted)]">{user.dogAge ? `${user.dogAge} years` : ""}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      (user.vaccinated === true || user.vaccinated === "yes" || user.vaccinated === "true") ? "bg-[var(--admin-badge-success-bg)] text-[var(--admin-badge-success-text)]" : 
                      (user.vaccinated === false || user.vaccinated === "no" || user.vaccinated === "false") ? "bg-[var(--admin-badge-danger-bg)] text-[var(--admin-badge-danger-text)]" : "bg-[var(--admin-badge-neutral-bg)] text-[var(--admin-badge-neutral-text)]"
                    }`}>
                      {(user.vaccinated === true || user.vaccinated === "yes" || user.vaccinated === "true") ? "Yes" : 
                       (user.vaccinated === false || user.vaccinated === "no" || user.vaccinated === "false") ? "No" : "Unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--admin-text-muted)]">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-sm text-[var(--admin-text-muted)]">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
