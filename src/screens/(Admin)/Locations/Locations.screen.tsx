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
} from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { LocationService } from "@/lib/Api/location/location.service";
import { useLocale } from "next-intl";

import { SearchService } from "@/lib/Api/search/search.service";
import { FileUploadService } from "@/lib/Api/fileUpload/fileUploads.service";

const { Search } = Input;
import type { UploadFile } from "antd/es/upload/interface";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
interface LocationFormValues {
    title_ru: string;
    title_en: string;
    locationType: string;
    media?: UploadFile[];
}
interface Props {}

const LocationsAdminScreen: React.FC<Props> = () => {
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
    const [form] = Form.useForm<LocationFormValues>();

    const locationService = new LocationService();
    const searchService = new SearchService();
    const fileUploadService = new FileUploadService();
    const dataLoadManagerService = new DataLoadManagementService();

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
                // lang: locale,
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
            const locationById = await locationService.getById(id); // ❗️ должна быть функция в сервисе
            if (!locationById) {
                throw Error("не найдена локация");
            }
            const locationsInside = await locationService.getAll({
                pagination: { page: 1, pageSize: 1000 },
                // lang: locale,
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
                        label: item.title, // показываем название
                        value: item.id, // но сохраняем id
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
    };
    const handleOk = async () => {
        if (!editLocation) return;
        const values = await form.validateFields();

        const files = values.media
            ? await fileUploadService.uploadPublicFileOfAntdFiles(
                  editLocation.id,
                  values.media
              )
            : [];

        const updatedLocation = await locationService.update(editLocation?.id, {
            source: {
                LocationType: values.locationType,
            },
            content: {
                details: [
                    { lang: "ru", value: values.title_ru },
                    { lang: "en", value: values.title_en },
                ],
                media: { gallery: files },
            },
        });
        if (updatedLocation) {
            message.success("Обновлена локация");
            console.log(updatedLocation);
        } else {
            message.error("Ошибка при обновлении локация");
        }
        handleCancel();

        // const newItem = editLocation
        //     ? { ...editLocation, ...values }
        //     : { id: Date.now().toString(), ...values };
        // form.resetFields();
    };
    const handleEdit = (record: ILocationFront) => {
        setEditLocation(record);
        setModalActive(true);
        form.setFieldsValue({
            title_ru: record.content?.details.find((i) => i.lang === "ru")
                ?.value,
            title_en: record.content?.details.find((i) => i.lang === "en")
                ?.value,
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
        // setLocations((prev) => prev.filter((l) => l.id !== id));
        message.error("Пока невозможно удалить");
    };

    const locationColumns: ColumnsType<ILocationFront> = [
        { title: "Название", dataIndex: "title", key: "title" },
        { title: "ID", dataIndex: "id", key: "id" },
        {
            title: "Тип локации",
            dataIndex: ["locationType", "title"],
            key: "locationType",
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
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        // onClick={() => openModal("location")}
                    >
                        Добавить
                    </Button>
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
                        onSearch={fetchByTitle} // подгружаем варианты при вводе
                        onSelect={(id) => fetchById(id)} // при выборе варианта — грузим по ID
                        filterOption={false} // отключаем локальный фильтр, чтобы использовать API
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
                    title={"Редактировать"}
                    open={modalActive}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={600}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        className={styles.adminForm}
                        initialValues={{
                            locationType: editLocation?.locationType?.title,
                        }}
                    >
                        {editLocation?.content && (
                            <>
                                <Form.Item
                                    name={`title_ru`}
                                    label={`Название ru`}
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    // key={item._id}
                                    name={`title_en`}
                                    label={`Название en`}
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </>
                        )}

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
                            {/* <Select
                                placeholder="Выберите тип"
                                options={Object.values(
                                    CONSTANT_TYPE_LOCATION_DB
                                ).map((value) => ({
                                    label: value,
                                    value,
                                }))}
                            /> */}
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
                                beforeUpload={() => false} // чтобы не грузить сразу, а только при сабмите
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
