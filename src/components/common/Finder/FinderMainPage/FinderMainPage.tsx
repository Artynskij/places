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
import { SpinnerAnt } from "@/components/common/Spinner/SpinnerAnt";
import { CardSearch } from "@/components/common/Cards";
import Link from "next/link";
import { ROUTES_FINDER } from "@/lib/config/Routes";
import DropdownList from "../_common/dropdownList/DropdownList";

const FinderMainPage = () => {
    const switcherDataStart = switcherFinderMainPage;
    const {
        refInput,
        refUl,
        searchResponse,
        resultLoaded,
        activeIndex,
        inputValueActive,
        searchActive,
        currentFilter,
        setSearchActive,
        setCurrentFilter,
        handleKeyDown,
        handlerChangeInput,
        handlerClearInput,
        handlerCloseInput,
        handlerOpenInput,
    } = useFinderCore("");

    const handleSwitcherChange = (value: string) => {
        setCurrentFilter(value === "all" ? "" : value);
    };

    return (
        <>
            <h1 className={style.title}>
                {switcherDataStart.find(
                    (item) => item.value === (currentFilter || "all")
                )?.title || "Усё"}
            </h1>
            <div className={style.switcher}>
                <Switcher
                    callBack={({ value }) => handleSwitcherChange(value)}
                    data={switcherDataStart.map((item) => ({
                        ...item,
                        active: item.value === (currentFilter || "all"),
                    }))}
                />
            </div>

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
                        {!searchActive && <Button text="Искать" />}
                    </div>
                    <div className={style.blockFinder_dropdown}>
                        <div className={style.dropdown}>
                            {/* {resultLoaded ? (
                                <ul className={style.dropdown_list} ref={refUl}>
                                    {searchResponse?.searchItems.length&&searchResponse?.searchItems.length > 0 ? (
                                        searchResponse.searchItems.map((searchItem, index) => (
                                            <Link
                                                onClick={handlerCloseInput}
                                                key={searchItem.id}
                                                href={ROUTES_FINDER[searchItem.globalTypeEntity](searchItem.id)}
                                                className={`${style.dropdown_list_item} ${
                                                    index === activeIndex ? style.active : ""
                                                }`}
                                            >
                                                <li>
                                                    <CardSearch dataCard={searchItem} />
                                                    <div>{searchItem.globalTypeEntity}</div>
                                                </li>
                                            </Link>
                                        ))
                                    ) : (
                                        <span>
                                            {"По запросу"} {`"${refInput.current?.value}"`}
                                            {"Ничего не найдено"}
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
