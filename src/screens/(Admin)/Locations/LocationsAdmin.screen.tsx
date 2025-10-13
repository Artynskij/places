"use client";
import styles from "../admin.module.scss";
import { useState, useEffect } from "react";
import { ILocationFront, ISearchItemFront } from "@/lib/models";
import {
    Button,
    Card,
    Space,
    Table,
    Spin,
    message,
    Form,
    Modal,
    Input,
    Select,
    Upload,
    Tag,
} from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UploadOutlined,
    CloseOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { LocationService } from "@/lib/Api/location/location.service";
import useLocale from "@/lib/hooks/useLocale";

import { SearchService } from "@/lib/Api/search/search.service";
import { FileUploadService } from "@/lib/Api/fileUpload/fileUploads.service";

const { Search } = Input;
import type { UploadFile } from "antd/es/upload/interface";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { ModerationService } from "@/lib/Api/moderation/moderation.service";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { locales } from "@/config";
import { TLocale } from "@/lib/models/types";

// Интерфейс для формы с динамическими языками
interface LocationFormValues {
    titles: { [lang: string]: string };
    locationType: string;
    media?: UploadFile[];
}

// Доступные языки на сайте
// const AVAILABLE_LANGUAGES = [
//     { code: "ru", name: "Русский" },
//     { code: "en", name: "English" },
//     { code: "kz", name: "Қазақша" }, // пример добавления нового языка
// ];

interface Props {}

