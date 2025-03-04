import type { Metadata } from "next";

import { IPageProps } from "@/models/IType";
import { unstable_setRequestLocale } from "next-intl/server";
import NewsScreen from "@/screens/(News)/NewsScreen/NewsScreen";

import { notFound } from "next/navigation";
import { ArticleService } from "@/Api/article/article.service";

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

export default async function NewsCategoryPage({
  params,
  searchParams,
}: IProps) {
  const apiArticles = new ArticleService();
  const article = await apiArticles.getArticleById(params.news, params.locale);
  if (!article) {
    notFound();
  }
  return (
    <>
      <NewsScreen
        articleData={article}
        params={params}
        searchParams={searchParams}
      />
    </>
  );
}
