"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [profileExists, setProfileExists] = useState<boolean | null>(null);

  useEffect(() => {
    // Simulate API check
    const timer = setTimeout(() => {
      const hasProfile = false; // change to true to simulate an existing profile
      setProfileExists(hasProfile);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (profileExists === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p className="animate-pulse text-lg">Checking your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-lg relative">
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full cursor-pointer">
          P
        </div>

        {profileExists ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Your KrafterLink</h2>
            <div className="bg-gray-700 p-6 rounded-lg mb-4">
              <p className="text-gray-300 text-center">
                Your existing KrafterLink is active.
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard/profile")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg w-full"
            >
              View Profile
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Create Your KrafterLink</h2>
            <p className="text-gray-300 text-center mb-6">
              You don't have a KrafterLink yet. Create one now!
            </p>
            <button
              onClick={() => router.push("/dashboard/createLink")}
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg w-full"
            >
              Create
            </button>
          </>
        )}
      </div>
    </div>
  );
}
