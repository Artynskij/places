"use client";

import { IconGlobe } from "@/components/common/Icons";
import style from "./QueryBlock.module.scss";
import { FC, useState } from "react";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { Button } from "@/components/UI/Button/Button";
import { IconMessage } from "@/components/common/Icons/IconMessage/IconMessage";
import { Switcher } from "@/components/common/Switcher/Switcher";
import { useTranslations } from "use-intl";
interface IQueryCafe {
  data: { key: string; value: string[], title:string }[];
}

const QueryCafe: FC<IQueryCafe> = ({ data }) => {
  // const t = useTranslations("EstablishmentPage");

  const [modalQuery, setModalQuery] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>(
    data[0]?.title
  );

  return (
    <ul className={style.queryListCafe}>
      {data.map((tagBlock, index) => {
        return (
          <li key={index} className={style.queryListCafe_item}>
            <div className={style.queryListCafe_item_title}>
              {tagBlock.title}
            </div>
            <div className={style.queryListCafe_item_value}>
              {tagBlock.value.join(", ")}
            </div>
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
            data={data.map((tagBlock, index) => {
              return {
                active:
                  activeTab === tagBlock.title ? true : false,
                title: tagBlock.title,
                value: tagBlock.value.join(","),
              };
            })}
            callBack={(item) => {
              setActiveTab(item.title);
              item.active = true;
            }}
          />
          <div className={style.modal_content}>
            {data.map((tagBlock) => (
              <ul
                key={tagBlock.key}
                className={`${style.modal_list} ${
                  tagBlock.title === activeTab &&
                  style.modal_list__active
                }`}
              >
                {tagBlock.value.map((tag) => (
                  <li key={tag} className={style.modal_list_item}>
                    {tag}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </ModalCustom>
    </ul>
  );
};

export default QueryCafe;
