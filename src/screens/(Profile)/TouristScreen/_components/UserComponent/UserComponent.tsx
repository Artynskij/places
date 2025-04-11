import { Button } from "@/components/UI/Button/Button";
import style from "./userComponent.module.scss";

import Image from "next/image";
import { ShareButton } from "@/components/common/ButtonFunctional/ShareButton";
import { mockTourist } from "@/asset/mockData/mockTourist";
import { data } from "@maptiler/sdk";
import Link from "next/link";

import { SubscribeButton } from "@/components/common/ButtonFunctional/SubsribeButton";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
interface IUserComponent {
  dataUser: (typeof mockTourist)[0];
}
export const UserComponent = async ({ dataUser }: IUserComponent) => {
  const t = await getTranslations("ProfilePage.header");
// получение урла
    const headersList = headers();

    // Получаем host (localhost:3000) и протокол (http/https)
    const host = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") || "http"; // учитываем прокси

    // Собираем базовый URL (http://localhost:3000)
    const baseUrl = `${protocol}://${host}`;
  return (
    <>
      <div className={style.container}>
        <div className={style.avatar_block}>
          <Image src={dataUser.avatar} alt="avatar" width={500} height={500} />
        </div>
        <div className={style.info_container}>
          <div>
            <div className={style.info_name}>
              <span>{dataUser.name}</span>
              <SubscribeButton />
            </div>
            <div className={style.info_username}>@{dataUser.username}</div>
            <div className={style.info_status}>
              Статус путшественника: {dataUser.status.value}
            </div>
            <div className={style.info_hometown}>
              Я из:
              <Link
                href={"http://localhost:3000/kazahstan/turkestandistrict/minsk"}
              >
                {` ${dataUser.nativeLocation.town}(${dataUser.nativeLocation.country})`}
              </Link>
            </div>
            <div className={style.info_register_block}>
              День регистрации: {dataUser.registerDate.fullDate}
            </div>
            <div className={style.info_travel_block}>
              Посетил: {dataUser.travelMap.country} стран,{" "}
              {dataUser.travelMap.town} городов
            </div>
            <div className={style.info_description}>
              О себе: {dataUser.descriptionYourself}
            </div>
          </div>

          <div className={style.info_buttons}>
            <Button text="Материалы" />
            <Button text={`Подписчики ${dataUser.subscribe.yourSubscriber}`} />
            <Button text={`Подписки ${dataUser.subscribe.youSubscribe}`} />
            <ShareButton

              classNameButton={style.info_shareButton}
              textButton="Поделиться"
              linkPage={baseUrl}
              linkData={['tourist']}
            />
          </div>
        </div>
        <div className={style.manageProfile}>
          {/* <Button icon={<IconEdit/>} text="редактировать профиль"/>
          <Button icon={<IconSettings/>} text="настройки профиля"/> */}
        </div>
      </div>
    </>
  );
};
