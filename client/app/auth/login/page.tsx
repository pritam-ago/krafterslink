'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      email: String(formData.get('email') || ''),
      password: String(formData.get('password') || ''),
    };

    try {
      setLoading(true);
      // POST to your backend
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      // Example: { token: string }
      const data = await res.json();
      // Store token however you like; httpOnly cookie is best (via API).
      if (data?.token) localStorage.setItem('krafters_token', data.token);

      // Redirect to dashboard (change to your route)
      window.location.href = '/dashboard';
    } catch (err: any) {
      alert(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        min-h-screen relative flex items-center justify-center px-4
        bg-neutral-950
        bg-[url('/logo.png')] bg-[length:160px_auto] bg-repeat
      "
      style={{ backgroundBlendMode: 'multiply' }}
    >
      {/* subtle brand glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
      {/* dark overlay for contrast */}
      <div className="pointer-events-none absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <img src="/logo.png" alt="Club Logo" className="h-10 w-10" />
          <div>
            <h1 className="text-xl font-semibold text-white">Welcome back</h1>
            <p className="text-sm text-white/70">
              Sign in to manage your profile links
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm text-white/80">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@college.edu"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm text-white/80">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-amber-500 px-4 py-2 font-medium text-black transition hover:bg-amber-600 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/70">
          New here?{' '}
          <Link href="/auth/signup" className="underline decoration-dotted hover:text-white">
            Create your member account
          </Link>
        </p>
      </div>
    </div>
  );
}
