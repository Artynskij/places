import { IconGlobe } from "@/components/common/Icons";
import style from './QueryBlock.module.scss'
interface IQueryHotel {}

export const QueryHotel = () => {
  return (
    <ul className={style.info_queryList}>
      <li className={style.info_queryList_item}>
        <IconGlobe className={style.info_icon_query} />
        Вид на море
      </li>
      <li className={style.info_queryList_item}>
        <IconGlobe className={style.info_icon_query} />
        Номера-люксы
      </li>
      <li className={style.info_queryList_item}>
        <IconGlobe className={style.info_icon_query} />
        Мини-бар
      </li>
      <li className={style.info_queryList_item}>
        <IconGlobe className={style.info_icon_query} />
        Вид на море
      </li>
      <li className={style.info_queryList_item}>
        <IconGlobe className={style.info_icon_query} />
        Характеристика 1
      </li>
      <li className={style.info_queryList_item}>
        <IconGlobe className={style.info_icon_query} />
        Характеристика 1
      </li>
      <li className={style.info_queryList_item}>
        <IconGlobe className={style.info_icon_query} />
        Характеристика 1
      </li>
      <li className={style.info_queryList_item}>
        <IconGlobe className={style.info_icon_query} />
        Характеристика 1
      </li>
      <li className={style.info_queryList_item}>
        <IconGlobe className={style.info_icon_query} />
        Характеристика 1
      </li>
      <li className={style.info_queryList_item}>
        <IconGlobe className={style.info_icon_query} />
        Характеристика 1
      </li>
      <li className={style.info_queryList_item}>
        <IconGlobe className={style.info_icon_query} />
        Характеристика 1
      </li>
    </ul>
  );
};
