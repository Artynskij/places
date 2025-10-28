"use client";
import { useState } from "react";
import { Tabs, Card, message } from "antd";

import { IArticleFront } from "@/lib/models";

import { ArticleTabAdmin } from "@/components/common/Tabs/admin/article/ArticleTabAdmin";
import { TypeArticleTabAdmin } from "@/components/common/Tabs/admin/article/TypeArticleTabAdmin";
import { SubTypeArticleTabAdmin } from "@/components/common/Tabs/admin/article/SubTypeArticleTabAdmin";
import { AttributeTabAdmin } from "@/components/common/Tabs/admin/attribute/AttributeTabAdmin";
import { GroupAttributeTabAdmin } from "@/components/common/Tabs/admin/attribute/GroupAttributeTabAdmin";

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
            key: "type",
            label: "Управление Категориями",
            children: <div>няма пакуль</div>,
        },
    ];

    return (
        <div>
            <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabs} />
        </div>
    );
};
