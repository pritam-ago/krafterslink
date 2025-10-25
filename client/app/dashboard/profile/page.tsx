'use client'; 

import { FormEvent, useState } from 'react';

export default function ProfilePage() {
  const [username, setUsername] = useState('CodeCraftersClub');
  const [bio, setBio] = useState('Building and sharing projects. Join the journey!');

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    console.log('Saving profile data:', { username, bio });
    alert('Profile updated!');
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full bg-yellow-600 border-4 border-[var(--cc-primary)] flex-shrink-0">
          {/* Profile Image */}
        </div>
        <button type="button" className="text-sm font-semibold text-[var(--cc-primary)] hover:opacity-80">
          Change Profile Picture
        </button>
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-2">Linktree Handle</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 rounded-lg bg-[var(--cc-background)] border border-gray-600"
        />
        <p className="text-xs mt-1 text-gray-500">Your public link will be: yoursite.com/{username}</p>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium mb-2">Bio/Description</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          className="w-full p-3 rounded-lg bg-[var(--cc-background)] border border-gray-600"
        />
      </div>

      <button type="submit" className="cc-primary-button w-full bg-[var(--cc-primary)] text-black py-3 rounded-lg font-semibold">
        Save Profile
      </button>
    </form>
  );
}