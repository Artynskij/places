"use client";
import style from "./finderMainPage.module.scss";
import { useFinderCore } from "../FinderCore";
import { Switcher } from "@/components/common/Switcher/Switcher";
import {
    IconArrowLeft,
    IconCancel,
    IconSearch,
} from "@/components/common/Icons";
import { Overlay } from "@/components/common/Overlay/Overlay";
import { Button } from "@/components/UI/Button/Button";
import { switcherFinderMainPage } from "@/asset/constants/switcherTabsPage";

import DropdownListFinder from "../_common/DropdownListFinder/DropdownListFinder";
import { useEffect } from "react";
import { TTypesOfSearchKey } from "@/lib/models/common/TTypesGlobal";

const FinderMainPage = () => {
    const switcherDataStart = switcherFinderMainPage;
    const {
        refInput,
        refUl,
        searchResponse,
        resultLoaded,
        activeIndex,
        searchActive,
        currentFilter,
        stateInputFind,
        setSearchActive,
        handleSwitcherChange,
        handleKeyDown,
        handlerChangeInput,
        handlerClearInput,
        handlerCloseInput,
        handlerOpenInput,
        handlerMouseEnter,
    } = useFinderCore("");
    useEffect(() => {
        if (searchActive && refInput.current) {
            refInput.current.focus();
        }
    }, [searchActive, refInput]);

    return (
        <>
            <h1 className={style.title}>
                {switcherDataStart.find(
                    (item) => item.value === (currentFilter || "all")
                )?.title || "Усё"}
            </h1>
            <div className={style.switcher}>
                <Switcher
                    callBack={({ value }) =>
                        handleSwitcherChange(value as TTypesOfSearchKey)
                    }
                    data={switcherDataStart.map((item) => ({
                        ...item,
                        active: item.value === (currentFilter || "all"),
                    }))}
                />
            </div>

            <form onKeyDown={handleKeyDown} className={style.form_finder}>
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
                            <IconSearch className={style.icon} />
                        )}

                        <div className={style.ctnInput}>
                            <input
                                placeholder={
                                    switcherDataStart.find(
                                        (item) =>
                                            item.value ===
                                            (currentFilter || "all")
                                    )?.placeHolder || "Усё"
                                }
                                onChange={handlerChangeInput}
                                ref={refInput}
                                type="text"
                                value={stateInputFind}
                                maxLength={100}
                            />
                        </div>
                        {searchActive && !!stateInputFind && (
                            <IconCancel
                                onClick={handlerClearInput}
                                className={style.iconClear}
                            />
                        )}
                        {!searchActive && <Button text="Искать" />}
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
                                searchQuery={refInput.current?.value || ""}
                                onItemClick={handlerCloseInput}
                                ulRef={refUl}
                            />
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
export default FinderMainPage;
