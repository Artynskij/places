"use client";
import { useState } from "react";
import { Tabs, Card, message } from "antd";

import { IArticleFront } from "@/lib/models";
import { CreateArticleTabAdmin } from "@/components/common/Tabs/admin/article/CreateArticleTabAdmin";
import { ArticleTabAdmin } from "@/components/common/Tabs/admin/article/ArticleTabAdmin";
import { TypeArticleTabAdmin } from "@/components/common/Tabs/admin/article/TypeArticleTabAdmin";
import { SubTypeArticleTabAdmin } from "@/components/common/Tabs/admin/article/SubTypeArticleTabAdmin";
import { AttributeTabAdmin } from "@/components/common/Tabs/admin/attribute/AttributeTabAdmin";
import { GroupAttributeTabAdmin } from "@/components/common/Tabs/admin/attribute/GroupAttributeTabAdmin";

export const AttributesAdminScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState("create");

    const handleArticleCreated = (newArticle: IArticleFront) => {
        message.info("Пока не реализовано");
        setActiveTab("list");
    };

    const handleArticleUpdated = (updatedArticle: IArticleFront) => {
        message.info("Пока не реализовано");
        setActiveTab("list");
    };

    const tabs = [
        {
            key: "create",
            label: "Упарвление группами аттрибутов",
            children: <GroupAttributeTabAdmin />,
        },
        {
            key: "list",
            label: "Управление аттрибутами",
            children: (
                <AttributeTabAdmin
                // onArticleEdit={handleArticleUpdated}
                // onArticleDelete={handleArticleDeleted}
                />
            ),
        },
        {
            key: "type",
            label: "Управление Категориями",
            children: <div>няма пакуль</div>,
        },
        // {
        //     key: "sybType",
        //     label: "Управление Под-рубриками",
        //     children: <SubTypeArticleTabAdmin />,
        // },
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
