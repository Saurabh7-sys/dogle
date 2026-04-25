import { create } from "zustand";
import { auth } from "@/lib/firebaseClient";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const useAuthStore = create((set, get) => ({
  user: null, 
  profile: null, 
  loading: true,
  isAuthModalOpen: false,

  setAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, profile: null });
    } catch (error) {
      console.error("Logout error", error);
    }
  },

  fetchProfile: async (token) => {
    try {
      const res = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        set({ profile: data.data });
        if (!data.data.dogName && typeof window !== 'undefined' && window.location.pathname !== '/onboarding') {
          window.location.href = '/onboarding';
        }
      }
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  },

  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        set({ user: firebaseUser, loading: false });
        const token = await firebaseUser.getIdToken();
        await get().fetchProfile(token);
      } else {
        set({ user: null, profile: null, loading: false });
      }
    });
    return unsubscribe;
  }
}));
