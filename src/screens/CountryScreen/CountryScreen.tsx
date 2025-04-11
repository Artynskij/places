import { Video } from "@/components/UI/Video/Video";
import style from "./countryScreen.module.scss";
import Link from "next/link";
import { mockDistrict, mockTowns } from "@/asset/mockData/mockCountry";

import { Slider } from "@/components/common/Slider/Slider";

import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";

import {
    CardSliderMainPage,
    CardSliderLocation,
} from "@/components/common/Cards";

import { IPageProps } from "@/lib/models/IType";

import { InfoSection } from "./_components/InfoSection/InfoSection";
import { countriesData } from "@/asset/constants/countries";

import { GetServerSideProps } from "next";

import { getTranslations } from "next-intl/server";

import { IEstablishmentFront } from "@/lib/models";
import { ROUTES } from "@/lib/config/Routes";
import { TYPES_OF_ESTABLISHMENT } from "@/asset/constants/typesOfEstablishment";
import { ILocationFront } from "@/lib/models/frontend/location/location.front";
import { headers } from "next/headers";

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        location: string;
        district?: string;
        town?: string;
    };
    typePage?: "country" | "district" | "town";
    dataEstablishment: {
        eater: IEstablishmentFront[] | [];
        accommodation: IEstablishmentFront[] | [];
        attraction: IEstablishmentFront[] | [];
    };
    locationData: ILocationFront | null;
    townsData:ILocationFront[] | null
}

export default async function CountryScreen({
    params,
    searchParams,
    typePage,
    dataEstablishment,
    locationData,
    townsData
}: IProps) {
    const tTiles = await getTranslations("Tiles");
    const seeMoreText = tTiles("text.watchAll");
    const t = await getTranslations("CountryPage");

    const countryData = countriesData.find(
        (item) => item.id === params.location
    ) as any;

    // получение урла
    const headersList = headers();

    // Получаем host (localhost:3000) и протокол (http/https)
    const host = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") || "http"; // учитываем прокси

    // Собираем базовый URL (http://localhost:3000)
    const baseUrl = `${protocol}://${host}`;
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
                    <h1>{locationData?.value || "Нету локации"}</h1>
                </div>
            </section>
            <InfoSection townsData={townsData} searchParams={searchParams} />
            <section className={style.slider_block}>
                <div className={style.slider_block_title}>
                    <h2>{t("text.sliderSleep")}</h2>
                    <Link
                        href={ROUTES.FILTER(
                            params.location,
                            TYPES_OF_ESTABLISHMENT.ACCOMMODATION.key
                        )}
                        className={style.slider_block_title_button}
                    >
                        {t("text.buttonWatchAll")}
                    </Link>
                </div>

                <div className={style.slider}>
                    <Slider id={1}>
                        {dataEstablishment.accommodation.map(
                            (establishment) => {
                                return (
                                    <CardSliderMainPage
                                        key={establishment.id}
                                        dataEstablishment={establishment}
                                        langUI={params.locale}
                                        locationId={params.location}
                                        baseUrl={baseUrl}
                                    />
                                );
                            }
                        )}
                    </Slider>
                </div>
            </section>
            <section className={style.slider_block}>
                <div className={style.slider_block_title}>
                    <h2>{t("text.sliderEat")}</h2>
                    <Link
                        href={ROUTES.FILTER(
                            params.location,
                            TYPES_OF_ESTABLISHMENT.EATER.key
                        )}
                        className={style.slider_block_title_button}
                    >
                        {t("text.buttonWatchAll")}
                    </Link>
                </div>
                <div className={style.slider}>
                    <Slider id={2}>
                        {dataEstablishment.eater.map((establishment) => {
                            return (
                                <CardSliderMainPage
                                    key={establishment.id}
                                    dataEstablishment={establishment}
                                    langUI={params.locale}
                                    locationId={params.location}
                                    baseUrl={baseUrl}
                                />
                            );
                        })}
                    </Slider>
                </div>
            </section>
            <section className={style.slider_block}>
                <div className={style.slider_block_title}>
                    <h2>{t("text.sliderRelax")}</h2>
                    <Link
                        href={ROUTES.FILTER(
                            params.location,
                            TYPES_OF_ESTABLISHMENT.ATTRACTION.key
                        )}
                        className={style.slider_block_title_button}
                    >
                        {t("text.buttonWatchAll")}
                    </Link>
                </div>
                <div className={style.slider}>
                    <Slider id={3}>
                        {dataEstablishment.attraction.map((establishment) => {
                            return (
                                <CardSliderMainPage
                                    key={establishment.id}
                                    dataEstablishment={establishment}
                                    langUI={params.locale}
                                    locationId={params.location}
                                    baseUrl={baseUrl}
                                />
                            );
                        })}
                    </Slider>
                </div>
            </section>
            {/* {typePage === "country" && (
                <section className={style.slider_block}>
                    <div className={style.slider_block_title}>
                        <h2>{t("text.sliderDistrict")}</h2>
                        <Link
                            href={ROUTES.FILTER('belarus')}
                            className={style.slider_block_title_button}
                        >
                            {t("text.buttonWatchAll")}
                        </Link>
                    </div>
                    <div className={style.slider}>
                        <Slider id={4}>
                            {mockDistrict.map((item) => {
                                return (
                                    <CardSliderLocation
                                        key={item.id}
                                        {...item}
                                    />
                                );
                            })}
                        </Slider>
                    </div>
                </section>
            )}
            {(typePage === "country" || typePage === "district") && (
                <section className={style.slider_block}>
                    <div className={style.slider_block_title}>
                        <h2>{t("text.sliderTown")}</h2>
                    </div>
                    <div className={style.slider}>
                        <Slider id={5}>
                            {mockTowns.map((item) => {
                                return (
                                    <CardSliderLocation
                                        key={item.id}
                                        {...item}
                                    />
                                );
                            })}
                        </Slider>
                    </div>
                </section>
            )} */}

            {/* <section className={style.slider_block}>
                <div className={style.slider_block_title}>
                    <h2>{t("text.sliderNeighbor")}</h2>
                </div>
                <div className={style.slider}>
                    <Slider id={6}>
                        {mockTowns.map((item) => {
                            return (
                                <CardSliderLocation key={item.id} {...item} />
                            );
                        })}
                    </Slider>
                </div>
            </section> */}
        </div>
    );
}
