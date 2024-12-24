'use client';

import Image from 'next/image';
import SearchBar from '@/components/search/SearchBar';
import { useState } from 'react';

const defaultSuggestions = [
  'What is the origin of Covid-19?',
  'What causes death from Covid-19?',
  'How does the coronavirus respond to changes in the weather?',
  'What type of hand sanitizer is needed to destroy Covid-19?',
  'What types of rapid testing for Covid-19 have been developed?',
];

export default function Home() {
  const [suggestions, setSuggestions] = useState<string[]>(defaultSuggestions);

  const updateSuggestions = (value: string) => {
    const newSuggestions = value
      ? defaultSuggestions.filter((suggestion) => suggestion.startsWith(value))
      : defaultSuggestions;

    setSuggestions(newSuggestions);
  };

  return (
    <main className="mx-4 flex min-h-screen flex-col items-center justify-center">
      <div className="flex h-[350px] w-full max-w-[600px] flex-col gap-4">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/icon.svg"
            alt="Logo"
            width={96}
            height={96}
            loading="eager"
            priority
          />
          <h1 className="text-h1 font-semibold">Covearch</h1>
        </div>
        <SearchBar suggestions={suggestions} onChange={updateSuggestions} />
      </div>
    </main>
  );
}
