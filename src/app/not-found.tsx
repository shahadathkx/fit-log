import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-[#ccff00] text-8xl font-black uppercase tracking-tighter font-[family-name:var(--font-oswald)] mb-4">
        404
      </h1>
      <h2 className="text-white text-2xl font-bold uppercase tracking-wider mb-6">
        Page Not Found
      </h2>
      <p className="text-neutral-400 max-w-md mb-8">
        The workout or page you are looking for doesn't exist or has been moved. Keep your momentum going and head back to the library.
      </p>
      <Link 
        href="/"
        className="flex items-center gap-2 bg-[#ccff00] hover:bg-[#d4ff33] text-black font-extrabold px-8 py-4 rounded-xl transition-colors"
      >
        <Home className="w-5 h-5" />
        Return Home
      </Link>
    </div>
  );
}
