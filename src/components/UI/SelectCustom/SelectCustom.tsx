"use client";

import { FC, useEffect, useRef, useState } from "react";
import style from "./selectCustom.module.scss";
import { IconArrowDown } from "../../common/Icons";
import { ISelectOption } from "@/lib/models/IType";
import { SpanErrorForm } from "../Span/SpanErrorForm";

interface ISelectProps {
    options: ISelectOption[];
    onChange: (option: ISelectOption) => void;
    activeOption: string | null | undefined;
    title?: string;
    classNameValue?: string;
    classNameCtn?: string;
    error?: string;
}

export const SelectCustom: FC<ISelectProps> = ({
    options,
    activeOption,
    onChange,
    title,
    classNameValue,
    classNameCtn,
    error,
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
    function handleChange(item: ISelectOption) {
        onChange(item);

        setIsOpen(false);
    }
    return (
        <div
            ref={rootRef}
            className={`${style.select}  ${
                isOpen ? style.active : ""
            } ${classNameCtn}`}
        >
            <div
                onClick={toggleSelect}
                className={`${style.select_value} ${classNameValue}`}
            >
                <span>
                    {options.find((item) => item.value === activeOption)
                        ?.name ||
                        title ||
                        options[0].name}
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
                                className={`${style.select_options_item} ${
                                    activeItem
                                        ? style.select_options_item_active
                                        : ""
                                }`}
                            >
                                {item.name}
                            </div>
                        );
                    })
                ) : (
                    <span>Нет доступных опций</span>
                )}
            </div>
            {error && <SpanErrorForm text={error}/>}
        </div>
    );
};
