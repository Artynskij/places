"use client";
import LocationMapper from "@/lib/Api/location/location.mapper";
import { TTilesContent } from "@/lib/models/common/TTilesContent";
import { ILocationFront } from "@/lib/models/frontend/location/location.front";

import style from "../tiles.module.scss";
import Link from "next/link";
import { ROUTES } from "@/lib/config/Routes";

import Input from "antd/lib/input/Input";
import { InputCustom } from "@/components/UI/Input/InputCustom/InputCustom";
import { useState } from "react";

interface ITileLocations {
    typeTileContent: TTilesContent;
    locations: ILocationFront[];
    rootLocationPath: string;
}
const TileLocations = ({
    typeTileContent,
    locations,
    rootLocationPath,
}: ITileLocations) => {
    const [valueInput, setValueInput] = useState<string>("");
    const nextLevelPathLengthOfRootLocation = rootLocationPath.length + 27;
    const locationMapper = new LocationMapper();
    const locationsFiltered =
        typeTileContent === "towns"
            ? locationMapper.transformToTowns(locations)
            : locationMapper.transformToDistricts(
                  locations,
                  nextLevelPathLengthOfRootLocation
              );
    const locationsInputFilter = valueInput
        ? locationsFiltered.filter((location) =>
              location.value.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase())
          )
        : locationsFiltered;
    return (
        <>
            <InputCustom
                value={valueInput}
                setValue={setValueInput}
                placeholder="введите название локации"
            />
            <div className={style.location_list}>
                {locationsInputFilter.length > 0
                    ? locationsInputFilter.map((location, index) => {
                          return (
                              <Link
                                  key={index}
                                  href={ROUTES.LOCATION.LOCATION(location.id)}
                              >
                                  <li>{location.value}</li>
                              </Link>
                          );
                      })
                    : "локации не найдены"}
            </div>
        </>
    );
};
export default TileLocations;
