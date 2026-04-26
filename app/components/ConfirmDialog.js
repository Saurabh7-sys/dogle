"use client";

import useUiStore from "@/app/store/useUiStore";
import { useEffect, useState } from "react";

export default function ConfirmDialog() {
  const { confirmDialog, hideConfirm } = useUiStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (confirmDialog.isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [confirmDialog.isOpen]);

  if (!isVisible && !confirmDialog.isOpen) return null;

  const handleConfirm = () => {
    if (confirmDialog.onConfirm) {
      confirmDialog.onConfirm();
    }
    hideConfirm();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-brand-paper/80 backdrop-blur-sm transition-opacity duration-200 ${
          confirmDialog.isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={hideConfirm}
      />

      {/* Modal */}
      <div 
        className={`relative bg-white w-full max-w-md rounded-[2rem] border-[4px] border-brand-black p-8 shadow-[0_8px_0_0_#1b1c1c] transition-all duration-200 ${
          confirmDialog.isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-brand-blue-200 rounded-full border-2 border-brand-black flex items-center justify-center">
            <span className="material-symbols-outlined text-brand-blue-600" style={{ fontVariationSettings: "'FILL' 1" }}>
              help
            </span>
          </div>
          <h2 className="font-black text-2xl text-brand-black">{confirmDialog.title}</h2>
        </div>
        
        <p className="text-brand-brown-700 mb-8 font-medium">
          {confirmDialog.message}
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={hideConfirm}
            className="px-6 py-3 rounded-full border-2 border-brand-black text-brand-black font-bold hover:bg-gray-100 transition-colors"
          >
            {confirmDialog.cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-3 rounded-full border-[3px] border-brand-black bg-brand-yellow-400 text-brand-black font-bold shadow-[0_4px_0_0_#1b1c1c] hover:translate-y-1 hover:shadow-none transition-all"
          >
            {confirmDialog.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
