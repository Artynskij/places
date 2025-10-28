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
import { locales } from "@/config";

const { Option } = Select;
const { Search } = Input;

// Моковые данные для интерфейсов
interface IAttributeGroup {
    id: string;
    name: string;
    code: string;
}

interface IAttributeValue {
    id: string;
    value: string;
    lang: string;
}

interface IAttribute {
    id: string;
    name: string;
    code: string;
    group: IAttributeGroup;
    values: IAttributeValue[];
    description?: string;
}

interface AttributeListTabProps {
    // onAttributeEdit: (attribute: IAttribute) => void;
}

type TDetails = { lang: TLocale; value: string };

interface AttributeFormValues {
    name: string;
    code: string;
    groupId: string;
    description?: string;
}

export const AttributeTabAdmin: React.FC<AttributeListTabProps> = (
    {
        // onAttributeEdit,
    }
) => {
    const message = useAlertMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [attributes, setAttributes] = useState<IAttribute[]>([]);
    const [searchText, setSearchText] = useState("");
    const [isModalActive, setIsModalActive] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [editAttribute, setEditAttribute] = useState<IAttribute | null>(null);
    const [form] = Form.useForm<AttributeFormValues>();

    const langsDetailsDefault = locales.map((item) => ({
        lang: item,
        value: "",
    }));
    const [languageDetails, setLanguageDetails] =
        useState<TDetails[]>(langsDetailsDefault);

    // Моковые данные групп атрибутов
    const attributeGroups: IAttributeGroup[] = [
        { id: "1", name: "Цвет", code: "color" },
        { id: "2", name: "Размер", code: "size" },
        { id: "3", name: "Материал", code: "material" },
        { id: "4", name: "Бренд", code: "brand" },
    ];

    // Моковые языки
    const languages = ["ru", "en", "de", "fr"];

    // Моковые данные атрибутов
    const mockAttributes: IAttribute[] = [
        {
            id: "1",
            name: "Основной цвет",
            code: "main_color",
            group: attributeGroups[0],
            values: [
                { id: "1", value: "Красный", lang: "ru" },
                { id: "2", value: "Red", lang: "en" },
                { id: "3", value: "Rot", lang: "de" },
            ],
            description: "Основной цвет продукта",
        },
        {
            id: "2",
            name: "Размер одежды",
            code: "clothing_size",
            group: attributeGroups[1],
            values: [
                { id: "4", value: "Большой", lang: "ru" },
                { id: "5", value: "Large", lang: "en" },
                { id: "6", value: "Groß", lang: "de" },
            ],
        },
        {
            id: "3",
            name: "Материал изготовления",
            code: "material_type",
            group: attributeGroups[2],
            values: [
                { id: "7", value: "Хлопок", lang: "ru" },
                { id: "8", value: "Cotton", lang: "en" },
                { id: "9", value: "Baumwolle", lang: "de" },
            ],
        },
        {
            id: "4",
            name: "Бренд производителя",
            code: "manufacturer_brand",
            group: attributeGroups[3],
            values: [
                { id: "10", value: "Наш бренд", lang: "ru" },
                { id: "11", value: "Our brand", lang: "en" },
            ],
        },
        {
            id: "5",
            name: "Дополнительный цвет",
            code: "secondary_color",
            group: attributeGroups[0],
            values: [
                { id: "12", value: "Синий", lang: "ru" },
                { id: "13", value: "Blue", lang: "en" },
            ],
        },
    ];

    useEffect(() => {
        fetchAll();
    }, []);

    useEffect(() => {
        if (editAttribute && isModalActive) {
            // Преобразуем данные атрибута в languageDetails
            const details = editAttribute.values.map((value) => ({
                lang: value.lang as TLocale,
                value: value.value || "",
            }));

            setLanguageDetails(details);

            form.setFieldsValue({
                name: editAttribute.name,
                code: editAttribute.code,
                groupId: editAttribute.group.id,
                description: editAttribute.description || "",
            });
        } else if (isModalActive) {
            form.resetFields();
            setLanguageDetails(langsDetailsDefault);
        }
    }, [editAttribute, isModalActive, form]);

    const fetchAll = async () => {
        setIsLoading(true);
        // Имитация загрузки данных
        setTimeout(() => {
            setAttributes(mockAttributes);
            setIsLoading(false);
            message.info("Данные атрибутов загружены");
        }, 500);
    };

    const handleEdit = (attribute: IAttribute) => {
        setEditAttribute(attribute);
        setIsModalActive(true);
    };

    const handleDelete = async (attribute: IAttribute) => {
        // Имитация удаления
        setAttributes((prev) =>
            prev.filter((item) => item.id !== attribute.id)
        );
        message.info("Атрибут удален");
    };

    const handleCreate = () => {
        setEditAttribute(null);
        setIsModalActive(true);
    };

    const handleModalClose = () => {
        setIsModalActive(false);
        setEditAttribute(null);
        form.resetFields();
        setLanguageDetails(langsDetailsDefault);
    };

    const handleLanguageDetailsChange = (details: TDetails[]) => {
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

            if (!values.groupId) {
                message.error("Выберите группу атрибутов");
                return;
            }

            setIsModalLoading(true);

            // Имитация API запроса
            setTimeout(() => {
                const selectedGroup = attributeGroups.find(
                    (g) => g.id === values.groupId
                );
                if (!selectedGroup) {
                    message.error("Группа атрибутов не найдена");
                    return;
                }

                const filledDetails = languageDetails.filter((item) =>
                    item.value.trim()
                );

                const attributeData: IAttribute = {
                    id: editAttribute
                        ? editAttribute.id
                        : Date.now().toString(),
                    name: values.name,
                    code: values.code,
                    group: selectedGroup,
                    values: filledDetails.map((detail, index) => ({
                        id: (editAttribute
                            ? editAttribute.values[index]?.id
                            : Date.now() + index
                        ).toString(),
                        value: detail.value,
                        lang: detail.lang,
                    })),
                    description: values.description,
                };

                if (editAttribute) {
                    // Редактирование существующего атрибута
                    setAttributes((prev) =>
                        prev.map((item) =>
                            item.id === editAttribute.id ? attributeData : item
                        )
                    );
                    message.success("Атрибут обновлен");
                } else {
                    // Создание нового атрибута
                    setAttributes((prev) => [...prev, attributeData]);
                    message.success("Атрибут создан");
                }

                handleModalClose();
                setIsModalLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Ошибка:", error);
            message.error("Произошла ошибка при сохранении");
            setIsModalLoading(false);
        }
    };

    const filteredAttributes = attributes.filter(
        (attribute) =>
            attribute.name.toLowerCase().includes(searchText.toLowerCase()) ||
            attribute.code.toLowerCase().includes(searchText.toLowerCase()) ||
            attribute.group.name
                .toLowerCase()
                .includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: "Название",
            dataIndex: "name",
            key: "name",
            render: (name: string, record: IAttribute) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{name}</div>
                </div>
            ),
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Группа атрибутов",
            dataIndex: "group",
            key: "group",
            render: (group: IAttributeGroup) => (
                <Tag color="blue" style={{ cursor: "pointer" }}>
                    {group.name}
                </Tag>
            ),
        },
        {
            title: "Код",
            dataIndex: "code",
            key: "code",
            render: (code: string) => <Tag color="green">{code}</Tag>,
        },
        {
            title: "Значения по языкам",
            dataIndex: "values",
            key: "values",
            render: (values: IAttributeValue[]) => (
                <Space direction="horizontal" size="small">
                    {values.map((value) => (
                        <Tooltip
                            key={value.id}
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
            title: "Описание",
            dataIndex: "description",
            key: "description",
            render: (description: string) => (
                <Tooltip title={description}>
                    <span
                        style={{
                            display: "block",
                            maxWidth: 200,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {description || "-"}
                    </span>
                </Tooltip>
            ),
        },
        {
            title: "Действия",
            key: "actions",
            width: 150,
            render: (_: any, record: IAttribute) => (
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
                title={`Атрибуты товаров (${filteredAttributes.length})`}
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
                        placeholder="Поиск по названию, коду или группе"
                        allowClear
                        style={{ width: 300 }}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Space>
                <Table
                    columns={columns}
                    dataSource={filteredAttributes}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} из ${total} атрибутов`,
                    }}
                    scroll={{ x: 800 }}
                    loading={isLoading}
                />
            </Card>

            <Modal
                title={
                    editAttribute ? "Редактировать атрибут" : "Создать атрибут"
                }
                onOk={handleSubmit}
                open={isModalActive}
                onCancel={handleModalClose}
                width={700}
                okText={editAttribute ? "Сохранить" : "Создать"}
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
                            {attributeGroups.map((group) => (
                                <Select.Option key={group.id} value={group.id}>
                                    {group.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Название атрибута"
                        rules={[
                            {
                                required: true,
                                message: "Введите название атрибута",
                            },
                            {
                                min: 2,
                                message:
                                    "Название должно содержать минимум 2 символа",
                            },
                        ]}
                    >
                        <Input placeholder="Основной цвет, Размер одежды и т.д." />
                    </Form.Item>

                    <Form.Item
                        name="code"
                        label="Код атрибута (английскими буквами)"
                        rules={[
                            {
                                required: true,
                                message: "Введите код атрибута",
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
                        <Input placeholder="main_color, clothing_size, material_type и т.д." />
                    </Form.Item>

                    <Form.Item name="description" label="Описание">
                        <Input.TextArea
                            placeholder="Необязательное описание атрибута"
                            rows={3}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
