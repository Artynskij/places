"use client";
import { useState } from "react";
import { Tabs } from "antd";

import { AttributeTabAdmin } from "@/components/common/Tabs/admin/attribute/AttributeTabAdmin";
import { GroupAttributeTabAdmin } from "@/components/common/Tabs/admin/attribute/GroupAttributeTabAdmin";
import { CategoryTabAdmin } from "@/components/common/Tabs/admin/attribute/CategoryTabAdmin";
import { RootCategoryTabAdmin } from "@/components/common/Tabs/admin/attribute/RootCategoryAdmin";

export const AttributesAdminScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState("create");

    const tabs = [
        {
            key: "create",
            label: "Упарвление группами аттрибутов",
            children: <GroupAttributeTabAdmin />,
        },
        {
            key: "list",
            label: "Управление аттрибутами",
            children: <AttributeTabAdmin />,
        },
        {
            key: "rootCategory",
            label: "Управление главными категориями",
            children: <RootCategoryTabAdmin />,
        },
        {
            key: "category",
            label: "Управление категориями",
            children: <CategoryTabAdmin />,
        },
    ];

    return (
        <div>
            <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabs} />
        </div>
    );
};
