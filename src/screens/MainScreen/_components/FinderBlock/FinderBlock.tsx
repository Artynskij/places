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
import { ROUTES } from "@/lib/config/Routes";
import { useLocale } from "next-intl";
import { IEstablishmentFront } from "@/lib/models";
import { TYPES_OF_ESTABLISHMENT } from "@/asset/constants/typesOfEstablishment";
import { SpinnerAnt } from "@/components/common/Spinner/SpinnerAnt";
import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";

const FinderBlock = () => {
    const apiEstablishment = new EstablishmentService();
    const router = useRouter();
    const locale = useLocale();

    const switcherDataStart = switcherFinderMainPage;
    const refInput = useRef<HTMLInputElement>(null);
    const refUl = useRef<HTMLUListElement>(null);

    const [switcherData, setSwitcherData] = useState(switcherDataStart);

    const [results, setResults] = useState<IEstablishmentFront[] | null>(null);
    const [resultLoaded, setResultLoaded] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [inputValueActive, setInputValueActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const handlerKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!results) return;
        switch (e.key) {
            case "ArrowUp":
                setActiveIndex((prevIndex) =>
                    prevIndex === 0 ? results.length - 1 : prevIndex - 1
                );
                break;
            case "ArrowDown":
                setActiveIndex((prevIndex) =>
                    prevIndex === results.length - 1 ? 0 : prevIndex + 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (activeIndex >= 0 && activeIndex < results.length) {
                    const establishment = results[activeIndex];
                    console.log("Selected:", results[activeIndex]);
                    handlerCloseInput();
                    router.push(
                        ROUTES.LOCATION.ESTABLISHMENT(
                            establishment.location.town.id,
                            TYPES_OF_ESTABLISHMENT[
                                establishment.typeEstablishment
                            ].key,
                            establishment.id
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
        setActiveIndex(-1);
        if (current.value.length > 0 && !inputValueActive) {
            setInputValueActive(true);
        } else if (current.value.length === 0 && inputValueActive) {
            setInputValueActive(false);
        }

        setResults(null); // TODO
    }
    function handlerClearInput() {
        const current = refInput.current as HTMLInputElement;
        current.value = "";
        setResults(null); // TODO
        setInputValueActive(false);
        setActiveIndex(-1);
    }
    function handlerCloseInput() {
        setActiveIndex(-1);
        setSearchActive(false);
    }
    function openInput() {
        if (searchActive !== false) return;
        setSearchActive(true);
        apiEstablishment
            .getEstablishmentByPagination({
                lang: locale,
                pagination: { page: 1, pageSize: 10 },
            })
            .then((res) => {
                setResults(res);
                setResultLoaded(true);
            });
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
                    onClick={openInput}
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
                                    {results && results.length > 0 ? (
                                        results.map((establishment, index) => {
                                            return (
                                                <Link
                                                    onClick={handlerCloseInput}
                                                    key={establishment.id}
                                                    href={ROUTES.LOCATION.ESTABLISHMENT(
                                                        establishment.location
                                                            .town.id,
                                                        TYPES_OF_ESTABLISHMENT[
                                                            establishment
                                                                .typeEstablishment
                                                        ].key,
                                                        establishment.id
                                                    )}
                                                    className={`${
                                                        style.dropdown_list_item
                                                    } ${
                                                        index === activeIndex
                                                            ? style.active
                                                            : ""
                                                    }`}
                                                >
                                                    <li
                                                    // className={index === activeIndex ? style.active : ""}
                                                    >
                                                        <CardSearch
                                                            establishment={
                                                                establishment
                                                            }
                                                        />
                                                    </li>
                                                </Link>
                                            );
                                        })
                                    ) : (
                                        <span>
                                            {"По запросу"}{" "}
                                            {`"${refInput.current?.value}"`}{" "}
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
