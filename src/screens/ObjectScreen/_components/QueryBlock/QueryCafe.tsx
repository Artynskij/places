import { IconGlobe } from "@/components/common/Icons";
import style from "./QueryBlock.module.scss";
import { FC, useState } from "react";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { Button } from "@/components/UI/Button/Button";
import { IconMessage } from "@/components/common/Icons/IconMessage/IconMessage";
import { Switcher } from "@/components/common/Switcher/Switcher";
interface IQueryCafe {
  data: { title: string; value: string; key: string }[];
}

export const QueryCafe: FC<IQueryCafe> = ({ data }) => {
  const [modalQuery, setModalQuery] = useState<boolean>(false);
  return (
    <ul className={style.queryListCafe}>
      {data.map((item, index) => {
        return (
          <li key={index} className={style.queryListCafe_item}>
            <div className={style.queryListCafe_item_title}>{item.title}</div>
            <div className={style.queryListCafe_item_value}> {item.value}</div>
          </li>
        );
      })}
      <Button
        onClick={() => setModalQuery(!modalQuery)}
        className={style.button_queryList}
        type="light"
        text="Подробнее"
      />
      <ModalCustom
        setActive={setModalQuery}
        active={modalQuery}
        title="Характеристики"
      >
        <div>
          <Switcher
            data={data.map((item) => {
              return { active: false, title: item.title, value: item.value };
            })}
            callBack={(item) => {
              item.active = true
            }}
          />
        </div>
      </ModalCustom>
    </ul>
  );
};
