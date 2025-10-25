'use client'; 

import Link from 'next/link';
import { Edit, Trash2, Plus, Menu, Link as LinkIcon, Instagram, MessageCircle, Github, Linkedin, Twitter } from 'lucide-react'; 
import { LinkPreview } from '../components/LinkPreview.tsx'; 
import { useState } from 'react';

interface LinkItem {
    id: number;
    title: string;
    url: string;
    active: boolean;
}

export default function DashboardPage() {
    // Initial State - Titles are now generic/editable by default
    const [links, setLinks] = useState<LinkItem[]>([
        { id: 1, title: 'Check out our Instagram', url: 'https://instagram.com/club', active: true },
        { id: 2, title: 'Message us on WhatsApp', url: 'https://wa.me/invite', active: true },
        { id: 3, title: 'Our main GitHub Repository', url: 'https://github.com/codekrafters', active: true },
        { id: 4, title: 'Find us on LinkedIn', url: 'https://linkedin.com/company/codekrafters', active: true },
        { id: 5, title: 'Follow our Twitter/X', url: 'https://twitter.com/codekrafters', active: false },
    ]);

    const [profile] = useState({
        username: 'codekrafters_club', 
        bio: 'Official links for CodeKrafters Club',
        themeColor: '#1A1A1A', // Dark Gray for the preview background
    });

    // Function to handle dynamic Title update
    const handleTitleChange = (id: number, newTitle: string) => {
        setLinks(links.map(link => 
            link.id === id ? { ...link, title: newTitle } : link
        ));
    };

    const handleDelete = (id: number) => {
        setLinks(links.filter(link => link.id !== id));
    };
    
    const handleToggle = (id: number) => {
        setLinks(links.map(link => 
            link.id === id ? { ...link, active: !link.active } : link
        ));
    };

    const getLinkIcon = (title: string) => {
        if (title.includes('Instagram')) return <Instagram className="w-5 h-5 text-pink-500" />;
        if (title.includes('WhatsApp')) return <MessageCircle className="w-5 h-5 text-green-500" />;
        if (title.includes('GitHub')) return <Github className="w-5 h-5 text-white" />;
        if (title.includes('LinkedIn')) return <Linkedin className="w-5 h-5 text-blue-500" />;
        if (title.includes('Twitter')) return <Twitter className="w-5 h-5 text-sky-400" />;
        return <LinkIcon className="w-5 h-5 text-gray-400" />;
    };


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            
            {/* Left Column: Link Management (2/3) */}
            <div className="lg:col-span-2 text-white">
                
                <h2 className="text-3xl font-bold mb-4 flex justify-between items-center">
                    Links
                    {/* "View Profile" link is removed completely */}
                </h2>
                
                {/* Static Profile Info Block is REMOVED */}

                {/* Add Link Button */}
                <Link href="/dashboard/createLink" 
                    className="cc-add-button flex items-center justify-center w-full py-4 mb-8"
                >
                    <Plus className="w-6 h-6 mr-2" /> Add New Link
                </Link>
                
                {/* Link List */}
                <div className="space-y-4">
                    {links.map((link) => (
                        <div 
                            key={link.id} 
                            // High contrast card background
                            className="flex items-center p-4 rounded-lg bg-[var(--cc-card)] shadow-md border border-gray-800"
                        >
                            <Menu className="w-5 h-5 mr-3 text-gray-500 cursor-grab flex-shrink-0" />
                            
                            <div className="flex-1">
                                {/* Dynamic Input for Title - HIGH CONTRAST */}
                                <input 
                                    type="text"
                                    value={link.title}
                                    onChange={(e) => handleTitleChange(link.id, e.target.value)}
                                    // Ensure input background is dark and text is clearly visible
                                    className="w-full p-1 font-semibold bg-transparent text-lg text-white focus:outline-none focus:border-b border-gray-700"
                                    placeholder="Link Title"
                                />
                                {/* Input for URL - HIGH CONTRAST */}
                                <input 
                                    type="text"
                                    defaultValue={link.url}
                                    className="w-full p-1 text-sm bg-transparent text-gray-400 focus:outline-none focus:border-b border-gray-700"
                                    placeholder="URL"
                                />
                            </div>

                            <div className="flex items-center space-x-3 ml-4 flex-shrink-0">
                                {getLinkIcon(link.title)}
                                
                                {/* Toggle Switch */}
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={link.active} onChange={() => handleToggle(link.id)} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--cc-primary)]"></div>
                                </label>
                                
                                <button onClick={() => handleDelete(link.id)} className="text-gray-400 hover:text-red-500">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Live Preview */}
            <div className="lg:col-span-1 hidden lg:block">
                <LinkPreview 
                    username={profile.username}
                    bio={profile.bio}
                    links={links} // Passes the updated state
                    themeColor={profile.themeColor} 
                />
            </div>
        </div>
    );
}