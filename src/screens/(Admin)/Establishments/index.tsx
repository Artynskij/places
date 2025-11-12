"use client";
import EstablishmentListTabAdmin from "@/components/common/Tabs/admin/establishment/EstablishmentListTabAdmin";
import { Tabs } from "antd";
import { useState } from "react";

export const EstablishmentsAdminScreen = () => {
    const [activeTab, setActiveTab] = useState("list");

    const tabs = [
        {
            key: "list",
            label: "Список заведений",
            children: <EstablishmentListTabAdmin />,
        },
        // {
        //     key: "type",
        //     label: "Управление рубриками",
        //     children: <TypeArticleTabAdmin />,
        // },
        // {
        //     key: "sybType",
        //     label: "Управление Под-рубриками",
        //     children: <SubTypeArticleTabAdmin />,
        // },
        // {
        //     key: "hashTag",
        //     label: "Управление хэштегами",
        //     children: <div>пока няма</div>,
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
