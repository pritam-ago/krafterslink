import { ReactNode } from 'react';
import Link from 'next/link';
import { Link as LinkIcon, User } from 'lucide-react'; 

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardNav = () => (
  <nav className="p-4 bg-[var(--cc-card)] shadow-lg flex justify-between items-center w-full">
    {/* CLUB NAME ADDED HERE */}
    <span className="text-xl font-extrabold text-[var(--cc-primary)]">
      CodeKrafters Club
    </span>
    <div className="space-x-4 flex items-center">
      {/* Navigation links */}
      <Link href="/dashboard" className="text-gray-300 hover:text-[var(--cc-primary)] flex items-center">
        <LinkIcon className="w-5 h-5 mr-1" /> Links
      </Link>
      <Link href="/profile" className="text-gray-300 hover:text-[var(--cc-primary)] flex items-center">
        <User className="w-5 h-5 mr-1" /> Profile
      </Link>
      {/* This mimics the small profile/settings corner */}
      <div className="w-8 h-8 rounded-full bg-[var(--cc-primary)] cursor-pointer"></div>
    </div>
  </nav>
);

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="w-full">
      <DashboardNav />
      <div className="flex min-h-[calc(100vh-64px)]">
         {/* Simplified Sidebar Navigation */}
         <div className="w-60 bg-[var(--cc-card)] p-4 text-sm hidden lg:block">
            <h3 className="text-lg font-semibold mb-4">My Linktree</h3>
            <ul className="space-y-1">
                {/* Only 'Links' remains active */}
                <li className="p-2 rounded-lg bg-gray-700/50 font-bold text-[var(--cc-primary)]">
                    <LinkIcon className="w-4 h-4 inline mr-2"/> Links
                </li>
            </ul>
            {/* The "Finish setup" bar is removed */}
         </div>
         {/* Main Content Area */}
         <div className="flex-1 overflow-auto">
             {children}
         </div>
      </div>
    </div>
  );
}