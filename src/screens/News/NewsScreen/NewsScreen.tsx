"use client";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { IPageProps } from "@/models/IType";

import style from "./newsScreen.module.scss";
import { mockNews } from "@/asset/mockData/mockNews";
import Link from "next/link";
import Image from "next/image";

import { BlockReaction } from "@/components/common/BlockFunctional/BlockReaction";
import { BlockShare } from "@/components/common/BlockFunctional/BlockShare";
import { CardNews } from "@/components/common/Cards/CardNews/CardNews";
// import { SliderPopularNews } from "../../components/common/Slider/SliderPopularNews/SliderPopularNews";
import { Markdown } from "@/components/common/MarkDown/MarkDown";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { BlockReadTime } from "@/components/common/BlockFunctional/BlockReadTime";
import { BlockWatchCount } from "@/components/common/BlockFunctional/BlockWhatchCount";
import { PopularNews } from "../_component/_PopularNews/_PopularNews";
import { IApiArticle } from "@/Api/IApi";
import { ApiArticle } from "@/Api/Api";

interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    category: string;
    news: string;
  };
  articleData: IApiArticle;
}
export default function NewsScreen({
  params,
  searchParams,
  articleData,
}: IProps) {
  const api = new ApiArticle();

  const popularNews = mockNews;
  // useEffect(() => {}, []);
  const [anotherNews, setAnotherNews] = useState<[] | IApiArticle[]>([]);
  const [countAnotherArticle, setCountAnotherArticle] = useState<number>(1);
  async function updateAnotherNews() {
    const newArticle = await api.getArticlesByPagination({
      pagination: { page: countAnotherArticle, pageSize: 1 },
    });

    if (newArticle && newArticle[0]) {
      setAnotherNews((prev) => [...prev, newArticle[0]]);
      setCountAnotherArticle(countAnotherArticle + 1);
    }
  }

  return (
    <div className="container">
      <section className={style.content}>
        <div className={style.content_item}>
          <PageNews updateAnotherNews={updateAnotherNews} data={articleData} />
        </div>

        <PopularNews
          containerClass={style.content_item}
          popularNews={popularNews}
        />

        <div className={style.content_item}>
          {anotherNews.length ? (
            anotherNews.map((item, index) => {
              return (
                <PageNews
                  updateAnotherNews={updateAnotherNews}
                  key={index}
                  data={item}
                />
              );
            })
          ) : (
            <div style={{ color: "black" }}>Loading...</div>
          )}
        </div>
      </section>
    </div>
  );
}
interface IPageNews {
  data: IApiArticle;
  updateAnotherNews: () => void;
}
function PageNews({ data, updateAnotherNews }: IPageNews) {
  const pathname = usePathname();
  const observerUrl = useInView({
    threshold: 0,
    rootMargin: "-50% 0px -50% 0px",
  });

  useEffect(() => {
    if (observerUrl.inView) {
      const pathnameArray = pathname.split("/");
      pathnameArray[pathnameArray.length - 1] = data.article.Id;
      const newUrl = pathnameArray.join("/");
      window.history.replaceState(null, "", newUrl);
      updateAnotherNews();
    }
  }, [observerUrl.inView]);
  return (
    <div
      ref={observerUrl.ref}
      id={data.article.Id}
      className={style.container_news}
    >
      <div className={style.breadcrumb}>
        <Breadcrumb />
      </div>
      <h2 className={style.title}>{data.content.content[0].value.title}</h2>
      <div className={style.underTitle}>
        <div className={style.underTitle_left}>
          <div className={style.underTitle_author}>
            {`Автор: `}
            <Link
              className={`${"hover-underline"}`}
              href={`/news/author/${data.content.content[0].value.author}`}
            >
              {data.content.content[0].value.author}
            </Link>
          </div>
          <BlockWatchCount count={1000} />
          <BlockReadTime text={data.content.content[0].value.markdown} />
        </div>
        <div className={style.underTitle_right}>
          <div className={style.underTitle_publicDate}>
            {data.content.content[0].value.date}
          </div>
        </div>
      </div>
      <div className={style.description}>
        {data.content.content[0].value.description}
      </div>
      <div className={style.block_mainImage}>
        <Image
          className={style.mainImage}
          width={600}
          height={300}
          alt="img"
          src={data.content.content[0].value.image}
        />
        <span>Подпись фото</span>
      </div>
      <div className={style.markdownContent}>
        <Markdown>{data.content.content[0].value.markdown}</Markdown>
      </div>
      <div className={style.share}>
        <BlockShare linkPage="https://www.lipsum.com/" />
      </div>

      <div className={style.tags}>
        <div className={style.tags_title}>Теги : </div>
        <div className={style.tags_list}>
          <div className={style.tags_list_item}>Беларусь</div>
          <div className={style.tags_list_item}>Природа</div>
          <div className={style.tags_list_item}>Топ</div>
        </div>
      </div>
      <div className={style.reaction}>
        <BlockReaction reactions={data.content.content[0].value.reactions} />
      </div>
    </div>
  );
}
