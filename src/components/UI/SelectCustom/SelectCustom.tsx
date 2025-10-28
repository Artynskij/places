"use client";

import { FC, useEffect, useRef, useState } from "react";
import style from "./selectCustom.module.scss";
import { IconArrowDown } from "../../common/Icons";
import { IOption } from "@/lib/models/common/IType";
import { SpanErrorForm } from "../Span/SpanErrorForm";
import clsx from "clsx";
import { string } from "yup";
import { BlockExtraInfo } from "@/components/common/BlockFunctional/BlockExtraInfo";

interface ISelectProps {
    options: IOption[];
    onChange: (option: IOption) => void;
    activeOption: string | null | undefined;
    titleDefault?: string;
    classNameValue?: string;
    classNameCtn?: string;
    error?: string;
    nameSelectImportant?: string;
}

export const SelectCustom: FC<ISelectProps> = ({
    options,
    activeOption,
    onChange,
    titleDefault: title,
    classNameValue,
    classNameCtn,
    error,
    nameSelectImportant,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // const [activeValue, setActiveValue] = useState(title || options[0].value);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const { target } = event;
            if (target instanceof Node && !rootRef.current?.contains(target)) {
                setIsOpen(false);
            }
        };

        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);
    function toggleSelect() {
        setIsOpen(!isOpen);
    }
    function handleChange(item: IOption) {
        onChange(item);
        setIsOpen(false);
    }
    return (
        <div
            ref={rootRef}
            className={clsx(classNameCtn, style.select, isOpen && style.active)}
        >
            <div
                onClick={toggleSelect}
                className={clsx(classNameValue, style.select_value)}
            >
                <span>
                    {nameSelectImportant ||
                        options.find((item) => item.value === activeOption)
                            ?.label ||
                        title ||
                        options[0].label}
                </span>
                <IconArrowDown className={style.select_value_icon} />
            </div>
            <div className={`${style.select_options}`}>
                {options.length > 0 ? (
                    options.map((item) => {
                        let activeItem = false;
                        if (item.value === activeOption) {
                            activeItem = true;
                        }
                        return (

                            <div
                                onClick={() => handleChange(item)}
                                key={item.value}
                                className={clsx(
                                    style.select_options_item,
                                    activeItem &&
                                    style.select_options_item_active
                                )}
                            >
                                {item.label}
                            </div>

                        );
                    })
                ) : (
                    <span>Нет доступных опций</span>
                )}
            </div>
            {error && <SpanErrorForm text={error} />}
        </div>
    );
};
