"use client";

import useUiStore from "@/app/store/useUiStore";
import { useEffect, useState } from "react";

export default function NotificationToast() {
  const { toast, hideToast } = useUiStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toast.isOpen) {
      setIsVisible(true);
    } else {
      // Small delay for exit animation
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [toast.isOpen]);

  if (!isVisible && !toast.isOpen) return null;

  const getColors = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-100 border-green-500 text-green-800";
      case "error":
        return "bg-red-100 border-red-500 text-red-800";
      case "info":
        return "bg-blue-100 border-blue-500 text-blue-800";
      default:
        return "bg-gray-100 border-gray-500 text-gray-800";
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return "check_circle";
      case "error":
        return "error";
      case "info":
        return "info";
      default:
        return "info";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-xl border-2 shadow-[0_4px_0_0_rgba(27,28,28,1)] transition-all duration-300 ${getColors()} ${
          toast.isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
          {getIcon()}
        </span>
        <p className="font-bold text-sm md:text-base">{toast.message}</p>
        <button
          onClick={hideToast}
          className="ml-4 hover:opacity-70 transition-opacity flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>
    </div>
  );
}
