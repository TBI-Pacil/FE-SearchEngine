'use client';

import SearchHeader from '@/components/search/SearchHeader';
import SearchResult from '@/components/search/SearchResult';
import { useEffect, useState } from 'react';
import SearchView from '@/components/search/SearchView';
import { SearchResultReponse } from '@/lib/data';

type SERPProps = {
  q: string;
  searchResult: SearchResultReponse;
};

export default function SERP({
  q,
  searchResult: { isError, results },
}: Readonly<SERPProps>) {
  const [activeResultIndex, setActiveResultIndex] = useState(0);
  const [activeResult, setActiveResult] = useState(results[0]);

  const handleClick = (index: number) => {
    setActiveResultIndex(index);
    setActiveResult(results[index]);
  };

  useEffect(() => {
    setActiveResultIndex(0);
    setActiveResult(results[0]);
  }, [results]);

  return (
    <div className="flex min-h-screen flex-col">
      <SearchHeader q={q} />
      <main className="relative flex flex-1 gap-4 p-2 sm:p-4">
        {isError && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <p className="text-center lg:text-2xl">
              Failed to fetch search results. Please try again later!
            </p>
          </div>
        )}
        {!isError && (
          <>
            <SearchResult
              results={results}
              activeIndex={activeResultIndex}
              onClick={handleClick}
              className="min-h-[calc(100vh-96px)] flex-1"
            />
            <SearchView
              result={activeResult}
              className="sticky top-20 hidden h-[calc(100vh-96px)] flex-1 self-start lg:flex"
            />
          </>
        )}
      </main>
    </div>
  );
}
