import type { Metadata } from "next";

import { IPageProps } from "@/types/IType";
import { unstable_setRequestLocale } from "next-intl/server";
import NewsScreen from "@/screens/News/NewsScreen/NewsScreen";


export async function generateMetadata({
  params,
}: {
  params: { category: string; news: string };
}) {
  return {
    title: `${process.env.BASE_NAME} | ${params.news}`,
  };
}

interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    category: string;
    news: string;
  };
}

export default function NewsCategoryPage({ params, searchParams }: IProps) {
  return (
    <>
      <NewsScreen params={params} searchParams={searchParams} />
    </>
  );
}
