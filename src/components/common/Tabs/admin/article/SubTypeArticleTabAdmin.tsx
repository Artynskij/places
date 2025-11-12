"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
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
    Tooltip,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import {
    IArticleSubTypeFront,
    IArticleSubTypeRequest,
    IArticleTypeEntity,
    IArticleTypeFront,
    IDetailLang,
    IOption,
} from "@/lib/models";
import { ArticleSubTypeService } from "@/lib/Api/(Article)/article-subType.api";
import { LanguageManagerBlock } from "@/components/common/Form/_components/LanguageManagerBlock/LanguageManagerBlock";
import { TLocale } from "@/lib/models/types";
import { locales } from "@/config";
import type { ColumnsType } from "antd/es/table";
import { ArticleTypeService } from "@/lib/Api/(Article)/article-type.api";
import { CONSTANT_LANGS_DETAILS } from "@/asset/constants/langs-details";
import { extractActuallyTitleServer } from "@/lib/helpers/extract-title-server";
import { buildEntityField } from "@/lib/helpers/build-entity-field";
import { CopyClipboardButton } from "@/components/common/ButtonFunctional/CopyClipboardButton";

const { Search } = Input;

interface ArticleSubTypeFormValues {
    name: string;
    typeId: string;
}

export const SubTypeArticleTabAdmin = () => {
    const services = useMemo(
        () => ({
            articleSubType: new ArticleSubTypeService(),
            articleType: new ArticleTypeService(),
        }),
        []
    );

    const [subTypesArticle, setSubTypesArticle] = useState<
        IArticleSubTypeFront[]
    >([]);
    const [articleTypes, setArticleTypes] = useState<IArticleTypeFront[]>([]);
    const [editSubType, setEditSubType] = useState<IArticleSubTypeFront | null>(
        null
    );

    const [isLoading, setIsLoading] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [languageDetails, setLanguageDetails] = useState<IDetailLang[]>(
        CONSTANT_LANGS_DETAILS
    );
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [form] = Form.useForm<ArticleSubTypeFormValues>();
    const fetchAll = useCallback(async () => {
        setIsLoading(true);
        const [typeResponse, subTypeResponse] = await Promise.all([
            services.articleType.get(),
            services.articleSubType.get(),
        ]);
        if (!subTypeResponse) {
            message.error("Ошибка загрузки подрубрик статей");
            return;
        }
        setSubTypesArticle(subTypeResponse || []);
        if (typeResponse) {
            setArticleTypes(typeResponse || []);
        } else {
            message.error("Ошибка загрузки рубрик статей");
        }

        setIsLoading(false);
    }, [services]);
    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    useEffect(() => {
        if (editSubType && isModalActive) {
            // Преобразуем данные подтипа статьи в languageDetails
            const details =
                editSubType.content?.details?.map((detail) => ({
                    lang: detail.lang as TLocale,
                    value: detail.value || "",
                })) || CONSTANT_LANGS_DETAILS;

            setLanguageDetails(details);

            form.setFieldsValue({
                name: editSubType.name,
                typeId: editSubType.articleTypeId || "",
            });
        } else if (isModalActive) {
            form.resetFields();
            setLanguageDetails(CONSTANT_LANGS_DETAILS);
        }
    }, [editSubType, isModalActive, form]);

    const fetchById = async (id: string) => {
        setIsLoading(true);
        try {
            const subTypeArticle = await services.articleSubType.getById(id);
            if (!subTypeArticle) {
                throw Error("Подрубрика статьи не найдена");
            }
            setSubTypesArticle([subTypeArticle]);
        } catch {
            message.error("Подрубрика статьи не найдена");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (record: IArticleSubTypeFront) => {
        setEditSubType(record);

        setIsModalActive(true);
    };

    const handleDelete = async (record: IArticleSubTypeFront) => {
        Modal.confirm({
            title: "Удаление подрубрики статьи",
            content: `Вы уверены, что хотите удалить подрубрику "${record.name}"?`,
            okText: "Удалить",
            cancelText: "Отмена",
            okType: "danger",
            onOk: async () => {
                console.log(record);
                try {
                    await services.articleSubType.delete(record.id);
                    setSubTypesArticle((prev) =>
                        prev.filter((c) => c.id !== record.id)
                    );
                    message.success("Подрубрика статьи удалена");
                } catch {
                    message.error("Ошибка при удалении подрубрики статьи");
                }
            },
        });
    };

    const handleModalClose = () => {
        setIsModalActive(false);
        setEditSubType(null);
        form.resetFields();
        setLanguageDetails(CONSTANT_LANGS_DETAILS);
    };

    const handleLanguageDetailsChange = (details: IDetailLang[]) => {
        setLanguageDetails(details);
    };

    const handleAdd = () => {
        setEditSubType(null);
        setIsModalActive(true);
    };

    const handleSubmit = async () => {
        try {
            // Валидируем languageDetails - проверяем что все выбранные языки заполнены
            const hasEmptyFields = languageDetails.some(
                (item) => !item.value.trim()
            );
            const englishDetail = languageDetails.find(
                (item) => item.lang === "en"
            );
            if (!englishDetail) {
                message.error("Английский язык обязателен.");
                return;
            }
            if (hasEmptyFields) {
                message.error("Заполните все выбранные языки");
                return;
            }

            // Валидируем остальные поля формы
            const values = await form.validateFields();

            if (!values.typeId) {
                message.error("Выберите рубрику статьи");
                return;
            }

            setIsModalLoading(true);
            const { name, code } = buildEntityField({
                englishName: englishDetail.value,
                entity: ["code", "name"],
            });
            const filledDetails = languageDetails.filter((item) =>
                item.value.trim()
            );
            const body: IArticleSubTypeRequest = {
                source: {
                    Name: name,
                    Code: code,
                    ArticleTypeId: values.typeId,
                },
                content: {
                    details: filledDetails,
                },
            };

            if (editSubType) {
                // Редактирование существующего подтипа
                const updatedSubType = await services.articleSubType.update(
                    editSubType.id,
                    body
                );

                if (updatedSubType) {
                    message.success("Подрубрика статьи обновлена");
                    fetchAll();
                    handleModalClose();
                } else {
                    message.error("Ошибка при обновлении подрубрики статьи");
                }
            } else {
                // Создание нового подтипа
                const newSubType = await services.articleSubType.create(body);

                if (newSubType) {
                    message.success("Подрубрика статьи создана");
                    fetchAll();
                    handleModalClose();
                } else {
                    message.error("Ошибка при создании подрубрики статьи");
                }
            }
        } catch (error) {
            console.error("Ошибка:", error);
            message.error("Произошла ошибка при сохранении");
        } finally {
            setIsModalLoading(false);
        }
    };

    const columns: ColumnsType<IArticleSubTypeFront> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
            render: (id: IArticleSubTypeFront["id"]) => {
                return <CopyClipboardButton text={id} />;
            },
        },
        {
            title: "Название подрубрики",
            dataIndex: "value",
            key: "value",
        },
        // {
        //     title: "Ключ подрубрики",
        //     dataIndex: "name",
        //     key: "name",
        // },
        {
            title: "Рубрика",
            dataIndex: "articleType",
            key: "articleType",
            render: (articleType: IArticleSubTypeFront["articleType"]) => {
                return (
                    <Tag color="purple">
                        {
                            articleTypes.find(
                                (item) => item.id === articleType.Id
                            )?.value
                        }
                    </Tag>
                );
            },
        },
        {
            title: "Языки",
            key: "languages",
            render: (_, record) => (
                <Space>
                    {record.content?.details?.map((detail, index) => (
                        <Tooltip
                            key={detail.lang}
                            title={`${detail.lang.toUpperCase()}: ${
                                detail.value
                            }`}
                        >
                            <Tag color="blue">{detail.lang.toUpperCase()}</Tag>
                        </Tooltip>
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
        // {
        //     title: "Дата создания",
        //     dataIndex: "createdAt",
        //     key: "createdAt",
        //     render: (date: string) => new Date(date).toLocaleDateString(),
        // },
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
                        // disabled={(record.articleCount || 0) > 0}
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
                            Добавить подрубрику
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
                title="Управление подрубриками статей"
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
                    dataSource={subTypesArticle}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={isLoading}
                />
            </Card>

            <Modal
                title={
                    editSubType
                        ? "Редактировать подрубрику статьи"
                        : "Добавить подрубрику статьи"
                }
                onOk={handleSubmit}
                open={isModalActive}
                onCancel={handleModalClose}
                width={700}
                okText={editSubType ? "Сохранить" : "Создать"}
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
                        label="Рубрика статьи"
                        rules={[
                            {
                                required: true,
                                message: "Выберите рубрику статьи",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Выберите рубрику статьи"
                            loading={isLoading}
                        >
                            {articleTypes.map((type) => (
                                <Select.Option key={type.id} value={type.id}>
                                    {type.value}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
