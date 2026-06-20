"use client";

import { useState, useEffect } from "react";
import useUiStore from "@/app/store/useUiStore";
import Skeleton from "react-loading-skeleton";

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast, showConfirm } = useUiStore();

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/admin/enquiries");
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data);
      } else {
        showToast(data.error || "Failed to load enquiries", "error");
      }
    } catch (error) {
      showToast("Network error loading enquiries", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = (id) => {
    showConfirm({
      title: "Mark as Replied",
      message: "Are you sure you want to mark this enquiry as replied and archive it?",
      confirmText: "Yes, Archive",
      onConfirm: () => {
        // Mocking the delete/archive action
        setEnquiries(enquiries.filter(e => e.id !== id));
        showToast("Enquiry marked as replied and archived successfully", "success");
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
        <h1 className="text-2xl font-bold text-[var(--admin-text-primary)]">Contact Enquiries</h1>
        <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
          Messages sent from the public website contact form.
        </p>
      </div>

      <div className="glass-panel sm:rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--admin-border)]">
            <thead className="bg-[var(--admin-panel-hover)]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider w-1/4">Contact Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider w-1/4">Dog Info</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider w-1/4">Message</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider">Reply</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)] glass-panel">
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-[var(--admin-panel-hover)] transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-[var(--admin-text-primary)]">{enquiry.name}</div>
                    <div className="text-sm text-[var(--admin-text-muted)]">{enquiry.email}</div>
                    {enquiry.phone && <div className="text-sm text-[var(--admin-text-muted)]">{enquiry.phone}</div>}
                    <div className="text-xs text-[var(--admin-text-muted)] mt-1">{new Date(enquiry.createdAt).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-[var(--admin-text-primary)]">{enquiry.dogName || "N/A"}</div>
                    <div className="text-sm text-[var(--admin-text-muted)]">{enquiry.subject}</div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[var(--admin-text-secondary)] whitespace-pre-wrap">{enquiry.message}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2 items-center">
                      <a 
                        href={`https://wa.me/${(enquiry.phone || "").replace(/\D/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full text-center px-3 py-1 bg-[var(--admin-brand-whatsapp)] text-white text-xs font-bold rounded-full hover:opacity-80 transition-opacity"
                      >
                        WhatsApp
                      </a>
                      <a 
                        href={`mailto:${enquiry.email}`}
                        className="w-full text-center px-3 py-1 bg-[var(--admin-brand-email)] text-white text-xs font-bold rounded-full hover:opacity-80 transition-opacity"
                      >
                        Email
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleMarkAsRead(enquiry.id)}
                      className="text-[var(--admin-action-success)] hover:text-[var(--admin-action-success-hover)] font-bold"
                    >
                      Mark as Replied
                    </button>
                  </td>
                </tr>
              ))}
              {enquiries.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-sm text-[var(--admin-text-muted)]">
                    No new enquiries.
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
