import { Video } from "@/components/UI/Video/Video";
import style from "./countryPage.module.scss";
import Link from "next/link";
import type { Metadata } from "next";

import { IPageProps } from "@/types/IType";
import { unstable_setRequestLocale } from "next-intl/server";

import CountryScreen from "@/screens/CountryScreen/CountryScreen";
import { Loader } from "@/components/common/Loader/Loader";

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

export default function CountryPage({ params, searchParams }: IProps) {
  return (
    <>
      <CountryScreen typePage="country" params={params} searchParams={searchParams} />
    </>
  );
}
