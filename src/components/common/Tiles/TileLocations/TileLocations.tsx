"use client";
import LocationMapper from "@/lib/Api/location/location.mapper";
import { TTilesContent } from "@/lib/models/types/TTilesContent";

import style from "../tiles.module.scss";
import Link from "next/link";
import { ROUTES } from "@/lib/config/Routes";

import { InputCustom } from "@/components/UI/Input/InputCustom/InputCustom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ILocationFront } from "@/lib/models";
import { LocationService } from "@/lib/Api/location/location.service";
import { CONSTANT_TYPE_LOCATION_DB } from "@/asset/constants/database/type-location";
import { LocationTypesService } from "@/lib/Api/location-types.api";
import useLocale from "@/lib/hooks/useLocale";

interface ITileLocations {
    typeTileContent: TTilesContent;

    rootLocationPath: string;
}
const TileLocations = ({
    typeTileContent,

    rootLocationPath,
}: ITileLocations) => {
    const [valueInput, setValueInput] = useState<string>("");
    const [locationsList, setLocationsList] = useState<ILocationFront[]>([]);
    const locale = useLocale();

    const services = useMemo(
        () => ({
            location: new LocationService(),
            locationType: new LocationTypesService(),
        }),
        []
    );
    const initializeData = useCallback(async () => {
        const locationsTypesResponse = await services.locationType.getAll();
        const districtTypes = locationsTypesResponse?.filter(
            (item) =>
                item.type.Name === CONSTANT_TYPE_LOCATION_DB.REGION ||
                item.type.Name === CONSTANT_TYPE_LOCATION_DB.DISTRICT
        );
        const townsTypes = locationsTypesResponse?.filter(
            (item) =>
                item.type.Name === CONSTANT_TYPE_LOCATION_DB.CITY ||
                item.type.Name === CONSTANT_TYPE_LOCATION_DB.TOWN
        );
        if (typeTileContent === "towns") {
            const townsResponse = await services.location.getAll({
                lang: locale,
                locationId: rootLocationPath,
                locationTypeIds:
                    townsTypes?.map((item) => item.type.Id) || null,
                pagination: {
                    page: 1,
                    pageSize: 1000,
                },
            });
            setLocationsList(townsResponse?.locations || []);
        } else {
            const districtsResponse = await services.location.getAll({
                lang: locale,
                locationId: rootLocationPath,
                locationTypeIds:
                    districtTypes?.map((item) => item.type.Id) || null,
                pagination: {
                    page: 1,
                    pageSize: 1000,
                },
            });
            setLocationsList(districtsResponse?.locations || []);
        }
    }, [services, typeTileContent, locale, rootLocationPath]);
    useEffect(() => {
        initializeData();
    }, [initializeData]);

    return (
        <>
            <InputCustom
                value={valueInput}
                setValue={setValueInput}
                placeholder="введите название локации"
            />
            <div className={style.location_list}>
                {locationsList.length > 0
                    ? locationsList.map((location, index) => {
                          return (
                              <Link
                                  key={index}
                                  href={ROUTES.LOCATION.LOCATION(location.id)}
                              >
                                  <li>{location.title}</li>
                              </Link>
                          );
                      })
                    : "локации не найдены"}
            </div>
        </>
    );
};
export default TileLocations;
