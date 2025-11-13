"use client";
import { useState } from "react";
import { Tabs } from "antd";
import { BusinessListTabAdmin } from "@/components/common/Tabs/admin/business/BusinessListTabAdmin";

export const BusinessAdminScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState("list");

    const tabs = [
        {
            key: "list",
            label: "Список бизнесов",
            children: <BusinessListTabAdmin />,
        },
    ];

    return (
        <div>
            <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabs} />
        </div>
    );
};
