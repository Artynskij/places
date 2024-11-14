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

import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";

import { Slider } from "../../../../components/common/Slider/Slider";
import { useTranslations } from "next-intl";
import { CardInfo, CardSliderMainPage } from "@/components/common/Cards";
import { CardSliderLocation } from "@/components/common/Cards/CardSliderLocation/CardSliderLocation";
import CountryScreen from "@/screens/CountryScreen/CountryScreen";
import { IPageProps } from "@/types/IType";

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

// interface IProps {
//   params: { country: string; district: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// }
interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    country: string;
    district: string;
  };
}
export default function DistrictPage({ params, searchParams }: IProps) {
  // const countryData = mockDistrict.find(
  //   (item) => item.value === params.district
  // ) as any;

  // const tTiles = useTranslations("Tiles");
  // const seeMoreText = tTiles("text.watchAll");
  // const t = useTranslations("CountryPage");
  // return (
  //   <div className="container">
  //     <section className={style.banner}>
  //       <div className={style.banner_breadcrumb_block}>
  //         <Breadcrumb />
  //       </div>
  //       <h1>{countryData?.title}</h1>
  //       <div className={style.banner_video_block}>
  //         <Video
  //           videoSrc={countryData?.videoSrc}
  //           posterSrc={countryData?.posterSrc}
  //         />
  //       </div>
  //       <div className={style.banner_bg}></div>
  //     </section>
  //     <section className={style.info_block}>
  //       {informationCards.map((item) => {
  //         const activeParam = searchParams["popup"] === item.value;

  //         return (
  //           <CardInfo
  //             seeMoreText={seeMoreText}
  //             titleText={tTiles(`text.${item.title}`)}
  //             activeParam={activeParam}
  //             key={item.id}
  //             data={item}
  //           />
  //         );
  //       })}
  //     </section>
  //     <section className={style.slider_block}>
  //       <div className={style.slider_block_title}>
  //         <h2>{t("text.sliderSleep")}</h2>
  //         <Link href={"/filter"} className={style.slider_block_title_button}>
  //           {t("text.buttonWatchAll")}
  //         </Link>
  //       </div>

  //       <div className={style.slider}>
  //         <Slider id={1}>
  //           {mockObjectsHotels.map((item) => {
  //             return <CardSliderMainPage key={item.id} {...item} />;
  //           })}
  //         </Slider>
  //       </div>
  //     </section>
  //     <section className={style.slider_block}>
  //       <div className={style.slider_block_title}>
  //         <h2>{t("text.sliderEat")}</h2>
  //         <Link href={"/filter"} className={style.slider_block_title_button}>
  //           {t("text.buttonWatchAll")}
  //         </Link>
  //       </div>
  //       <div className={style.slider}>
  //         <Slider id={2}>
  //           {mockObjectsCafe.map((item) => {
  //             return <CardSliderMainPage key={item.id} {...item} />;
  //           })}
  //         </Slider>
  //       </div>
  //     </section>
  //     <section className={style.slider_block}>
  //       <div className={style.slider_block_title}>
  //         <h2>{t("text.sliderRelax")}</h2>
  //         <Link href={"/filter"} className={style.slider_block_title_button}>
  //           {t("text.buttonWatchAll")}
  //         </Link>
  //       </div>
  //       <div className={style.slider}>
  //         <Slider id={3}>
  //           {mockObjectsRelax.map((item) => {
  //             return <CardSliderMainPage key={item.id} {...item} />;
  //           })}
  //         </Slider>
  //       </div>
  //     </section>
  //     {/* <section className={style.slider_block}>
  //       <div className={style.slider_block_title}>
  //         <h2>Области</h2>
  //         <Link href={"/filter"} className={style.slider_block_title_button}>
  //           Смотреть Всё
  //         </Link>
  //       </div>
  //       <div className={style.slider}>
  //         <SliderMainComponent id={4}>
  //           {mockDistrict.map((item) => {
  //             return <CardSliderLocation key={item.id} {...item} />;
  //           })}
  //         </SliderMainComponent>
  //       </div>
  //     </section> */}
  //     <section className={style.slider_block}>
  //       <div className={style.slider_block_title}>
  //         <h2>{t("text.sliderTown")}</h2>
  //         <Link href={"/filter"} className={style.slider_block_title_button}>
  //           {t("text.buttonWatchAll")}
  //         </Link>
  //       </div>
  //       <div className={style.slider}>
  //         <Slider id={5}>
  //           {mockTowns.map((item) => {
  //             return <CardSliderLocation key={item.id} {...item} />;
  //           })}
  //         </Slider>
  //       </div>
  //     </section>
  //   </div>
  // );
  return (
    <>
      <CountryScreen
        typePage="district"
        params={params}
        searchParams={searchParams}
      />
    </>
  );
}
