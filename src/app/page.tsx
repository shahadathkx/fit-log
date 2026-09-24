import React from 'react';
import Hero from '@/components/Hero';
import Library from '@/components/Library';

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Library />
    </div>
  );
};

export default page;