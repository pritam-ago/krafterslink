// context/LinkContext.tsx
"use client"; 

import React, { createContext, useContext, Dispatch, SetStateAction, ReactNode, useState } from 'react';

export interface LinkItem {
    id: number;
    title: string;
    url: string;
    active: boolean;
}

interface LinkContextType {
    links: LinkItem[];
    setLinks: Dispatch<SetStateAction<LinkItem[]>>;
}

export const LinkContext = createContext<LinkContextType | undefined>(undefined);

const initialLinks: LinkItem[] = [
    { id: 1, title: 'Instagram', url: 'Enter your Instagram Url', active: true },
    { id: 2, title: 'WhatsApp', url: 'Enter your WhatsApp Invite Link', active: true },
    { id: 3, title: 'GitHub Repository', url: 'Enter your GitHub Url', active: true },
    { id: 4, title: 'LinkedIn', url: 'Enter your LinkedIn Url', active: true },
    { id: 5, title: 'Twitter/X', url: 'Enter your Twitter/X Url', active: true },
];

export const LinkProvider = ({ children }: { children: ReactNode }) => {
    const [links, setLinks] = useState<LinkItem[]>(initialLinks);
    
    return (
        <LinkContext.Provider value={{ links, setLinks }}>
            {children}
        </LinkContext.Provider>
    );
};

export const useLinkContext = () => {
    const context = useContext(LinkContext);
    if (!context) {
        throw new Error('useLinkContext must be used within a LinkProvider');
    }
    return context;
};

export type { 'LinkItem' };