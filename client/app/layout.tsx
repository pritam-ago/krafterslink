// /dashboard/layout.tsx
'use client'; // Must be a client component to manage state

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { Link as LinkIcon, User } from 'lucide-react'; 
// Import the context and provider to share state
import { LinkContext, LinkProvider } from './context/LinkContext';

// Define the LinkItem interface here for clarity
interface LinkItem {
    id: number;
    title: string;
    url: string;
    active: boolean;
}

// 1. Define the initial state (Same as was in /dashboard/page.tsx)
const initialLinks: LinkItem[] = [
    { id: 1, title: 'Check out our Instagram', url: 'https://instagram.com/club', active: true },
    { id: 2, title: 'Message us on WhatsApp', url: 'https://wa.me/invite', active: true },
    { id: 3, title: 'Our main GitHub Repository', url: 'https://github.com/codekrafters', active: true },
    { id: 4, title: 'Find us on LinkedIn', url: 'https://linkedin.com/company/codekrafters', active: true },
    { id: 5, title: 'Follow our Twitter/X', url: 'https://twitter.com/codekrafters', active: false },
];

// NOTE: FOR THIS SOLUTION TO WORK, YOU MUST CREATE THE CONTEXT FILES BELOW.
// ******************************************************************************

// Navigation Component (Unchanged)
const DashboardNav = () => (
    <nav className="p-4 bg-[var(--cc-card)] shadow-lg flex justify-between items-center w-full">
        <span className="text-xl font-extrabold text-[var(--cc-primary)]">
            CodeKrafters Club
        </span>
        <div className="space-x-4 flex items-center">
            <Link href="/dashboard" className="text-gray-300 hover:text-[var(--cc-primary)] flex items-center">
                <LinkIcon className="w-5 h-5 mr-1" /> Links
            </Link>
            <Link href="/profile" className="text-gray-300 hover:text-[var(--cc-primary)] flex items-center">
                <User className="w-5 h-5 mr-1" /> Profile
            </Link>
            <div className="w-8 h-8 rounded-full bg-[var(--cc-primary)] cursor-pointer"></div>
        </div>
    </nav>
);

// New component to manage and provide state
const DashboardContent = ({ children }: { children: ReactNode }) => {
    const [links, setLinks] = useState<LinkItem[]>(initialLinks);

    return (
        <LinkContext.Provider value={{ links, setLinks }}>
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
        </LinkContext.Provider>
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