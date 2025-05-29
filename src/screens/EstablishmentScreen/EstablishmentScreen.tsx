import style from "./establishmentScreen.module.scss";

import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";

import { Button } from "@/components/UI/Button/Button";

import { ShareButton } from "@/components/common/ButtonFunctional/ShareButton";
import { LikeButton } from "@/components/common/ButtonFunctional/LikeButton";

import QueryCafe from "./_components/QueryBlock/QueryCafe";
import Image from "next/image";
import { Gallery } from "@/components/common/Gallery/Gallery";
import { RateCafe } from "@/components/common/RateCustom/RateCafe";
import { RateMain } from "@/components/common/RateCustom/RateMain";
import { RateHotel } from "@/components/common/RateCustom/RateHotel";
import { ContactButton } from "@/components/common/ButtonFunctional/ContactButton";

import { Slider } from "@/components/common/Slider/Slider";

import { IPageProps } from "@/lib/models/IType";

import Link from "next/link";

import { ITagsBlockFront } from "@/lib/models/frontend/tags/tagsBlock.front";

import { mockReviews } from "@/asset/mockData/mockReviews";
import { CardReview } from "@/components/common/Cards/CardReview/CardReview";
import { IEstablishmentFront, ITagFront } from "@/lib/models";

import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import { ROUTES } from "@/lib/config/Routes";
import {
    IconDone,
    IconLocation,
    IconMessage,
    IconPhone,
} from "@/components/common/Icons";

