import CountryScreen from "@/screens/CountryScreen/CountryScreen";
import { IPageProps } from "@/models/IType";
import { ApiEstablishment } from "@/Api/Api";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { district: string };
}) {
  // console.log(params);
  return {
    title: `${process.env.BASE_NAME} | ${params.district}`,
  };
}

// interface IProps {
//   params: { country: string; district: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// }
interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    country: string;
    district: string;
  };
}
export default async function DistrictPage({ params, searchParams }: IProps) {
  const api = new ApiEstablishment();

  const data = await api.getEstablishmentByPagination({
    pagination: { page: 1, pageSize: 5 },
    lang: params.locale,
  });
  if (!data) notFound();
  return (
    <>
      <CountryScreen
        typePage="district"
        params={params}
        searchParams={searchParams}
        data={data}
      />
    </>
  );
}
