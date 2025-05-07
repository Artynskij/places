"use client";
import style from "./finder.module.scss";

import React, { KeyboardEvent, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { CardSearch } from "../../Cards/CardSearch/CardSearch";

import { mockFinder } from "@/asset/mockData/mockFinder";

import { useLocale, useTranslations } from "next-intl";
import {
    IconArrowLeft,
    IconCancel,
    IconSearch,
} from "@/components/common/Icons";
import { Overlay } from "@/components/common/Overlay/Overlay";
import { IEstablishmentFront } from "@/lib/models";
import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";
import { SpinnerAnt } from "../../Spinner/SpinnerAnt";
import { ROUTES } from "@/lib/config/Routes";
import { TYPES_OF_ESTABLISHMENT } from "@/asset/constants/typesOfEstablishment";

export const Finder = () => {
    const t = useTranslations("Header");
    const apiEstablishment = new EstablishmentService();
    const locale = useLocale();
    const router = useRouter();

    const [searchActive, setSearchActive] = useState(false);

    const refInput = useRef<HTMLInputElement>(null);
    const refUl = useRef<HTMLUListElement>(null);

    // const [searchText, setSearchText] = useState("");
    // запрос на сервер
    const [results, setResults] = useState<IEstablishmentFront[] | null>(null);
    const [resultLoaded, setResultLoaded] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [inputValueActive, setInputValueActive] = useState(false);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!results) return;
        switch (e.key) {
            case "ArrowUp":
                setActiveIndex((prevIndex) =>
                    prevIndex === 0 ? results.length - 1 : prevIndex - 1
                );
                break;
            case "ArrowDown":
                setActiveIndex((prevIndex) =>
                    prevIndex === results.length - 1 ? 0 : prevIndex + 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (activeIndex >= 0 && activeIndex < results.length) {
                    const establishment = results[activeIndex];
                    console.log("Selected:", results[activeIndex]);
                    handlerCloseInput();
                    router.push(
                        ROUTES.LOCATION.ESTABLISHMENT(
                            establishment.location.town.id,
                            TYPES_OF_ESTABLISHMENT[
                                establishment.typeEstablishment
                            ].key,
                            establishment.id
                        )
                    );
                }
                break;
            default:
                break;
        }
    };

    function handlerChangeInput() {
        const current = refInput.current as HTMLInputElement;
        setActiveIndex(-1);
        if (current.value.length > 0 && !inputValueActive) {
            setInputValueActive(true);
        } else if (current.value.length === 0 && inputValueActive) {
            setInputValueActive(false);
        }
        const newData = mockFinder.filter(
            (item) =>
                item.title.includes(current.value) ||
                item.location.includes(current.value)
        );
        setResults(null); // TODO
    }
    function handlerClearInput() {
        const current = refInput.current as HTMLInputElement;
        current.value = "";
        setResults(null); // TODO
        setInputValueActive(false);
        setActiveIndex(-1);
    }
    function handlerCloseInput() {
        setActiveIndex(-1);
        setSearchActive(false);
    }
    function handlerOpenInput() {
        if (searchActive !== false) return;
        setSearchActive(true);
        if (!results) {
            apiEstablishment
                .getEstablishmentByPagination({
                    lang: locale,
                    pagination: { page: 1, pageSize: 10 },
                })
                .then((res) => {
                    setResults(res);
                    setResultLoaded(true);
                });
        }
    }
    return (
        <form className={style.header_item}>
            <div
                onClick={handlerOpenInput}
                active-class={`${searchActive}`}
                className={style.block}
            >
                <div className={style.block_input}>
                    {searchActive ? (
                        <IconArrowLeft
                            onClick={handlerCloseInput}
                            className={style.icon}
                        />
                    ) : (
                        <IconSearch
                            style={{ fontSize: "20px" }}
                            className={style.icon}
                        />
                    )}

                    <div className={style.ctnInput}>
                        <input
                            placeholder={t("text.finderPlaceholder")}
                            onChange={handlerChangeInput}
                            onKeyDown={handleKeyDown}
                            ref={refInput}
                            type="text"
                            maxLength={100}
                        />
                    </div>
                    {searchActive && inputValueActive && (
                        <IconCancel
                            onClick={handlerClearInput}
                            className={style.iconClear}
                        />
                    )}
                </div>
                <div className={style.block_dropdown}>
                    <div className={style.dropdown}>
                        {resultLoaded ? (
                            <ul ref={refUl}>
                                {results && results.length > 0 ? (
                                    results.map((establishment, index) => {
                                        return (
                                            <Link
                                                onClick={handlerCloseInput}
                                                key={establishment.id}
                                                href={ROUTES.LOCATION.ESTABLISHMENT(
                                                    establishment.location.town
                                                        .id,
                                                    TYPES_OF_ESTABLISHMENT[
                                                        establishment
                                                            .typeEstablishment
                                                    ].key,
                                                    establishment.id
                                                )}
                                            >
                                                <li
                                                    className={
                                                        index === activeIndex
                                                            ? style.active
                                                            : ""
                                                    }
                                                >
                                                    <CardSearch
                                                        establishment={
                                                            establishment
                                                        }
                                                    />
                                                </li>
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <span>
                                        {t("text.finderNullFirst")}{" "}
                                        {`"${refInput.current?.value}"`}{" "}
                                        {t("text.finderNullSecond")}
                                    </span>
                                )}
                            </ul>
                        ) : (
                            <SpinnerAnt size="large" />
                        )}
                    </div>
                </div>
            </div>
            <Overlay active={searchActive} setActive={setSearchActive} />
        </form>
    );
};
