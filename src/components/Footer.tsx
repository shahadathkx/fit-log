import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-800 bg-[#0a0a0a] py-6 px-4 sm:px-6 mt-10 sm:mt-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        <Link href="/" className="flex items-center gap-2">
          <Image src={logoImage} alt="FITLOG Logo" height={20} className="h-5 w-auto" />
          <span className="text-lg font-black tracking-widest text-white mt-0.5 font-[family-name:var(--font-oswald)]">FITLOG</span>
        </Link>

        <p className="text-neutral-500 text-xs font-medium">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
