'use client'; 

import { FormEvent, useState } from 'react';

export default function CreateLinkPage() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitting new link:', { title, url });
    // In a real app, this would save the link to the database and update the dashboard state.
    alert('Link creation simulated!');
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Create New Link</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-[var(--cc-card)] rounded-xl">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">Link Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., CodeCrafters Discord"
            required
            className="w-full p-3 rounded-lg bg-[var(--cc-background)] border border-gray-600 focus:border-[var(--cc-primary)] focus:ring-1 focus:ring-[var(--cc-primary)]"
          />
        </div>
        
        <div>
          <label htmlFor="url" className="block text-sm font-medium mb-2">Destination URL</label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://discord.gg/..."
            required
            className="w-full p-3 rounded-lg bg-[var(--cc-background)] border border-gray-600 focus:border-[var(--cc-primary)] focus:ring-1 focus:ring-[var(--cc-primary)]"
          />
        </div>
        
        <button type="submit" className="cc-primary-button w-full bg-[var(--cc-primary)] text-black py-3 rounded-lg font-semibold">
          Save Link
        </button>
      </form>
    </div>
  );
}