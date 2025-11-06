"use client";
import { useState } from "react";
import { Tabs } from "antd";

import { ArticleTabAdmin } from "@/components/common/Tabs/admin/article/ArticleTabAdmin";
import { TypeArticleTabAdmin } from "@/components/common/Tabs/admin/article/TypeArticleTabAdmin";
import { SubTypeArticleTabAdmin } from "@/components/common/Tabs/admin/article/SubTypeArticleTabAdmin";

export const ArticleAdminScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState("list");

    const tabs = [
        {
            key: "list",
            label: "Список статей",
            children: <ArticleTabAdmin />,
        },
        {
            key: "type",
            label: "Управление рубриками",
            children: <TypeArticleTabAdmin />,
        },
        {
            key: "sybType",
            label: "Управление Под-рубриками",
            children: <SubTypeArticleTabAdmin />,
        },
        {
            key: "hashTag",
            label: "Управление хэштегами",
            children: <div>пока няма</div>,
        },
    ];

    return (
        <div>
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabs}
                // type="card"
            />
        </div>
    );
};
