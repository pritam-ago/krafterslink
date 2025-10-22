'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';

type Step2Role = 'member' | 'lead' | 'head' | 'president' | '';

type Step1 = {
  name: string;
  email: string;
  password: string;
  bio: string;
  username: string;
  pfp?: File | null;
  pfpPreview?: string | null;
};
type Step2 = {
  domain: string;
  role: Step2Role;
};
type Step3 = {
  department: string;
  specialization: string;
  section: string;
  reg_no: string;
};

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // ---- form state
  const [s1, setS1] = useState<Step1>({
    name: '',
    email: '',
    password: '',
    bio: '',
    username: '',
    pfp: null,
    pfpPreview: null,
  });
  const [s2, setS2] = useState<Step2>({ domain: '', role: '' });
  const [s3, setS3] = useState<Step3>({
    department: '',
    specialization: '',
    section: '',
    reg_no: '',
  });

  // ---- dropdown data
  const domains = [
    'Development',
    'PR and Management',
    'Competitive Programming',
    'Cyber Security',
    'Creatives',
    'Content',
    'Web3',
  ];

  const departments = [
    'IST',
    'CSE',
    'IT',
    'AIML',
    'AIDS',
    'ECE',
    'EEE',
    'MECH',
    'CIVIL',
    'CHEM',
    'BIOTECH',
    'MBA',
    'Other',
  ];

  // IST-focused specializations (edit as needed)
  const IST_SPECIALIZATIONS = [
    'Software Engineering',
    'Data Science & Analytics',
    'Artificial Intelligence & ML',
    'Networks & Systems',
    'Information Security',
    'Cloud & DevOps',
    'Human–Computer Interaction (HCI)',
    'Business/Information Systems',
  ];

  const GENERIC_SPECIALIZATIONS = [
    'General',
    'Systems',
    'Programming',
    'Research',
    'Media/Design',
    'Management',
  ];

  const isIST =
    s3.department.toUpperCase() === 'IST' || s3.department.toUpperCase() === 'IT';
  const specs = isIST ? IST_SPECIALIZATIONS : GENERIC_SPECIALIZATIONS;

  // ---- validation per-step
  function validateStep1() {
    if (!s1.name.trim()) return 'Please enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(s1.email)) return 'Please enter a valid email.';
    if (s1.password.length < 6) return 'Password must be at least 6 characters.';
    if (!/^[a-z0-9_\.]{3,20}$/i.test(s1.username))
      return 'Username should be 3–20 chars (letters, numbers, underscore, dot).';
    return null;
  }
  function validateStep2() {
    if (!s2.domain) return 'Please select a domain.';
    if (!s2.role) return 'Please select your role.';
    return null;
  }
  function validateStep3() {
    if (!s3.department) return 'Please select a department.';
    if (!s3.specialization) return 'Please select a specialization.';
    if (!s3.section.trim()) return 'Please enter your section.';
    if (!s3.reg_no.trim()) return 'Please enter your registration number.';
    return null;
  }

  // ---- nav
  function next() {
    const err = step === 1 ? validateStep1() : step === 2 ? validateStep2() : null;
    if (err) return alert(err);
    setStep((s) => (s === 1 ? 2 : 3));
  }
  function back() {
    setStep((s) => (s === 3 ? 2 : 1));
  }

  // ---- file handler
  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setS1((p) => ({ ...p, pfp: null, pfpPreview: null }));
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      setS1((p) => ({ ...p, pfp: file, pfpPreview: String(reader.result) }));
    reader.readAsDataURL(file);
  }

  // ---- submit
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const err = validateStep3();
    if (err) return alert(err);

    try {
      setLoading(true);
      const fd = new FormData();
      // step 1
      fd.append('name', s1.name);
      fd.append('email', s1.email);
      fd.append('password', s1.password);
      fd.append('bio', s1.bio);
      fd.append('username', s1.username);
      if (s1.pfp) fd.append('pfp', s1.pfp);
      // step 2
      fd.append('domain', s2.domain);
      fd.append('role', s2.role);
      // step 3
      fd.append('department', s3.department);
      fd.append('specialization', s3.specialization);
      fd.append('section', s3.section);
      fd.append('reg_no', s3.reg_no);

      const res = await fetch('/api/users/register', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) throw new Error(await res.text());

      alert(
        'Signup submitted! Your account is now pending verification. You will receive an approval email with a link to activate your account.'
      );
      window.location.href = '/auth/login';
    } catch (error: any) {
      alert(error?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  // ---- step indicator
  const StepDot = ({ n, label }: { n: 1 | 2 | 3; label: string }) => {
    const active = step === n;
    const done = step > n;
    return (
      <div className="flex items-center gap-2">
        <div
          className={[
            'flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold',
            active && 'bg-amber-500 text-black border-amber-500',
            !active && !done && 'border-white/30 text-white/80',
            done && 'bg-emerald-500 text-black border-emerald-500',
          ].join(' ')}
        >
          {n}
        </div>
        <span className="hidden sm:block text-sm text-white/80">{label}</span>
      </div>
    );
  };

  // ---- base classes
  // Select styling: force dark bg & text on both the control and options.
  const inputBase =
    'w-full rounded-xl border border-white/10 px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500';
  const inputCls =
    inputBase + ' bg-neutral-900 text-white placeholder-white/50';
  const selectCls =
    inputBase + ' bg-neutral-900 text-white [color-scheme:dark]';
  const optionCls = 'bg-neutral-900 text-white';
  const labelCls = 'block text-sm text-white/80';

  return (
    <div
      className="
        min-h-screen relative flex items-center justify-center px-4
        bg-neutral-950
        bg-[url('/logo.png')] bg-[length:160px_auto] bg-repeat
      "
      style={{ backgroundBlendMode: 'multiply' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-white/10 p-6 md:p-8 backdrop-blur-md shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Club Logo" className="h-10 w-10" />
          <div>
            <h1 className="text-xl font-semibold text-white">Create your member account</h1>
            <p className="text-sm text-white/70">Only verified members can publish a profile</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="mb-6 flex items-center justify-between gap-2">
          <StepDot n={1} label="Basic info" />
          <div className="h-[2px] flex-1 bg-white/15" />
          <StepDot n={2} label="Club details" />
          <div className="h-[2px] flex-1 bg-white/15" />
          <StepDot n={3} label="Academics" />
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5 md:col-span-2">
                <label className={labelCls} htmlFor="name">Full name</label>
                <input
                  id="name"
                  className={inputCls}
                  placeholder="Gokul"
                  value={s1.name}
                  onChange={(e) => setS1((p) => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className={labelCls} htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className={inputCls}
                  placeholder="you@college.edu"
                  value={s1.email}
                  onChange={(e) => setS1((p) => ({ ...p, email: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className={labelCls} htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className={inputCls}
                  placeholder="••••••••"
                  value={s1.password}
                  onChange={(e) => setS1((p) => ({ ...p, password: e.target.value }))}
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-1.5">
                <label className={labelCls} htmlFor="username">Username</label>
                <input
                  id="username"
                  className={inputCls}
                  placeholder="gokul_s"
                  value={s1.username}
                  onChange={(e) => setS1((p) => ({ ...p, username: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className={labelCls} htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  className={inputCls}
                  rows={3}
                  placeholder="Short intro (interests, projects, achievements)"
                  value={s1.bio}
                  onChange={(e) => setS1((p) => ({ ...p, bio: e.target.value }))}
                />
              </div>

              <div className="space-y-1.5">
                <label className={labelCls} htmlFor="pfp">Profile picture</label>
                <input
                  id="pfp"
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="block w-full text-sm text-white/80 file:mr-4 file:rounded-lg file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-black file:hover:bg-amber-600"
                />
              </div>

              {s1.pfpPreview && (
                <div className="space-y-1.5">
                  <span className="block text-sm text-white/80">Preview</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s1.pfpPreview}
                    alt="Preview"
                    className="h-24 w-24 rounded-xl object-cover border border-white/10"
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className={labelCls} htmlFor="domain">Domain</label>
                <select
                  id="domain"
                  className={selectCls}
                  value={s2.domain}
                  onChange={(e) => setS2((p) => ({ ...p, domain: e.target.value }))}
                  required
                >
                  <option value="" disabled className={optionCls}>
                    Select your domain
                  </option>
                  {domains.map((d) => (
                    <option key={d} value={d} className={optionCls}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className={labelCls} htmlFor="role">Role</label>
                <select
                  id="role"
                  className={selectCls}
                  value={s2.role}
                  onChange={(e) => setS2((p) => ({ ...p, role: e.target.value as Step2Role }))}
                  required
                >
                  <option value="" disabled className={optionCls}>
                    Select role
                  </option>
                  <option value="member" className={optionCls}>Member</option>
                  <option value="lead" className={optionCls}>Lead</option>
                  <option value="head" className={optionCls}>Head</option>
                  <option value="president" className={optionCls}>President</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className={labelCls} htmlFor="department">Department</label>
                <select
                  id="department"
                  className={selectCls}
                  value={s3.department}
                  onChange={(e) =>
                    setS3((p) => ({ ...p, department: e.target.value, specialization: '' }))
                  }
                  required
                >
                  <option value="" disabled className={optionCls}>
                    Select department
                  </option>
                  {departments.map((d) => (
                    <option key={d} value={d} className={optionCls}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className={labelCls} htmlFor="specialization">
                  {isIST ? 'IST Specialization' : 'Specialization'}
                </label>
                <select
                  id="specialization"
                  className={selectCls}
                  value={s3.specialization}
                  onChange={(e) => setS3((p) => ({ ...p, specialization: e.target.value }))}
                  required
                >
                  <option value="" disabled className={optionCls}>
                    Select specialization
                  </option>
                  {specs.map((sp) => (
                    <option key={sp} value={sp} className={optionCls}>
                      {sp}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className={labelCls} htmlFor="section">Section</label>
                <input
                  id="section"
                  className={inputCls}
                  placeholder="A / B / C …"
                  value={s3.section}
                  onChange={(e) => setS3((p) => ({ ...p, section: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className={labelCls} htmlFor="reg_no">Registration number</label>
                <input
                  id="reg_no"
                  className={inputCls}
                  placeholder="AH34J5E"
                  value={s3.reg_no}
                  onChange={(e) => setS3((p) => ({ ...p, reg_no: e.target.value }))}
                  required
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-white/70">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={back}
                  className="rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10"
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}
            </div>

            {step < 3 ? (
              <button
                type="button"
                onClick={next}
                className="rounded-xl bg-amber-500 px-4 py-2 font-medium text-black transition hover:bg-amber-600"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-amber-500 px-4 py-2 font-medium text-black transition hover:bg-amber-600 disabled:opacity-60"
              >
                {loading ? 'Submitting…' : 'Submit'}
              </button>
            )}
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-white/70">
          Already have an account?{' '}
          <Link href="/auth/login" className="underline decoration-dotted hover:text-white">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
