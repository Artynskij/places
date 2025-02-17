"use client";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import style from "./establishmentScreen.module.scss";
import { Button } from "@/components/UI/Button/Button";
import { IconGlobe, IconLike, IconLocation } from "@/components/common/Icons";
import { IconShare } from "@/components/common/Icons/IconShare/IconShare";
import { ShareButton } from "@/components/common/ButtonFunctional/ShareButton";
import { LikeButton } from "@/components/common/ButtonFunctional/LikeButton";

import { IconMessage } from "@/components/common/Icons/IconMessage/IconMessage";
import { IconDone } from "@/components/common/Icons/IconDone/IconDone";
import { IconPhone } from "@/components/common/Icons/IconPhone/IconPhone";
import Link from "next/link";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { useState } from "react";
import {
  mockObjectForObjectPage,
  mockObjectsCafe,
  mockObjectsHotels,
  mockObjectsRelax,
} from "@/asset/mockData/mockObject";

import { QueryHotel } from "./_components/QueryBlock/QueryHotel";
import QueryCafe from "./_components/QueryBlock/QueryCafe";
import Image from "next/image";
import { Gallery } from "@/components/common/Gallery/Gallery";
import { RateCafe } from "@/components/common/RateCustom/RateCafe";
import { RateMain } from "@/components/common/RateCustom/RateMain";
import { RateHotel } from "@/components/common/RateCustom/RateHotel";
import { ContactButton } from "@/components/common/ButtonFunctional/ContactButton";
import { ScheduleButton } from "@/components/common/ButtonFunctional/ScheduleButton";
import { Slider } from "@/components/common/Slider/Slider";
import { CardSliderMainPage } from "@/components/common/Cards";
import {
  IApiEstablishmentResponse,
  IApiEstablishmentsResponse,
  IApiTag,
} from "@/Api/IApi";
import { IPageProps } from "@/models/IType";
import { useTranslations } from "next-intl";

