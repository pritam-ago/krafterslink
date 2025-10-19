"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateLinkPage() {
  const router = useRouter();
  const [links, setLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState("");

  const addLink = () => {
    if (newLink.trim()) {
      setLinks([...links, newLink]);
      setNewLink("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-3xl flex gap-6">
        {/* Left Side - Add Links */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-center">Add Links</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter your link..."
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg text-black"
            />
            <button
              onClick={addLink}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {links.map((link, i) => (
              <div
                key={i}
                className="bg-gray-700 p-2 rounded-lg text-sm overflow-hidden text-ellipsis"
              >
                {link}
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push("/dashboard/profile")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg w-full mt-6"
          >
            Create
          </button>
        </div>

        {/* Right Side - Preview */}
        <div className="flex-1 bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Preview</h3>
          {links.length > 0 ? (
            <div className="flex flex-col space-y-3">
              {links.map((link, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-gray-600 hover:bg-gray-500 text-center py-2 rounded-lg"
                >
                  {link}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">No links added yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
