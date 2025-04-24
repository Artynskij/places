"use client";

import { IMockBlock } from "@/asset/mockData/mockFilterCheckBox";
import style from "./blockCheckBox.module.scss";
import { FC, useMemo, useState } from "react";
import { CheckBox } from "@/components/UI/CheckBox/CheckBox";
import { Button } from "@/components/UI/Button/Button";
import { IconArrowDown } from "@/components/common/Icons/IconArrowDown/IconArrowDown";
import { ITagFront, ITagsBlockFront } from "@/lib/models";

interface IBlockCheckBox {
    tagsGroup: ITagsBlockFront;
    checkedValues: string[];
}
const BlockCheckBox: FC<IBlockCheckBox> = ({ tagsGroup, checkedValues }) => {
    const [blockActive, setBlockActive] = useState(true);
    const [listBlockActive, setListBlockActive] = useState(false);
    const sortedTags: ITagFront[] = tagsGroup.tags.sort((a, b) => {
        const aChecked = checkedValues.includes(a.key);
        const bChecked = checkedValues.includes(b.key);
        
        // Сначала сравниваем по статусу выбранности
        if (aChecked && !bChecked) return -1;
        if (!aChecked && bChecked) return 1;
        
        // Если оба выбранные или невыбранные - сортируем по алфавиту
        return a.value.localeCompare(b.value);
    });

    function switchBlock() {
        setBlockActive(!blockActive);
    }
    function openAllFilter() {
        setListBlockActive(!listBlockActive);
    }
    return (
        <div className={style.block + ` ${blockActive && style.block_active}`}>
            <div onClick={switchBlock} className={style.block_title}>
                <span className={style.block_title_text}>
                    {tagsGroup.groupKey.value}
                </span>
                <IconArrowDown className={style.block_title_icon} />
            </div>
            <div
                className={
                    style.block_list +
                    ` ${listBlockActive && style.block_list_active}`
                }
            >
                {sortedTags.map((tag, index) => {
                    if (index <= 3) {
                        return (
                            <div key={tag.id} className={style.block_list_item}>
                                <CheckBox name={tag.value} value={tag.key} />
                            </div>
                        );
                    }

                    return (
                        <div
                            key={tag.id}
                            className={style.block_list_itemDropdown}
                        >
                            <CheckBox name={tag.value} value={tag.key} />
                        </div>
                    );
                })}
                <Button
                    onClick={openAllFilter}
                    className={style.block_openAll}
                    text={
                        listBlockActive ? "Показать меньше" : "Показать больше"
                    }
                />
            </div>
        </div>
    );
};
export default BlockCheckBox;
