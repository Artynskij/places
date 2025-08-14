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
// interface ITravelList
const TabTravelMap = () => {
    const locale = useLocale();
    const getLocation = useMapboxGeocode().byName;
    const notification = useNotification();
    const { user } = useUser();

    const [searchValue, setSearchValue] = useState("");
    const [activeSearch, setActiveSearch] = useState(false);
    const [activeMarksList, setActiveMarksList] = useState(false);
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
        type: "loved" | "wanted" | "visited";
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

    return (
        <div className={style.tab_travel}>
            <MapTravel position={position} />

            <div className={style.search}>
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
                                            <div
                                                className={style.list_item_left}
                                            >
                                                <span>{searchItem.title}</span>
                                                <IconEye
                                                    onClick={() => {
                                                        handlerClickEye(
                                                            searchItem
                                                        );
                                                    }}
                                                    className={style.iconEye}
                                                />
                                            </div>

                                            <div
                                                className={
                                                    style.list_item_buttons
                                                }
                                            >
                                                <IconDone
                                                    onClick={() => {
                                                        handlerToggleIcon({
                                                            type: "visited",
                                                            searchItem,
                                                            travelMark:
                                                                current || null,
                                                        });
                                                    }}
                                                    className={clsx(
                                                        style.iconDone,
                                                        current?.isVisited &&
                                                            style.iconDone_active
                                                    )}
                                                />

                                                <IconLike
                                                    onClick={() => {
                                                        handlerToggleIcon({
                                                            type: "loved",
                                                            searchItem,
                                                            travelMark:
                                                                current || null,
                                                        });
                                                    }}
                                                    active={
                                                        current?.isLoved
                                                            ? true
                                                            : false
                                                    }
                                                    className={clsx(
                                                        style.iconLike,
                                                        current?.isLoved &&
                                                            style.iconLike_active
                                                    )}
                                                />
                                                <IconStar
                                                    onClick={() => {
                                                        handlerToggleIcon({
                                                            type: "wanted",
                                                            searchItem,
                                                            travelMark:
                                                                current || null,
                                                        });
                                                    }}
                                                    className={clsx(
                                                        style.iconStar,
                                                        current?.isWanted &&
                                                            style.iconStar_active
                                                    )}
                                                />
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                )}
            </div>
            <div
                className={clsx(
                    style.marks,
                    activeMarksList && style.marks_active
                )}
            >
                {activeMarksList && (
                    <div className={style.marks_block}>
                        <ul className={style.list}>
                            {Array.from(marksMap.values()).map((mark) => (
                                <li className={style.list_item} key={mark.id}>
                                    <div className={style.list_item_left}>
                                        <span>{mark.id}</span>
                                        {/* <IconEye
                                            onClick={() => {
                                                handlerClickEye(
                                                    searchItem
                                                );
                                            }}
                                            className={style.iconEye}
                                        /> */}
                                    </div>

                                    <div className={style.list_item_buttons}>
                                        <IconDone
                                            onClick={() => {
                                                handlerToggleIcon({
                                                    type: "visited",

                                                    travelMark: mark,
                                                });
                                            }}
                                            className={clsx(
                                                style.iconDone,
                                                mark.isVisited &&
                                                    style.iconDone_active
                                            )}
                                        />

                                        <IconLike
                                            onClick={() => {
                                                handlerToggleIcon({
                                                    type: "loved",
                                                    travelMark: mark,
                                                });
                                            }}
                                            active={mark.isLoved ? true : false}
                                            className={clsx(
                                                style.iconLike,
                                                mark.isLoved &&
                                                    style.iconLike_active
                                            )}
                                        />
                                        <IconStar
                                            onClick={() => {
                                                handlerToggleIcon({
                                                    type: "wanted",

                                                    travelMark: mark || null,
                                                });
                                            }}
                                            className={clsx(
                                                style.iconStar,
                                                mark.isWanted &&
                                                    style.iconStar_active
                                            )}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div
                            onClick={() => setActiveMarksList(false)}
                            className={style.iconArrow}
                        >
                            <IconArrowLeft className={style.iconArrow_icon} />
                        </div>
                    </div>
                )}
            </div>
            {!activeMarksList && (
                <Button
                    onClick={() => {
                        if (Array.from(marksMap.values()).length === 0) {
                            notification.info({
                                message: "У вас нету отмеченных локаций",
                            });
                            return;
                        }
                        setActiveMarksList(true);
                    }}
                    text="Посмотреть свои локации"
                    className={style.marks_buttonOpen}
                />
            )}
        </div>
    );
};

export default TabTravelMap;
