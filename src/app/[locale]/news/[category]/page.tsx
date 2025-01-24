import { IPageProps } from "@/types/IType";
import { unstable_setRequestLocale } from "next-intl/server";
import NewsCategoryScreen from "@/screens/News/NewsCategoryScreen/NewsCategoryScreen";
import { newsCategoriesData } from "@/asset/mockData/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return Object.keys(newsCategoriesData).map((category) => ({
    category,
  }));
}
export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  const categoryName = Object.keys(newsCategoriesData).find(
    (category) => params.category === category
  );

  if (!categoryName) {
    return {};
  }
  return {
    title: `${process.env.BASE_NAME} | ${params.category}`,
    description: `Explore the ${params.category} section on our website.`,
  };
}

interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    category: string;
  };
}

export default function NewsCategoryPage({ params, searchParams }: IProps) {
  const categoryName = Object.keys(newsCategoriesData).find(
    (category) => params.category === category
  );

  if (!categoryName) {
    notFound(); // Если категории нет, показываем 404
    return null;
  }

  return (
    <>
      <NewsCategoryScreen params={params} searchParams={searchParams} />
    </>
  );
}
