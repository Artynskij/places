import CountryScreen from "@/screens/CountryScreen/CountryScreen";
import { IPageProps } from "@/models/IType";
import { ApiEstablishment } from "@/Api/Api";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { town: string };
}) {
  return {
    title: `${process.env.BASE_NAME} | ${params.town}`,
  };
}
interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    country: string;
    district: string;
    town: string;
  };
}
export default async function TownPage({ params, searchParams }: IProps) {
  const api = new ApiEstablishment();

  const data = await api.getEstablishmentByPagination({
    pagination: { page: 1, pageSize: 5 },
    lang: params.locale,
  });
  if (!data) notFound();
  return (
    <>
      <CountryScreen
        typePage="town"
        params={params}
        searchParams={searchParams}
        data={data}
      />
    </>
  );
}
