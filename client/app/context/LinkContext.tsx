// /context/LinkContext.tsx
import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

// Define the LinkItem structure
interface LinkItem {
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

// Create the Context with a default (null) value
export const LinkContext = createContext<LinkContextType | undefined>(undefined);

// Custom hook to use the link context
export const useLinkContext = () => {
    const context = useContext(LinkContext);
    if (!context) {
        throw new Error('useLinkContext must be used within a LinkProvider');
    }
    return context;
};