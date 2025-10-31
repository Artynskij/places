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
import { LanguageManagerBlock } from "@/components/common/Form/_components/LangugageManagerBlock/LangugageManagerBlock";
import { TLocale } from "@/lib/models/types";
import { locales } from "@/config";
import { TagCategoryService } from "@/lib/Api/(Establishment)/tag-category.api";
import { ICategoryFront, IDetailLang } from "@/lib/models";
import { CONSTANT_LANGS_DETAILS } from "@/asset/constants/langs-details";

const { Option } = Select;
const { Search } = Input;

interface GroupAttributeFormValues {
    name: string;
}

export const GroupAttributeTabAdmin = () => {
    const services = useMemo(
        () => ({ tagCategory: new TagCategoryService() }),
        []
    );
    const message = useAlertMessage();

    const [isLoading, setIsLoading] = useState(false);
    const [tagCategories, setTagCategories] = useState<ICategoryFront[]>([]);
    const [filteredTagCategories, setFilteredTagCategories] = useState<
        ICategoryFront[] | null
    >(null);
    const [isModalActive, setIsModalActive] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [editTagCategory, setEditTagCategory] =
        useState<ICategoryFront | null>(null);
    const [form] = Form.useForm<GroupAttributeFormValues>();

    const [languageDetails, setLanguageDetails] = useState<IDetailLang[]>(
        CONSTANT_LANGS_DETAILS
    );
    const fetchAll = useCallback(async () => {
        setIsLoading(true);
        const response = await services.tagCategory.getAll();
        if (!response) {
            message.error("не получилось обновить");
        } else {
            setIsLoading(false);
            message.info("Обновлено");
            setTagCategories(response);
        }
    }, [message, services]);
    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

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
            setLanguageDetails(CONSTANT_LANGS_DETAILS);
        }
    }, [editTagCategory, isModalActive, form]);
    const filterByTitle = (value: string) => {
        if (!value) {
            setFilteredTagCategories(null);
            return;
        }
        const filteredData = tagCategories.filter((item) =>
            item.value.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );
        setFilteredTagCategories(filteredData);
    };
    const handleEdit = (tagCategory: ICategoryFront) => {
        setEditTagCategory(tagCategory);
        setIsModalActive(true);
    };

    const handleDelete = async (tagCategory: ICategoryFront) => {
        const responseDelete = await services.tagCategory.delete(
            tagCategory.id
        );

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
        setLanguageDetails(CONSTANT_LANGS_DETAILS);
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
                const responseCreate = await services.tagCategory.update(
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
                const responseCreate = await services.tagCategory.create({
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
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Название",
            dataIndex: "value",
            key: "value",
            render: (value: string) => (
                <div style={{ fontWeight: 500 }}> {value}</div>
            ),
        },
        {
            title: "Названия по языкам",
            dataIndex: "content",
            key: "content",
            render: (values: ICategoryFront["content"]) => (
                <Space direction="horizontal" size="small">
                    {values?.details.map((value) => (
                        // <Tag key={value.lang} color="blue">
                        //     {value.lang.toUpperCase()}
                        // </Tag>
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
                title={`Группы атрибутов (${
                    !!filteredTagCategories
                        ? filteredTagCategories.length
                        : tagCategories.length
                })`}
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
                        onSearch={(value) => {
                            filterByTitle(value);
                        }}
                        loading={isLoading}
                    />
                </Space>

                <Table
                    columns={columns}
                    dataSource={
                        !!filteredTagCategories
                            ? filteredTagCategories
                            : tagCategories
                    }
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
