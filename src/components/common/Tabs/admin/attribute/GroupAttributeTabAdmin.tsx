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

import { TagCategoryService } from "@/lib/Api/(Establishment)/tag-category.api";
import {
    ITagCategoryFront,
    IDetailLang,
    ITagCategoryRequest,
} from "@/lib/models";
import { CONSTANT_LANGS_DETAILS } from "@/asset/constants/langs-details";
import { CONSTANT_TYPES_OF_ESTABLISHMENT_ARRAY_DB } from "@/asset/constants/database/types-of-establishment";
import { buildEntityField } from "@/lib/helpers/build-entity-field";
import { CopyClipboardButton } from "@/components/common/ButtonFunctional/CopyClipboardButton";
import { TagService } from "@/lib/Api/(Establishment)/tag.api";

const { Search } = Input;

interface GroupAttributeFormValues {
    typeEstablishmentId: string;
}

export const GroupAttributeTabAdmin = () => {
    const services = useMemo(
        () => ({
            tagCategory: new TagCategoryService(),
            tag: new TagService(),
        }),
        []
    );
    const message = useAlertMessage();

    const [isLoading, setIsLoading] = useState(false);
    const [tagCategories, setTagCategories] = useState<ITagCategoryFront[]>([]);
    const [filteredTagCategories, setFilteredTagCategories] = useState<
        ITagCategoryFront[] | null
    >(null);
    const [isModalActive, setIsModalActive] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [editTagCategory, setEditTagCategory] =
        useState<ITagCategoryFront | null>(null);
    const [form] = Form.useForm<GroupAttributeFormValues>();

    const [languageDetails, setLanguageDetails] = useState<IDetailLang[]>(
        CONSTANT_LANGS_DETAILS
    );
    const fetchAll = useCallback(async () => {
        setIsLoading(true);
        const responseRootCategory = await services.tagCategory.getAll();
        const tagsResponse = await services.tag.get();
        if (!responseRootCategory) {
            message.error("не получилось обновить");
        } else {
            message.info("Обновлено");
            const rootCategoriesWithCountTag = responseRootCategory.map(
                (rootCategory) => {
                    const foundTagCategory = tagsResponse?.filter(
                        (tag) => tag.tagCategory.id === rootCategory.id
                    );
                    return {
                        ...rootCategory,
                        countTags: foundTagCategory?.length || 0,
                    };
                }
            );
            setTagCategories(rootCategoriesWithCountTag);
        }
        setIsLoading(false);
    }, [message, services]);
    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    useEffect(() => {
        if (editTagCategory && isModalActive) {
            const details = editTagCategory.content?.details.map((value) => ({
                lang: value.lang as TLocale,
                value: value.value || "",
            }));
            setLanguageDetails(details || []);
            form.setFieldsValue({
                typeEstablishmentId: editTagCategory.establishmentTypeId || "",
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
    const handleEdit = (tagCategory: ITagCategoryFront) => {
        setEditTagCategory(tagCategory);
        setIsModalActive(true);
    };

    const handleDelete = async (tagCategory: ITagCategoryFront) => {
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

            const bodyRequest: ITagCategoryRequest = {
                source: {
                    Name: name,
                    EstablishmentTypeId: values.typeEstablishmentId,
                },
                content: { details: filledDetails },
            };
            if (editTagCategory) {
                const responseCreate = await services.tagCategory.update(
                    editTagCategory.id,
                    bodyRequest
                );
                if (responseCreate) {
                    message.success("Группа атрибутов обновлена");
                    fetchAll();
                } else {
                    message.error("Ошибка при обновлении группы атрибутов");
                }
            } else {
                const responseCreate = await services.tagCategory.create(
                    bodyRequest
                );
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
            width: 80,
            render: (id: ITagCategoryFront["id"]) => {
                return <CopyClipboardButton text={id} />;
            },
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
            title: "Тип заведения",
            dataIndex: "establishmentTypeId",
            key: "establishmentTypeId",
            render: (
                establishmentTypeId: ITagCategoryFront["establishmentTypeId"]
            ) => (
                <div style={{ fontWeight: 500 }}>
                    <Tag color={establishmentTypeId ? "blue" : "default"}>
                        {establishmentTypeId
                            ? CONSTANT_TYPES_OF_ESTABLISHMENT_ARRAY_DB.find(
                                  (item) => item.id === establishmentTypeId
                              )?.title
                            : "не закреплён"}
                    </Tag>
                </div>
            ),
        },

        {
            title: "Названия по языкам",
            dataIndex: "content",
            key: "content",
            render: (values: ITagCategoryFront["content"]) => (
                <Space direction="horizontal" size="small">
                    {values?.details.map((value) => (
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
            title: "Кол-во аттрибутов",
            dataIndex: "countTags",
            key: "countTags",
            render: (count: ITagCategoryFront["countTags"]) => (
                <div style={{ fontWeight: 500 }}>
                    <Tag color={count && count > 0 ? "blue" : "default"}>
                        {count}
                    </Tag>
                </div>
            ),
        },
        {
            title: "Действия",
            key: "actions",
            width: 150,
            render: (_: any, record: ITagCategoryFront) => (
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
                                disabled={
                                    !!(record.countTags && record.countTags > 0)
                                }
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
                        name="typeEstablishmentId"
                        label="Тип заведения"
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
                        <Select
                            placeholder="Выберите тип заведения"
                            loading={isLoading}
                        >
                            {CONSTANT_TYPES_OF_ESTABLISHMENT_ARRAY_DB.map(
                                (group) => (
                                    <Select.Option
                                        key={group.id}
                                        value={group.id}
                                    >
                                        {group.title ||
                                            "Выберите тип заведения"}
                                    </Select.Option>
                                )
                            )}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
