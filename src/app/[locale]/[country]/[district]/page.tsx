import { Video } from "@/components/UI/Video/Video";
import style from "./distictPage.module.scss";
import Link from "next/link";
import {
  countries,
  mockDistrict,
  mockTowns,
} from "@/asset/mockData/mockCountry";
import { informationCards } from "@/asset/mockData/data";
import {
  mockObjectsCafe,
  mockObjectsHotels,
  mockObjectsRelax,
} from "@/asset/mockData/mockObject";

import { CardInfo } from "@/components/UI/Cards/CardInfo/CardInfo";

import { Breadcrumb } from "@/components/UI/BreadCrumb/Breadcrumb";

import { CardSliderHotel } from "@/components/UI/Cards";
import { CardSliderLocation } from "@/components/UI/Cards/CardSliderLocation/CardSliderLocation";
import { SliderMainComponent } from "../_components/SliderMainComponent/SliderMainComponent";
import { useTranslations } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: { district: string };
}) {
  // console.log(params);
  return {
    title: `${process.env.BASE_NAME} | ${params.district}`,
  };
}

interface IProps {
  params: { country: string; district: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function CountryPage({ params, searchParams }: IProps) {
  const countryData = mockDistrict.find(
    (item) => item.value === params.district
  ) as any;

  const tTiles = useTranslations("Tiles");
  const seeMoreText = tTiles("text.watchAll");
  const t = useTranslations("CountryPage");
  return (
    <div className="container">
      <section className={style.banner}>
        <div className={style.banner_breadcrumb_block}>
          <Breadcrumb />
        </div>
        <h1>{countryData?.title}</h1>
        <div className={style.banner_video_block}>
          <Video
            videoSrc={countryData?.videoSrc}
            posterSrc={countryData?.posterSrc}
          />
        </div>
        <div className={style.banner_bg}></div>
      </section>
      <section className={style.info_block}>
        {informationCards.map((item) => {
          const activeParam = searchParams["popup"] === item.value;

          return (
            <CardInfo
              seeMoreText={seeMoreText}
              titleText={tTiles(`text.${item.title}`)}
              activeParam={activeParam}
              key={item.id}
              data={item}
            />
          );
        })}
      </section>
      <section className={style.slider_block}>
        <div className={style.slider_block_title}>
          <h2>{t("text.sliderSleep")}</h2>
          <Link href={"/filter"} className={style.slider_block_title_button}>
            {t("text.buttonWatchAll")}
          </Link>
        </div>

        <div className={style.slider}>
          <SliderMainComponent id={1}>
            {mockObjectsHotels.map((item) => {
              return <CardSliderHotel key={item.id} {...item} />;
            })}
          </SliderMainComponent>
        </div>
      </section>
      <section className={style.slider_block}>
        <div className={style.slider_block_title}>
          <h2>{t("text.sliderEat")}</h2>
          <Link href={"/filter"} className={style.slider_block_title_button}>
            {t("text.buttonWatchAll")}
          </Link>
        </div>
        <div className={style.slider}>
          <SliderMainComponent id={2}>
            {mockObjectsCafe.map((item) => {
              return <CardSliderHotel key={item.id} {...item} />;
            })}
          </SliderMainComponent>
        </div>
      </section>
      <section className={style.slider_block}>
        <div className={style.slider_block_title}>
          <h2>{t("text.sliderRelax")}</h2>
          <Link href={"/filter"} className={style.slider_block_title_button}>
            {t("text.buttonWatchAll")}
          </Link>
        </div>
        <div className={style.slider}>
          <SliderMainComponent id={3}>
            {mockObjectsRelax.map((item) => {
              return <CardSliderHotel key={item.id} {...item} />;
            })}
          </SliderMainComponent>
        </div>
      </section>
      {/* <section className={style.slider_block}>
        <div className={style.slider_block_title}>
          <h2>Области</h2>
          <Link href={"/filter"} className={style.slider_block_title_button}>
            Смотреть Всё
          </Link>
        </div>
        <div className={style.slider}>
          <SliderMainComponent id={4}>
            {mockDistrict.map((item) => {
              return <CardSliderLocation key={item.id} {...item} />;
            })}
          </SliderMainComponent>
        </div>
      </section> */}
      <section className={style.slider_block}>
        <div className={style.slider_block_title}>
          <h2>{t("text.sliderTown")}</h2>
          <Link href={"/filter"} className={style.slider_block_title_button}>
            {t("text.buttonWatchAll")}
          </Link>
        </div>
        <div className={style.slider}>
          <SliderMainComponent id={5}>
            {mockTowns.map((item) => {
              return <CardSliderLocation key={item.id} {...item} />;
            })}
          </SliderMainComponent>
        </div>
      </section>
    </div>
  );
}
