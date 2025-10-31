"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
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
import type { UploadFile } from "antd/es/upload/interface";
import { LanguageManagerBlock } from "@/components/common/Form/_components/LangugageManagerBlock/LangugageManagerBlock";
import { locales } from "@/config";
import { extractActuallyTitleServer } from "@/lib/helpers/extract-title-server";
import { CONSTANT_LANGS_DETAILS } from "@/asset/constants/langs-details";

const { Search } = Input;
type TOption = { label: string; value: string };
type TDetails = { lang: TLocale; value: string };
interface LocationFormValues {
    locationType: string;
    media?: UploadFile[];
}

const LocationsTabAdmin: React.FC = () => {
    const { user } = useUser();
    const locale = useLocale();

    const [locations, setLocations] = useState<ILocationFront[]>([]);
    const [editLocation, setEditLocation] = useState<ILocationFront | null>(
        null
    );
    const [typesLocationsData, setTypesLocationsData] = useState<TOption[]>([]);
    const [searchOptions, setSearchOptions] = useState<TOption[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [languageDetails, setLanguageDetails] = useState<TDetails[]>(
        CONSTANT_LANGS_DETAILS
    );
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [form] = Form.useForm<LocationFormValues>();
    const services = useMemo(
        () => ({
            location: new LocationService(),
            search: new SearchService(),
            fileUpload: new FileUploadService(),
            dataLoadManager: new DataLoadManagementService(),
            moderation: new ModerationService(),
        }),
        []
    );

    const initializeData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [typesData, locationsData] = await Promise.all([
                services.dataLoadManager.getTypesLocation(),
                services.location.getAll({
                    pagination: { page: 1, pageSize: 1000 },
                }),
            ]);

            if (typesData) {
                const transformData = typesData.map((item) => ({
                    label: item.type.Name,
                    value: item.type.Id,
                }));
                setTypesLocationsData(transformData);
            }

            setLocations(locationsData?.locations || []);
        } catch {
            message.error("Ошибка загрузки данных");
        } finally {
            setIsLoading(false);
        }
    }, [services]);
    useEffect(() => {
        initializeData();
    }, [initializeData]);

    useEffect(() => {
        if (editLocation && isModalActive) {
            const details =
                editLocation.content?.details?.map((detail) => ({
                    lang: detail.lang as TLocale,
                    value: detail.value || "",
                })) || CONSTANT_LANGS_DETAILS;

            setLanguageDetails(details);

            form.setFieldsValue({
                locationType: editLocation.locationType?.id,
                media: editLocation.media?.map((media, idx) => ({
                    uid: String(idx),
                    name: media.title || `file-${idx}`,
                    status: "done",
                    url: media.src,
                })),
            });
        } else if (isModalActive) {
            form.resetFields();
            setLanguageDetails(CONSTANT_LANGS_DETAILS);
        }
    }, [editLocation, isModalActive, form, CONSTANT_LANGS_DETAILS]);

    const fetchAll = async (idType?: string) => {
        setIsLoading(true);
        try {
            const data = await services.location.getAll({
                pagination: { page: 1, pageSize: 1000 },
            });

            if (!data) {
                setLocations([]);
                return;
            }

            const filteredData = idType
                ? data.locations.filter(
                      (item) => item.locationType?.id === idType
                  )
                : data.locations;
            setLocations(filteredData);
        } catch {
            message.error("Ошибка загрузки локаций");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchById = async (id: string) => {
        setIsLoading(true);
        try {
            const [locationById, locationsInside] = await Promise.all([
                services.location.getById(id),
                services.location.getAll({
                    pagination: { page: 1, pageSize: 1000 },
                    locationId: id,
                }),
            ]);

            if (!locationById) {
                throw Error("Локация не найдена");
            }

            const locationsInsideFiltered = (
                locationsInside?.locations || []
            ).filter((item) => item.id !== locationById.id);
            setLocations([locationById, ...locationsInsideFiltered]);
        } catch {
            message.error("Локация не найдена");
        } finally {
            setIsLoading(false);
        }
    };

    const findSearchLocationByTitle = async (title: string) => {
        if (!title.trim()) {
            setSearchOptions([]);
            return;
        }

        try {
            const responseSearch = await services.search.querySearch({
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
            setSearchOptions([]);
        }
    };

    const handleEdit = (record: ILocationFront) => {
        setEditLocation(record);
        setIsModalActive(true);
    };

    const handleDelete = (id: string) => {
        message.error("Пока невозможно удалить");
    };

    const handleModalClose = () => {
        setIsModalActive(false);
        setEditLocation(null);
        form.resetFields();
        setLanguageDetails(CONSTANT_LANGS_DETAILS);
    };

    const handleLanguageDetailsChange = (
        details: { lang: TLocale; value: string }[]
    ) => {
        setLanguageDetails(details);
    };

    const handleSubmit = async () => {
        if (!user) {
            message.error("Нет пользователя");
            return;
        }

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
            if (!editLocation) {
                message.error("пока не создаем локацию");
                return;
            }
            const moderationObject =
                await services.moderation.getModerationData(user.id);

            if (!moderationObject) {
                message.error("Ошибка с получением токенов модерации");
                return;
            }

            const files = values.media
                ? await services.fileUpload.uploadPublicFileOfAntdFiles({
                      vendorId: editLocation?.id || "temp",
                      files: values.media,
                  })
                : [];

            if (editLocation) {
                const updatedLocation = await services.location.update(
                    editLocation.id,
                    {
                        moderation: moderationObject,
                        data: {
                            source: {
                                LocationType: values.locationType,
                            },
                            content: {
                                details: languageDetails.filter((item) =>
                                    item.value.trim()
                                ), // только заполненные
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
            message.error("Произошла ошибка при сохранении");
        } finally {
            setIsModalLoading(false);
        }
    };

    const locationColumns: ColumnsType<ILocationFront> = [
        { title: "Название", dataIndex: "title", key: "title" },
        {
            title: "Название",
            dataIndex: "country",
            key: "title",
            render: (country: ILocationFront["country"]) => (
                <Space>
                    {country?.content?.details && (
                        <Tag color="default">
                            {extractActuallyTitleServer(
                                country?.content?.details
                            )}
                        </Tag>
                    )}
                </Space>
            ),
        },
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
            title: "Объектов",
            key: "establishmentCount",
            render: (_, record) => (
                <Space>
                    <Tag color="blue">{record.establishmentCount || 0}</Tag>
                </Space>
            ),
        },
        {
            title: "Медиа",
            key: "media",
            render: (media) => (
                <Space>
                    <Tag color="blue">{media?.length || 0}</Tag>
                </Space>
            ),
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
                            onClick={() => setIsModalActive(true)}
                        >
                            Добавить локацию
                        </Button>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={() => {
                                message.info("обновлено");
                                fetchAll();
                            }}
                            loading={isLoading}
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
                        loading={isLoading}
                        style={{ width: 200 }}
                    />
                    <Select
                        showSearch
                        placeholder="Поиск по названию"
                        onSearch={findSearchLocationByTitle}
                        onSelect={(id) => fetchById(id)}
                        filterOption={false}
                        notFoundContent={null}
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
                        onClear={() => fetchAll()}
                    />
                </Space>

                <Table
                    columns={locationColumns}
                    dataSource={locations}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={isLoading}
                />
            </Card>

            <Modal
                title={
                    editLocation ? "Редактировать локацию" : "Создать локацию"
                }
                open={isModalActive}
                onCancel={handleModalClose}
                width={700}
                okText={editLocation ? "Сохранить" : "Создать"}
                cancelText="Отмена"
                confirmLoading={isModalLoading}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <LanguageManagerBlock
                        value={languageDetails}
                        onChange={handleLanguageDetailsChange}
                        required={true}
                    />

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
