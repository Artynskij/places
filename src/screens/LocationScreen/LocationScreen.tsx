import { Video } from "@/components/UI/Video/Video";
import style from "./locationScreen.module.scss";
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
import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import { ILocationFront } from "@/lib/models/frontend/location/location.front";

import { getBaseUrlServer } from "@/lib/hooks/baseUrl/getBaseUrl";
import { ITagWithEstablishmentFront } from "@/lib/models/frontend/tags/tagWithEstablishment.front";
import { CONSTANT_DEFAULT_IMAGE_URL } from "@/asset/constants/DefaultConstant";

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
    locationData: ILocationFront;
    townsData: ILocationFront[] | null;
    tagsClassEstablishment: ITagWithEstablishmentFront[] | null;
    dataTileContent: ILocationFront[] | null;
    breadcrumbData: ILocationFront[] | null;
}

export default async function LocationScreen({
    params,
    searchParams,
    typePage,
    dataEstablishment,
    locationData,
    townsData,
    tagsClassEstablishment,
    dataTileContent,
    breadcrumbData,
}: IProps) {
    const tTiles = await getTranslations("Tiles");
    const seeMoreText = tTiles("text.watchAll");
    const t = await getTranslations("LocationPage");
    const cdnHost = dataEstablishment.attraction[0]?.media.cdnHost;

    const baseUrl = await getBaseUrlServer();
    const filteredBreadcrumb =
        breadcrumbData?.slice(1, breadcrumbData.length - 1) || null;
    return (
        <div className="container">
            <section className={style.banner}>
                <div className={style.banner_video_block}>
                    <Video
                        videoSrc={
                            locationData?.media
                                ? `${cdnHost}/${locationData.media[0].blobPath}`
                                : ""
                        }
                        posterSrc={CONSTANT_DEFAULT_IMAGE_URL}

                    />
                </div>
                <div className={style.banner_bg}>
                    <div className={style.banner_breadcrumb_block}>
                        {filteredBreadcrumb && (
                            <Breadcrumb
                                type="location"
                                links={[
                                    ...filteredBreadcrumb.map((crumb) => {
                                        return {
                                            title: crumb.title,
                                            href: ROUTES.LOCATION.LOCATION(
                                                crumb.id
                                            ),
                                        };
                                    }),
                                    { title: locationData.title },
                                ]}
                            />
                        )}
                    </div>
                    <h1>{locationData?.title || "Нету локации"}</h1>
                </div>
            </section>
            <InfoSection
                rootLocationPath={locationData.pathBreadcrumb}
                townsData={townsData}
                searchParams={searchParams}
                dataTileContent={dataTileContent}
            />

            <section className={style.slider_block}>
                <div className={style.slider_block_title}>
                    <h2>{t("text.sliderSleep")}</h2>
                    <Link
                        href={ROUTES.FILTER(
                            params.location,
                            CONSTANT_TYPES_OF_ESTABLISHMENT.ACCOMMODATION.key
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
                                const tagClass = tagsClassEstablishment?.find(
                                    (tag) =>
                                        tag.establishmentId === establishment.id
                                );
                                return (
                                    <CardSliderMainPage
                                        key={establishment.id}
                                        dataEstablishment={establishment}
                                        langUI={params.locale}
                                        locationId={params.location}
                                        baseUrl={baseUrl}
                                        classCount={tagClass?.tag.count || 0}
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
                            CONSTANT_TYPES_OF_ESTABLISHMENT.EATER.key
                        )}
                        className={style.slider_block_title_button}
                    >
                        {t("text.buttonWatchAll")}
                    </Link>
                </div>
                <div className={style.slider}>
                    <Slider id={2}>
                        {dataEstablishment.eater.map((establishment) => {
                            const tagClass = tagsClassEstablishment?.find(
                                (tag) =>
                                    tag.establishmentId === establishment.id
                            );
                            return (
                                <CardSliderMainPage
                                    key={establishment.id}
                                    dataEstablishment={establishment}
                                    langUI={params.locale}
                                    locationId={params.location}
                                    baseUrl={baseUrl}
                                    classCount={tagClass?.tag.count || 0}
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
                            CONSTANT_TYPES_OF_ESTABLISHMENT.ATTRACTION.key
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
