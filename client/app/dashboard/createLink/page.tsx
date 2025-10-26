// app/dashboard/createLink/page.tsx
'use client'; 

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation'; 
// ⬇️ CRITICAL FIX: Use reliable alias import for types and hook
import { useLinkContext, LinkItem } from  '@/context/LinkContext'; 

export default function CreateLinkPage() {
    // ⬇️ FIX: useLinkContext() call is correct here
    const { setLinks } = useLinkContext(); 
    const router = useRouter();
    
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        if (!title || !url) return;
        
        const newLink: LinkItem = {
            id: Date.now(),
            title: title,
            url: url,
            active: true,
        };

        // ⬇️ FIX: Correct type safety using LinkItem[]
        setLinks((prevLinks: LinkItem[]) => [...prevLinks, newLink]);

        router.push('/dashboard'); 
    };

    return (
        // ... (rest of the form content is correct)
        <div className="max-w-xl mx-auto mt-10 text-white">
            <h2 className="text-3xl font-bold mb-6">Create New Link</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-[var(--cc-card)] rounded-xl">
                {/* ... (input fields) */}
                
                <button type="submit" className="cc-add-button w-full py-3 rounded-lg font-semibold">
                    Save Link
                </button>
            </form>
        </div>
    );
}