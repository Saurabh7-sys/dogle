"use client";

import { useState, useEffect } from "react";
import useUiStore from "@/app/store/useUiStore";

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
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Contact Enquiries</h1>
        <p className="mt-1 text-sm text-gray-500">
          Messages sent from the public website contact form.
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">Contact Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">Dog Info</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">Message</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Reply</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900">{enquiry.name}</div>
                    <div className="text-sm text-gray-500">{enquiry.email}</div>
                    {enquiry.phone && <div className="text-sm text-gray-500">{enquiry.phone}</div>}
                    <div className="text-xs text-gray-400 mt-1">{new Date(enquiry.createdAt).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{enquiry.dogName || "N/A"}</div>
                    <div className="text-sm text-gray-500">{enquiry.subject}</div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{enquiry.message}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2 items-center">
                      <a 
                        href={`https://wa.me/${(enquiry.phone || "").replace(/\D/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full text-center px-3 py-1 bg-brand-whatsapp text-white text-xs font-bold rounded-full hover:opacity-80 transition-opacity"
                      >
                        WhatsApp
                      </a>
                      <a 
                        href={`mailto:${enquiry.email}`}
                        className="w-full text-center px-3 py-1 bg-brand-blue-600 text-white text-xs font-bold rounded-full hover:opacity-80 transition-opacity"
                      >
                        Email
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleMarkAsRead(enquiry.id)}
                      className="text-green-600 hover:text-green-900 font-bold"
                    >
                      Mark as Replied
                    </button>
                  </td>
                </tr>
              ))}
              {enquiries.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
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
