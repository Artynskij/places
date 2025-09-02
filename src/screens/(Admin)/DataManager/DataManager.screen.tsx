"use client";

import React, { useState } from "react";
import { Tabs } from "antd";
import LocationTabAdmin from "./Tabs/LocationTabAdmin";
import EstablishmentTabAdmin from "./Tabs/EstablishmentTabAdmin";
import CategoryTabAdmin from "./Tabs/CategoryTabAdmin";
import EntityModal from "./EntityModal";
import styles from "../admin.module.scss";

export const DataManagerScreen: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState<
        "location" | "establishment" | "category"
    >("location");
    const [editingItem, setEditingItem] = useState<any>(null);

    return (
        <div>
            <h2 className={styles.title}>Управление данными</h2>

            <Tabs
                defaultActiveKey="locations"
                items={[
                    {
                        key: "locations",
                        label: "Локации",
                        children: <LocationTabAdmin />,
                    },
                    {
                        key: "establishments",
                        label: "Заведения",
                        children: <EstablishmentTabAdmin />,
                    },
                    {
                        key: "categories",
                        label: "Категории",
                        children: (
                            <CategoryTabAdmin
                                openModal={(type, item) => {
                                    setModalType(type);
                                    setEditingItem(item ?? null);
                                    setIsModalVisible(true);
                                }}
                            />
                        ),
                    },
                ]}
            />

            <EntityModal
                isVisible={isModalVisible}
                type={modalType}
                editingItem={editingItem}
                onCancel={() => setIsModalVisible(false)}
                onSave={() => setIsModalVisible(false)} // сохранение будет внутри табов
            />
        </div>
    );
};
