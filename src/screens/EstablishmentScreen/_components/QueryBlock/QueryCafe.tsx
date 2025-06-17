"use client";

import { IconGlobe } from "@/components/common/Icons";
import style from "./QueryBlock.module.scss";
import { FC, useState } from "react";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { Button } from "@/components/UI/Button/Button";
import { IconMessage } from "@/components/common/Icons/IconMessage/IconMessage";
import { Switcher } from "@/components/common/Switcher/Switcher";
import { useTranslations } from "use-intl";
import { ITagsBlockFront } from "@/lib/models/frontend/tags/tagsBlock.front";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Popup } from "@/components/common/Popup/Popup";
interface IQueryCafe {
    data: ITagsBlockFront[];
}

const QueryCafe: FC<IQueryCafe> = ({ data }) => {
    // const t = useTranslations("EstablishmentPage");

    const [modalQuery, setModalQuery] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>(data[0]?.groupKey.value);
    const useMedia = useSelector((state: RootState) => state.screenSize);
    const closeModal = () => {
        setModalQuery(false);
    };
    const openModal = () => {
        setModalQuery(true);
    };
    return (
        <ul
            onClick={() => console.log(useMedia)}
            className={style.queryListCafe}
        >
            {data.map((tagBlock, index) => {
                if(index > 1) return null
                return (
                    <li key={index} className={style.queryListCafe_item}>
                        <div className={style.queryListCafe_item_title}>
                            {tagBlock.groupKey.value}
                        </div>
                        <div className={style.queryListCafe_item_value}>
                            {tagBlock.tags.map((item, index) => {
                                return (
                                    <span key={item.id}>
                                        {item.value}
                                        {index !== tagBlock.tags.length - 1
                                            ? ", "
                                            : "."}
                                    </span>
                                );
                            })}
                        </div>
                    </li>
                );
            })}
            <Button
                onClick={openModal}
                className={style.button_queryList}
                type="light"
                text="Подробнее"
            />

            <ModalCustom
                setActive={setModalQuery}
                active={modalQuery}
                title="Характеристики"
                view="small"
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Switcher
                        data={data.map((tagBlock, index) => {
                            return {
                                active:
                                    activeTab === tagBlock.groupKey.value
                                        ? true
                                        : false,
                                title: tagBlock.groupKey.value,
                                value: tagBlock.tags
                                    .map((item) => item.value)
                                    .join(","),
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
                                key={tagBlock.groupKey.value}
                                className={`${style.modal_list} ${
                                    tagBlock.groupKey.value === activeTab &&
                                    style.modal_list__active
                                }`}
                            >
                                {tagBlock.tags.map((tag) => (
                                    <li
                                        key={tag.id}
                                        className={style.modal_list_item}
                                    >
                                        {tag.value}
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
