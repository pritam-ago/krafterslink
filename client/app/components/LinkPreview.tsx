// /components/LinkPreview.tsx
"use client"; // Make sure this component is a client component

import { Link as LinkIcon, Instagram, MessageCircle, Github, Linkedin, Twitter } from 'lucide-react'; 
// We are not importing LinkItem from context directly here, so we redefine it or ensure it's available.
// For simplicity, let's redefine it if it's not globally available or passed down.
// However, if LinkPreview is used within a LinkContext, it's better to import from there.
// For consistency with previous steps, let's assume LinkItem is imported or defined globally once.
// For now, if LinkItem is only defined in LinkContext, you should import it:
import { LinkItem } from '../context/LinkContext'; // Make sure this path is correct if not using alias.

interface LinkPreviewProps {
  username: string;
  bio: string;
  links: LinkItem[];
  themeColor: string; // This will now be the main background, but we'll use a specific color for boxes.
}

// Helper to get the correct icon for the preview button
const getLinkIcon = (title: string) => {
    // These icons currently return only the icon. We'll modify the style directly in the JSX for link boxes.
    if (title.includes('Instagram')) return <Instagram className="w-5 h-5" />;
    if (title.includes('WhatsApp')) return <MessageCircle className="w-5 h-5" />;
    if (title.includes('GitHub')) return <Github className="w-5 h-5" />;
    if (title.includes('LinkedIn')) return <Linkedin className="w-5 h-5" />;
    if (title.includes('Twitter') || title.includes('X')) return <Twitter className="w-5 h-5" />;
    return <LinkIcon className="w-5 h-5" />;
};


export function LinkPreview({ username, bio, links, themeColor }: LinkPreviewProps) {
  // Main frame style. We'll make it a lighter dark background.
  const mainFrameBgColor = '#1e1e1e'; // A slightly lighter dark gray for the main preview area.
  
  const activeLinks = links.filter(link => link.active);

  return (
    <div className="sticky top-4 w-full h-[90vh] bg-[var(--cc-card)] rounded-2xl p-4 shadow-2xl overflow-hidden">
      
      {/* Simulate Phone/Device Frame - The "big black box" */}
      <div className="w-full h-full rounded-xl p-4 overflow-y-auto text-white" style={{ backgroundColor: mainFrameBgColor }}>
        
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          {/* Logo in a small circle */}
          <div className="w-24 h-24 rounded-full bg-gray-900 mb-3 flex items-center justify-center border-2 border-[var(--cc-primary)] overflow-hidden p-1">
            {/* Using an <img> tag for the provided logo */}
            {/* You'll need to save the provided image in your public folder, e.g., /public/ck-logo.png */}
            <img src="/ck-logo.png" alt="CodeKrafters Logo" className="w-full h-full object-contain" />
          </div>
          
          <h1 className="text-xl font-bold text-white">@{username}</h1>
          <p className="text-sm text-gray-400 mt-1 opacity-80">
            {bio || 'Add bio'}
          </p>
        </div>

        {/* Links Section - Each link in a white box */}
        <div className="space-y-3">
          {activeLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              // ⬇️ MODIFIED: White background box, black text, with a subtle border
              className="w-full flex items-center justify-center py-3 rounded-xl font-semibold border border-gray-200 bg-white text-black hover:opacity-90 transition-opacity relative shadow-md"
            >
              {/* Icon before text - dynamically colored if needed, or default black on white */}
              <span className="mr-2 text-gray-700">{getLinkIcon(link.title)}</span> {/* Icons now dark gray on white box */}
              {link.title}
              
              {/* FOOT OVER: CodeKrafter Club */}
              <div className="absolute bottom-0 left-0 right-0 text-center pointer-events-none mb-0.5">
                 <span className="text-xs text-gray-500">CodeKrafters Club</span> {/* Subtle gray text */}
              </div>
            </a>
          ))}
        </div>
        
        {/* Simple Footer/Branding */}
        <div className="mt-8 text-center text-xs">
           <p className="text-gray-500">Powered by CodeKrafters Club</p>
        </div>
      </div>
    </div>
  );
}