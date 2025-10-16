"use client";
import { useState, useEffect } from "react";
import { ILocationFront, ISearchItemFront } from "@/lib/models";
import {
    Button,
    Card,
    Space,
    Table,
    Spin,
    message,
    Input,
    Select,
    Modal,
    Form,
    Upload,
    Tag,
} from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ReloadOutlined,
    UploadOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { LocationService } from "@/lib/Api/location/location.service";
import { SearchService } from "@/lib/Api/search/search.service";
import { FileUploadService } from "@/lib/Api/fileUpload/fileUploads.service";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { ModerationService } from "@/lib/Api/moderation/moderation.service";
import { useUser } from "@/lib/context/UserContext/UserContext";
import useLocale from "@/lib/hooks/useLocale";
import { TLocale } from "@/lib/models/types";
import { locales } from "@/config";
import type { UploadFile } from "antd/es/upload/interface";

const { Search } = Input;

interface LocationFormValues {
    titles: { [lang: string]: string };
    locationType: string;
    media?: UploadFile[];
}

const LocationsTabAdmin: React.FC = () => {
    const { user } = useUser();
    const locale = useLocale();
    const langs = locales;

    const [locations, setLocations] = useState<ILocationFront[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchOptions, setSearchOptions] = useState<
        { label: string; value: string }[]
    >([]);
    const [modalActive, setModalActive] = useState(false);
    const [editLocation, setEditLocation] = useState<ILocationFront | null>(
        null
    );
    const [selectedLanguages, setSelectedLanguages] = useState<TLocale[]>([
        "ru",
        "en",
    ]);
    const [typesLocationsData, setTypesLocationsData] = useState<
        { label: string; value: string }[]
    >([]);
    const [selectedTypeLocation, setSelectedLocation] = useState<string | null>(
        null
    );
    const [form] = Form.useForm<LocationFormValues>();
    const [modalLoading, setModalLoading] = useState(false);

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

    useEffect(() => {
        if (editLocation && modalActive) {
            const existingLanguages = editLocation.content?.details?.map(
                (detail) => detail.lang
            ) || ["ru", "en"];
            setSelectedLanguages(existingLanguages);

            const titles =
                editLocation.content?.details?.reduce((acc, detail) => {
                    acc[detail.lang] = detail.value || "UNDEFINED";
                    return acc;
                }, {} as { [key: string]: string }) || {};

            form.setFieldsValue({
                titles: titles,
                locationType: editLocation.locationType?.id,
                media: editLocation.media?.map((media, idx) => ({
                    uid: String(idx),
                    name: media.title || `file-${idx}`,
                    status: "done",
                    url: media.src,
                })),
            });
        } else if (modalActive) {
            form.resetFields();
            setSelectedLanguages(["ru", "en"]);
        }
    }, [editLocation, modalActive, form]);

    const fetchAll = async (idType?: string) => {
        setLoading(true);
        try {
            const data = await locationService.getAll({
                pagination: { page: 1, pageSize: 1000 },
            });
            if (!data) {
                setLocations([]);
                return;
            }
            const filteredData = idType
                ? data.filter((item) => item.locationType?.id === idType)
                : data;
            setLocations(filteredData);
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
    // const filterLocationByType = (id?: string) => {
    //     if (id) {
    //         // setLocations((prev) =>
    //         //     prev.filter((item) => item.locationType?.id === id)
    //         // );
    //         setSelectedLocation(id);
    //         fetchAll();
    //     } else {
    //         fetchAll();
    //     }
    // };
    const findSearchLocationByTitle = async (title: string) => {
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

    const handleEdit = (record: ILocationFront) => {
        setEditLocation(record);
        setModalActive(true);
    };

    const handleDelete = (id: string) => {
        message.error("Пока невозможно удалить");
    };

    const handleModalClose = () => {
        setModalActive(false);
        setEditLocation(null);
        form.resetFields();
    };

    const handleModalOk = async () => {
        if (!user) {
            message.error("Нету пользователя");
            return;
        }

        try {
            const values = await form.validateFields();
            setModalLoading(true);

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
                message.error("Ошибка с получением токенов модерации");
                return;
            }

            const files = values.media
                ? await fileUploadService.uploadPublicFileOfAntdFiles({
                      vendorId: editLocation?.id || "temp",
                      files: values.media,
                  })
                : [];

            const details = selectedLanguages
                .filter((lang) => values.titles?.[lang]?.trim())
                .map((lang) => ({
                    lang: lang,
                    value: values.titles[lang].trim(),
                }));

            if (editLocation) {
                const updatedLocation = await locationService.update(
                    editLocation.id,
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
                    message.success("Локация обновлена");
                    fetchAll();
                    handleModalClose();
                } else {
                    message.error("Ошибка при обновлении локации");
                }
            } else {
                // TODO: Реализовать создание новой локации
                message.success("Локация создана");
                fetchAll();
                handleModalClose();
            }
        } catch (error) {
            console.error("Ошибка:", error);
        } finally {
            setModalLoading(false);
        }
    };

    const addLanguage = (langCode: TLocale) => {
        if (!selectedLanguages.includes(langCode)) {
            setSelectedLanguages([...selectedLanguages, langCode]);
        }
    };

    const removeLanguage = (langCode: string) => {
        if (selectedLanguages.length > 1) {
            setSelectedLanguages(
                selectedLanguages.filter((lang) => lang !== langCode)
            );
            const currentTitles = form.getFieldValue("titles") || {};
            delete currentTitles[langCode];
            form.setFieldsValue({ titles: currentTitles });
        } else {
            message.warning("Должен остаться хотя бы один язык");
        }
    };

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
                        onClick={() => handleEdit(record)}
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
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setModalActive(true)}
                        >
                            Добавить
                        </Button>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={() => fetchAll()}
                        />
                    </Space>
                }
                title="Управление локациями"
            >
                <Space style={{ marginBottom: 16 }}>
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
                        onSearch={findSearchLocationByTitle}
                        onSelect={(id) => fetchById(id)}
                        filterOption={false}
                        notFoundContent={
                            searchLoading ? <Spin size="small" /> : null
                        }
                        style={{ width: 300 }}
                        options={searchOptions}
                    />
                    <Select
                        showSearch
                        placeholder="Фильтрация по типу"
                        onSelect={(id) => fetchAll(id)}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        style={{ width: 200 }}
                        options={typesLocationsData}
                        allowClear
                        onClear={() => fetchAll()} // Очистка фильтра
                    />
                </Space>

                <Table
                    columns={locationColumns}
                    dataSource={locations}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={{ spinning: loading }}
                />
            </Card>

            <Modal
                title={
                    editLocation ? "Редактировать локацию" : "Создать локацию"
                }
                open={modalActive}
                onOk={handleModalOk}
                onCancel={handleModalClose}
                width={700}
                okText={editLocation ? "Сохранить" : "Создать"}
                cancelText="Отмена"
                confirmLoading={modalLoading}
            >
                <Form form={form} layout="vertical">
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", marginBottom: 8 }}>
                            Языки названия:
                        </label>
                        <Space wrap>
                            {selectedLanguages.map((langCode) => (
                                <Tag
                                    key={langCode}
                                    closable={selectedLanguages.length > 1}
                                    onClose={() => removeLanguage(langCode)}
                                    closeIcon={<CloseOutlined />}
                                    color="blue"
                                >
                                    {langCode.toUpperCase()}
                                </Tag>
                            ))}

                            {availableLanguagesToAdd.length > 0 && (
                                <Select
                                    size="small"
                                    placeholder="Добавить язык"
                                    style={{ width: 150 }}
                                    onChange={addLanguage}
                                    value={null}
                                >
                                    {availableLanguagesToAdd.map((lang) => (
                                        <Select.Option key={lang} value={lang}>
                                            {lang.toUpperCase()}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Space>
                    </div>

                    {selectedLanguages.map((langCode) => (
                        <Form.Item
                            key={langCode}
                            name={["titles", langCode]}
                            label={`Название на ${langCode.toUpperCase()}`}
                            rules={[
                                {
                                    validator: (_, value) => {
                                        if (
                                            selectedLanguages.includes(
                                                langCode
                                            ) &&
                                            !value?.trim()
                                        ) {
                                            return Promise.reject(
                                                new Error("Обязательное поле")
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Input
                                placeholder={`Введите название на ${langCode}`}
                            />
                        </Form.Item>
                    ))}

                    <Form.Item
                        name="locationType"
                        label="Тип локации"
                        rules={[
                            { required: true, message: "Выберите тип локации" },
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
                                <div style={{ marginTop: 8 }}>Загрузить</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default LocationsTabAdmin;
