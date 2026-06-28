"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { auth } from "@/lib/firebaseClient";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function AuthModal() {
  const isAuthModalOpen = useAuthStore((state) => state.isAuthModalOpen);
  const setAuthModalOpen = useAuthStore((state) => state.setAuthModalOpen);
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthModalOpen) {
      if (typeof window !== "undefined") {
        const returning = localStorage.getItem("dogle_returning_user") === "true";
        setIsLogin(returning);
      }
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleGoogle = async () => {
    try {
      setLoading(true);
      setError("");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      await fetch("/api/auth/google", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("dogle_returning_user", "true");
      }
      setAuthModalOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        if (typeof window !== "undefined") {
          localStorage.setItem("dogle_returning_user", "true");
        }
        setAuthModalOpen(false);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        if (typeof window !== "undefined") {
          localStorage.setItem("dogle_returning_user", "true");
        }
        setAuthModalOpen(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border-4 border-zinc-900">
        <button 
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 border-2 border-zinc-900 transition-colors"
        >
          <span className="material-symbols-outlined text-sm font-bold">close</span>
        </button>
        
        <h2 className="text-3xl font-black text-center text-zinc-900 tracking-tight mb-2">
          {isLogin ? "Welcome Back!" : "Welcome on board"}
        </h2>
        <p className="text-center text-zinc-600 mb-8 font-medium">
          {isLogin ? "Sign in to manage your dog's bookings." : "Create an account to start boarding."}
        </p>

        <button 
          onClick={handleGoogle}
          disabled={loading}
          className="w-full mb-6 flex items-center justify-center gap-2 bg-white border-2 border-zinc-900 text-zinc-900 font-bold py-3 px-4 rounded-xl shadow-[0_4px_0_0_rgba(27,28,28,1)] hover:translate-y-1 hover:shadow-none transition-all"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 font-medium text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-zinc-300 rounded-xl focus:border-zinc-900 focus:ring-0 transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-zinc-300 rounded-xl focus:border-zinc-900 focus:ring-0 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#ffd93d] text-[#725e00] font-black text-lg py-3 rounded-xl border-2 border-zinc-900 shadow-[0_4px_0_0_rgba(27,28,28,1)] hover:translate-y-1 hover:shadow-none transition-all mt-4 disabled:opacity-50"
          >
            {loading ? "Please wait..." : (isLogin ? "Sign In" : "Sign Up")}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-zinc-600 font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-bold text-indigo-600 hover:text-indigo-800"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
