import { SearchResultType } from '@/types/search';

export type SearchResultReponse = {
  isError: boolean;
  results: SearchResultType[];
  message?: string;
};

export async function getSearchResult(q: string): Promise<SearchResultReponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/search/?q=${q}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const { results } = await response.json();

    return { isError: false, results };
  } catch {
    return {
      isError: true,
      message: 'Failed to fetch search results',
      results: [],
    };
  }
}
