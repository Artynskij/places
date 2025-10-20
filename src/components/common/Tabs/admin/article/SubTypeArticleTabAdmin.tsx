"use client";
import { useState } from "react";
import { Table, Button, Space, Input, Form, Modal, message, Tag } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ReloadOutlined,
} from "@ant-design/icons";

interface Category {
    id: number;
    name: string;
    articleCount: number;
    createdAt: string;
}

export const SubTypeArticleTabAdmin: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([
        {
            id: 1,
            name: "Новости туризма",
            articleCount: 15,
            createdAt: "2024-01-15",
        },
        {
            id: 2,
            name: "Полезные советы, лайфхаки",
            articleCount: 8,
            createdAt: "2024-01-10",
        },
        { id: 3, name: "Обзоры", articleCount: 12, createdAt: "2024-01-05" },
        {
            id: 4,
            name: "Путешествия по России",
            articleCount: 20,
            createdAt: "2024-01-20",
        },
        {
            id: 5,
            name: "Зарубежный туризм",
            articleCount: 25,
            createdAt: "2024-01-18",
        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null
    );
    const [form] = Form.useForm();

    const handleAdd = () => {
        setEditingCategory(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        form.setFieldsValue({ name: category.name });
        setIsModalVisible(true);
    };

    const handleDelete = (category: Category) => {
        Modal.confirm({
            title: "Удаление категории",
            content: `Вы уверены, что хотите удалить категорию "${category.name}"?`,
            okText: "Удалить",
            cancelText: "Отмена",
            okType: "danger",
            onOk: () => {
                setCategories((prev) =>
                    prev.filter((c) => c.id !== category.id)
                );
                message.success("Категория удалена");
            },
        });
    };

    const handleSubmit = (values: { name: string }) => {
        if (editingCategory) {
            // Редактирование
            setCategories((prev) =>
                prev.map((c) =>
                    c.id === editingCategory.id
                        ? { ...c, name: values.name }
                        : c
                )
            );
            message.success("Категория обновлена");
        } else {
            // Добавление
            const newCategory: Category = {
                id: Date.now(),
                name: values.name,
                articleCount: 0,
                createdAt: new Date().toISOString().split("T")[0],
            };
            setCategories((prev) => [...prev, newCategory]);
            message.success("Категория добавлена");
        }
        setIsModalVisible(false);
        form.resetFields();
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
        },
        {
            title: "Название категории",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Кол-во статей",
            dataIndex: "articleCount",
            key: "articleCount",
            render: (count: number) => (
                <Tag color={count > 0 ? "blue" : "default"}>{count} статей</Tag>
            ),
        },
        {
            title: "Дата создания",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "Действия",
            key: "actions",
            render: (_: any, record: Category) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEdit(record)}
                    >
                        Редактировать
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => handleDelete(record)}
                        disabled={record.articleCount > 0}
                    >
                        Удалить
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div
                style={{
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h3>Управление категориями</h3>
                <Space>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                    >
                        Добавить категорию
                    </Button>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={() =>{
                             message.info('Обновлено')
                            fetchAll()}}
                    />
                </Space>
            </div>

            <Table
                columns={columns}
                dataSource={categories}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title={
                    editingCategory
                        ? "Редактировать категорию"
                        : "Добавить категорию"
                }
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        label="Название категории"
                        rules={[
                            {
                                required: true,
                                message: "Введите название категории",
                            },
                            {
                                min: 2,
                                message:
                                    "Название должно содержать минимум 2 символа",
                            },
                        ]}
                    >
                        <Input placeholder="Введите название категории" />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                {editingCategory ? "Обновить" : "Добавить"}
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsModalVisible(false);
                                    form.resetFields();
                                }}
                            >
                                Отмена
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
