"use client";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { IPageProps } from "@/types/IType";

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

interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    category: string;
    news: string;
  };
}
export default function NewsScreen({ params, searchParams }: IProps) {
  const newsData = mockNews.find((item) => item.slug === params.news) as any;
  const anotherNewsData = mockNews.slice(1, mockNews.length);
  const popularNews = mockNews;
  useEffect(() => {}, []);
  const [anotherNews, setAnotherNews] = useState<[] | (typeof mockNews)[0][]>(
    []
  );
  function updateAnotherNews(id: number) {
    const findNews = mockNews.find((item) => item.id === id);
    if (findNews) {
      setAnotherNews((prev) =>
        prev.some((news) => news.id === id) ? prev : [...prev, findNews]
      );
    }
  }

  return (
    <div className="container">
      <section className={style.content}>
        <div className={style.content_item}>
          <PageNews updateAnotherNews={updateAnotherNews} data={newsData} />
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
  data: (typeof mockNews)[0];
  updateAnotherNews: (value: number) => void;
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
      pathnameArray[pathnameArray.length - 1] = data.slug;
      const newUrl = pathnameArray.join("/");
      window.history.replaceState(null, "", newUrl);
      updateAnotherNews(data.id + 1);
    }
  }, [observerUrl.inView]);
  return (
    <div
      ref={observerUrl.ref}
      id={data.id.toString()}
      className={style.container_news}
    >
      <div className={style.breadcrumb}>
        <Breadcrumb />
      </div>
      <h2 className={style.title}>{data.title}</h2>
      <div className={style.underTitle}>
        <div className={style.underTitle_left}>
          <div className={style.underTitle_author}>
            {`Автор: `}
            <Link
              className={`${"hover-underline"}`}
              href={`/news/author/${data.author.title}`}
            >
              {data.author.title}
            </Link>
          </div>
          <BlockWatchCount count={1000} />
          <BlockReadTime text={data.markdown} />
        </div>
        <div className={style.underTitle_right}>
          <div className={style.underTitle_publicDate}>{data.date}</div>
        </div>
      </div>
      <div className={style.description}>{data.description}</div>
      <div className={style.block_mainImage}>
        <Image
          className={style.mainImage}
          width={600}
          height={300}
          alt="img"
          src={data.image}
        />
        <span>Подпись фото</span>
      </div>
      <div className={style.markdownContent}>
        <Markdown>{data.markdown}</Markdown>
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
        <BlockReaction reactions={data.reactions} />
      </div>
    </div>
  );
}
