import type { Metadata } from "next";

import { IPageProps } from "@/models/IType";
import { unstable_setRequestLocale } from "next-intl/server";

import { Loader } from "@/components/common/Loader/Loader";
import CountriesScreen from "@/screens/CountriesScreen/CountriesScreen";
import { ApiArticle } from "@/Api/Api";

export async function generateMetadata({ params }: { params: null }) {
  return {
    title: `${process.env.BASE_NAME} | countries`,
  };
}

interface IProps extends IPageProps {
  params: IPageProps["params"] & {};
}

export default function CountriesPage({ params, searchParams }: IProps) {
  return (
    <>
      <CountriesScreen params={params} searchParams={searchParams} />
    </>
  );
}
