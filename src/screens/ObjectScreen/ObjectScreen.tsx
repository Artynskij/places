"use client";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import style from "./objectScreen.module.scss";
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
import { QueryCafe } from "./_components/QueryBlock/QueryCafe";
import Image from "next/image";
import { Gallery } from "@/components/common/Gallery/Gallery";
import { RateCafe } from "@/components/common/RateCustom/RateCafe";
import { RateMain } from "@/components/common/RateCustom/RateMain";
import { RateHotel } from "@/components/common/RateCustom/RateHotel";
import { ContactButton } from "@/components/common/ButtonFunctional/ContactButton";
import { ScheduleButton } from "@/components/common/ButtonFunctional/ScheduleButton";
import { Slider } from "@/components/common/Slider/Slider";
import { CardSliderMainPage } from "@/components/common/Cards";

interface IProps {
  params: { country: string; district: string; town: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
export const ObjectScreen = ({ params, searchParams }: IProps) => {
  const [modalDetails, setModalDetails] = useState<boolean>(false);
  const data = mockObjectForObjectPage;
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
            <h1>{data.title}</h1>
            <div className={style.titleBlock_class}>
              <RateCafe
                disabled
                defaultValue={data.info.priceRating.count}
                classNameIcon={style.titleBlock_class_icon}
              />
            </div>
          </div>
          <div className={style.titleBlock_register}>
            {data.register ? (
              <>
                <IconDone className={style.titleBlock_iconCheck} />
                Владелец зарегистрирован
              </>
            ) : (
              "не зареган"
            )}
          </div>
        </div>

        <div className={style.titleBlock_right}>
          <div className={style.titleBlock_type}>{data.category}</div>
          <div className={style.titleBlock_rating}>
            <RateMain defaultValue={data.rating.main} disabled />
          </div>
          <div className={style.titleBlock_location}>
            <IconLocation />
            {data.location.country}, {data.location.town}
          </div>
        </div>
      </div>
      <div className={style.navBar}>
        <ul className={style.navBar_list}>
          <li className={style.navBar_list_item}>
            {data.location.address}
          </li>
          <li className={style.navBar_list_item}>
            <ContactButton contactData={data.contacts} textButton="Контакты" />
          </li>
          <li className={style.navBar_list_item}>
            <Link target="_blank" href={data.contacts.website}>
              Вебсайт
            </Link>
          </li>
          <li className={style.navBar_list_item}>
            <Link target="_blank" href={data.contacts.menu}>
              Меню
            </Link>
          </li>
          <li className={style.navBar_list_item}>
            <ScheduleButton
              scheduleData={data.schedule}
              textButton="Время работы"
            />
          </li>
        </ul>
      </div>
      <section>
        <Gallery images={data.img} />
      </section>
      <section className={style.info}>
        <div className={style.info_column}>
          <h4>Оценка</h4>
          <div className={style.info_rating}>
            <div className={style.info_rating_main}>
              <h2>{data.rating.main}</h2>
              <div className={style.info_rating_main_score}>
                <span>{`(${data.rating.reviews} отзывов)`}</span>
                <RateMain defaultValue={data.rating.main} disabled />
              </div>
            </div>
            <ul className={style.info_rating_list}>
              {data.rating.addition.map((rate, index) => {
                return (
                  <li key={index} className={style.info_rating_list_item}>
                    <span>{rate.title}</span>
                    <div className={style.info_rating_list_item_score}>
                      <span>{rate.value}</span>
                      <RateMain defaultValue={rate.value} disabled />
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={style.info_class}>
              <div className={style.info_class_title}>
                Чек: {data.info.priceRating.title}
              </div>
              <RateCafe disabled defaultValue={data.info.priceRating.count} />
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
            {data.info.description}
            <Button
              onClick={() => setModalDetails(!modalDetails)}
              className={style.button_queryList}
              type="light"
              text="Подробнее"
            />
          </div>
          <QueryCafe data={data.query} />
        </div>
        <div className={style.info_column}>
          <div className={style.info_address}>
            <h4>Адрес</h4>
            <div className={style.info_address_location}>
              <IconLocation className={style.info_icon_location} />
              {data.location.address}
            </div>
            <Link
              href={`tel:${data.contacts.phoneNumber}`}
              className={style.info_address_phone}
            >
              <IconPhone className={style.info_icon_phone} />
              {data.contacts.phoneNumber}
            </Link>
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
            {mockObjectsCafe.map((item) => {
              return <CardSliderMainPage key={item.id} {...item} />;
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
            {mockObjectsHotels.map((item) => {
              return <CardSliderMainPage key={item.id} {...item} />;
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
            {mockObjectsRelax.map((item) => {
              return <CardSliderMainPage key={item.id} {...item} />;
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
          <Button className={style.offer_button} text="Бесплатная регистрация" />
        </div>
      </section>
      <ModalCustom
        setActive={setModalDetails}
        active={modalDetails}
        title="Описание"
      >
        <div>
          Renowned for its iconic Fofoti trees, this pristine beach beckons a
          trip. There are low-rise hotels and beach resorts lining the shores,
          but the beach is mostly quiet. The waters are also relatively calm in
          the designated swimming zones. Boat tours and water activities like
          snorkeling and jet skiing are popular here as well. If you re lucky,
          you may even spot turtles nesting or hatching on the shore between
          March and September.
        </div>
      </ModalCustom>
    </div>
  );
};
