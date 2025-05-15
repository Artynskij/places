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
import DropdownList from "../_common/DropdownList/DropdownList";

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
