import SERP from '@/components/search/SERP';
import { getSearchResult } from '@/lib/data';

type SearchPageProps = {
  searchParams: Promise<{ q: string }>;
};

export default async function SearchPage({
  searchParams,
}: Readonly<SearchPageProps>) {
  const { q } = await searchParams;
  const searchResult = await getSearchResult(q);

  return <SERP q={q} searchResult={searchResult} />;
}
