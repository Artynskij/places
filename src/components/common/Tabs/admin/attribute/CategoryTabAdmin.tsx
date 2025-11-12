"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { LanguageManagerBlock } from "@/components/common/Form/_components/LanguageManagerBlock/LanguageManagerBlock";
import { TLocale } from "@/lib/models/types";

import { CONSTANT_LANGS_DETAILS } from "@/asset/constants/langs-details";
import { CategoryEstablishmentService } from "@/lib/Api/(Establishment)/category-establishement.api";
import {
    ICategoryEstablishmentFront,
    ICategoryEstablishmentRequest,
    ICategoryRootEstablishmentFront,
    IOption,
    IDetailLang,
} from "@/lib/models";
import { CategoryRootEstablishmentService } from "@/lib/Api/(Establishment)/category-root-establishment.api";
import { CONSTANT_TYPES_OF_ESTABLISHMENT_DB } from "@/asset/constants/database/types-of-establishment";
import { buildEntityField } from "@/lib/helpers/build-entity-field";
import { CopyClipboardButton } from "@/components/common/ButtonFunctional/CopyClipboardButton";
const { Search } = Input;

interface CategoryFormValues {
    name: string;
    typeId: string;
    rootCategoryId?: string;
}

export const CategoryTabAdmin = () => {
    const services = useMemo(
        () => ({
            category: new CategoryEstablishmentService(),
            rootCategory: new CategoryRootEstablishmentService(),
        }),
        []
    );

    const message = useAlertMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<ICategoryEstablishmentFront[]>(
        []
    );
    const [filteredCategories, setFilteredCategories] = useState<
        ICategoryEstablishmentFront[] | null
    >(null);

    const [rootCategories, setRootCategories] = useState<
        ICategoryRootEstablishmentFront[]
    >([]);

    const [searchText, setSearchText] = useState<string | null>(null);
    const [filterRootCategoryId, setFilterRootCategoryId] = useState<
        string | null
    >(null);
    const [filterTypeEstablishmentId, setFilterTypeEstablishmentId] =
        useState<string>();

    const [isModalActive, setIsModalActive] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [editCategory, setEditCategory] =
        useState<ICategoryEstablishmentFront | null>(null);
    const [form] = Form.useForm<CategoryFormValues>();

    const [languageDetails, setLanguageDetails] = useState<IDetailLang[]>(
        CONSTANT_LANGS_DETAILS
    );

    const fetchAll = useCallback(async () => {
        setIsLoading(true);
        const [categoriesResponse, rootCategoriesResponse] = await Promise.all([
            services.category.getAll({}),
            services.rootCategory.getAll({}),
        ]);
        // const responseCat = await services.category.getAll({});
        if (!categoriesResponse) {
            message.error("Ошибка при получении данных категорий");
            return;
        }
        setCategories(categoriesResponse);
        // const responseRootCat = await services.rootCategory.getAll({});
        if (rootCategoriesResponse) {
            setRootCategories(rootCategoriesResponse);
        } else {
            message.error("Ошибка при получении данных главных категорий");
        }

        setIsLoading(false);
        message.info("Данные категорий загружены");
    }, [services, message]);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);
    // редактирование
    useEffect(() => {
        if (editCategory && isModalActive) {
            const details = editCategory.content?.details.map((value) => ({
                lang: value.lang as TLocale,
                value: value.value || "",
            }));
            if (!details) return;
            setLanguageDetails(details);

            form.setFieldsValue({
                name: editCategory.value,
                typeId: editCategory.type.Id,
                rootCategoryId: editCategory.rootCategory?.id,
            });
        } else if (isModalActive) {
            form.resetFields();
            setLanguageDetails(CONSTANT_LANGS_DETAILS);
        }
    }, [editCategory, isModalActive, form]);

    // фильтрация
    useEffect(() => {
        if (
            !filterRootCategoryId &&
            !searchText &&
            !filterTypeEstablishmentId
        ) {
            setFilteredCategories(null);
            return;
        }

        let filteredData = categories;

        if (filterRootCategoryId) {
            filteredData = filteredData.filter(
                (tag) => tag.rootCategory?.id === filterRootCategoryId
            );
        }

        if (searchText) {
            filteredData = filteredData.filter((item) =>
                item.value
                    .toLocaleLowerCase()
                    .includes(searchText.toLocaleLowerCase())
            );
        }
        if (filterTypeEstablishmentId) {
            filteredData = filteredData.filter(
                (item) => item.type.Id === filterTypeEstablishmentId
            );
        }
        setFilteredCategories(filteredData);
    }, [
        categories,
        filterRootCategoryId,
        searchText,
        filterTypeEstablishmentId,
    ]);

    const handleEdit = (category: ICategoryEstablishmentFront) => {
        setEditCategory(category);
        setIsModalActive(true);
    };

    const handleDelete = async (category: ICategoryEstablishmentFront) => {
        const response = await services.category.delete(category.id);
        if (!response) {
            message.error("Ошибка при удалении категории");
        }
        fetchAll();
        message.info("Категория удалена");
    };

    const handleCreate = () => {
        setEditCategory(null);
        setIsModalActive(true);
    };

    const handleModalClose = () => {
        setIsModalActive(false);
        setEditCategory(null);
        form.resetFields();
        setLanguageDetails(CONSTANT_LANGS_DETAILS);
    };

    const handleLanguageDetailsChange = (details: IDetailLang[]) => {
        setLanguageDetails(details);
    };

    const handleSubmit = async () => {
        try {
            const hasEmptyFields = languageDetails.some(
                (item) => !item.value.trim()
            );
            const values = await form.validateFields();
            if (hasEmptyFields) {
                message.error("Заполните все выбранные языки");
                return;
            }

            if (!values) {
                message.error("Не все поля заполнены");
                return;
            }

            const filledDetails = languageDetails.filter((item) =>
                item.value.trim()
            );
            const englishName = filledDetails.find(
                (item) => item.lang === "en"
            )?.value;
            if (!englishName) {
                message.error("заполнение английской версии обязательно");
                return;
            }
            setIsModalLoading(true);
            const { name } = buildEntityField({
                englishName: englishName,
                entity: ["name"],
            });
            const categoryRequest: ICategoryEstablishmentRequest = {
                source: {
                    Name: name,
                    Type: { Id: values.typeId },
                    RootCategoryId: values.rootCategoryId || null,
                },
                content: { details: filledDetails },
            };

            if (editCategory) {
                // Редактирование существующей категории
                const responseUpdate = await services.category.update(
                    editCategory.id,
                    categoryRequest
                );
                responseUpdate
                    ? message.success("Категория обновлена")
                    : message.error("Ошибка при обновлении категории");
                fetchAll();
            } else {
                // Создание новой категории
                const responseCreate = await services.category.create(
                    categoryRequest
                );
                responseCreate
                    ? message.success("Категория создана")
                    : message.error("Ошибка при создании категории");
                fetchAll();
            }

            handleModalClose();
            setIsModalLoading(false);
        } catch (error) {
            console.error("Ошибка:", error);
            message.error("Произошла ошибка при сохранении");
            setIsModalLoading(false);
        }
    };
    const typeOptions: IOption[] = Object.values(
        CONSTANT_TYPES_OF_ESTABLISHMENT_DB
    ).map((item) => ({
        id: item.id,
        label: item.title,
        value: item.id,
    }));
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
            render: (id: ICategoryEstablishmentFront["id"]) => {
                return <CopyClipboardButton text={id} />;
            },
        },
        {
            title: "Название",
            dataIndex: "value",
            key: "value",
            render: (value: ICategoryEstablishmentFront["value"]) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{value}</div>
                </div>
            ),
        },

        {
            title: "Тип заведения",
            dataIndex: "type",
            key: "type",
            render: (cat: ICategoryEstablishmentFront["type"]) =>
                CONSTANT_TYPES_OF_ESTABLISHMENT_DB[cat.Name].title,
        },
        {
            title: "Главная категория",
            dataIndex: "rootCategory",
            key: "rootCategory",
            render: (cat: ICategoryEstablishmentFront["rootCategory"]) =>
                cat?.name,
        },
        {
            title: "Значения по языкам",
            dataIndex: "content",
            key: "content",
            render: (content: ICategoryEstablishmentFront["content"]) => (
                <Space direction="horizontal" size="small">
                    {content?.details.map((value) => (
                        <Tooltip
                            key={value.lang}
                            title={`${value.lang.toUpperCase()}: ${
                                value.value
                            }`}
                        >
                            <Tag color="blue">{value.lang.toUpperCase()}</Tag>
                        </Tooltip>
                    ))}
                </Space>
            ),
        },
        {
            title: "Действия",
            key: "actions",
            width: 150,
            render: (_: any, record: ICategoryEstablishmentFront) => (
                <Space size="small">
                    <Tooltip title={"Редактировать"}>
                        <Button
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => handleEdit(record)}
                        />
                    </Tooltip>
                    <ModalConfirm
                        title="Удаление группы атрибутов"
                        content="Вы уверены, что хотите удалить эту группу атрибутов?"
                        handlerAction={() => handleDelete(record)}
                    >
                        <Tooltip title={"Удалить"}>
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                size="small"
                                disabled={true}
                            />
                        </Tooltip>
                    </ModalConfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Card
                title={`Категории товаров (${
                    !!filteredCategories
                        ? filteredCategories.length
                        : categories.length
                })`}
                extra={
                    <Space>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleCreate}
                        >
                            Создать
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
                        placeholder="Поиск по названию"
                        allowClear
                        style={{ width: 300 }}
                        onSearch={(value) => {
                            setSearchText(value);
                        }}
                    />
                    <Select
                        placeholder="Выберите тип объекта"
                        style={{ width: 200 }}
                        allowClear
                        options={typeOptions}
                        value={filterTypeEstablishmentId}
                        onChange={(value) => {
                            setFilterTypeEstablishmentId(value);
                        }}
                    />
                    <Select
                        style={{ width: 300 }}
                        placeholder="Поиск по главной категории"
                        loading={isLoading}
                        allowClear
                        onChange={(value) => {
                            setFilterRootCategoryId(value);
                        }}
                    >
                        {rootCategories.map((group) => (
                            <Select.Option key={group.id} value={group.id}>
                                {group.value || group.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Space>

                <Table
                    columns={columns}
                    dataSource={
                        !!filteredCategories ? filteredCategories : categories
                    }
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: false,
                        showQuickJumper: false,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} из ${total} категорий`,
                    }}
                    scroll={{ x: 800 }}
                    loading={isLoading}
                />
            </Card>

            <Modal
                title={
                    editCategory
                        ? "Редактировать категорию"
                        : "Создать категорию"
                }
                onOk={handleSubmit}
                open={isModalActive}
                onCancel={handleModalClose}
                width={700}
                okText={editCategory ? "Сохранить" : "Создать"}
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
                        name="typeId"
                        label="Тип объекта"
                        rules={[
                            {
                                required: true,
                                message: "Выберите тип объекта",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Выберите тип объекта"
                            loading={isLoading}
                        >
                            {typeOptions.map((group) => (
                                <Select.Option key={group.id} value={group.id}>
                                    {group.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="rootCategoryId"
                        label="Выберите главную категорию"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Выберите главную категорию"
                            loading={isLoading}
                        >
                            {rootCategories.map((group) => (
                                <Select.Option key={group.id} value={group.id}>
                                    {group.value || group.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* <Form.Item
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
                    </Form.Item> */}
                </Form>
            </Modal>
        </>
    );
};
