// RootLayoutClient.tsx (or app/layout.tsx if you converted it to client)
'use client';

import React from 'react'; // <-- Import React
// ⬇️ FIX: Import the LinkProvider component from your context file
import { LinkProvider } from '@/context/LinkContext'; // Use alias if configured
// OR if using relative path:
// import { LinkProvider } from '../context/LinkContext';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  // Assuming the goal is to wrap the whole app in the provider
  return <LinkProvider>{children}</LinkProvider>; 
}