"use client";
import { RefObject, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ROUTES, ROUTES_FINDER } from "@/lib/config/Routes";
import { ISearchQueryResponseFront } from "@/lib/models/frontend/search/searchQueryResponse.front";
import { CardSearch } from "@/components/common/Cards";
import { SpinnerAnt } from "@/components/common/Spinner/SpinnerAnt";
import style from "./dropdownListFinder.module.scss";
import { IconEnter, IconPlus, IconSearch } from "@/components/common/Icons";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
import { ISearchItemFront } from "@/lib/models";
import { getUrlForUrl } from "@/lib/hooks/getUrlForSearch";
import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import { TTypesOfEstablishment } from "@/lib/models/common/TTypesEstablishment";

type DropdownListProps = {
    resultLoaded: boolean;
    searchResponse: ISearchQueryResponseFront | null;
    activeIndex: number;
    searchQuery: string;
    onItemClick: () => void;
    ulRef?: RefObject<HTMLUListElement>;
};
type IListItemData = {
    type:
        | "search_result"
        | "additional_search_result"
        | "show_all"
        | "add_place";
    data?: ISearchItemFront;
    originalIndex?: number;
};
const DropdownListFinder = ({
    resultLoaded,
    searchResponse,
    activeIndex,
    searchQuery,
    onItemClick,
    ulRef,
}: DropdownListProps) => {
    const [listItemsData, setListItemsData] = useState<IListItemData[] | []>(
        []
    );
    useEffect(() => {
        const listItemsData: IListItemData[] = [];
        searchResponse?.searchItems.forEach((searchItem, index) => {
            listItemsData.push({
                type: "search_result",
                data: searchItem,
            });

            if (
                searchQuery.toLowerCase() === searchItem.title.toLowerCase() &&
                searchItem.globalTypeEntity === "location"
            ) {
                for (const [_, element] of Object.entries(
                    CONSTANT_TYPES_OF_ESTABLISHMENT
                )) {
                    listItemsData.push({
                        type: "additional_search_result",
                        data: {
                            ...searchItem,
                            title: element.secondValue,
                            typeEstablishment: {
                                id: element.id,
                                key: element.key as TTypesOfEstablishment,
                            },
                        },
                        originalIndex: index,
                    });
                }
            }
        });
        listItemsData.push({ type: "show_all" });
        listItemsData.push({ type: "add_place" });
        setListItemsData(listItemsData);
    }, [searchResponse, searchQuery]);
    if (!resultLoaded) return <SpinnerAnt size="large" />;

    // const listItemsData: IListItemData[] = createListItemsRef();
    return (
        <ul className={style.list} ref={ulRef}>
            {listItemsData.map((listItem, flatIndex) => {
                const isActive = flatIndex === activeIndex;

                switch (listItem.type) {
                    case "search_result":
                        return (
                            listItem.data && (
                                <li
                                    key={listItem.data.id}
                                    data-active={isActive}
                                    className={style.list_item}
                                >
                                    <Link
                                        href={getUrlForUrl(
                                            listItem.data,
                                            listItem.data.globalTypeEntity
                                        )}
                                        onClick={onItemClick}
                                    >
                                        <CardSearch dataCard={listItem.data} />
                                    </Link>
                                </li>
                            )
                        );

                    case "additional_search_result":
                        return (
                            listItem.data && (
                                <li
                                    key={`${flatIndex}-${listItem.data.id}`}
                                    data-active={isActive}
                                    className={style.list_item__additional}
                                >
                                    <Link
                                        href={ROUTES.FILTER(
                                            listItem.data.id,
                                            listItem.data.typeEstablishment
                                                ?.key as TTypesOfEstablishment
                                        )}
                                        onClick={onItemClick}
                                    >
                                        <div></div>
                                        <IconEnter
                                            className={style.iconEnter}
                                        />
                                        <span>{listItem.data.title}</span>
                                    </Link>
                                </li>
                            )
                        );

                    case "show_all":
                        return (
                            <li
                                key={"show_all"}
                                data-active={isActive}
                                className={style.list_item}
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
                                        Показать все результаты по{" "}
                                        {`"${searchQuery}"`}
                                    </span>
                                </Link>
                            </li>
                        );

                    case "add_place":
                        return (
                            <li
                                key={"add_place"}
                                data-active={isActive}
                                className={style.list_item}
                            >
                                <Link
                                    className={style.itemEmpty}
                                    href={"#add_est"}
                                >
                                    <div className={style.itemEmpty_iconCtn}>
                                        <IconPlus
                                            className={style.itemEmpty_icon}
                                        />
                                    </div>
                                    <span className={style.itemEmpty_text}>
                                        Добавить недостающее место
                                    </span>
                                </Link>
                            </li>
                        );
                }
            })}
        </ul>
    );
};

export default DropdownListFinder;
