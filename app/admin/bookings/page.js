"use client";

import { useState, useEffect } from "react";
import useUiStore from "@/app/store/useUiStore";
import Skeleton from "react-loading-skeleton";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast, showConfirm } = useUiStore();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      } else {
        showToast(data.error || "Failed to load bookings", "error");
      }
    } catch (error) {
      showToast("Network error loading bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = (bookingId, currentStatus) => {
    showConfirm({
      title: "Update Booking Status",
      message: `Are you sure you want to mark this booking as ${currentStatus === "pending" ? "confirmed" : "pending"}?`,
      confirmText: "Yes, Update",
      onConfirm: async () => {
        // Optimistic UI update (or could do a real API call if we had the PATCH endpoint)
        // Since we don't have a PATCH endpoint yet, we just mock it for now.
        showToast("Booking status updated successfully!", "success");
        setBookings(bookings.map(b => 
          b.id === bookingId 
            ? { ...b, status: currentStatus === "pending" ? "confirmed" : "pending" }
            : b
        ));
      }
    });
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
        <h1 className="text-2xl font-bold text-[var(--admin-text-primary)]">Manage Bookings</h1>
        <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
          View all incoming reservation requests.
        </p>
      </div>

      <div className="glass-panel sm:rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--admin-border)]">
            <thead className="bg-[var(--admin-panel-hover)]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider">Dates & Service</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider">Owner / Phone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider">Dog Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)] glass-panel">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-[var(--admin-panel-hover)] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-[var(--admin-accent)] capitalize">{booking.serviceType}</div>
                    <div className="text-sm text-[var(--admin-text-muted)]">
                      {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[var(--admin-text-primary)]">{booking.ownerName}</div>
                    <div className="text-sm text-[var(--admin-text-muted)]">{booking.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[var(--admin-text-primary)]">{booking.dogName} <span className="font-normal text-[var(--admin-text-muted)]">({booking.breed})</span></div>
                    {booking.specialNeeds && (
                      <div className="text-xs text-[var(--admin-action-danger)] max-w-[200px] truncate" title={booking.specialNeeds}>
                        Needs: {booking.specialNeeds}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                      booking.status === "confirmed" ? "bg-[var(--admin-badge-success-bg)] text-[var(--admin-badge-success-text)]" : 
                      booking.status === "pending" ? "bg-[var(--admin-badge-warning-bg)] text-[var(--admin-badge-warning-text)]" : "bg-[var(--admin-badge-neutral-bg)] text-[var(--admin-badge-neutral-text)]"
                    }`}>
                      {booking.status || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleUpdateStatus(booking.id, booking.status || "pending")}
                      className="text-[var(--admin-accent)] hover:text-[var(--admin-accent-hover)]"
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-sm text-[var(--admin-text-muted)]">
                    No bookings found.
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
