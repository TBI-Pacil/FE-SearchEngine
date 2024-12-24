'use client';

import { cn } from '@/lib/utils';

import { SearchResultType } from '@/types/search';

type SearchResultProps = {
  results: SearchResultType[];
  activeIndex?: number;
  onClick?: (index: number) => void;
  className?: string;
};

export default function SearchResult({
  results,
  activeIndex,
  onClick,
  className,
}: Readonly<SearchResultProps>) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {results.length === 0 && (
        <p className="flex items-center justify-center">No results found</p>
      )}
      {results.map((result, index) => (
        <article
          key={index}
          className={cn(
            'flex max-w-[800px] flex-col gap-1 break-all rounded-lg border border-gray-300 p-4 transition-all hover:shadow-[0_0_4px_0_rgba(130,130,130,0.65)]',
            {
              'bg-[#2f88ff]': index === activeIndex,
            },
          )}
          onClick={() => onClick?.(index)}
        >
          <div
            className={cn('font-semibold lg:text-lg', {
              'text-white': index === activeIndex,
            })}
          >
            {result.title}
          </div>
          <p
            className={cn(
              'text-body2 max-h-[360px] overflow-auto break-all lg:line-clamp-3',
              {
                'text-white': index === activeIndex,
                'line-clamp-3 text-slate-700': index !== activeIndex,
              },
            )}
          >
            {result.text}
          </p>
        </article>
      ))}
    </div>
  );
}
