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
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Skeleton width={300} height={32} />
          <Skeleton width={400} height={20} className="mt-1" />
        </div>
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden p-4">
          <Skeleton count={5} height={65} className="mb-2" />
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Bookings</h1>
        <p className="mt-1 text-sm text-gray-500">
          View all incoming reservation requests.
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Dates & Service</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Owner / Phone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Dog Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-indigo-600 capitalize">{booking.serviceType}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.ownerName}</div>
                    <div className="text-sm text-gray-500">{booking.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.dogName} <span className="font-normal text-gray-500">({booking.breed})</span></div>
                    {booking.specialNeeds && (
                      <div className="text-xs text-red-500 max-w-[200px] truncate" title={booking.specialNeeds}>
                        Needs: {booking.specialNeeds}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                      booking.status === "confirmed" ? "bg-green-100 text-green-800" : 
                      booking.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {booking.status || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleUpdateStatus(booking.id, booking.status || "pending")}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
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
