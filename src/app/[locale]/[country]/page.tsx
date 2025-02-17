import { Video } from "@/components/UI/Video/Video";

import Link from "next/link";
import type { Metadata } from "next";

import { IPageProps } from "@/models/IType";
import { unstable_setRequestLocale } from "next-intl/server";

import CountryScreen from "@/screens/CountryScreen/CountryScreen";
import { Loader } from "@/components/common/Loader/Loader";
import { ApiEstablishment } from "@/Api/Api";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { country: string };
}) {
  return {
    title: `${process.env.BASE_NAME} | ${params.country}`,
  };
}

interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    country: string;
  };
}

export default async function CountryPage({ params, searchParams }: IProps) {
  // Пример запроса данных через API (если данные нужны на сервере)
  const api = new ApiEstablishment();

  const data = await api.getEstablishmentByPagination({
    pagination: { page: 1, pageSize: 5 },
    lang: params.locale,
  });
  if (!data) notFound();
  return (
    <>
      <CountryScreen
        typePage="country"
        params={params}
        searchParams={searchParams}
        data={data}
      />
    </>
  );
}
