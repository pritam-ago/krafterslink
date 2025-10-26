// app/dashboard/layout.tsx
'use client'; 

import { ReactNode } from 'react';
import Link from 'next/link';
import { Link as LinkIcon, User } from 'lucide-react'; 
// No imports from LinkContext needed here, as the state is provided globally.

// Navigation Component (Unchanged)
const DashboardNav = () => (
    // ...
);

// New component to manage and provide state
const DashboardContent = ({ children }: { children: ReactNode }) => {
    // ⬇️ FIX: Remove ALL state logic (useState, LinkContext.Provider). 
    // State is provided by the root layout.

    return (
        <div className="w-full">
            <DashboardNav />
            <div className="flex min-h-[calc(100vh-64px)]">
                <div className="w-60 bg-[var(--cc-card)] p-4 text-sm hidden lg:block">
                    <h3 className="text-lg font-semibold mb-4">My Linktree</h3>
                    <ul className="space-y-1">
                        <li className="p-2 rounded-lg bg-gray-700/50 font-bold text-[var(--cc-primary)]">
                            <LinkIcon className="w-4 h-4 inline mr-2"/> Links
                        </li>
                    </ul>
                </div>
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardContent>
        {children}
    </DashboardContent>
  );
}