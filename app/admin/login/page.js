"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BrandLogo from "@/app/components/BrandLogo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--admin-panel-hover)] py-12 px-4 sm:px-6 lg:px-8 font-sans -mt-16">
      <div className="max-w-md w-full space-y-8 glass-panel p-10 rounded-xl shadow-lg ring-1 ring-[var(--admin-border)]">
        <div>
          <div className="mx-auto flex justify-center">
            <BrandLogo size="lg" variant="light" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--admin-text-primary)]">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-[var(--admin-text-secondary)]">
            Sign in to access the BM Pet care CMS
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--admin-text-secondary)]">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-[var(--admin-border)] placeholder-[var(--admin-text-muted)] text-[var(--admin-text-primary)] rounded-md focus:outline-none focus:ring-[var(--admin-accent)] focus:border-[var(--admin-accent)] sm:text-sm mt-1"
                placeholder="admin@bmpetcare.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--admin-text-secondary)]">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-[var(--admin-border)] placeholder-[var(--admin-text-muted)] text-[var(--admin-text-primary)] rounded-md focus:outline-none focus:ring-[var(--admin-accent)] focus:border-[var(--admin-accent)] sm:text-sm mt-1"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="text-[var(--admin-action-danger)] text-sm text-center bg-[var(--admin-action-danger-light)] p-2 rounded-md">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--admin-accent)] disabled:bg-[var(--admin-accent-disabled)] transition-colors"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
