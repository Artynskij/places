"use client";

import { UsersListTabAdmin } from "@/components/common/Tabs/admin/user/UsersListTabAdmin";
import { Tabs } from "antd";

export const UsersAdminScreen = () => {
    const tabs = [
        {
            key: "list",
            label: "Пользователи",
            children: <UsersListTabAdmin />,
        },
        // {
        //     key: "location-types",
        //     label: "Типы локаций",
        //     children: <LocationTypesTabAdmin />,
        // },
    ];

    return (
        <div>
            <Tabs items={tabs} />
        </div>
    );
};
