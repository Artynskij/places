import CountryScreen from "@/screens/CountryScreen/CountryScreen";
import { IPageProps } from "@/models/IType";

import { notFound } from "next/navigation";
import { EstablishmentService } from "@/Api/establishment/establishment.service";

export async function generateMetadata({
  params,
}: {
  params: { district: string };
}) {
  return {
    title: `${process.env.BASE_NAME} | ${params.district}`,
  };
}

interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    country: string;
    district: string;
  };
}
export default async function DistrictPage({ params, searchParams }: IProps) {
  const api = new EstablishmentService();

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
