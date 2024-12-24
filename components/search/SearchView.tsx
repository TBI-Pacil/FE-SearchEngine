import { cn } from '@/lib/utils';
import { SearchResultType } from '@/types/search';

type SearchViewProps = {
  className?: string;
  result: SearchResultType;
};

export default function SearchView({
  className,
  result,
}: Readonly<SearchViewProps>) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-lg border border-gray-300 p-6 shadow-[0_0_4px_0_rgba(130,130,130,0.65)]',
        className,
      )}
    >
      <h1 className="text-3xl font-semibold">{result?.title}</h1>
      <p className="text-base text-slate-700">{result?.text}</p>
    </div>
  );
}
