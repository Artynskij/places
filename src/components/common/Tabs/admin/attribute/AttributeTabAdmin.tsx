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
import { LanguageManagerBlock } from "@/components/common/Form/_components/LangugageManagerBlock/LangugageManagerBlock";
import { TLocale } from "@/lib/models/types";

import { CONSTANT_LANGS_DETAILS } from "@/asset/constants/langs-details";

import { ICategoryFront, IOption, ITagFront, ITagRequest } from "@/lib/models";
import { TagService } from "@/lib/Api/(Establishment)/tag.api";
import { TagCategoryService } from "@/lib/Api/(Establishment)/tag-category.api";

const { Search } = Input;

interface AttributeListTabProps {
    // onAttributeEdit: (attribute: IAttribute) => void;
}

type TDetails = { lang: TLocale; value: string };

interface AttributeFormValues {
    name: string;
    groupId: string;
}

export const AttributeTabAdmin = ({}: AttributeListTabProps) => {
    const services = useMemo(
        () => ({
            tag: new TagService(),
            tagCategory: new TagCategoryService(),
        }),
        []
    );

    const message = useAlertMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState<ITagFront[]>([]);
    const [filteredTags, setFilteredTags] = useState<ITagFront[] | null>(null);
    const [tagCategories, setTagCategories] = useState<ICategoryFront[]>([]);
    const [filterTagCategoryId, setFilterTagCategoryId] = useState<
        string | null
    >();
    const [searchText, setSearchText] = useState<string | null>(null);
    const [isModalActive, setIsModalActive] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [editTag, setEditTag] = useState<ITagFront | null>(null);
    const [form] = Form.useForm<AttributeFormValues>();

    const [languageDetails, setLanguageDetails] = useState<TDetails[]>(
        CONSTANT_LANGS_DETAILS
    );
    const fetchAll = useCallback(async () => {
        setIsLoading(true);
        const response = await services.tag.get();
        if (!response) {
            message.error("Ошибка при получении данных аттрибутов");
            return;
        }
        setTags(response);
        setIsLoading(false);
        message.info("Данные атрибутов загружены");
    }, [services, message]);

    const initialFetch = useCallback(async () => {
        const response = await services.tagCategory.getAll();
        if (response) {
            setTagCategories(response);
        } else {
            message.error("Ошибка при получении данных группы аттрибутов");
        }

        await fetchAll();
    }, [fetchAll, services, message]);

    useEffect(() => {
        initialFetch();
    }, [initialFetch]);
    // редактирование
    useEffect(() => {
        if (editTag && isModalActive) {
            // Преобразуем данные атрибута в languageDetails
            const details = editTag.content?.details.map((value) => ({
                lang: value.lang as TLocale,
                value: value.value || "",
            }));
            if (!details) return;
            setLanguageDetails(details);

            form.setFieldsValue({
                groupId: editTag.tagCategory.id,
            });
        } else if (isModalActive) {
            form.resetFields();
            setLanguageDetails(CONSTANT_LANGS_DETAILS);
        }
    }, [editTag, isModalActive, form]);
    // фильтрация
    useEffect(() => {
        if (!filterTagCategoryId && !searchText) {
            setFilteredTags(null);
            return;
        }
        let filteredData = tags;

        if (filterTagCategoryId) {
            filteredData = filteredData.filter(
                (tag) => tag.tagCategory.id === filterTagCategoryId
            );
        }

        if (searchText) {
            filteredData = filteredData.filter((item) =>
                item.value
                    .toLocaleLowerCase()
                    .includes(searchText.toLocaleLowerCase())
            );
        }

        setFilteredTags(filteredData);
    }, [tags, filterTagCategoryId, searchText]);

    const handleEdit = (attribute: ITagFront) => {
        setEditTag(attribute);
        setIsModalActive(true);
    };
    const handleDelete = async (attribute: ITagFront) => {
        // Имитация удаления
        const response = await services.tag.delete(attribute.id);
        if (!response) {
            message.error("Ошибка при удалении атрибута");
        }
        fetchAll();
        message.info("Атрибут удален");
    };

    const handleCreate = () => {
        setEditTag(null);
        setIsModalActive(true);
    };

    const handleModalClose = () => {
        setIsModalActive(false);
        setEditTag(null);
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

            // Валидируем остальные поля формы
            const values = await form.validateFields();

            if (!values) {
                message.error("Не все поля заполнены");
                return;
            }

            setIsModalLoading(true);

            const selectedGroup = tagCategories.find(
                (g) => g.id === values.groupId
            );
            if (!selectedGroup) {
                message.error("Группа атрибутов не найдена");
                return;
            }

            const filledDetails = languageDetails.filter((item) =>
                item.value.trim()
            );

            const tagRequest: ITagRequest = {
                source: { TagCategoryId: values.groupId },
                content: { details: filledDetails },
            };

            if (editTag) {
                // Редактирование существующего атрибута
                const responseUpdate = await services.tag.update(
                    editTag.id,
                    tagRequest
                );
                responseUpdate
                    ? message.success("Атрибут обновлен")
                    : message.error("Ошибка при обновлении атрибута");
                fetchAll();
            } else {
                // Создание нового атрибута
                const responseCreate = await services.tag.create(tagRequest);
                responseCreate
                    ? message.success("Атрибут создан")
                    : message.error("Ошибка при создании атрибута");
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
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Название",
            dataIndex: "value",
            key: "value",
            render: (value: string) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{value}</div>
                </div>
            ),
        },
        {
            title: "Группа атрибутов",
            dataIndex: "tagCategory",
            key: "tagCategory",
            render: (group: ITagFront["tagCategory"]) => (
                <Tag color="blue" style={{ cursor: "pointer" }}>
                    {group.value}
                </Tag>
            ),
        },
        {
            title: "Значения по языкам",
            dataIndex: "content",
            key: "content",
            render: (content: ITagFront["content"]) => (
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
            render: (_: any, record: ITagFront) => (
                <Space size="small">
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEdit(record)}
                    />
                    <ModalConfirm
                        handlerAction={() => handleDelete(record)}
                        title="Удаление атрибута"
                        content="Вы уверены, что хотите удалить этот атрибут?"
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
                title={`Атрибуты товаров (${
                    !!filteredTags ? filteredTags.length : tags.length
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
                        style={{ width: 200 }}
                        placeholder="Поиск по группам атрибутов"
                        loading={isLoading}
                        allowClear
                        onChange={(value) => {
                            setFilterTagCategoryId(value);
                        }}
                    >
                        {tagCategories.map((group) => (
                            <Select.Option key={group.id} value={group.id}>
                                {group.value}
                            </Select.Option>
                        ))}
                    </Select>
                    {/* <Select
                        placeholder="Выберите группу атрибутов"
                        style={{ width: 200 }}
                        allowClear
                        options={tagCategories}
                        // value={typeEstablishment}
                    /> */}
                </Space>

                <Table
                    columns={columns}
                    dataSource={!!filteredTags ? filteredTags : tags}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: false,
                        showQuickJumper: false,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} из ${total} атрибутов`,
                    }}
                    scroll={{ x: 800 }}
                    loading={isLoading}
                />
            </Card>

            <Modal
                title={editTag ? "Редактировать атрибут" : "Создать атрибут"}
                onOk={handleSubmit}
                open={isModalActive}
                onCancel={handleModalClose}
                width={700}
                okText={editTag ? "Сохранить" : "Создать"}
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
                        name="groupId"
                        label="Группа атрибутов"
                        rules={[
                            {
                                required: true,
                                message: "Выберите группу атрибутов",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Выберите группу атрибутов"
                            loading={isLoading}
                        >
                            {tagCategories.map((group) => (
                                <Select.Option key={group.id} value={group.id}>
                                    {group.value}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
