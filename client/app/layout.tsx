// app/layout.tsx
// This file is a Server Component and MUST NOT contain 'use client'

import './globals.css';
import { ReactNode } from 'react';
import { LinkProvider } from './context/LinkContext'; // Import the provider component

// 1. Define the Client Component Wrapper (to hold the state provider)
// This is necessary because LinkProvider uses React state ('use client' features).
const ClientWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <LinkProvider>
            <main className="min-h-screen flex flex-col items-center">
                {children}
            </main>
        </LinkProvider>
    );
};


type RootLayoutProps = {
  children: ReactNode;
};

// 2. Export the Root Layout (Server Component)
// This must contain the <html> and <body> tags.
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      {/* ⬇️ The <body> tag is REQUIRED */}
      <body>
        {/* Inject the client-side provider wrapper inside the body */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}