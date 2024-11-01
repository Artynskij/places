import { ObjectScreen } from "@/screens/ObjectScreen/ObjectScreen";
interface IProps {
  params: { country: string; district: string; town: string; object: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
export async function generateMetadata({
  params,
}: {
  params: { object: string };
}) {
  return {
    title: `${process.env.BASE_NAME} | ${params.object}`,
  };
}
export default function FilterFilter({ params, searchParams }: IProps) {
  return <ObjectScreen params={params} searchParams={searchParams} />;
}
