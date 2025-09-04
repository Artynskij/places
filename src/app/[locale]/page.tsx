import Image from "next/image";
import styles from "./page.module.scss";
import { notFound, redirect } from "next/navigation";
import { MainScreen } from "@/screens/MainScreen/MainScreen";
import { IBasePageProps } from "@/lib/models/common/IType";
import { ArticleService } from "@/lib/Api/article/article.service";
interface IProps extends IBasePageProps {}
export async function generateMetadata({ params }: IProps) {
    return {
        title: `${process.env.BASE_NAME}`,
    };
}

export default async function Home({ params, searchParams }: IProps) {
    const articleService = new ArticleService();
    const articles = await articleService.getArticlesByPagination({
        pagination: { page: 1, pageSize: 8 },
        lang: params.locale,
    });
    if (!articles) notFound();
    return <MainScreen articlesData={articles} params={params} />;
}
