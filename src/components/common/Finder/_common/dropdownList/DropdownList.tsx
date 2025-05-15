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
    if (!resultLoaded) {
        return <SpinnerAnt size="large" />;
    }

    // if (!searchResponse?.searchItems?.length) {
    //     return (
    //         <ul>
    //             {/* <span className={style.empty_state}>
    //                 По запросу "{searchQuery}" ничего не найдено
    //             </span> */}
    //             <Link href={"#testik"}>
    //                 <li className={style.empty_state}>
    //                     Показать все результаты поиска по запросу{" "}
    //                     {`"${searchQuery}"`}
    //                 </li>
    //             </Link>
    //         </ul>
    //     );
    // }

    return (
        <ul className={`${style.list}`} ref={ulRef}>
            {searchResponse?.searchItems.map((searchItem, index) => (
                <Link
                    onClick={onItemClick}
                    key={`${searchItem.id}-${index}`}
                    href={ROUTES_FINDER[searchItem.globalTypeEntity](
                        searchItem.id
                    )}
                    passHref
                >
                    <li
                        className={`${
                            index === activeIndex ? style.active : ""
                        }`}
                    >
                        <CardSearch dataCard={searchItem} />
                    </li>
                </Link>
            ))}

            <Link href={ROUTES.SEARCH(`${searchQuery}`)}>
                <li className={style.itemEmpty}>
                    <div className={style.itemEmpty_iconCtn}>
                        <IconSearch className={style.itemEmpty_icon} />
                    </div>
                    <div className={style.itemEmpty_text}>
                        Показать все результаты поиска по запросу{" "}
                        {`"${searchQuery}"`}
                    </div>
                </li>
            </Link>
            <Link href={"#add_est"}>
                <li className={style.itemEmpty}>
                    <div className={style.itemEmpty_iconCtn}>
                        <IconPlus className={style.itemEmpty_icon} />
                    </div>
                    <div className={style.itemEmpty_text}>
                        Добавить недостающее место
                    </div>
                </li>
            </Link>
        </ul>
    );
};

export default DropdownList;