const LocationsAdminScreen: React.FC<Props> = () => {
    const langs = locales;
    const { user } = useUser();
    const locale = useLocale();
    const [modalActive, setModalActive] = useState(false);
    const [locations, setLocations] = useState<ILocationFront[]>([]);
    const [loading, setLoading] = useState(false);
    const [editLocation, setEditLocation] = useState<ILocationFront | null>(
        null
    );
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchOptions, setSearchOptions] = useState<
        { label: string; value: string }[]
    >([]);
    const [typesLocationsData, setTypesLocationsData] = useState<
        {
            label: string;
            value: string;
        }[]
    >();
    const [selectedLanguages, setSelectedLanguages] = useState<TLocale[]>([
        "ru",
        "en",
    ]); // По умолчанию ru и en
    const [form] = Form.useForm<LocationFormValues>();

    const locationService = new LocationService();
    const searchService = new SearchService();
    const fileUploadService = new FileUploadService();
    const dataLoadManagerService = new DataLoadManagementService();
    const moderationService = new ModerationService();

    useEffect(() => {
        dataLoadManagerService.getTypesLocation().then((res) => {
            if (res) {
                const transformData = res.map((item) => ({
                    label: item.type.Name,
                    value: item.type.Id,
                }));
                setTypesLocationsData(transformData);
            }
        });
        fetchAll();
    }, []);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const data = await locationService.getAll({
                pagination: { page: 1, pageSize: 1000 },
            });
            setLocations(data || []);
        } catch {
            message.error("Ошибка загрузки локаций");
        } finally {
            setLoading(false);
        }
    };

    const fetchById = async (id: string) => {
        setSearchLoading(true);
        try {
            const locationById = await locationService.getById(id);
            if (!locationById) {
                throw Error("не найдена локация");
            }
            const locationsInside = await locationService.getAll({
                pagination: { page: 1, pageSize: 1000 },
                locationId: locationById?.id,
            });
            if (!locationsInside) {
                throw Error("не найдены локации внутри");
            }
            const locationsInsideFiltered = locationsInside.filter(
                (item) => item.id !== locationById.id
            );
            setLocations([locationById, ...locationsInsideFiltered]);
        } catch {
            message.error("Локация не найдена");
        } finally {
            setSearchLoading(false);
        }
    };

    const fetchByTitle = async (title: string) => {
        setSearchLoading(true);
        try {
            const responseSearch = await searchService.querySearch({
                term: title,
                indexKey: "TO_GO",
                localLang: locale,
            });
            const data = responseSearch?.searchItems;
            if (data && Array.isArray(data)) {
                setSearchOptions(
                    data.map((item: ISearchItemFront) => ({
                        label: item.title,
                        value: item.id,
                    }))
                );
            } else {
                setSearchOptions([]);
            }
        } catch {
            message.error("Ошибка поиска");
        } finally {
            setSearchLoading(false);
        }
    };

    const handleCancel = () => {
        setModalActive(false);
        setEditLocation(null);
        setSelectedLanguages(["ru", "en"]); // Сбрасываем к значениям по умолчанию
        form.resetFields();
    };

    const handleOk = async () => {
        if (!editLocation) {
            message.error("Нету локации для изменений. К программисту.");
            return;
        }
        if (!user) {
            message.error("Нету пользователя");
            return;
        }

        try {
            const values = await form.validateFields();

            // Проверяем, что есть хотя бы одно заполненное название
            const filledLanguages = selectedLanguages.filter((lang) =>
                values.titles?.[lang]?.trim()
            );

            if (filledLanguages.length === 0) {
                message.error("Заполните хотя бы одно название на любом языке");
                return;
            }

            const moderationObject = await moderationService.getModerationData(
                user.id
            );
            if (!moderationObject) {
                message.error(
                    "Ошибка с получением токенов модерации. К программисту."
                );
                return;
            }

            const files = values.media
                ? await fileUploadService.uploadPublicFileOfAntdFiles({
                      vendorId: editLocation.id,
                      files: values.media,
                  })
                : [];

            // Формируем details из выбранных языков
            const details = selectedLanguages
                .filter((lang) => values.titles?.[lang]?.trim()) // только заполненные языки
                .map((lang) => ({
                    lang: lang,
                    value: values.titles[lang].trim(),
                }));

            const updatedLocation = await locationService.update(
                editLocation?.id,
                {
                    moderation: moderationObject,
                    data: {
                        source: {
                            LocationType: values.locationType,
                        },
                        content: {
                            details: details,
                            media: { gallery: files },
                        },
                    },
                }
            );

            if (updatedLocation) {
                message.success("Обновлена локация");
                fetchAll(); // Обновляем список
            } else {
                message.error("Ошибка при обновлении локации");
            }
            handleCancel();
        } catch (error) {
            console.error("Ошибка валидации:", error);
        }
    };

    const handleEdit = (record: ILocationFront) => {
        setEditLocation(record);
        setModalActive(true);

        // Определяем какие языки уже есть у локации
        const existingLanguages = record.content?.details?.map(
            (detail) => detail.lang
        ) || ["ru", "en"];
        setSelectedLanguages(existingLanguages);

        // Преобразуем details в объект для формы
        const titles =
            record.content?.details?.reduce((acc, detail) => {
                acc[detail.lang] = detail.value;
                return acc;
            }, {} as { [key: string]: string }) || {};

        form.setFieldsValue({
            titles: titles,
            locationType: record.locationType?.id,
            media: record.media?.map((media, idx) => ({
                uid: String(idx),
                name: media.title || `file-${idx}`,
                status: "done",
                url: media.src,
            })),
        });
    };

    const handleDelete = (id: string) => {
        message.error("Пока невозможно удалить");
    };

    // Добавление языка к форме
    const addLanguage = (langCode: TLocale) => {
        if (!selectedLanguages.includes(langCode)) {
            setSelectedLanguages([...selectedLanguages, langCode]);
        }
    };

    // Удаление языка из формы
    const removeLanguage = (langCode: string) => {
        if (selectedLanguages.length > 1) {
            // Не даем удалить последний язык
            setSelectedLanguages(
                selectedLanguages.filter((lang) => lang !== langCode)
            );
            // Также очищаем значение в форме
            const currentTitles = form.getFieldValue("titles") || {};
            delete currentTitles[langCode];
            form.setFieldsValue({ titles: currentTitles });
        } else {
            message.warning("Должен остаться хотя бы один язык");
        }
    };

    // Получаем доступные для добавления языки
    const availableLanguagesToAdd = langs.filter(
        (lang) => !selectedLanguages.includes(lang)
    );

    const locationColumns: ColumnsType<ILocationFront> = [
        { title: "Название", dataIndex: "title", key: "title" },
        { title: "ID", dataIndex: "id", key: "id" },
        {
            title: "Тип локации",
            dataIndex: ["locationType", "title"],
            key: "locationType",
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
        {
            title: "Медиа",
            key: "media",
            render: (_, record) => <Space>{record.media?.length || 0}</Space>,
        },
        {
            title: "Действия",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleEdit(record);
                        }}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
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
                        <Button type="primary" icon={<PlusOutlined />}>
                            Добавить
                        </Button>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={() => fetchAll}
                        />
                    </Space>
                }
                title="Локации"
            >
                <Space>
                    <Search
                        placeholder="Поиск по ID"
                        onSearch={(value) => {
                            if (!value) return fetchAll();
                            fetchById(value);
                        }}
                        allowClear
                        loading={searchLoading}
                        style={{ width: 200 }}
                    />
                    <Select
                        showSearch
                        placeholder="Поиск по названию"
                        onSearch={fetchByTitle}
                        onSelect={(id) => fetchById(id)}
                        filterOption={false}
                        notFoundContent={
                            searchLoading ? <Spin size="small" /> : null
                        }
                        style={{ width: 300 }}
                        options={searchOptions}
                    />
                </Space>

                <Table
                    columns={locationColumns}
                    dataSource={locations}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={{ spinning: loading }}
                />

                <Modal
                    className={styles.adminModal}
                    title={"Редактировать локацию"}
                    open={modalActive}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={700}
                    okText="Сохранить"
                    cancelText="Отмена"
                >
                    <Form
                        form={form}
                        layout="vertical"
                        className={styles.adminForm}
                    >
                        {/* Блок выбора языков */}
                        <div style={{ marginBottom: 16 }}>
                            <label
                                style={{ display: "block", marginBottom: 8 }}
                            >
                                Языки названия:
                            </label>
                            <Space wrap>
                                {selectedLanguages.map((langCode) => {
                                    const langInfo = langs.find(
                                        (l) => l === langCode
                                    );
                                    return (
                                        <Tag
                                            key={langCode}
                                            closable={
                                                selectedLanguages.length > 1
                                            }
                                            onClose={() =>
                                                removeLanguage(langCode)
                                            }
                                            closeIcon={<CloseOutlined />}
                                            color="blue"
                                        >
                                            {langInfo || langCode}
                                        </Tag>
                                    );
                                })}

                                {availableLanguagesToAdd.length > 0 && (
                                    <Select
                                        size="small"
                                        placeholder="Добавить язык"
                                        style={{ width: 150 }}
                                        onChange={addLanguage}
                                        value={null}
                                    >
                                        {availableLanguagesToAdd.map((lang) => (
                                            <Select.Option
                                                key={lang}
                                                value={lang}
                                            >
                                                {lang}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                )}
                            </Space>
                        </div>

                        {/* Динамические поля для названий на разных языках */}
                        {selectedLanguages.map((langCode) => {
                            const langInfo = langs.find((l) => l === langCode);
                            return (
                                <Form.Item
                                    key={langCode}
                                    name={["titles", langCode]}
                                    label={`Название на ${
                                        langInfo || langCode
                                    }`}
                                    rules={[
                                        {
                                            validator: (_, value) => {
                                                // Проверяем, что поле заполнено, если этот язык выбран
                                                if (
                                                    selectedLanguages.includes(
                                                        langCode
                                                    ) &&
                                                    !value?.trim()
                                                ) {
                                                    return Promise.reject(
                                                        new Error(
                                                            `Обязательное поле`
                                                        )
                                                    );
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={`Введите название на ${
                                            langInfo || langCode
                                        }`}
                                    />
                                </Form.Item>
                            );
                        })}

                        <Form.Item
                            name="locationType"
                            label="Тип локации"
                            rules={[
                                {
                                    required: true,
                                    message: "Выберите тип локации",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Выберите тип"
                                options={typesLocationsData}
                            />
                        </Form.Item>

                        <Form.Item
                            name="media"
                            label="Медиа (изображения или видео)"
                            valuePropName="fileList"
                            getValueFromEvent={(e) =>
                                Array.isArray(e) ? e : e?.fileList
                            }
                        >
                            <Upload
                                name="file"
                                listType="picture-card"
                                multiple
                                beforeUpload={() => false}
                            >
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>
                                        Загрузить
                                    </div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </>
    );
};

export default LocationsAdminScreen;
