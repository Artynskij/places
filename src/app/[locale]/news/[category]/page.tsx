import type { Metadata } from "next";

import { IPageProps } from "@/types/IType";
import { unstable_setRequestLocale } from "next-intl/server";
import NewsCategoryScreen from "@/screens/News/NewsCategoryScreen/NewsCategoryScreen";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  return {
    title: `${process.env.BASE_NAME} | ${params.category}`,
  };
}

interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    category: string;
  };
}

export default function NewsCategoryPage({ params, searchParams }: IProps) {
  return (
    <>
      <NewsCategoryScreen params={params} searchParams={searchParams} />
    </>
  );
}
