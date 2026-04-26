"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";
import { auth } from "@/lib/firebaseClient";
import Skeleton from "react-loading-skeleton";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuthStore();
  
  const [dogName, setDogName] = useState("");
  const [dogAge, setDogAge] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [vaccinated, setVaccinated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
    if (profile?.dogName) {
      router.push("/");
    }
  }, [user, profile, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dogName, dogAge, dogBreed, vaccinated }),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      // Reload window to update store naturally and navigate
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 bg-yellow-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 max-w-lg w-full border-4 border-zinc-900 shadow-[8px_8px_0_0_rgba(27,28,28,1)]">
          <div className="text-center mb-8 flex flex-col items-center">
            <Skeleton circle width={50} height={50} className="mb-2" />
            <Skeleton width={250} height={36} />
            <Skeleton width={300} height={20} className="mt-2" />
          </div>
          <div className="space-y-5">
            <div><Skeleton height={20} width={100} className="mb-1" /><Skeleton height={50} borderRadius={12} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Skeleton height={20} width={80} className="mb-1" /><Skeleton height={50} borderRadius={12} /></div>
              <div><Skeleton height={20} width={80} className="mb-1" /><Skeleton height={50} borderRadius={12} /></div>
            </div>
            <Skeleton height={60} borderRadius={12} />
            <Skeleton height={60} borderRadius={12} className="mt-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-yellow-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full border-4 border-zinc-900 shadow-[8px_8px_0_0_rgba(27,28,28,1)]">
        <div className="text-center mb-8">
          <span className="material-symbols-outlined text-5xl text-yellow-500 mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Tell us about your dog!</h1>
          <p className="text-zinc-600 font-medium mt-2">We need a few details before you can start booking.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-1">Dog's Name</label>
            <input 
              type="text" 
              required
              value={dogName}
              onChange={e => setDogName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-zinc-300 rounded-xl focus:border-zinc-900 focus:ring-0 transition-colors"
              placeholder="e.g. Max"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-1">Age</label>
              <input 
                type="text" 
                required
                value={dogAge}
                onChange={e => setDogAge(e.target.value)}
                className="w-full px-4 py-3 border-2 border-zinc-300 rounded-xl focus:border-zinc-900 focus:ring-0 transition-colors"
                placeholder="e.g. 2 years"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-1">Breed</label>
              <input 
                type="text" 
                required
                value={dogBreed}
                onChange={e => setDogBreed(e.target.value)}
                className="w-full px-4 py-3 border-2 border-zinc-300 rounded-xl focus:border-zinc-900 focus:ring-0 transition-colors"
                placeholder="e.g. Golden Retriever"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 border-2 border-zinc-200 rounded-xl bg-gray-50">
            <input 
              type="checkbox" 
              id="vaccinated"
              checked={vaccinated}
              onChange={e => setVaccinated(e.target.checked)}
              className="w-5 h-5 border-2 border-zinc-400 rounded text-yellow-500 focus:ring-yellow-500"
            />
            <label htmlFor="vaccinated" className="font-bold text-zinc-800 cursor-pointer">
              My dog is fully vaccinated
            </label>
          </div>

          {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

          <button 
            type="submit"
            disabled={saving || !vaccinated}
            className="w-full bg-[#ffd93d] text-[#725e00] font-black text-lg py-4 rounded-xl border-2 border-zinc-900 shadow-[0_4px_0_0_rgba(27,28,28,1)] hover:translate-y-1 hover:shadow-none transition-all mt-4 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_0_0_rgba(27,28,28,1)]"
          >
            {saving ? "Saving..." : "Complete Profile"}
          </button>
          {!vaccinated && <p className="text-xs text-center text-zinc-500 font-medium mt-2">Dogs must be vaccinated to stay at Dogle.</p>}
        </form>
      </div>
    </div>
  );
}
