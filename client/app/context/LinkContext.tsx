// context/LinkContext.tsx

"use client"; // ⬅️ CRITICAL FIX: Mark this file as a Client Module

import React, { createContext, useContext, Dispatch, SetStateAction, ReactNode, useState } from 'react';

// Define the LinkItem structure
export interface LinkItem {
    id: number;
    title: string;
    url: string;
    active: boolean;
}

// Define the shape of the Context
interface LinkContextType {
    links: LinkItem[];
    setLinks: Dispatch<SetStateAction<LinkItem[]>>;
}

// Create the Context
export const LinkContext = createContext<LinkContextType | undefined>(undefined);

// Define the initial state here
const initialLinks: LinkItem[] = [
    { id: 1, title: 'Check out our Instagram', url: 'https://instagram.com/club', active: true },
    { id: 2, title: 'Message us on WhatsApp', url: 'https://wa.me/invite', active: true },
    { id: 3, title: 'Our main GitHub Repository', url: 'https://github.com/codekrafters', active: true },
    { id: 4, title: 'Find us on LinkedIn', url: 'https://linkedin.com/company/codekrafters', active: true },
    { id: 5, title: 'Follow our Twitter/X', url: 'https://twitter.com/codekrafters', active: true },
];

/**
 * The LinkProvider component that holds and manages the global state.
 */
export const LinkProvider = ({ children }: { children: ReactNode }) => {
    // ⬇️ useState is now valid because of "use client"
    const [links, setLinks] = useState<LinkItem[]>(initialLinks);
    
    return (
        <LinkContext.Provider value={{ links, setLinks }}>
            {children}
        </LinkContext.Provider>
    );
};


// Custom hook to consume the link context
export const useLinkContext = () => {
    // ⬇️ useContext is now valid because of "use client"
    const context = useContext(LinkContext);
    if (!context) {
        throw new Error('useLinkContext must be used within a LinkProvider');
    }
    return context;
};

