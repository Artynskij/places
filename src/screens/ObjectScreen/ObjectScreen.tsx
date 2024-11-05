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
import { mockObjectForObjectPage } from "@/asset/mockData/mockObject";

import { QueryHotel } from "./_components/QueryBlock/QueryHotel";
import { QueryCafe } from "./_components/QueryBlock/QueryCafe";
import Image from "next/image";
import { Gallery } from "@/components/common/Gallery/Gallery";
import { RateCafe } from "@/components/common/RateCustom/RateCafe";
import { RateMain } from "@/components/common/RateCustom/RateMain";
import { RateHotel } from "@/components/common/RateCustom/RateHotel";
import { ContactButton } from "@/components/common/ButtonFunctional/ContactButton";

interface IProps {
  params: { country: string; district: string; town: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
export const ObjectScreen = ({ params, searchParams }: IProps) => {
  const [modalDetails, setModalDetails] = useState<boolean>(false);
  const data = mockObjectForObjectPage;
  return (
    <div className="container">
      <div className={style.underHeader_ctn}>
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
      <div className={style.title_ctn}>
        <div className={style.title_block}>
          <div className={style.title_block_titleCtn}>
            <h3>{data.title}</h3>
            <div className={style.title_block_rate}>
              <RateCafe
                disabled
                defaultValue={data.info.priceRating.count}
                classNameIcon={style.title_block_rate_icon}
              />
              {/* <RateHotel
                disabled
                defaultValue={data.info.priceRating.count}
                classNameIcon={style.title_block_rate_icon}
              /> */}
            </div>
          </div>
          <div className={style.title_block_register}>
            {data.register ? (
              <>
                <IconDone className={style.title_iconCheck} />
                Владелец зарегистрирован
              </>
            ) : (
              "не зареган"
            )}
          </div>
        </div>

        <div className={style.title_right}>
          <div className={style.title_type}>{data.category}</div>
          <div className={style.title_rating}>
            <RateMain defaultValue={data.rating.main} disabled />
          </div>
          <div className={style.title_location}>
            <IconLocation />
            {data.location.country}, {data.location.town}
          </div>
        </div>
      </div>
      <div className={style.underTitle_ctn}>
        <ul className={style.underTitle_list}>
          <li className={style.underTitle_list_item}>
            {data.location.address}
          </li>
          <li  className={style.underTitle_list_item}>
           <ContactButton contactData={data.contacts}  textButton="Контакты"/>
          </li>
          <li className={style.underTitle_list_item}>
            <Link target="_blank" href={data.contacts.website}>
              Вебсайт
            </Link>
          </li>
          <li className={style.underTitle_list_item}>
            <Link target="_blank" href={data.contacts.menu}>
              Меню
            </Link>
          </li>
          <li style={{ color: "red" }} className={style.underTitle_list_item}>
            Время работы попап
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
      <section>слайдер</section>

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
