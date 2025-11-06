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
    message,
    Spin,
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
import { CategoryRootEstablishmentService } from "@/lib/Api/(Establishment)/category-root-establishment.api";
import {
    ICategoryRootEstablishmentFront,
    ICategoryRootEstablishmentRequest,
} from "@/lib/models";

const { Search } = Input;

interface RootCategoryListTabProps {
    // onRootCategoryEdit: (rootCategory: IRootCategory) => void;
}

type TDetails = { lang: TLocale; value: string };

interface RootCategoryFormValues {
    name: string;
}

export const RootCategoryTabAdmin = ({}: RootCategoryListTabProps) => {
    const services = useMemo(
        () => ({
            rootCategory: new CategoryRootEstablishmentService(),
        }),
        []
    );

    const message = useAlertMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [rootCategories, setRootCategories] = useState<
        ICategoryRootEstablishmentFront[]
    >([]);
    const [filteredRootCategories, setFilteredRootCategories] = useState<
        ICategoryRootEstablishmentFront[] | null
    >(null);

    const [searchText, setSearchText] = useState<string | null>(null);
    const [isModalActive, setIsModalActive] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [editRootCategory, setEditRootCategory] =
        useState<ICategoryRootEstablishmentFront | null>(null);
    const [form] = Form.useForm<RootCategoryFormValues>();

    const [languageDetails, setLanguageDetails] = useState<TDetails[]>(
        CONSTANT_LANGS_DETAILS
    );

    const fetchAll = useCallback(async () => {
        setIsLoading(true);
        const response = await services.rootCategory.getAll({});
        if (!response) {
            message.error("Ошибка при получении данных главных категорий");
            return;
        }
        setRootCategories(response);
        setIsLoading(false);
        message.info("Данные главных категорий загружены");
    }, [services, message]);

    const initialFetch = useCallback(async () => {
        await fetchAll();
    }, [fetchAll]);

    useEffect(() => {
        initialFetch();
    }, [initialFetch]);

    // редактирование
    useEffect(() => {
        if (editRootCategory && isModalActive) {
            const details =
                editRootCategory.content?.details.map((value) => ({
                    lang: value.lang as TLocale,
                    value: value.value || "",
                })) || CONSTANT_LANGS_DETAILS;

            setLanguageDetails(details);

            form.setFieldsValue({
                name: editRootCategory.name,
            });
        } else if (isModalActive) {
            form.resetFields();
            setLanguageDetails(CONSTANT_LANGS_DETAILS);
        }
    }, [editRootCategory, isModalActive, form]);

    // фильтрация
    useEffect(() => {
        if (!searchText) {
            setFilteredRootCategories(null);
            return;
        }

        let filteredData = rootCategories;

        if (searchText) {
            filteredData = filteredData.filter((item) =>
                (item.value || item.name)
                    .toLocaleLowerCase()
                    .includes(searchText.toLocaleLowerCase())
            );
        }

        setFilteredRootCategories(filteredData);
    }, [rootCategories, searchText]);

    const handleEdit = (rootCategory: ICategoryRootEstablishmentFront) => {
        console.log(rootCategory);
        setEditRootCategory(rootCategory);
        setIsModalActive(true);
    };

    const handleDelete = async (
        rootCategory: ICategoryRootEstablishmentFront
    ) => {
        const response = await services.rootCategory.delete(rootCategory.id);
        if (!response) {
            message.error("Ошибка при удалении главной категории");
        }
        fetchAll();
        message.info("Главная категория удалена");
    };

    const handleCreate = () => {
        setEditRootCategory(null);
        setIsModalActive(true);
    };

    const handleModalClose = () => {
        setIsModalActive(false);
        setEditRootCategory(null);
        form.resetFields();
        setLanguageDetails(CONSTANT_LANGS_DETAILS);
    };

    const handleLanguageDetailsChange = (details: TDetails[]) => {
        setLanguageDetails(details);
    };

    const handleSubmit = async () => {
        try {
            const hasEmptyFields = languageDetails.some(
                (item) => !item.value.trim()
            );

            if (hasEmptyFields) {
                message.error("Заполните все выбранные языки");
                return;
            }

            const values = await form.validateFields();

            if (!values) {
                message.error("Не все поля заполнены");
                return;
            }

            setIsModalLoading(true);

            const filledDetails = languageDetails.filter((item) =>
                item.value.trim()
            );

            const rootCategoryRequest: ICategoryRootEstablishmentRequest = {
                source: {
                    IsActive: true,
                    Name: values.name,
                    RefName: "places_team",
                },
                content: { details: filledDetails },
            };

            if (editRootCategory) {
                // Редактирование существующей главной категории
                const responseUpdate = await services.rootCategory.update(
                    editRootCategory.id,
                    rootCategoryRequest
                );
                responseUpdate
                    ? message.success("Главная категория обновлена")
                    : message.error("Ошибка при обновлении главной категории");
                fetchAll();
            } else {
                // Создание новой главной категории
                const responseCreate = await services.rootCategory.create(
                    rootCategoryRequest
                );
                responseCreate
                    ? message.success("Главная категория создана")
                    : message.error("Ошибка при создании главной категории");
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

    const columns = [
        {
            title: "Название",
            dataIndex: "value",
            key: "value",
            render: (
                value: string,
                record: ICategoryRootEstablishmentFront
            ) => (
                <div>
                    <div style={{ fontWeight: 500 }}>
                        {value || record.name}
                    </div>
                </div>
            ),
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Значения по языкам",
            dataIndex: "content",
            key: "content",
            render: (content: ICategoryRootEstablishmentFront["content"]) => (
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
            render: (_: any, record: ICategoryRootEstablishmentFront) => (
                <Space size="small">
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEdit(record)}
                    />
                    <ModalConfirm
                        handlerAction={() => handleDelete(record)}
                        title="Удаление главной категории"
                        content="Вы уверены, что хотите удалить эту главную категорию?"
                    >
                        <Button danger icon={<DeleteOutlined />} size="small" />
                    </ModalConfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Card
                title={`Главные категории (${
                    !!filteredRootCategories
                        ? filteredRootCategories.length
                        : rootCategories.length
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
                </Space>

                <Table
                    columns={columns}
                    dataSource={
                        !!filteredRootCategories
                            ? filteredRootCategories
                            : rootCategories
                    }
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: false,
                        showQuickJumper: false,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} из ${total} главных категорий`,
                    }}
                    scroll={{ x: 800 }}
                    loading={isLoading}
                />
            </Card>

            <Modal
                title={
                    editRootCategory
                        ? "Редактировать главную категорию"
                        : "Создать главную категорию"
                }
                onOk={handleSubmit}
                open={isModalActive}
                onCancel={handleModalClose}
                width={700}
                okText={editRootCategory ? "Сохранить" : "Создать"}
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
