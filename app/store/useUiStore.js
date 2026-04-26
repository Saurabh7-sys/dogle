import { create } from 'zustand';

const useUiStore = create((set) => ({
  // Toast State
  toast: {
    isOpen: false,
    message: "",
    type: "success", // 'success' | 'error' | 'info'
  },
  showToast: (message, type = "success") => {
    set({ toast: { isOpen: true, message, type } });
    // Auto hide after 3 seconds
    setTimeout(() => {
      set((state) => ({ toast: { ...state.toast, isOpen: false } }));
    }, 3000);
  },
  hideToast: () => set((state) => ({ toast: { ...state.toast, isOpen: false } })),

  // Confirm Dialog State
  confirmDialog: {
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    onConfirm: null,
  },
  showConfirm: (options) => set({
    confirmDialog: {
      isOpen: true,
      title: options.title || "Confirm Action",
      message: options.message || "Are you sure you want to proceed?",
      confirmText: options.confirmText || "Yes",
      cancelText: options.cancelText || "Cancel",
      onConfirm: options.onConfirm || (() => {}),
    }
  }),
  hideConfirm: () => set((state) => ({ confirmDialog: { ...state.confirmDialog, isOpen: false } })),
}));

export default useUiStore;
