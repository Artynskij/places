"use client";
import { MapTravel } from "@/components/common/Map/Mapbox/MapTravel";
import style from "./tabTravelMap.module.scss";
import clsx from "clsx";
import { InputCustom } from "@/components/UI/Input/InputCustom/InputCustom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/UI/Button/Button";
import {
    IconArrowLeft,
    IconArrowRight,
    IconCancel,
    IconDone,
    IconEye,
    IconLike,
    IconStar,
} from "@/components/common/Icons";
import { useMapboxGeocode } from "@/lib/hooks/useMapboxGeocode";
import { SearchService } from "@/lib/Api/search/search.service";
import {
    ILocationFront,
    IMapboxCoordProp,
    IPersonTravelMarkFront,
    ISearchItemFront,
} from "@/lib/models";
import { useLocale } from "next-intl";
import { useNotification } from "@/lib/context";
import { PersonTravelMarkService } from "@/lib/Api/(Person)/personTravelMark.api";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { debounce } from "lodash";
import CardTravelList from "./_components/card/cardTravelList";
import { TTravelMapAction } from "@/lib/models/types";
import TravelMapIcon from "./_components/icon/TravelIcon";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
// interface ITravelList
const TabTravelMap = () => {
    const locale = useLocale();
    const getLocation = useMapboxGeocode().byName;
    const notification = useNotification();
    const { user } = useUser();

    const [searchValue, setSearchValue] = useState("");
    const [activeSearch, setActiveSearch] = useState(true);
    const [activeMarksList, setActiveMarksList] = useState(true);
    const [modalWantedActive, setModalWantedActive] = useState(false);
    const [modalLovedActive, setModalLovedActive] = useState(false);
    const [modalVisitedActive, setModalVisitedActive] = useState(false);
    const [searchList, setSearchList] = useState<ISearchItemFront[]>([]);
    const [marksMap, setMarksMap] = useState<
        Map<string, IPersonTravelMarkFront>
    >(new Map());

    const [position, setPosition] = useState<IMapboxCoordProp>();

    const searchService = new SearchService();
    const personTravelMarkService = new PersonTravelMarkService();
    useEffect(() => {
        if (!user) {
            return;
        }
        personTravelMarkService.getByPersonId(user.id).then((res) => {
            if (res) {
                setMarksMap(
                    new Map(res.map((mark) => [mark.location.id, mark]))
                );
            }
            return res;
        });
    }, []);
    const debouncedSearch = useCallback(
        debounce(async (value: string) => {
            if (!value.trim()) {
                setSearchList([]);
                return;
            }
            try {
                const res = await searchService.querySearch({
                    indexKey: "TO_GO",
                    term: value,
                    localLang: locale,
                });
                if (res) {
                    setSearchList(res.searchItems);
                }
            } catch (err) {
                console.error("Ошибка поиска", err);
            }
        }, 400),
        [locale]
    );
    const handleChange = (value: string) => {
        setSearchValue(value);
        debouncedSearch(value);
    };

    const handlerClickEye = async (locationSearch: ISearchItemFront) => {
        const locationPath = await getLocation(locationSearch.title);

        if (!locationPath) {
            notification.info({ message: "локация не найдена" });
            return;
        }
        const locationMapData = locationPath.features.find(
            (item) =>
                item.text.toLocaleLowerCase() ===
                locationSearch.title.toLocaleLowerCase()
        );

        if (locationMapData) {
            setPosition({
                lon: +locationMapData.center[0],
                lat: +locationMapData.center[1],
                bBox: locationMapData.bbox
                    ? {
                          minLon: locationMapData.bbox[0],
                          minLat: locationMapData.bbox[1],
                          maxLon: locationMapData.bbox[2],
                          maxLat: locationMapData.bbox[3],
                      }
                    : null,
            });
            notification.info({ message: "обновление центра" });
        }
    };
    const handlerToggleIcon = async ({
        type,
        searchItem,
        travelMark,
    }: {
        type: TTravelMapAction;
        searchItem?: ISearchItemFront;
        travelMark: IPersonTravelMarkFront | null;
    }) => {
        if (!user) return;

        const toggleValues = (mark?: IPersonTravelMarkFront) => ({
            isVisited:
                type === "visited"
                    ? !mark?.isVisited
                    : mark?.isVisited ?? false,
            isWanted:
                type === "wanted" ? !mark?.isWanted : mark?.isWanted ?? false,
            isLoved: type === "loved" ? !mark?.isLoved : mark?.isLoved ?? false,
        });

        if (travelMark) {
            const updated = toggleValues(travelMark);
            if (Object.values(updated).filter(Boolean).length === 0) {
                const res = await personTravelMarkService.delete(travelMark.id);
                if (res) {
                    setMarksMap((prev) => {
                        const newMap = new Map(prev);
                        newMap.delete(searchItem?.id || travelMark.location.id); // удаляем по ключу
                        return newMap;
                    });
                    notification.info({ message: "Метка удалена" });
                } else {
                    notification.error({
                        message: "Ошибка при удалении метки",
                    });
                }
            } else {
                const res = await personTravelMarkService.update(
                    travelMark.id,
                    {
                        Location: travelMark.location.id,
                        Person: travelMark.personId,
                        IsLoved: updated.isLoved,
                        IsVisited: updated.isVisited,
                        IsWanted: updated.isWanted,
                    }
                );

                if (res) {
                    setMarksMap((prev) =>
                        new Map(prev).set(
                            searchItem?.id || travelMark.location.id,
                            {
                                ...travelMark,
                                ...updated,
                            }
                        )
                    );
                    notification.info({ message: "Метка обновлена" });
                } else {
                    notification.error({
                        message: "Ошибка при обновлении метки",
                    });
                }
            }
        } else {
            if (!searchItem) return;
            const newValues = toggleValues();
            const res = await personTravelMarkService.create({
                Location: searchItem?.id,
                Person: user.id,
                IsLoved: newValues.isLoved,
                IsVisited: newValues.isVisited,
                IsWanted: newValues.isWanted,
            });

            if (res) {
                setMarksMap((prev) =>
                    new Map(prev).set(searchItem.id, {
                        id: res.id,
                        location: {
                            id: searchItem.id,
                            title: searchItem.title,
                        },
                        personId: user.id,
                        ...newValues,
                    })
                );
                notification.info({ message: "Метка создана" });
            } else {
                notification.error({ message: "Ошибка при создании метки" });
            }
        }
    };

    const handlerOpenModal = (type: TTravelMapAction) => {
        if (type === "loved") {
            setModalLovedActive(true);
        }
        if (type === "visited") {
            setModalVisitedActive(true);
        }
        if (type === "wanted") {
            setModalWantedActive(true);
        }
    };
    const handlerCloseModal = (type: TTravelMapAction) => {
        if (type === "loved") {
            setModalLovedActive(false);
        }
        if (type === "visited") {
            setModalVisitedActive(false);
        }
        if (type === "wanted") {
            setModalWantedActive(false);
        }
    };
    const marksArray = Array.from(marksMap.values());
    const visitedList = marksArray.filter((mark) => mark.isVisited);
    const wantedList = marksArray.filter((mark) => mark.isWanted);
    const lovedList = marksArray.filter((mark) => mark.isLoved);
    return (
        <>
            <div className={style.tab_travel}>
                <MapTravel position={position} />
                <div className={style.blockAbsolute}>
                    {activeMarksList && (
                        <div className={clsx(style.marks)}>
                            <Button
                                text="Закрыть"
                                className={style.search_close}
                                icon={<IconCancel />}
                                onClick={() => setActiveMarksList(false)}
                            />
                            <div className={style.marks_filter}>
                                <div
                                    onClick={() => handlerOpenModal("visited")}
                                    className={style.marks_filter_item}
                                >
                                    <TravelMapIcon active type="visited" />{" "}
                                    <span>{`Был(а)  ${visitedList.length}`}</span>
                                </div>
                                <div
                                    onClick={() => handlerOpenModal("loved")}
                                    className={style.marks_filter_item}
                                >
                                    <TravelMapIcon active type="loved" />{" "}
                                    <span>{`Люблю  ${lovedList.length}`}</span>
                                </div>
                                <div
                                    onClick={() => handlerOpenModal("wanted")}
                                    className={style.marks_filter_item}
                                >
                                    <TravelMapIcon active type="wanted" />{" "}
                                    <span>{`Хочу ${wantedList.length}`}</span>
                                </div>
                            </div>
                            <div className={style.marks_legend}>
                                <div className={style.marks_legend_item}>
                                    <TravelMapIcon active type="visited" />{" "}
                                    <span>- был</span>
                                </div>
                                <div className={style.marks_legend_item}>
                                    <TravelMapIcon active type="loved" />{" "}
                                    <span>- люблю</span>
                                </div>
                                <div className={style.marks_legend_item}>
                                    <TravelMapIcon active type="wanted" />
                                    <span>- хочу</span>
                                </div>
                            </div>
                        </div>
                    )}
                    {!activeMarksList && (
                        <Button
                            onClick={() => {
                                setActiveMarksList(true);
                            }}
                            text="Посмотреть свои локации"
                            className={style.marks_buttonOpen}
                        />
                    )}
                    <div
                        className={clsx(
                            style.search,
                            activeSearch && style.search_active
                        )}
                    >
                        {!activeSearch ? (
                            <Button
                                className={style.search_open}
                                text="Искать локацию"
                                onClick={() => setActiveSearch(true)}
                            />
                        ) : (
                            <div className={style.search_block}>
                                <Button
                                    text="Закрыть поиск"
                                    className={style.search_close}
                                    icon={<IconCancel />}
                                    onClick={() => setActiveSearch(false)}
                                />
                                {/* <IconCancel className={style.search_close} onClick={() => setActiveSearch(false)} /> */}
                                <InputCustom
                                    classNameCtn={style.search_input_ctn}
                                    classNameInput={style.search_input}
                                    setValue={handleChange}
                                    value={searchValue}
                                    placeholder="поиск локации"
                                />

                                <ul className={style.list}>
                                    {searchList.length > 0 &&
                                        searchList.map((searchItem) => {
                                            const current = searchItem.id
                                                ? marksMap.get(searchItem.id)
                                                : null;

                                            return (
                                                <li
                                                    className={style.list_item}
                                                    key={searchItem.id}
                                                >
                                                    <CardTravelList
                                                        current={
                                                            current || null
                                                        }
                                                        searchItem={searchItem}
                                                        handlerClickEye={
                                                            handlerClickEye
                                                        }
                                                        handlerToggleIcon={
                                                            handlerToggleIcon
                                                        }
                                                    />
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ModalCustom
                title="Был(а)"
                view="fit"
                active={modalVisitedActive}
                closeModal={() => handlerCloseModal("visited")}
            >
                <ul className={style.list}>
                    {visitedList.map((mark) => (
                        <li className={style.list_item} key={mark.id}>
                            <CardTravelList
                                current={mark}
                                handlerClickEye={handlerClickEye}
                                handlerToggleIcon={handlerToggleIcon}
                            />
                        </li>
                    ))}
                </ul>
            </ModalCustom>
            <ModalCustom
                title="Люблю"
                view="fit"
                active={modalLovedActive}
                closeModal={() => handlerCloseModal("loved")}
            >
                <ul className={style.list}>
                    {lovedList.map((mark) => (
                        <li className={style.list_item} key={mark.id}>
                            <CardTravelList
                                current={mark}
                                handlerClickEye={handlerClickEye}
                                handlerToggleIcon={handlerToggleIcon}
                            />
                        </li>
                    ))}
                </ul>
            </ModalCustom>
            <ModalCustom
                title="Хочу"
                view="fit"
                active={modalWantedActive}
                closeModal={() => handlerCloseModal("wanted")}
            >
                <ul className={style.list}>
                    {wantedList.map((mark) => (
                        <li className={style.list_item} key={mark.id}>
                            <CardTravelList
                                current={mark}
                                handlerClickEye={handlerClickEye}
                                handlerToggleIcon={handlerToggleIcon}
                            />
                        </li>
                    ))}
                </ul>
            </ModalCustom>
        </>
    );
};

export default TabTravelMap;
