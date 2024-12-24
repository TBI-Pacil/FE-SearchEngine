import { cn } from '@/lib/utils';

const maxSuggestions = 10;

type SearchSuggestionProps = {
  suggestions?: string[];
  onClick?: (value: string) => void;
  activeIndex?: number;
};

export default function SearchSuggestion({
  suggestions,
  onClick,
  activeIndex = -1,
}: Readonly<SearchSuggestionProps>) {
  const handleClick = (suggestion: string) => {
    if (onClick) {
      onClick(suggestion);
    }
  };

  return (
    <ul className="rounded-b-xl border border-t-0 border-gray-300 p-3">
      {suggestions?.slice(0, maxSuggestions).map((suggestion, index) => {
        return (
          <li
            key={index}
            className={cn(
              'flex min-h-8 items-center rounded-sm p-1 hover:bg-gray-100',
              {
                'bg-gray-100': activeIndex === index,
              },
            )}
            onClick={() => handleClick(suggestion)}
          >
            {suggestion}
          </li>
        );
      })}
    </ul>
  );
}
