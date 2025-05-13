"use client";
import style from "./finder.module.scss";

import React, { KeyboardEvent, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { CardSearch } from "../../Cards/CardSearch/CardSearch";

import { useLocale, useTranslations } from "next-intl";
import {
    IconArrowLeft,
    IconCancel,
    IconSearch,
} from "@/components/common/Icons";
import { Overlay } from "@/components/common/Overlay/Overlay";

import { SpinnerAnt } from "../../Spinner/SpinnerAnt";
import { ROUTES, ROUTES_FINDER } from "@/lib/config/Routes";
import { TYPES_OF_ESTABLISHMENT } from "@/asset/constants/typesOfEstablishment";
import { SearchService } from "@/lib/Api/search/search.service";
import { ISearchQueryResponseFront } from "@/lib/models/frontend/search/searchQueryResponse.front";

export const Finder = () => {
    const apiSearch = new SearchService();
    const t = useTranslations("Header");
    // const apiEstablishment = new EstablishmentService();
    const locale = useLocale();
    const router = useRouter();

    const [searchActive, setSearchActive] = useState(false);

    const refInput = useRef<HTMLInputElement>(null);
    const refUl = useRef<HTMLUListElement>(null);

    // const [searchText, setSearchText] = useState("");
    // запрос на сервер
    const [searchResponse, setSearchResponse] =
        useState<ISearchQueryResponseFront | null>(null);
    const [resultLoaded, setResultLoaded] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [inputValueActive, setInputValueActive] = useState(false);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!searchResponse) return;
        switch (e.key) {
            case "ArrowUp":
                setActiveIndex((prevIndex) =>
                    prevIndex === 0
                        ? searchResponse.searchItems.length - 1
                        : prevIndex - 1
                );
                break;
            case "ArrowDown":
                setActiveIndex((prevIndex) =>
                    prevIndex === searchResponse.searchItems.length - 1
                        ? 0
                        : prevIndex + 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (
                    activeIndex >= 0 &&
                    activeIndex < searchResponse.searchItems.length
                ) {
                    const searchItem = searchResponse.searchItems[activeIndex];
                    console.log(
                        "Selected:",
                        searchResponse.searchItems[activeIndex]
                    );
                    handlerCloseInput();
                    router.push(
                        ROUTES_FINDER[searchItem.globalTypeEntity](
                            searchItem.id
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
        apiSearch
            .querySearch({
                indexKey: "",
                localLang: locale,
                term: refInput.current?.value || "",
            })
            .then((res) => {
                setSearchResponse(res);
            });
    }
    function handlerClearInput() {
        const current = refInput.current as HTMLInputElement;
        current.value = "";
        setSearchResponse(null); // TODO
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
        if (!searchResponse) {
            apiSearch
                .querySearch({
                    indexKey: "",
                    localLang: locale,
                    term: refInput.current?.value || "",
                })
                .then((res) => {
                    setSearchResponse(res);
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
                                {searchResponse &&
                                searchResponse.searchItems.length > 0 ? (
                                    searchResponse.searchItems.map(
                                        (searchItem, index) => {
                                            return (
                                                <Link
                                                    onClick={handlerCloseInput}
                                                    key={searchItem.id}
                                                    // TODO LINK
                                                    href={ROUTES_FINDER[
                                                        searchItem
                                                            .globalTypeEntity
                                                    ](searchItem.id)}
                                                >
                                                    <li
                                                        className={
                                                            index ===
                                                            activeIndex
                                                                ? style.active
                                                                : ""
                                                        }
                                                    >
                                                        <CardSearch
                                                            dataCard={
                                                                searchItem
                                                            }
                                                        />
                                                        <div>
                                                            {
                                                                searchItem.globalTypeEntity
                                                            }
                                                        </div>
                                                    </li>
                                                </Link>
                                            );
                                        }
                                    )
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