interface ITag {}
interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    country: string;
    district: string;
    town: string;
    establishment: string;
  };

  dataEstablishment: IApiEstablishmentResponse;
  dataNearEstablishment: IApiEstablishmentsResponse;
  dataTags: { key: string; value: string[]; title: string }[];
  classTag: { key: string; value: string; title: string; count: number };
}
export const EstablishmentScreen = ({
  params,
  searchParams,
  dataEstablishment,
  dataNearEstablishment,
  dataTags,
  classTag,
}: IProps) => {
  const [modalDetails, setModalDetails] = useState<boolean>(false);
  const t = useTranslations("EstablishmentPage");

  const data = dataEstablishment;
  const fuckData = mockObjectForObjectPage;
  return (
    <div className="container">
      <div className={style.underHeader}>
        <div className={style.underHeader_breadcrumb}>
          <Breadcrumb />
        </div>
        <div className={style.underHeader_groupButtons}>
          <LikeButton
            classNameButton={style.underHeader_groupButtons_button}
            classNameButtonActive={style.underHeader_groupButtons_button_active}
            classNameIcon={style.underHeader_groupButtons_icon}
            textButton="Мне нравится"
            liked={false}
          />
          <ShareButton
            classNameButton={style.underHeader_groupButtons_button}
            classNameButtonActive={style.underHeader_groupButtons_button_active}
            classNameIcon={style.underHeader_groupButtons_icon}
            textButton="Поделиться"
            linkPage="https://www.lipsum.com/"
          />
        </div>
      </div>
      <div className={style.titleBlock}>
        <div className={style.titleBlock_left}>
          <div className={style.titleBlock_title}>
            <h1>{data.establishment.content.value[0].value.details.title}</h1>
            <div className={style.titleBlock_class}>
              {data.establishment.establishment.Type.Name === "EATER" && (
                <RateCafe
                  disabled
                  defaultValue={classTag.count || 0}
                  classNameIcon={style.titleBlock_class_icon}
                />
              )}
              {data.establishment.establishment.Type.Name ===
                "ACCOMMODATION" && (
                <RateHotel
                  disabled
                  defaultValue={classTag.count || 0}
                  classNameIcon={style.titleBlock_class_icon}
                />
              )}
            </div>
          </div>
          <div className={style.titleBlock_register}>
            {true ? (
              <>
                <IconDone className={style.titleBlock_iconCheck} />
                Владелец зарегистрирован
              </>
            ) : (
              "не зарегистрирован "
            )}
          </div>
        </div>

        <div className={style.titleBlock_right}>
          <div className={style.titleBlock_type}>
            {data.establishment.establishment.Category.Content.details[0].value}
          </div>
          <div className={style.titleBlock_rating}>
            <RateMain
              defaultValue={data.establishment.establishment.Rates.Rate}
              disabled
            />
          </div>
          <div className={style.titleBlock_location}>
            <IconLocation />
            {"Беларусь"}, {"Минск"}
          </div>
        </div>
      </div>
      <div className={style.navBar}>
        <ul className={style.navBar_list}>
          <li className={style.navBar_list_item}>
            {data.establishment.content.value[0].value.location.street1}
          </li>
          <li className={style.navBar_list_item}>
            <ContactButton
              contactData={data.establishment.establishment.Contacts}
              textButton="Контакты"
            />
          </li>
          <li className={style.navBar_list_item}>
            <Link
              target="_blank"
              href={data.establishment.establishment.Contacts?.Web || ""}
            >
              {data.establishment.establishment.Contacts?.Web
                ? "Вебсайт"
                : "Добавить Вебсайт"}
            </Link>
          </li>
          <li className={style.navBar_list_item}>
            <Link
              target="_blank"
              href={data.establishment.establishment.Contacts?.Menu || ""}
            >
              {data.establishment.establishment.Contacts?.Web
                ? "Меню"
                : "Добавить  Меню"}
            </Link>
          </li>
          <li className={style.navBar_list_item}>
            Время работы
            {/* <ScheduleButton
              scheduleData={data.schedule}
              textButton="Время работы"
            /> */}
          </li>
        </ul>
      </div>
      <section>
        <Gallery
          cdnHost={data.cdnHost}
          images={data.establishment.content.media.gallery}
        />
      </section>
      <section className={style.info}>
        <div className={style.info_column}>
          <h4>Оценка</h4>
          <div className={style.info_rating}>
            <div className={style.info_rating_main}>
              <h2>{data.establishment.establishment.Rates.Rate}</h2>
              <div className={style.info_rating_main_score}>
                <span>{`(${data.establishment.establishment.Rates.Count} оценок)`}</span>
                <RateMain
                  defaultValue={data.establishment.establishment.Rates.Rate}
                  disabled
                />
              </div>
            </div>
            <ul className={style.info_rating_list}>
              {data.establishment.establishment.Rates.Clean && (
                <li className={style.info_rating_list_item}>
                  <span>{t("rates.Clean")}</span>
                  <div className={style.info_rating_list_item_score}>
                    <span>
                      {data.establishment.establishment.Rates.Clean.toFixed(1)}
                    </span>
                    <RateMain
                      defaultValue={
                        data.establishment.establishment.Rates.Clean
                      }
                      disabled
                    />
                  </div>
                </li>
              )}
              {data.establishment.establishment.Rates.Rooms && (
                <li className={style.info_rating_list_item}>
                  <span>{t("rates.Rooms")}</span>
                  <div className={style.info_rating_list_item_score}>
                    <span>
                      {data.establishment.establishment.Rates.Rooms.toFixed(1)}
                    </span>
                    <RateMain
                      defaultValue={
                        data.establishment.establishment.Rates.Rooms
                      }
                      disabled
                    />
                  </div>
                </li>
              )}
              {data.establishment.establishment.Rates.PriceQuality && (
                <li className={style.info_rating_list_item}>
                  <span>{t("rates.PriceQuality")}</span>
                  <div className={style.info_rating_list_item_score}>
                    <span>
                      {data.establishment.establishment.Rates.PriceQuality.toFixed(
                        1
                      )}
                    </span>
                    <RateMain
                      defaultValue={
                        data.establishment.establishment.Rates.PriceQuality
                      }
                      disabled
                    />
                  </div>
                </li>
              )}
              {data.establishment.establishment.Rates.Location && (
                <li className={style.info_rating_list_item}>
                  <span>{t("rates.Location")}</span>
                  <div className={style.info_rating_list_item_score}>
                    <span>
                      {data.establishment.establishment.Rates.Location.toFixed(
                        1
                      )}
                    </span>
                    <RateMain
                      defaultValue={
                        data.establishment.establishment.Rates.Location
                      }
                      disabled
                    />
                  </div>
                </li>
              )}
              {data.establishment.establishment.Rates.Service && (
                <li className={style.info_rating_list_item}>
                  <span>{t("rates.Service")}</span>
                  <div className={style.info_rating_list_item_score}>
                    <span>
                      {data.establishment.establishment.Rates.Service.toFixed(
                        1
                      )}
                    </span>
                    <RateMain
                      defaultValue={
                        data.establishment.establishment.Rates.Service
                      }
                      disabled
                    />
                  </div>
                </li>
              )}
              {data.establishment.establishment.Rates.Atmosphere && (
                <li className={style.info_rating_list_item}>
                  <span>{t("rates.Atmosphere")}</span>
                  <div className={style.info_rating_list_item_score}>
                    <span>
                      {data.establishment.establishment.Rates.Atmosphere.toFixed(
                        1
                      )}
                    </span>
                    <RateMain
                      defaultValue={
                        data.establishment.establishment.Rates.Atmosphere
                      }
                      disabled
                    />
                  </div>
                </li>
              )}
              {data.establishment.establishment.Rates.Food && (
                <li className={style.info_rating_list_item}>
                  <span>{t("rates.Food")}</span>
                  <div className={style.info_rating_list_item_score}>
                    <span>
                      {data.establishment.establishment.Rates.Food.toFixed(1)}
                    </span>
                    <RateMain
                      defaultValue={data.establishment.establishment.Rates.Food}
                      disabled
                    />
                  </div>
                </li>
              )}
              {data.establishment.establishment.Rates.Value && (
                <li className={style.info_rating_list_item}>
                  <span>{t("rates.Value")}</span>
                  <div className={style.info_rating_list_item_score}>
                    <span>
                      {data.establishment.establishment.Rates.Value.toFixed(1)}
                    </span>
                    <RateMain
                      defaultValue={
                        data.establishment.establishment.Rates.Value
                      }
                      disabled
                    />
                  </div>
                </li>
              )}
            </ul>
            <div className={style.info_class}>
              {data.establishment.establishment.Type.Name === "EATER" && (
                <>
                  <div className={style.info_class_title}>
                    Чек: {fuckData.info.priceRating.title}
                  </div>
                  <RateCafe
                    disabled
                    defaultValue={fuckData.info.priceRating.count}
                  />
                </>
              )}
              {data.establishment.establishment.Type.Name ===
                "ACCOMMODATION" && (
                <>
                  <div className={style.info_class_title}>{classTag.title}</div>
                  <RateHotel
                    disabled
                    defaultValue={classTag.count}
                    classNameIcon={style.titleBlock_class_icon}
                  />
                </>
              )}
            </div>
          </div>
          <Button
            className={style.button_estimate}
            icon={<IconMessage className={style.info_icon_message} />}
            type="light"
            text="Поставить оценку"
          />
        </div>
        <div className={style.info_column}>
          <h4>Описание</h4>
          <div className={style.info_description}>
            <div className={style.info_description_text}>
              {data.establishment.content.value[0].value.details.description}
            </div>

            <Button
              onClick={() => setModalDetails(!modalDetails)}
              className={style.button_queryList}
              type="light"
              text="Подробнее"
            />
          </div>
          <ModalCustom
            setActive={setModalDetails}
            active={modalDetails}
            title="Описание"
          >
            <div>
              {data.establishment.content.value[0].value.details.description}
            </div>
          </ModalCustom>
          <QueryCafe data={dataTags} />
        </div>
        <div className={style.info_column}>
          <div className={style.info_address}>
            <h4>Адрес</h4>
            <div className={style.info_address_location}>
              <IconLocation className={style.info_icon_location} />
              {data.establishment.content.value[0].value.location.street1}
            </div>
            {data.establishment.establishment.Contacts?.Phone && (
              <Link
                href={`tel:${data.establishment.establishment.Contacts?.Phone}`}
                className={style.info_address_phone}
              >
                <IconPhone className={style.info_icon_phone} />
                {data.establishment.establishment.Contacts?.Phone}
              </Link>
            )}
          </div>
          <div className={style.info_map}>
            <Image
              className={style.info_map_image}
              alt="map"
              width={480}
              height={365}
              src={"/mock/mockObjErevan-map.jpg"}
            />
          </div>
        </div>
      </section>
      <section className={style.slider_block}>
        <div className={style.slider_block_title}>
          <h2>Рекомендуем где поесть</h2>
          <Link href={"/filter"} className={style.slider_block_title_button}>
            Смотреть больше
          </Link>
        </div>
        <div className={style.slider}>
          <Slider id={1}>
            {dataNearEstablishment.establishmentItems.map((item) => {
              return (
                <CardSliderMainPage
                  key={item.establishment.Id}
                  data={item}
                  cdnName={dataNearEstablishment.cdnHost}
                  langUI={params.locale}
                />
              );
            })}
          </Slider>
        </div>
      </section>
      <section className={style.slider_block}>
        <div className={style.slider_block_title}>
          <h2>Рекомендуем где остановиться</h2>
          <Link href={"/filter"} className={style.slider_block_title_button}>
            Смотреть больше
          </Link>
        </div>
        <div className={style.slider}>
          <Slider id={2}>
            {dataNearEstablishment.establishmentItems.map((item) => {
              return (
                <CardSliderMainPage
                  key={item.establishment.Id}
                  data={item}
                  cdnName={dataNearEstablishment.cdnHost}
                  langUI={params.locale}
                />
              );
            })}
          </Slider>
        </div>
      </section>
      <section className={style.slider_block}>
        <div className={style.slider_block_title}>
          <h2>Рекомендуем что посмотреть</h2>
          <Link href={"/filter"} className={style.slider_block_title_button}>
            Смотреть больше
          </Link>
        </div>
        <div className={style.slider}>
          <Slider id={3}>
            {dataNearEstablishment.establishmentItems.map((item) => {
              return (
                <CardSliderMainPage
                  key={item.establishment.Id}
                  data={item}
                  cdnName={dataNearEstablishment.cdnHost}
                  langUI={params.locale}
                />
              );
            })}
          </Slider>
        </div>
      </section>
      <section className={style.offer}>
        <div className={style.offer_ctn}>
          <h4>Эта страница вашего объекта ?</h4>
          <div className={style.offer_description}>
            Вы являетесь владельцем или управляющим этого объекта?
            Зарегистрируйтесь бесплатно в качестве владельца объекта, чтобы
            отвечать на отзывы, обновлять свой профиль и выполнять многие другие
            действия.
          </div>
          <Button
            className={style.offer_button}
            text="Бесплатная регистрация"
          />
        </div>
      </section>
    </div>
  );
};
