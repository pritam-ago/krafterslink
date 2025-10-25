// /components/LinkPreview.tsx
import { Link as LinkIcon, Instagram, MessageCircle, Github, Linkedin, Twitter } from 'lucide-react'; 

interface LinkItem {
  id: number;
  title: string;
  url: string;
  active: boolean;
}

interface LinkPreviewProps {
  username: string;
  bio: string;
  links: LinkItem[];
  themeColor: string;
}

// Helper to get the correct icon for the preview button
const getLinkIcon = (title: string) => {
    if (title.includes('Instagram')) return <Instagram className="w-5 h-5" />;
    if (title.includes('WhatsApp')) return <MessageCircle className="w-5 h-5" />;
    if (title.includes('GitHub')) return <Github className="w-5 h-5" />;
    if (title.includes('LinkedIn')) return <Linkedin className="w-5 h-5" />;
    if (title.includes('Twitter') || title.includes('X')) return <Twitter className="w-5 h-5" />;
    return <LinkIcon className="w-5 h-5" />;
};


export default function LinkPreview({ username, bio, links, themeColor }: LinkPreviewProps) {
  const frameStyle = {
    backgroundColor: themeColor,
  };
  
  const activeLinks = links.filter(link => link.active);

  return (
    <div className="sticky top-4 w-full h-[90vh] bg-[var(--cc-card)] rounded-2xl p-4 shadow-2xl overflow-hidden">
      
      {/* Simulate Phone/Device Frame */}
      <div className="w-full h-full rounded-xl p-4 overflow-y-auto text-white" style={frameStyle}>
        
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gray-600 mb-3 border-2 border-[var(--cc-primary)]"></div>
          
          <h1 className="text-xl font-bold text-white">@{username}</h1>
          <p className="text-sm text-gray-400 mt-1 opacity-80">
            {bio || 'Add bio'}
          </p>
        </div>

        {/* Links Section */}
        <div className="space-y-3">
          {activeLinks.map((link) => (
            <a
              key={link.id}
              href={link.url} // Redirect functionality
              target="_blank"
              rel="noopener noreferrer"
              // Link card style: Black text on Yellow primary color
              className="w-full flex items-center justify-center py-3 rounded-xl font-semibold border-2 border-transparent bg-[var(--cc-primary)] text-black hover:opacity-90 transition-opacity relative"
            >
              {/* Icon before text */}
              <span className="mr-2">{getLinkIcon(link.title)}</span>
              {link.title}
              
              {/* FOOT OVER: CodeKrafter Club */}
              <div className="absolute bottom-0 left-0 right-0 text-center pointer-events-none mb-0.5">
                 <span className="text-xs text-black/50">CodeKrafters Club</span>
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