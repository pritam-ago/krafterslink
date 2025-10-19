"use client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-lg relative">
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full cursor-pointer">
          P
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Your KrafterLink</h2>

        <div className="bg-gray-700 p-6 rounded-lg mb-4">
          <p className="text-gray-300 text-center mb-4">
            These are your active profile links:
          </p>
          <div className="flex flex-col space-y-3">
            <a
              href="#"
              className="bg-gray-600 hover:bg-gray-500 text-center py-2 rounded-lg"
            >
              GitHub
            </a>
            <a
              href="#"
              className="bg-gray-600 hover:bg-gray-500 text-center py-2 rounded-lg"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="bg-gray-600 hover:bg-gray-500 text-center py-2 rounded-lg"
            >
              Portfolio
            </a>
          </div>
        </div>

        <button
          onClick={() => router.push("/dashboard/createLink")}
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-lg w-full"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
