import type { Metadata } from "next";

import { IPageProps } from "@/types/IType";
import { unstable_setRequestLocale } from "next-intl/server";
import NewsCategoryScreen from "@/screens/NewsCategoryScreen/NewsCategoryScreen";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  return {
    title: `${process.env.BASE_NAME} | ${params.name}`,
  };
}

interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    name: string;
  };
}

export default function AuthorPage({ params, searchParams }: IProps) {
  return <div>Нейки автор</div>;
}
