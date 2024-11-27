import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { IPageProps } from "@/types/IType";

import style from "./newsScreen.module.scss";
import { mockNews } from "@/asset/mockData/mockNews";
import Link from "next/link";
import Image from "next/image";

import { BlockReaction } from "@/components/common/BlockFunctional/BlockReaction";
import { BlockShare } from "@/components/common/BlockFunctional/BlockShare";
import { CardNews } from "@/components/common/Cards/CardNews/CardNews";
import { SliderPopularNews } from "../../components/common/Slider/SliderPopularNews/SliderPopularNews";
import { Markdown } from "@/components/common/MarkDown/MarkDown";
import ReactMarkdown from "react-markdown";

interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    category: string;
    news: string;
  };
}
export default function NewsScreen({ params, searchParams }: IProps) {
  const newsData = mockNews[0];
  const anotherNewsData = mockNews.slice(1, mockNews.length);
  const popularNews = mockNews;
  return (
    <div className="container">
      <section className={style.content}>
        <div className={style.content_item}>
          <PageNews data={newsData} />
        </div>
        <div className={`${style.content_item} ${style.content_popular}`}>
          <h4 className={style.popular_title}>Популярное</h4>
          <div className={style.popular_desktop}>
            {popularNews.map((item, index) => {
              return <CardNews typeNew="popular" key={index} item={item} />;
            })}
          </div>
          <div className={style.popular_mobile}>
            <SliderPopularNews newsPopular={popularNews} />
          </div>
        </div>
        <div className={style.content_item}>
          {anotherNewsData.map((item, index) => {
            return <PageNews key={index} data={item} />;
          })}
        </div>
      </section>
    </div>
  );
}
interface IPageNews {
  data: (typeof mockNews)[0];
}
function PageNews({ data }: IPageNews) {
  return (
    <div className={style.container_news}>
      <div className={style.breadcrumb}>
        <Breadcrumb />
      </div>
      <h2 className={style.title}>{data.title}</h2>
      <div className={style.underTitle}>
        <div className={style.underTitle_author}>
          {`Автор: `}
          <Link
            className={`${"hover-underline"}`}
            href={`/news/author/${data.author.title}`}
          >
            {data.author.title}
          </Link>
        </div>
        <div className={style.underTitle_publicDate}>{data.date}</div>
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
