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
import DropdownListFinder from "../_common/DropdownListFinder/DropdownListFinder";
import { useEffect } from "react";

export const FinderHeader = () => {
    const t = useTranslations("Header");
    const {
        refInput,
        refUl,
        stateInputFind,
        searchResponse,
        resultLoaded,
        activeIndex,
        // inputValueActive,
        searchActive,
        setSearchActive,
        handleKeyDown,
        handlerChangeInput,
        handlerClearInput,
        handlerCloseInput,
        handlerOpenInput,
        handlerMouseEnter,
    } = useFinderCore();
    useEffect(() => {
        if (searchActive && refInput.current) {
            refInput.current.focus();
        }
    }, [searchActive, refInput]);
    return (
        <form
            onKeyDown={handleKeyDown} // Переносим обработчик сюда
            className={style.form_finder}
        >
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
                            // onKeyDown={handleKeyDown}
                            value={stateInputFind}
                            ref={refInput}
                            type="text"
                            maxLength={100}
                        />
                    </div>
                    {searchActive && !!stateInputFind && (
                        <IconCancel
                            onClick={handlerClearInput}
                            className={style.iconClear}
                        />
                    )}
                </div>
                <div className={style.blockFinder_dropdown}>
                    <div
                        onMouseEnter={handlerMouseEnter}
                        className={style.dropdown}
                    >
                        <DropdownListFinder
                            resultLoaded={resultLoaded}
                            searchResponse={searchResponse}
                            activeIndex={activeIndex}
                            searchQuery={stateInputFind || ""}
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