import { ILocationFront } from "@/lib/models/frontend/location/location.front";
import { IScheduleFront } from "@/lib/models/frontend/schedule/schedule.front";
import { ScheduleButton } from "@/components/common/ButtonFunctional/ScheduleButton";
import DescriptionBlock from "./_components/DescriptionBlock/DescriptionBlock";
import { getTranslations } from "next-intl/server";
import { getBaseUrlServer } from "@/lib/hooks/baseUrl/getBaseUrl";
import { TTypesOfEstablishment } from "@/lib/models/common/TTypesEstablishment";
import { PopupMap } from "@/components/common/Popup/PopupMap/PopupMap";
import { mapEstablishmentToSearchItem } from "@/lib/utils/mappers/mapEstablishmentToSearchItem";
import BlockMapEstS from "./_components/BlockMapEstS/BlockMapEstS";
import CardRecommend from "./_components/CardRecommend/CardRecommend";
import { CardSliderMainPage } from "@/components/common/Cards";
import { IMapItemFront } from "@/lib/models/frontend/map/mapItem.front";

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        location: string;
        typeEstablishment: TTypesOfEstablishment;
        establishment: string;
    };

    dataEstablishment: IEstablishmentFront;
    dataNearEstablishment: {
        eater: IMapItemFront[] | [];
        accommodation: IMapItemFront[] | [];
        attraction: IMapItemFront[] | [];
    };
    dataTags: ITagsBlockFront[];
    classTag?: ITagsBlockFront | null;

    locationCountryData: ILocationFront;
    scheduleData: IScheduleFront[] | null;
    breadcrumbData: ILocationFront[] | null;
}
export const EstablishmentScreen = async ({
    params,
    searchParams,
    dataEstablishment,
    dataNearEstablishment,
    dataTags,
    classTag,

    locationCountryData,
    scheduleData,
    breadcrumbData,
}: IProps) => {
    const tRate = await getTranslations("Rates");
    const reviewData = mockReviews;

    const baseUrl = await getBaseUrlServer();
    const filteredBreadcrumb =
        breadcrumbData?.slice(1, breadcrumbData.length + 1) || null;

    return (
        <div className="container">
            <div className={style.underHeader}>
                <div className={style.underHeader_breadcrumb}>
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
                                {
                                    title: CONSTANT_TYPES_OF_ESTABLISHMENT[
                                        params.typeEstablishment
                                    ].secondValue,
                                    href: ROUTES.FILTER(
                                        dataEstablishment.location.town.id,
                                        CONSTANT_TYPES_OF_ESTABLISHMENT[
                                            params.typeEstablishment
                                        ].key
                                    ),
                                },
                                { title: dataEstablishment.title },
                            ]}
                        />
                    )}
                </div>
                <div className={style.underHeader_groupButtons}>
                    <LikeButton
                        classNameButton={style.underHeader_groupButtons_button}
                        classNameButtonActive={
                            style.underHeader_groupButtons_button_active
                        }
                        classNameIcon={style.underHeader_groupButtons_icon}
                        textButton="Мне нравится"
                        liked={false}
                    />
                    <ShareButton
                        classNameButton={style.underHeader_groupButtons_button}
                        classNameButtonActive={
                            style.underHeader_groupButtons_button_active
                        }
                        classNameIcon={style.underHeader_groupButtons_icon}
                        textButton="Поделиться"
                        baseUrl={baseUrl}
                        linkPage={ROUTES.LOCATION.ESTABLISHMENT(
                            dataEstablishment.location.town.id,
                            CONSTANT_TYPES_OF_ESTABLISHMENT[
                                dataEstablishment.typeEstablishment
                            ].key,
                            dataEstablishment.id
                        )}
                        importTitle={dataEstablishment.title}
                    />
                </div>
            </div>
            <div className={style.titleBlock}>
                <div className={style.titleBlock_left}>
                    <div className={style.titleBlock_title}>
                        <h1>{dataEstablishment.title}</h1>
                        <div className={style.titleBlock_class}>
                            {dataEstablishment.typeEstablishment ===
                                "EATER" && (
                                <RateCafe
                                    disabled
                                    defaultValue={classTag?.tags[0].count || 0}
                                    classNameIcon={style.titleBlock_class_icon}
                                />
                            )}
                            {dataEstablishment.typeEstablishment ===
                                "ACCOMMODATION" && (
                                <RateHotel
                                    disabled
                                    defaultValue={classTag?.tags[0].count || 0}
                                    classNameIcon={style.titleBlock_class_icon}
                                />
                            )}
                        </div>
                    </div>
                    <div className={style.titleBlock_register}>
                        {false ? (
                            <>
                                <IconDone
                                    className={style.titleBlock_iconCheck}
                                />
                                Владелец зарегистрирован
                            </>
                        ) : (
                            <Link className="hover-underline" href={"#offer"}>
                                Владелец не зарегистрирован
                            </Link>
                        )}
                    </div>
                </div>

                <div className={style.titleBlock_right}>
                    <div className={style.titleBlock_type}>
                        {dataEstablishment.category.value}
                    </div>
                    <div className={style.titleBlock_rating}>
                        <RateMain
                            defaultValue={dataEstablishment.rates.main}
                            disabled
                        />
                    </div>
                    <div className={style.titleBlock_location}>
                        <IconLocation />
                        {locationCountryData.title},{" "}
                        {dataEstablishment.location.town.title}
                    </div>
                </div>
            </div>
            <div className={style.navBar}>
                <ul className={style.navBar_list}>
                    <BlockMapEstS
                        locationCountryData={locationCountryData}
                        classTag={classTag || null}
                        dataEstablishment={dataEstablishment}
                    >
                        <li className={style.navBar_list_item}>
                            {dataEstablishment.location.street &&
                                `${dataEstablishment.location.street} - `}
                            {dataEstablishment.location.town.title},{" "}
                            {locationCountryData.title}
                        </li>
                    </BlockMapEstS>
                    <li className={style.navBar_list_item}>
                        <ContactButton
                            contactData={dataEstablishment.contacts}
                            textButton="Контакты"
                        />
                    </li>
                    <li className={style.navBar_list_item}>
                        <Link
                            target="_blank"
                            href={dataEstablishment.contacts?.Web || ""}
                        >
                            {dataEstablishment.contacts?.Web
                                ? "Вебсайт"
                                : "Вебсайт"}
                        </Link>
                    </li>
                    <li className={style.navBar_list_item}>
                        <Link
                            target="_blank"
                            href={dataEstablishment.contacts?.Web || ""}
                        >
                            {dataEstablishment.contacts?.Menu ? "Меню" : "Меню"}
                        </Link>
                    </li>
                    <li className={style.navBar_list_item}>
                        {/* Время работы */}
                        <ScheduleButton scheduleData={scheduleData} />
                    </li>
                </ul>
            </div>
            <section className={style.gallery_block}>
                <Gallery
                    cdnHost={dataEstablishment.media.cdnHost}
                    titleEstablishment={dataEstablishment.title}
                    images={dataEstablishment.media.gallery}
                />
            </section>
            <section className={style.info}>
                <div className={style.info_column}>
                    <h4>Оценка</h4>
                    <div className={style.info_rating}>
                        <div className={style.info_rating_main}>
                            <h2>
                                {dataEstablishment.rates.main > 0
                                    ? dataEstablishment.rates.main
                                    : 0}
                            </h2>
                            <div className={style.info_rating_main_score}>
                                <span>{`(${
                                    dataEstablishment.rates.count || 0
                                } оценок)`}</span>
                                <RateMain
                                    defaultValue={dataEstablishment.rates.main}
                                    disabled
                                />
                            </div>
                        </div>
                        <ul className={style.info_rating_list}>
                            {dataEstablishment.rates.additional.map(
                                (rate, index) => {
                                    if (!rate) return;
                                    return (
                                        <li
                                            key={index}
                                            className={
                                                style.info_rating_list_item
                                            }
                                        >
                                            <span>{tRate(rate.key)}</span>
                                            <div
                                                className={
                                                    style.info_rating_list_item_score
                                                }
                                            >
                                                <span>
                                                    {rate?.value.toFixed(1)}
                                                </span>
                                                <RateMain
                                                    defaultValue={rate?.value}
                                                    disabled
                                                />
                                            </div>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                        <div className={style.info_class}>
                            {dataEstablishment.typeEstablishment ===
                                "EATER" && (
                                <>
                                    <div className={style.info_class_title}>
                                        Чек:
                                    </div>
                                    <RateCafe
                                        disabled
                                        defaultValue={
                                            classTag?.tags[0].count || 0
                                        }
                                    />
                                </>
                            )}
                            {dataEstablishment.typeEstablishment ===
                                "ACCOMMODATION" && (
                                <>
                                    <div className={style.info_class_title}>
                                        Звездность
                                    </div>

                                    <RateHotel
                                        disabled
                                        defaultValue={
                                            classTag?.tags[0].count || 0
                                        }
                                        classNameIcon={
                                            style.titleBlock_class_icon
                                        }
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <div className={style.info_bestReview}></div>
                    <Link href={"#reviews"}>
                        <Button
                            className={style.button_estimate}
                            icon={
                                <IconMessage
                                    className={style.info_icon_message}
                                />
                            }
                            type="light"
                            text="Поставить оценку"
                        />
                    </Link>
                </div>
                <div className={style.info_column}>
                    {dataEstablishment.description && (
                        <DescriptionBlock
                            description={dataEstablishment.description}
                        />
                    )}

                    <QueryCafe data={dataTags} />
                </div>
                <div className={style.info_column}>
                    <div className={style.info_address}>
                        <h4>Адрес</h4>
                        <BlockMapEstS
                            locationCountryData={locationCountryData}
                            classTag={classTag || null}
                            dataEstablishment={dataEstablishment}
                        >
                            <div className={style.info_address_location}>
                                <IconLocation
                                    className={style.info_icon_location}
                                />
                                {dataEstablishment.location.street &&
                                    `${dataEstablishment.location.street} - `}
                                {dataEstablishment.location.town.title},
                                {locationCountryData.title}
                            </div>
                        </BlockMapEstS>
                        {dataEstablishment.contacts?.Phone && (
                            <Link
                                href={`tel:${dataEstablishment.contacts?.Phone}`}
                                className={style.info_address_phone}
                            >
                                <IconPhone className={style.info_icon_phone} />
                                {dataEstablishment.contacts?.Phone}
                            </Link>
                        )}
                    </div>
                    <div className={style.info_map}>
                        <BlockMapEstS
                            locationCountryData={locationCountryData}
                            classTag={classTag || null}
                            dataEstablishment={dataEstablishment}
                        >
                            <Image
                                className={style.info_map_image}
                                alt="map"
                                width={480}
                                height={365}
                                src={"/mock/mockObjErevan-map.jpg"}
                            />
                        </BlockMapEstS>
                    </div>
                </div>
            </section>
            {dataNearEstablishment.eater.length > 1 && (
                <section className={style.slider_block}>
                    <div className={style.slider_block_title}>
                        <h2>Рекомендуем где поесть {`(поблизости)`}</h2>

                        <Link
                            href={ROUTES.FILTER(
                                params.location,
                                CONSTANT_TYPES_OF_ESTABLISHMENT.EATER.key
                            )}
                            className={style.slider_block_title_button}
                        >
                            Смотреть больше
                        </Link>
                    </div>
                    <div className={style.slider}>
                        <Slider id={1}>
                            {dataNearEstablishment.eater.map(
                                (establishment) => {
                                    return (
                                        <CardRecommend
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
            )}

            {dataNearEstablishment.accommodation.length > 1 && (
                <section className={style.slider_block}>
                    <div className={style.slider_block_title}>
                        <h2>Рекомендуем где остановиться {`(поблизости)`}</h2>
                        <Link
                            href={ROUTES.FILTER(
                                params.location,
                                CONSTANT_TYPES_OF_ESTABLISHMENT.ACCOMMODATION
                                    .key
                            )}
                            className={style.slider_block_title_button}
                        >
                            Смотреть больше
                        </Link>
                    </div>
                    <div className={style.slider}>
                        <Slider id={2}>
                            {dataNearEstablishment.accommodation.map(
                                (establishment) => {
                                    return (
                                        <CardRecommend
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
            )}

            {dataNearEstablishment.attraction.length > 1 && (
                <section className={style.slider_block}>
                    <div className={style.slider_block_title}>
                        <h2>Рекомендуем что посмотреть {`(поблизости)`}</h2>
                        <Link
                            href={ROUTES.FILTER(
                                params.location,
                                CONSTANT_TYPES_OF_ESTABLISHMENT.ATTRACTION.key
                            )}
                            className={style.slider_block_title_button}
                        >
                            Смотреть больше
                        </Link>
                    </div>
                    <div className={style.slider}>
                        <Slider id={3}>
                            {dataNearEstablishment.attraction.map(
                                (establishment) => {
                                    return (
                                        <CardRecommend
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
            )}

            <section id="reviews" className={style.reviews}>
                <h2>Отзывы</h2>
                <div className={style.reviews_block}>
                    <div className={style.reviews_stat}>
                        <div className={style.reviews_stat_title}>
                            <h3>4.5 very good</h3>
                            <RateMain
                                defaultValue={dataEstablishment.rates.main}
                                disabled
                            />
                        </div>
                        <ul className={style.reviews_stat_transcriptList}>
                            <li
                                className={
                                    style.reviews_stat_transcriptList_item
                                }
                            >
                                <RateMain disabled defaultValue={5} />
                                <span>Отлично</span>
                            </li>
                            <li
                                className={
                                    style.reviews_stat_transcriptList_item
                                }
                            >
                                <RateMain disabled defaultValue={4} />
                                <span>Очень хорошо</span>
                            </li>
                            <li
                                className={
                                    style.reviews_stat_transcriptList_item
                                }
                            >
                                <RateMain disabled defaultValue={3} />
                                <span>Неплохо</span>
                            </li>
                            <li
                                className={
                                    style.reviews_stat_transcriptList_item
                                }
                            >
                                <RateMain disabled defaultValue={2} />
                                <span>Плохо</span>
                            </li>
                            <li
                                className={
                                    style.reviews_stat_transcriptList_item
                                }
                            >
                                <RateMain disabled defaultValue={1} />
                                <span>Ужасно</span>
                            </li>
                        </ul>
                        <ul className={style.reviews_stat_additionalList}>
                            {dataEstablishment.rates.additional.map(
                                (rate, index) => {
                                    if (!rate) return;
                                    return (
                                        <li
                                            key={index}
                                            className={
                                                style.reviews_stat_additionalList_item
                                            }
                                        >
                                            <span>{tRate(rate.key)}</span>
                                            <div
                                                className={
                                                    style.reviews_stat_additionalList_item_score
                                                }
                                            >
                                                <span>
                                                    {rate?.value.toFixed(1)}
                                                </span>
                                                <RateMain
                                                    defaultValue={rate?.value}
                                                    disabled
                                                />
                                            </div>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </div>
                    <div className={style.reviews_list}>
                        {reviewData.map((review, index) => {
                            return (
                                <CardReview
                                    key={index}
                                    // tRate={tRate}
                                    review={review}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>
            <section id="offer" className={style.offer}>
                <div className={style.offer_ctn}>
                    <h4>Эта страница вашего объекта ?</h4>
                    <div className={style.offer_description}>
                        Вы являетесь владельцем или управляющим этого объекта?
                        Зарегистрируйтесь бесплатно в качестве владельца
                        объекта, чтобы отвечать на отзывы, обновлять свой
                        профиль и выполнять многие другие действия.
                    </div>
                    <Button
                        className={style.offer_button}
                        text="Бесплатная регистрация"
                    />
                </div>
            </section>
            {/* <PopupMap ={dataEstablishment} /> */}
        </div>
    );
};
