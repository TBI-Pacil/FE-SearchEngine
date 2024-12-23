type SearchPageProps = {
  searchParams: Promise<{ q: string }>;
};

export default async function SearchPage({
  searchParams,
}: Readonly<SearchPageProps>) {
  const { q } = await searchParams;

  return <div>{q}</div>;
}
