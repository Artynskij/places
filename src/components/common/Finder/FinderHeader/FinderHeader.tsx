"use client";
import style from "./finderHeader.module.scss";
import { useFinderCore } from "../FinderCore";
import { useTranslations } from "next-intl";
import {
    IconArrowLeft,
    IconCancel,
    IconSearch,
} from "@/components/common/Icons";
import { Overlay } from "@/components/common/Overlay/Overlay";
import { SpinnerAnt } from "../../Spinner/SpinnerAnt";
import { CardSearch } from "../../Cards/CardSearch/CardSearch";
import Link from "next/link";
import { ROUTES_FINDER } from "@/lib/config/Routes";
import DropdownList from "../_common/dropdownList/DropdownList";

export const FinderHeader = () => {
    const t = useTranslations("Header");
    const {
        refInput,
        refUl,
        searchResponse,
        resultLoaded,
        activeIndex,
        inputValueActive,
        searchActive,
        setSearchActive,
        handleKeyDown,
        handlerChangeInput,
        handlerClearInput,
        handlerCloseInput,
        handlerOpenInput,
    } = useFinderCore();

    return (
        <form className={style.form_finder}>
            <div
                onClick={handlerOpenInput}
                active-class={`${searchActive}`}
                className={style.blockFinder}
            >
                <div className={style.blockFinder_input}>
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
                <div className={style.blockFinder_dropdown}>
                    <div className={style.dropdown}>
                        {/* {resultLoaded ? (
                            <ul ref={refUl}>
                                {searchResponse?.searchItems.length &&
                                searchResponse?.searchItems.length > 0 ? (
                                    searchResponse.searchItems.map(
                                        (searchItem, index) => (
                                            <Link
                                                onClick={handlerCloseInput}
                                                key={searchItem.id}
                                                href={ROUTES_FINDER[
                                                    searchItem.globalTypeEntity
                                                ](searchItem.id)}
                                            >
                                                <li
                                                    className={
                                                        index === activeIndex
                                                            ? style.active
                                                            : ""
                                                    }
                                                >
                                                    <CardSearch
                                                        dataCard={searchItem}
                                                    />
                                                    <div>
                                                        {
                                                            searchItem.globalTypeEntity
                                                        }
                                                    </div>
                                                </li>
                                            </Link>
                                        )
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
                        )} */}
                        <DropdownList
                            resultLoaded={resultLoaded}
                            searchResponse={searchResponse}
                            activeIndex={activeIndex}
                            searchQuery={refInput.current?.value || ""}
                            onItemClick={handlerCloseInput}
                            ulRef={refUl}
                        />
                    </div>
                </div>
            </div>
            <Overlay active={searchActive} setActive={setSearchActive} />
        </form>
    );
};
