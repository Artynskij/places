"use client";
import { useEffect, useState } from "react";
import {
    Table,
    Button,
    Space,
    Tag,
    Card,
    Tooltip,
    Select,
    Input,
    Form,
    Modal,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    ReloadOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { ModalConfirm } from "@/components/common/Modal/ModalConfirm";
import { useAlertMessage } from "@/lib/context";
import { LanguageManagerBlock } from "@/components/common/Form/_components/LangugageManagerBlock/LangugageManagerBlock";
import { TLocale } from "@/lib/models/types";
import { locales } from "@/config";
import { TagCategoryService } from "@/lib/Api/(Establishment)/tagCategory.api";
import { ICategoryFront, IDetailLang } from "@/lib/models";

const { Option } = Select;
const { Search } = Input;

// Интерфейсы для групп атрибутов
interface IAttributeGroupValue {
    id: string;
    value: string;
    lang: string;
}

interface IAttributeGroup {
    id: string;
    name: string;
    code: string;
    description?: string;
    values: IAttributeGroupValue[];
    attributeCount?: number;
}

interface GroupAttributeFormValues {
    name: string;
}

export const GroupAttributeTabAdmin = () => {
    const tagCategoryService = new TagCategoryService();

    const message = useAlertMessage();

    const [isLoading, setIsLoading] = useState(false);
    const [tagCategories, setTagCategories] = useState<ICategoryFront[]>([]);
    const [searchText, setSearchText] = useState("");
    const [isModalActive, setIsModalActive] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [editTagCategory, setEditTagCategory] =
        useState<ICategoryFront | null>(null);
    const [form] = Form.useForm<GroupAttributeFormValues>();

    const langsDetailsDefault = locales.map((item) => ({
        lang: item,
        value: "",
    }));
    const [languageDetails, setLanguageDetails] =
        useState<IDetailLang[]>(langsDetailsDefault);

    useEffect(() => {
        fetchAll();
    }, []);

    useEffect(() => {
        if (editTagCategory && isModalActive) {
            // Преобразуем данные группы в languageDetails
            const details = editTagCategory.content?.details.map((value) => ({
                lang: value.lang as TLocale,
                value: value.value || "",
            }));

            setLanguageDetails(details || []);

            form.setFieldsValue({
                name: editTagCategory.key,
            });
        } else if (isModalActive) {
            form.resetFields();
            setLanguageDetails(langsDetailsDefault);
        }
    }, [editTagCategory, isModalActive, form]);

    const fetchAll = async () => {
        setIsLoading(true);
        const response = await tagCategoryService.getAll();
        if (!response) {
            message.error("не получилось обновить");
        } else {
            setIsLoading(false);
            message.info("Обновлено");
            setTagCategories(response);
        }
    };

    const handleEdit = (tagCategory: ICategoryFront) => {
        setEditTagCategory(tagCategory);
        setIsModalActive(true);
    };

    const handleDelete = async (tagCategory: ICategoryFront) => {
        const responseDelete = await tagCategoryService.delete(tagCategory.id);

        if (responseDelete) {
            fetchAll();
            message.info("Группа атрибутов удалена");
        } else {
            message.error("Ошибка при удалении");
        }
    };

    const handleCreate = () => {
        setEditTagCategory(null);
        setIsModalActive(true);
    };

    const handleModalClose = () => {
        setIsModalActive(false);
        setEditTagCategory(null);
        form.resetFields();
        setLanguageDetails(langsDetailsDefault);
    };

    const handleLanguageDetailsChange = (details: IDetailLang[]) => {
        setLanguageDetails(details);
    };

    const handleSubmit = async () => {
        try {
            // Валидируем languageDetails - проверяем что все выбранные языки заполнены
            const hasEmptyFields = languageDetails.some(
                (item) => !item.value.trim()
            );

            if (hasEmptyFields) {
                message.error("Заполните все выбранные языки");
                return;
            }

            // Валидируем остальные поля формы
            const values = await form.validateFields();

            setIsModalLoading(true);

            const filledDetails = languageDetails.filter((item) =>
                item.value.trim()
            );

            if (editTagCategory) {
                const responseCreate = await tagCategoryService.update(
                    editTagCategory.id,
                    {
                        source: { Name: values.name },
                        content: { details: filledDetails },
                    }
                );
                if (responseCreate) {
                    message.success("Группа атрибутов обновлена");
                    fetchAll();
                } else {
                    message.error("Ошибка при обновлении группы атрибутов");
                }
            } else {
                const responseCreate = await tagCategoryService.create({
                    source: { Name: values.name },
                    content: { details: filledDetails },
                });
                if (responseCreate) {
                    message.success("Группа атрибутов создана");
                    fetchAll();
                } else {
                    message.error("Ошибка при создании группы атрибутов");
                }
            }

            handleModalClose();
            setIsModalLoading(false);
        } catch (error) {
            console.error("Ошибка:", error);
            message.error("Произошла ошибка при сохранении");
            setIsModalLoading(false);
        }
    };

    const columns = [
        {
            title: "Название",
            dataIndex: "value",
            key: "value",
            render: (value: string) => (
                <div style={{ fontWeight: 500 }}> {value}</div>
            ),
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Названия по языкам",
            dataIndex: "content",
            key: "content",
            render: (values: ICategoryFront["content"]) => (
                <Space direction="horizontal" size="small">
                    {values?.details.map((value) => (
                        <Tag key={value.lang} color="blue">
                            {value.lang.toUpperCase()}
                        </Tag>
                    ))}
                </Space>
            ),
        },
        // {
        //     title: "Кол-во атрибутов",
        //     dataIndex: "attributeCount",
        //     key: "attributeCount",
        //     render: (count: number) => (
        //         <Tag color={count > 0 ? "green" : "default"}>
        //             {count} атрибутов
        //         </Tag>
        //     ),
        // },
        // {
        //     title: "Описание",
        //     dataIndex: "description",
        //     key: "description",
        //     render: (description: string) => (
        //         <Tooltip title={description}>
        //             <span
        //                 style={{
        //                     display: "block",
        //                     maxWidth: 200,
        //                     overflow: "hidden",
        //                     textOverflow: "ellipsis",
        //                     whiteSpace: "nowrap",
        //                 }}
        //             >
        //                 {description || "-"}
        //             </span>
        //         </Tooltip>
        //     ),
        // },
        {
            title: "Действия",
            key: "actions",
            width: 150,
            render: (_: any, record: ICategoryFront) => (
                <Space size="small">
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEdit(record)}
                    />
                    <ModalConfirm
                        handlerAction={() => handleDelete(record)}
                        title="Удаление группы атрибутов"
                        // content={`Вы уверены, что хотите удалить группу "${
                        //     record.value
                        // }"? ${
                        //     record.attributeCount
                        //         ? "Группа содержит атрибуты и не может быть удалена."
                        //         : ""
                        // }`}
                        content={`Вы уверены, что хотите удалить группу "${record.value}`}
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                            // disabled={
                            //     !!record.attributeCount &&
                            //     record.attributeCount > 0
                            // }
                        />
                    </ModalConfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Card
                title={`Группы атрибутов (${tagCategories.length})`}
                extra={
                    <Space>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleCreate}
                        >
                            Создать группу
                        </Button>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={fetchAll}
                            loading={isLoading}
                        />
                    </Space>
                }
            >
                <Space style={{ marginBottom: 16 }}>
                    <Search
                        placeholder="Поиск по названию, коду или описанию"
                        allowClear
                        style={{ width: 300 }}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Space>
                <Table
                    columns={columns}
                    dataSource={tagCategories}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: false,
                        showQuickJumper: false,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} из ${total} групп`,
                    }}
                    scroll={{ x: 800 }}
                    loading={isLoading}
                />
            </Card>

            <Modal
                title={
                    editTagCategory
                        ? "Редактировать группу атрибутов"
                        : "Создать группу атрибутов"
                }
                onOk={handleSubmit}
                open={isModalActive}
                onCancel={handleModalClose}
                width={700}
                okText={editTagCategory ? "Сохранить" : "Создать"}
                cancelText="Отмена"
                confirmLoading={isModalLoading}
            >
                <Form form={form} layout="vertical">
                    <LanguageManagerBlock
                        value={languageDetails}
                        onChange={handleLanguageDetailsChange}
                        required={true}
                    />

                    <Form.Item
                        name="name"
                        label="Название группы"
                        rules={[
                            {
                                required: true,
                                message: "Введите название группы",
                            },
                            {
                                min: 2,
                                message:
                                    "Название должно содержать минимум 2 символа",
                            },
                        ]}
                    >
                        <Input placeholder="Цвет, Размер, Материал и т.д." />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
