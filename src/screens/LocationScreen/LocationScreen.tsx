import { Video } from "@/components/UI/Video/Video";
import style from "./locationScreen.module.scss";
import Link from "next/link";
import { Slider } from "@/components/common/Slider/Slider";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { CardSliderMainPage } from "@/components/common/Cards";

import { InfoSection } from "./_components/InfoSection/InfoSection";

import { getTranslations } from "next-intl/server";

import { ROUTES } from "@/lib/config/Routes";
import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";

import { getBaseUrlServer } from "@/lib/helpers/getBaseUrl";

import { CONSTANT_DEFAULT_IMAGE_URL } from "@/asset/constants/DefaultConstant";
import {
    IEstablishmentFront,
    ILocationFront,
    IPageProps,
    ITagWithEstablishmentFront,
} from "@/lib/models";

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
                                ? locationData.media[0].src
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
        </div>
    );
}
