import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <h1 className="text-4xl font-bold">Welcome to KraftersLink</h1>
      <p className="mt-3 text-muted-foreground text-sm md:text-base">
        A platform that connects creators, innovators, and professionals to collaborate and grow together.
      </p>

      {/* Add image here */}
      <div className="mt-10 flex justify-center">
        <Image
          src="/codekrafters_white_final.png"
          alt="Team collaboration illustration"
          width={200}
          height={200}
          className="rounded-lg shadow-md"
          priority
        />
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button className="px-5 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition">
          Get Started
        </button>
       <button className="px-5 py-2 rounded-md border border-input text-sm text-white hover:bg-yellow-400 hover:text-black transition">
         Learn More
       </button>

      </div>
          
      <footer className="mt-16 text-xs text-muted-foreground">
        © {new Date().getFullYear()} KraftersLink. All rights reserved.
      </footer>
    </div>
  );
}
