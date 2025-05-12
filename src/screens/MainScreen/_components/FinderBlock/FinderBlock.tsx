"use client";
import { Switcher } from "@/components/common/Switcher/Switcher";
import style from "./finderBlock.module.scss";
import { KeyboardEvent, useRef, useState } from "react";
import { mockFinder } from "@/asset/mockData/mockFinder";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CardSearch } from "@/components/common/Cards";
import {
    IconArrowLeft,
    IconCancel,
    IconSearch,
} from "@/components/common/Icons";
import { Overlay } from "@/components/common/Overlay/Overlay";
import { Button } from "@/components/UI/Button/Button";
import { switcherFinderMainPage } from "@/asset/constants/switcherTabsPage";
import { ROUTES, ROUTES_FINDER } from "@/lib/config/Routes";
import { useLocale } from "next-intl";
import { IEstablishmentFront } from "@/lib/models";
import { TYPES_OF_ESTABLISHMENT } from "@/asset/constants/typesOfEstablishment";
import { SpinnerAnt } from "@/components/common/Spinner/SpinnerAnt";
import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";
import { SearchService } from "@/lib/Api/search/search.service";
import { ISearchQueryResponseFront } from "@/lib/models/frontend/search/searchQueryResponse.front";
import { TTypesOfSearchKey } from "@/lib/models/common/TTypesGlobal";

const FinderBlock = () => {
    const apiSearch = new SearchService();
    const router = useRouter();
    const locale = useLocale();

    const switcherDataStart = switcherFinderMainPage;
    const refInput = useRef<HTMLInputElement>(null);
    const refUl = useRef<HTMLUListElement>(null);

    const [switcherData, setSwitcherData] = useState(switcherDataStart);

    const [searchResponse, setSearchResponse] =
        useState<ISearchQueryResponseFront | null>(null);
    const [resultLoaded, setResultLoaded] = useState<boolean>(false);
    const [activeIndexListSearchItems, setActiveIndexListSearchItems] =
        useState(-1);
    const [inputValueActive, setInputValueActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const handlerKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!searchResponse) return;
        switch (e.key) {
            case "ArrowUp":
                setActiveIndexListSearchItems((prevIndex) =>
                    prevIndex === 0
                        ? searchResponse.searchItems.length - 1
                        : prevIndex - 1
                );
                break;
            case "ArrowDown":
                setActiveIndexListSearchItems((prevIndex) =>
                    prevIndex === searchResponse.searchItems.length - 1
                        ? 0
                        : prevIndex + 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (
                    activeIndexListSearchItems >= 0 &&
                    activeIndexListSearchItems <
                        searchResponse.searchItems.length
                ) {
                    const searchItem =
                        searchResponse.searchItems[activeIndexListSearchItems];
                    console.log(
                        "Selected:",
                        searchResponse.searchItems[activeIndexListSearchItems]
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
        setActiveIndexListSearchItems(-1);
        if (current.value.length > 0 && !inputValueActive) {
            setInputValueActive(true);
        } else if (current.value.length === 0 && inputValueActive) {
            setInputValueActive(false);
        }
        const indexKey = switcherData.find((item) => item.active)?.value;
        apiSearch
            .querySearch({
                localLang: locale,
                term: refInput.current?.value || "",
                indexKey:
                    indexKey === "all" ? "" : (indexKey as TTypesOfSearchKey),
            })
            .then((res) => {
                setSearchResponse(res);
                // setResultLoaded(true);
            });
    }
    function handlerClearInput() {
        const current = refInput.current as HTMLInputElement;
        current.value = "";
        setSearchResponse(null); // TODO
        setInputValueActive(false);
        setActiveIndexListSearchItems(-1);
    }
    function handlerCloseInput() {
        setActiveIndexListSearchItems(-1);
        setSearchActive(false);
    }
    function handlerOpenInput() {
        if (searchActive !== false) return;
        const indexKey = switcherData.find((item) => item.active)?.value;
        setSearchActive(true);
        if (!searchResponse) {
            apiSearch
                .querySearch({
                    localLang: locale,
                    term: refInput.current?.value || "",
                    indexKey:
                        indexKey === "all"
                            ? ""
                            : (indexKey as TTypesOfSearchKey),
                })
                .then((res) => {
                    setSearchResponse(res);
                    setResultLoaded(true);
                });
        }
    }
    return (
        <>
            <h1 className={style.title}>
                {switcherData.find((item) => item.active)?.title || "Усё"}
            </h1>
            <div className={style.switcher}>
                <Switcher
                    callBack={(value) => {
                        setSwitcherData((prev) => {
                            return prev.map((item) => {
                                item.value === value.value
                                    ? (item.active = true)
                                    : (item.active = false);
                                return item;
                            });
                        });
                    }}
                    data={switcherData}
                />
            </div>

            <form className={style.form_finder}>
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
                            <IconSearch className={style.icon} />
                        )}

                        <div className={style.ctnInput}>
                            <input
                                placeholder={
                                    switcherData.find((item) => item.active)
                                        ?.placeHolder || "Усё"
                                }
                                onChange={handlerChangeInput}
                                onKeyDown={handlerKeyDown}
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
                        {!searchActive && <Button text="Искать" />}
                    </div>
                    <div className={style.block_dropdown}>
                        <div className={style.dropdown}>
                            {resultLoaded ? (
                                <ul className={style.dropdown_list} ref={refUl}>
                                    {searchResponse &&
                                    searchResponse.searchItems.length > 0 ? (
                                        searchResponse.searchItems.map(
                                            (searchItem, index) => {
                                                return (
                                                    <Link
                                                        onClick={
                                                            handlerCloseInput
                                                        }
                                                        key={searchItem.id}
                                                        href={ROUTES_FINDER[
                                                            searchItem
                                                                .globalTypeEntity
                                                        ](searchItem.id)}
                                                        className={`${
                                                            style.dropdown_list_item
                                                        } ${
                                                            index ===
                                                            activeIndexListSearchItems
                                                                ? style.active
                                                                : ""
                                                        }`}
                                                    >
                                                        <li
                                                        // className={index === activeIndex ? style.active : ""}
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
                                            {"По запросу"}{" "}
                                            {`"${refInput.current?.value}"`}
                                            {"Ничего не найдено"}
                                        </span>
                                    )}
                                </ul>
                            ) : (
                                <SpinnerAnt size="large" />
                            )}
                        </div>
                    </div>
                </div>
                <Overlay
                    scrollLock={false}
                    active={searchActive}
                    setActive={setSearchActive}
                />
            </form>
        </>
    );
};
export default FinderBlock;
