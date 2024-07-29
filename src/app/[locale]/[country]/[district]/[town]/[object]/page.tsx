import { Button } from "@/components/UI/Button/Button";
import style from "./objectPage.module.scss";

import { Breadcrumb } from "@/components/UI/BreadCrumb/Breadcrumb";
import { IconLike } from "@/components/UI/Icons";
import { IconShare } from "@/components/UI/Icons/IconShare/IconShare";

export default function FilterFilter() {
  return (
    <div className="container">
      <div className={style.underHeader}>
        <div className={style.underHeader_breadcrumb}>
          <Breadcrumb />
        </div>
        <div className={style.underHeader_buttons}>
          <Button
            text="Мне нравится"
            className={style.underHeader_buttons_but}
            icon={
              <IconLike
                className={style.underHeader_buttons_icon}
                active={false}
              />
            }
            type="light"
          />
          <Button
            text="Поделиться"
            className={style.underHeader_buttons_but}
            icon={<IconShare className={style.underHeader_buttons_icon} />}
            type="light"
          />
        </div>
      </div>
      <div className={style.title}>
        <h3>Название объекта</h3>
        <div className={style.title_right}>
            <div className={style.title_type}>Кафе</div>
            <div className={style.title_rating}>Рейтинг</div>
            <div className={style.title_price}>Средний чек</div>
            <div className={style.title_location}>Локация</div>
        </div>
      </div>
    </div>
  );
}
