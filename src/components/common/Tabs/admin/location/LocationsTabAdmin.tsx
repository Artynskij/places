"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ILocationFront, IOption, ISearchItemFront } from "@/lib/models";
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
    Tooltip,
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
import { LanguageManagerBlock } from "@/components/common/Form/_components/LanguageManagerBlock/LanguageManagerBlock";
import { extractActuallyTitleServer } from "@/lib/helpers/extract-title-server";
import { CONSTANT_LANGS_DETAILS } from "@/asset/constants/langs-details";
import { CopyClipboardButton } from "@/components/common/ButtonFunctional/CopyClipboardButton";
import { LocationTypesService } from "@/lib/Api/location-types.api";

const { Search } = Input;
const { Option } = Select;

type TDetails = { lang: TLocale; value: string };
interface LocationFormValues {
    locationType: string;
    media?: UploadFile[];
}

const LocationsTabAdmin: React.FC = () => {
    const { user } = useUser();
    const locale = useLocale();

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalLocations, setTotalLocations] = useState(0);

    const [locations, setLocations] = useState<ILocationFront[]>([]);
    const [locationIdFind, setLocationIdFind] = useState<string | null>("");
    const [editLocation, setEditLocation] = useState<ILocationFront | null>(
        null
    );
    const [typesLocationsData, setTypesLocationsData] = useState<IOption[]>([]);

    const [filterTypeLocationIds, setFilterTypeLocationIds] = useState<
        string[] | null
    >(null);
    const [searchOptions, setSearchOptions] = useState<IOption[]>([]);

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
            locationType: new LocationTypesService(),
            fileUpload: new FileUploadService(),
            dataLoadManager: new DataLoadManagementService(),
            moderation: new ModerationService(),
            search: new SearchService(),
        }),
        []
    );
    const fetchAll = useCallback(async () => {
        setIsLoading(true);

        try {
            const responseLocation = await services.location.getAll({
                pagination: { page: currentPage, pageSize: pageSize },
                locationTypeIds: filterTypeLocationIds,
            });

            if (!responseLocation) {
                setLocations([]);
                return;
            }
            setTotalLocations(responseLocation?.info.total || 0);
            setLocations(responseLocation.locations);
        } catch {
            message.error("Ошибка загрузки локаций");
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, pageSize, filterTypeLocationIds, services]);
    const fetchById = useCallback(
        async (id: string) => {
            setIsLoading(true);
            try {
                const [locationById, locationsInside] = await Promise.all([
                    services.location.getById(id),
                    services.location.getAll({
                        pagination: { page: 1, pageSize: 1000 },
                        locationId: id,
                        locationTypeIds: filterTypeLocationIds,
                    }),
                ]);

                if (!locationById) {
                    throw Error("Локация не найдена");
                }

                const locationsInsideFiltered = (
                    locationsInside?.locations || []
                ).filter((item) => item.id !== locationById.id);
                setLocations([locationById, ...locationsInsideFiltered]);
                setTotalLocations(locationsInside?.info.total || 0);
            } catch {
                message.error("Локация не найдена");
            } finally {
                setIsLoading(false);
            }
        },
        [services, filterTypeLocationIds]
    );
    const handleRefresh = useCallback(async () => {
        if (locationIdFind) {
            await fetchById(locationIdFind);
        } else {
            await fetchAll();
        }

        message.info("Обновлено");
    }, [fetchAll, locationIdFind, fetchById]);
    const initializeData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [typesData] = await Promise.all([
                services.locationType.getAll(),
                // handleRefresh,
            ]);

            if (typesData) {
                const transformData = typesData.map((item) => ({
                    label: item.type.Name,
                    value: item.type.Id,
                    id: item.type.Id,
                }));
                setTypesLocationsData(transformData);
            }
        } catch {
            message.error("Ошибка загрузки данных");
        } finally {
            setIsLoading(false);
        }
    }, [services]);
    useEffect(() => {
        initializeData();
    }, [initializeData]);
    // обновление
    useEffect(() => {
        handleRefresh();
    }, [
        currentPage,
        pageSize,
        filterTypeLocationIds,
        handleRefresh,
        locationIdFind,
    ]);

    // редактирование
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
    }, [editLocation, isModalActive, form]);

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
    const handleChangeTypLocation = async (
        idLocation: string,
        idType: string
    ) => {
        if (!user) {
            return;
        }
        setIsLoading(true);
        const moderationObject = await services.moderation.getModerationData(
            user.id
        );

        if (!moderationObject) {
            message.error("Ошибка с получением токенов модерации");
            setIsLoading(false);
            return;
        }
        const resUpdate = await services.location.update(idLocation, {
            moderation: moderationObject,
            data: { source: { LocationType: idType } },
        });
        if (resUpdate) {
            message.success("Статус обновлен");
        } else {
            message.success("Ошибка при обновлении статуса");
        }
        setIsLoading(false);
        handleRefresh();
    };

    // Обработчик изменения страницы
    const handlePageChange = (page: number, newPageSize?: number) => {
        setCurrentPage(page);
        if (newPageSize && newPageSize !== pageSize) {
            setPageSize(newPageSize);
        }
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
                    handleRefresh();
                    handleModalClose();
                } else {
                    message.error("Ошибка при обновлении локации");
                }
            } else {
                // TODO: Реализовать создание новой локации
                message.info("Пока не возможно");
                handleRefresh();
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
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (id: ILocationFront["id"]) => {
                return <CopyClipboardButton text={id} />;
            },
        },
        { title: "Название", dataIndex: "title", key: "title" },
        {
            title: "Страна",
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

        {
            title: "Тип локации",
            dataIndex: ["locationType"],
            key: "locationType",
            render: (locationType: ILocationFront["locationType"], record) => {
                return (
                    <Tooltip title={"Изменить статус"}>
                        <Select
                            size="small"
                            style={{ width: 140 }}
                            defaultValue={locationType?.id}
                            onChange={(selectedValue) => {
                                handleChangeTypLocation(
                                    record.id,
                                    selectedValue
                                );
                            }}
                            placeholder="Изменить статус"
                        >
                            {typesLocationsData.map((option) => (
                                <Option key={option.id} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </Tooltip>
                );
            },
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
                                initializeData();
                                handleRefresh();
                            }}
                            loading={isLoading}
                        />
                    </Space>
                }
                title={`Локации - ${totalLocations}`}
            >
                <Space style={{ marginBottom: 16 }}>
                    <Search
                        placeholder="Поиск по ID"
                        onSearch={(value) => {
                            setLocationIdFind(!!value ? value : null);
                        }}
                        allowClear
                        loading={isLoading}
                        style={{ width: 200 }}
                    />
                    <Select
                        showSearch
                        placeholder="Поиск по названию"
                        onSearch={findSearchLocationByTitle}
                        onSelect={(id) => setLocationIdFind(id)}
                        filterOption={false}
                        notFoundContent={null}
                        style={{ width: 300 }}
                        options={searchOptions}
                        onClear={() => {
                            setLocationIdFind(null);
                        }}
                        allowClear
                    />
                    <Select
                        mode="multiple"
                        showSearch
                        placeholder="Фильтрация по типу"
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        style={{ width: 200 }}
                        onChange={(ids) => {
                            setFilterTypeLocationIds(!!ids ? ids : null);
                        }}
                        options={typesLocationsData}
                        allowClear
                        onClear={() => {
                            setFilterTypeLocationIds(null);
                        }}
                    />
                </Space>

                <Table
                    columns={locationColumns}
                    dataSource={locations}
                    rowKey="id"
                    pagination={{
                        total: totalLocations,
                        pageSize: pageSize,
                        onChange: handlePageChange,
                    }}
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
                onOk={handleSubmit}
            >
                <Form form={form} layout="vertical">
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
