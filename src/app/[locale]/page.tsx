import Image from "next/image";
import styles from "./page.module.scss";
import { notFound, redirect } from "next/navigation";
import { MainScreen } from "@/screens/MainScreen/MainScreen";
import { IPageProps } from "@/models/IType";

import { ArticleService } from "@/Api/article/article.service";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  return {
    title: `${process.env.BASE_NAME}`,
  };
}
interface IProps extends IPageProps {
  params: IPageProps["params"] & {};
}
export default async function Home({ params, searchParams }: IProps) {
  const articleService = new ArticleService();
  const articles = await articleService.getArticlesByPagination({
    pagination: { page: 1, pageSize: 8 },
  });
  if (!articles) notFound();
  return (
    <MainScreen
      articlesData={articles}
      params={params}
      searchParams={searchParams}
    />
  );
}
