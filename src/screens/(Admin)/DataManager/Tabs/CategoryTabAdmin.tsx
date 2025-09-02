"use client";
import { useState } from "react";
import { ICategoryFront } from "@/lib/models";
import { Button, Card, Space, Table, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface Props {
    openModal: (type: "category", item?: ICategoryFront) => void;
}

const CategoryTabAdmin: React.FC<Props> = ({ openModal }) => {
    const [categories, setCategories] = useState<ICategoryFront[]>([
        { id: "1", key: "restaurant", value: "Рестораны" },
        { id: "2", key: "hotel", value: "Отели" },
        { id: "3", key: "cafe", value: "Кафе" },
        { id: "4", key: "shop", value: "Магазины" },
    ]);

    const handleDelete = (id: string) => {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        message.success("Категория удалена");
    };

    const columns: ColumnsType<ICategoryFront> = [
        { title: "Ключ", dataIndex: "key", key: "key" },
        { title: "Название", dataIndex: "value", key: "value" },
        {
            title: "Действия",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => openModal("category", record)} />
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <Card
            title="Категории"
            extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => openModal("category")}>Добавить</Button>}
        >
            <Table columns={columns} dataSource={categories} rowKey="id" pagination={{ pageSize: 10 }} />
        </Card>
    );
};

export default CategoryTabAdmin;
