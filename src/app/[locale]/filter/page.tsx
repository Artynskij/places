import FilterScreen from "@/screens/FilterScreen/FilterScreen";

export default function FilterPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <FilterScreen params={params} searchParams={searchParams} />;
}
