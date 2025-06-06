import { Button } from "@/components/UI/Button/Button";
import style from "./userComponent.module.scss";
import { IconEdit } from "@/components/common/Icons/IconEdit/IconEdit";
import Image from "next/image";

import { getTranslations } from "next-intl/server";

export const UserComponent = async () => {
  const t = await getTranslations("ProfilePage.header");
  return (
    <>
      <div className={style.background}>
        <Image
          className={style.background_img}
          width={1920}
          height={1200}
          src="/mock/profileBackgroundMock.jpg"
          alt="background"
        />
      </div>
      <div className={style.middle}>
        <div className={style.middle_avatar}>
          <Image
            className={style.middle_avatar_img}
            width={96}
            height={96}
            src="/mock/avatarUserMock.png"
            alt="avatar"
          />
        </div>
        <div className={style.middle_edit}>
          <Button
            text={t("editProfile")}
            className={style.middle_edit_button}
            icon={<IconEdit className={style.middle_edit_button_icon} />}
            type="light"
          ></Button>
        </div>
      </div>
      <div className={style.bottom}>
        <h4 className={style.bottom_name}>User Surname</h4>
        <span className={style.bottom_mail}>example@gmail.com</span>
        <span className={style.bottom_date}>дата регистрации на сайте</span>
      </div>
    </>
  );
};
