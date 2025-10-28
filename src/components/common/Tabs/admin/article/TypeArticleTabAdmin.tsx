"use client";
import { useEffect, useState } from "react";
import {
    Table,
    Button,
    Space,
    Input,
    Form,
    Modal,
    message,
    Tag,
    Card,
    Select,
    Spin,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import {
    IArticleSubTypeFront,
    IArticleTypeFront,
    IDetailLang,
    IOption,
} from "@/lib/models";
import { ArticleTypeService } from "@/lib/Api/(Article)/article-type.api";
import { LanguageManagerBlock } from "@/components/common/Form/_components/LangugageManagerBlock/LangugageManagerBlock";
import { TLocale } from "@/lib/models/types";
import { locales } from "@/config";
import type { ColumnsType } from "antd/es/table";

const { Search } = Input;

interface ArticleTypeFormValues {
    code: string;
}

export const TypeArticleTabAdmin: React.FC = () => {
    const langsDetailsDefault = locales.map((item) => ({
        lang: item,
        value: "",
    }));

    const [typesArticle, setTypesArticle] = useState<IArticleTypeFront[]>([]);
    const [editType, setEditType] = useState<IArticleTypeFront | null>(null);
    const [searchOptions, setSearchOptions] = useState<IOption[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [languageDetails, setLanguageDetails] =
        useState<IDetailLang[]>(langsDetailsDefault);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [form] = Form.useForm<ArticleTypeFormValues>();

    const articleTypeService = new ArticleTypeService();

    useEffect(() => {
        fetchAll();
    }, []);

    useEffect(() => {
        if (editType && isModalActive) {
            // Преобразуем данные типа статьи в languageDetails
            const details =
                editType.content?.details?.map((detail) => ({
                    lang: detail.lang as TLocale,
                    value: detail.value || "",
                })) || langsDetailsDefault;

            setLanguageDetails(details);

            form.setFieldsValue({
                code: editType.code || "",
            });
        } else if (isModalActive) {
            form.resetFields();
            setLanguageDetails(langsDetailsDefault);
        }
    }, [editType, isModalActive, form]);

    const fetchAll = async () => {
        setIsLoading(true);
        try {
            const data = await articleTypeService.get();
            setTypesArticle(data || []);
        } catch {
            message.error("Ошибка загрузки типов статей");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchById = async (id: string) => {
        setIsLoading(true);
        try {
            const typeArticle = await articleTypeService.getById(id);
            if (!typeArticle) {
                throw Error("Тип статьи не найден");
            }
            setTypesArticle([typeArticle]);
        } catch {
            message.error("Тип статьи не найден");
        } finally {
            setIsLoading(false);
        }
    };

    const findSearchByTitle = async (title: string) => {
        if (!title.trim()) {
            setSearchOptions([]);
            return;
        }

        try {
            // Здесь можно добавить поиск по API если есть такой метод
            // Пока просто фильтруем локально
            const filtered = typesArticle.filter(
                (item) =>
                    item.name?.toLowerCase().includes(title.toLowerCase()) ||
                    item.code?.toLowerCase().includes(title.toLowerCase())
            );

            setSearchOptions(
                filtered.map((item) => ({
                    label: item.name || item.code || "",
                    value: item.id,
                }))
            );
        } catch {
            message.error("Ошибка поиска");
            setSearchOptions([]);
        }
    };

    const handleEdit = (record: IArticleTypeFront) => {
        setEditType(record);
        setIsModalActive(true);
    };

    const handleDelete = async (record: IArticleTypeFront) => {
        Modal.confirm({
            title: "Удаление типа статьи",
            content: `Вы уверены, что хотите удалить тип "${record.name}"?`,
            okText: "Удалить",
            cancelText: "Отмена",
            okType: "danger",
            onOk: async () => {
                try {
                    // TODO: Реализовать удаление через API
                    await articleTypeService.delete(record.id);
                    setTypesArticle((prev) =>
                        prev.filter((c) => c.id !== record.id)
                    );
                    message.success("Тип статьи удален");
                } catch {
                    message.error("Ошибка при удалении типа статьи");
                }
            },
        });
    };

    const handleModalClose = () => {
        setIsModalActive(false);
        setEditType(null);
        form.resetFields();
        setLanguageDetails(langsDetailsDefault);
    };

    const handleLanguageDetailsChange = (details: IDetailLang[]) => {
        setLanguageDetails(details);
    };

    const handleAdd = () => {
        setEditType(null);
        setIsModalActive(true);
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
            const body = {
                source: {
                    Name: values.code,
                    Code: values.code.toLocaleUpperCase(),
                },

                content: {
                    details: filledDetails,
                },
            };

            if (editType) {
                // Редактирование существующего типа
                const updatedType = await articleTypeService.update(
                    editType.id,
                    body
                );

                if (updatedType) {
                    message.success("Тип статьи обновлен");
                    fetchAll();
                    handleModalClose();
                } else {
                    message.error("Ошибка при обновлении типа статьи");
                }
            } else {
                // Создание нового типа

                const newType = await articleTypeService.create(body);

                if (newType) {
                    message.success("Тип статьи создан");
                    fetchAll();
                    handleModalClose();
                } else {
                    message.error("Ошибка при создании типа статьи");
                }
            }
        } catch (error) {
            console.error("Ошибка:", error);
            message.error("Произошла ошибка при сохранении");
        } finally {
            setIsModalLoading(false);
        }
    };

    const columns: ColumnsType<IArticleTypeFront> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
        },

        {
            title: "Название типа",
            dataIndex: "value",
            key: "value",
        },
        {
            title: "Ключ типа",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Языки",
            key: "languages",
            render: (_, record) => (
                <Space>
                    {record.content?.details?.map((detail, index) => (
                        <Tag key={index} color="blue">
                            {detail.lang.toUpperCase()}
                        </Tag>
                    ))}
                </Space>
            ),
        },
        // {
        //     title: "Кол-во статей",
        //     dataIndex: "articleCount",
        //     key: "articleCount",
        //     render: (count: number) => (
        //         <Tag color={count > 0 ? "blue" : "default"}>{count} статей</Tag>
        //     ),
        // },
        {
            title: "Кол-во подрубрик",
            dataIndex: "subTypes",
            key: "subTypes",
            render: (subTypes: IArticleSubTypeFront[]) => (
                <Tag color={subTypes.length > 0 ? "blue" : "default"}>
                    {subTypes.length}
                </Tag>
            ),
        },
        {
            title: "Действия",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        size="middle"
                        onClick={() => handleEdit(record)}
                    />

                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        size="middle"
                        onClick={() => handleDelete(record)}
                        disabled={0 > 0}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Card
                extra={
                    <Space>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAdd}
                        >
                            Добавить рубрику
                        </Button>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={() => {
                                message.info("Обновлено");
                                fetchAll();
                            }}
                            loading={isLoading}
                        />
                    </Space>
                }
                title="Управление типами статей"
            >
                <Space style={{ marginBottom: 16 }}>
                    <Search
                        placeholder="Поиск по ID"
                        onSearch={(value) => {
                            if (!value) return fetchAll();
                            fetchById(value);
                        }}
                        allowClear
                        loading={isLoading}
                        style={{ width: 200 }}
                    />
                    {/* <Select
                        showSearch
                        placeholder="Поиск по названию"
                        onSearch={findSearchByTitle}
                        onSelect={(id) => fetchById(id)}
                        filterOption={false}
                        notFoundContent={null}
                        style={{ width: 300 }}
                        options={searchOptions}
                    /> */}
                </Space>

                <Table
                    columns={columns}
                    dataSource={typesArticle}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={isLoading}
                />
            </Card>

            <Modal
                title={
                    editType
                        ? "Редактировать тип статьи"
                        : "Добавить тип статьи"
                }
                open={isModalActive}
                onOk={handleSubmit}
                onCancel={handleModalClose}
                width={700}
                okText={editType ? "Сохранить" : "Создать"}
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
                        name="code"
                        label="Код типа (английскими буквами)"
                        rules={[
                            {
                                required: true,
                                message: "Введите код типа",
                            },
                            {
                                pattern: /^[a-zA-Z_]+$/,
                                message:
                                    "Только английские буквы и подчеркивания",
                            },
                            {
                                min: 2,
                                message:
                                    "Код должен содержать минимум 2 символа",
                            },
                        ]}
                    >
                        <Input placeholder="news, article, blog, etc." />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
