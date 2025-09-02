import { TTypeLocationDb } from "@/lib/models/types/TTypeLocation";

export const CONSTANT_TYPE_LOCATION_MAPBOX = {
    mapbox: {
        country: "country",
        district: "district",
        region: "region",
        place: "place",
        address: "address",
        postcode: "postcode",
    },
    db: {
        country: "COUNTRY",
    },
};
export const CONSTANT_TYPE_LOCATION_DB = {
    COUNTRY: "COUNTRY",
    CITY: "CITY",
    CONTINENT: "CONTINENT",
    REGION: "REGION",
    DISTRICT: "DISTRICT",
    TOWN: "TOWN",
    VILLAGE: "VILLAGE",
    ISLAND: "ISLAND",
};
export const CONSTANT_TYPE_LOCATION_ARRAY = Object.values(
    CONSTANT_TYPE_LOCATION_DB
);
