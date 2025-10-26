// /components/LinkPreview.tsx
"use client"; 

import { Link as LinkIcon, Instagram, MessageCircle, Github, Linkedin, Twitter } from 'lucide-react'; 
// ⬇️ CRITICAL FIX: Use alias @/
import { LinkItem } from '@/context/LinkContext'; 

interface LinkPreviewProps {
  username: string; 
  bio: string;
  links: LinkItem[];
  themeColor: string; 
}

// Helper to get the correct icon (kept for brevity)
const getLinkIcon = (title: string) => {
    if (title.includes('Instagram')) return <Instagram className="w-5 h-5" />;
    if (title.includes('WhatsApp')) return <MessageCircle className="w-5 h-5" />;
    if (title.includes('GitHub')) return <Github className="w-5 h-5" />;
    if (title.includes('LinkedIn')) return <Linkedin className="w-5 h-5" />;
    if (title.includes('Twitter') || title.includes('X')) return <Twitter className="w-5 h-5" />;
    return <LinkIcon className="w-5 h-5" />;
};


export function LinkPreview({ username, bio, links, themeColor }: LinkPreviewProps) {
    // ... (rest of the component logic remains the same)
}