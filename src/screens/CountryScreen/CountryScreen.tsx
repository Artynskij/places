import { Video } from "@/components/UI/Video/Video";
import style from "./countryScreen.module.scss";
import Link from "next/link";
import {
  countries,
  mockDistrict,
  mockTowns,
} from "@/asset/mockData/mockCountry";

import {
  mockObjectsCafe,
  mockObjectsHotels,
  mockObjectsRelax,
} from "@/asset/mockData/mockObject";

import { Slider } from "../../components/common/Slider/Slider";

import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";

import {
  CardSliderMainPage,
  CardSliderLocation,
} from "@/components/common/Cards";

import { IPageProps } from "@/types/IType";

import { useTranslations } from "next-intl";
import { InfoSection } from "./_components/InfoSection/InfoSection";

interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    country: string;
    district?: string;
    town?: string;
  };
  typePage: "country" | "district" | "town";
}

export default function CountryScreen({
  params,
  searchParams,
  typePage,
}: IProps) {
  const tTiles = useTranslations("Tiles");
  const seeMoreText = tTiles("text.watchAll");
  const t = useTranslations("CountryPage");

  const countryData =
    typePage === "country"
      ? countries[0]
      : typePage === "district"
      ? (mockDistrict.find((item) => item.value === params.district) as any)
      : (mockTowns.find((item) => item.value === params.town) as any);
  return (
    <div className="container">
      <section className={style.banner}>
        <div className={style.banner_video_block}>
          <Video
            videoSrc={countryData?.videoSrc}
            posterSrc={countryData?.posterSrc}
          />
        </div>
        <div className={style.banner_bg}>
          <div className={style.banner_breadcrumb_block}>
            <Breadcrumb />
          </div>
          <h1>{countryData.title}</h1>
        </div>
      </section>
      <InfoSection searchParams={searchParams} />
      <section className={style.slider_block}>
        <div className={style.slider_block_title}>
          <h2>{t("text.sliderSleep")}</h2>
          <Link href={"/filter"} className={style.slider_block_title_button}>
            {t("text.buttonWatchAll")}
          </Link>
        </div>

        <div className={style.slider}>
          <Slider id={1}>
            {mockObjectsHotels.map((item) => {
              return <CardSliderMainPage key={item.id} {...item} />;
            })}
          </Slider>
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
          <Slider id={2}>
            {mockObjectsCafe.map((item) => {
              return <CardSliderMainPage key={item.id} {...item} />;
            })}
          </Slider>
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
          <Slider id={3}>
            {mockObjectsRelax.map((item) => {
              return <CardSliderMainPage key={item.id} {...item} />;
            })}
          </Slider>
        </div>
      </section>
      {typePage === "country" && (
        <section className={style.slider_block}>
          <div className={style.slider_block_title}>
            <h2>{t("text.sliderDistrict")}</h2>
            <Link href={"/filter"} className={style.slider_block_title_button}>
              {t("text.buttonWatchAll")}
            </Link>
          </div>
          <div className={style.slider}>
            <Slider id={4}>
              {mockDistrict.map((item) => {
                return <CardSliderLocation key={item.id} {...item} />;
              })}
            </Slider>
          </div>
        </section>
      )}
      {(typePage === "country" || typePage === "district") && (
        <section className={style.slider_block}>
          <div className={style.slider_block_title}>
            <h2>{t("text.sliderTown")}</h2>
            {/* <Link href={"/filter"} className={style.slider_block_title_button}>
            {t("text.buttonWatchAll")}
          </Link> */}
          </div>
          <div className={style.slider}>
            <Slider id={5}>
              {mockTowns.map((item) => {
                return <CardSliderLocation key={item.id} {...item} />;
              })}
            </Slider>
          </div>
        </section>
      )}

      <section className={style.slider_block}>
        <div className={style.slider_block_title}>
          <h2>{t("text.sliderNeighbor")}</h2>
          {/* <Link href={"/filter"} className={style.slider_block_title_button}>
            {t("text.buttonWatchAll")}
          </Link> */}
        </div>
        <div className={style.slider}>
          <Slider id={5}>
            {mockTowns.map((item) => {
              return <CardSliderLocation key={item.id} {...item} />;
            })}
          </Slider>
        </div>
      </section>
    </div>
  );
}
