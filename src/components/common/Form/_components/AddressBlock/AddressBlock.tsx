"use client";
import style from "./addressBlock.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { InputForm } from "@/components/UI/Input/InputForm/InputForm";

import { FieldError, useFormContext } from "react-hook-form";
import { ILocationFront, ISearchItemFront } from "@/lib/models";
import { SearchService } from "@/lib/Api/search/search.service";
import { useLocale, useTranslations } from "next-intl";
import { LocationService } from "@/lib/Api/location/location.service";
interface Props {
    error: FieldError | null;
    locationId: string;
    onChange: (value: string) => void;
}
const AddressBlockForm: React.FC<Props> = ({ locationId, onChange, error }) => {
    // const { register, setValue } = useFormContext();
    const tLocations = useTranslations("Locations");
    const [search, setSearch] = useState("");
    const [searchItems, setSearchItem] = useState<ISearchItemFront[]>([]);
    const [breadcrumbLocations, setBreadcrumbLocations] = useState<
        ILocationFront[]
    >([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const refDropdown = useRef<HTMLDivElement | null>(null);

    const services = useMemo(
        () => ({
            search: new SearchService(),
            location: new LocationService(),
        }),
        []
    );
    const locale = useLocale();

    useEffect(() => {
        if (showDropdown) {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    refDropdown.current &&
                    !refDropdown.current.contains(event.target as Node)
                ) {
                    setShowDropdown(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
        // register("address.locationId");
    }, [showDropdown]);
    useEffect(() => {
        if (!!locationId) {
            services.location.getById(locationId).then((location) => {
                if (location) {
                    services.location
                        .getBreadcrumbData({
                            ids: location.pathBreadcrumb,
                            lang: locale,
                        })
                        .then((breadcrumbRes) => {
                            if (breadcrumbRes) {
                                setBreadcrumbLocations(breadcrumbRes);
                            }
                        });
                }
            });
        }
    }, [locationId, services, locale]);
    const fetchLocationsSearch = async (value: string) => {
        const data = await services.search.querySearch({
            term: value,
            indexKey: "TO_GO",
            localLang: locale,
        });
        return data?.searchItems || [];
    };
    const handleSearch = async (value: string) => {
        setSearch(value);

        if (value.length < 2) {
            onChange("");
            return;
        }

        const results = await fetchLocationsSearch(value);
        setSearchItem(results);
        setShowDropdown(true);
    };

    const handleSelect = (locationSearch: ISearchItemFront) => {
        onChange(locationSearch.id);
        setSearch(locationSearch.title);
        setShowDropdown(false);
    };

    return (
        <div className={style.addressBlock}>
            <div ref={refDropdown} className={style.dropdown}>
                <InputForm
                    titleSpan="Введите гоород, либо иной регион вашего объекта*"
                    placeholder="Название локации"
                    type="text"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    onClick={() => setShowDropdown(true)}
                    error={error?.message}
                />

                {showDropdown && searchItems.length > 0 && (
                    <ul className={style.list}>
                        {searchItems.map((location, index) => (
                            <li
                                className={style.list_item}
                                key={index}
                                onClick={() => handleSelect(location)}
                            >
                                {location.title},{" "}
                                {location.location.country?.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {breadcrumbLocations.length > 0 && locationId && (
                <div className={style.choice}>
                    <ul className={style.listChoice}>
                        {breadcrumbLocations.map((location) => {
                            if (location.locationType?.title === "CONTINENT")
                                return;
                            return (
                                <li
                                    key={location.id}
                                    className={style.listChoice_item}
                                >
                                    <span>
                                        {tLocations(
                                            location.locationType?.title
                                        ).toLocaleUpperCase()}{" "}
                                        :{" "}
                                    </span>
                                    <span>{location.title}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};
export default AddressBlockForm;
