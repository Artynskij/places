"use client";
import LocationsTabAdmin from "@/components/common/Tabs/admin/location/LocationsTabAdmin";
import LocationTypesTabAdmin from "@/components/common/Tabs/admin/location/LocationTypesTabAdmin";
import { Tabs } from "antd";

const LocationsAdminScreen = () => {
    const tabs = [
        {
            key: "locations",
            label: "Локации",
            children: <LocationsTabAdmin />,
        },
        {
            key: "location-types",
            label: "Типы локаций",
            children: <LocationTypesTabAdmin />,
        },
    ];

    return (
        <div>
            <Tabs items={tabs} />
        </div>
    );
};

export default LocationsAdminScreen;
