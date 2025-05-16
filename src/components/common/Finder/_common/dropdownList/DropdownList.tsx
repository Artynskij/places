"use client";
import { RefObject } from "react";
import Link from "next/link";
import { ROUTES, ROUTES_FINDER } from "@/lib/config/Routes";
import { ISearchQueryResponseFront } from "@/lib/models/frontend/search/searchQueryResponse.front";
import { CardSearch } from "@/components/common/Cards";
import { SpinnerAnt } from "@/components/common/Spinner/SpinnerAnt";
import style from "./dropdownList.module.scss";
import { IconPlus, IconSearch } from "@/components/common/Icons";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";

type DropdownListProps = {
    resultLoaded: boolean;
    searchResponse: ISearchQueryResponseFront | null;
    activeIndex: number;
    searchQuery: string;
    onItemClick: () => void;
    ulRef?: RefObject<HTMLUListElement>;
};

const DropdownList = ({
    resultLoaded,
    searchResponse,
    activeIndex,
    searchQuery,
    onItemClick,
    ulRef,
}: DropdownListProps) => {
    if (!resultLoaded) return <SpinnerAnt size="large" />;

    return (
        <ul className={style.list} ref={ulRef}>
            {/* Основные результаты */}
            {searchResponse?.searchItems.map((searchItem, index) => (
                <li
                    key={`${searchItem.id}-${index}`}
                    className={index === activeIndex ? style.active : ""}
                >
                    <Link
                        href={ROUTES_FINDER[searchItem.globalTypeEntity](
                            searchItem.id
                        )}
                        onClick={onItemClick}
                    >
                        <CardSearch dataCard={searchItem} />
                    </Link>
                </li>
            ))}

            {/* Кнопка "Показать все" (видна всегда) */}
            <li
                className={
                    activeIndex === searchResponse?.searchItems.length
                        ? style.active
                        : ""
                }
            >
                <Link
                    href={ROUTES.SEARCH(searchQuery)}
                    onClick={onItemClick}
                    className={style.itemEmpty}
                >
                    <div className={style.itemEmpty_iconCtn}>
                        <IconSearch />
                    </div>
                    <span className={style.itemEmpty_text}>
                        Показать все результаты по {`"${searchQuery}"`}
                    </span>
                </Link>
            </li>
            <li
                className={
                    activeIndex ===
                    (searchResponse?.searchItems.length || 0) + 1
                        ? style.active
                        : ""
                }
            >
                <Link className={style.itemEmpty} href={"#add_est"}>
                    <div className={style.itemEmpty_iconCtn}>
                        <IconPlus className={style.itemEmpty_icon} />
                    </div>
                    <span className={style.itemEmpty_text}>
                        Добавить недостающее место
                    </span>
                </Link>
            </li>
        </ul>
    );
};

export default DropdownList;
