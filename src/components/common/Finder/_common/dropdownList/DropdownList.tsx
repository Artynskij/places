"use client";
import { RefObject } from "react";
import Link from "next/link";
import { ROUTES_FINDER } from "@/lib/config/Routes";
import { ISearchQueryResponseFront } from "@/lib/models/frontend/search/searchQueryResponse.front";
import { CardSearch } from "@/components/common/Cards";
import { SpinnerAnt } from "@/components/common/Spinner/SpinnerAnt";
import style from "./dropdownList.module.scss";
import { IconSearch } from "@/components/common/Icons";

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
                        <div className={style.item_type}>
                            {searchItem.globalTypeEntity}
                        </div>
                    </li>
                </Link>
            ))}

            <Link href={"#testik"}>
                <li className={style.itemEmpty}>
                    <div className={style.iconSearch}>
                        <IconSearch className={style.iconSearch_icon} />
                    </div>
                    <div>
                        Показать все результаты поиска по запросу{" "}
                        {`"${searchQuery}"`}
                    </div>
                </li>
            </Link>
        </ul>
    );
};

export default DropdownList;
