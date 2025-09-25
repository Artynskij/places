"use client";
import styles from "../../admin.module.scss";
import { useState, useEffect } from "react";
import {
    IEstablishmentFront,
    IMediaFront,
    IPaginationEstablishmentRequest,
    ISearchItemFront,
} from "@/lib/models";
import {
    Button,
    Card,
    Space,
    Table,
    Spin,
    message,
    Select,
    Input,
    Form,
    Modal,
    Upload,
} from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { EstablishmentService } from "@/lib/Api/(Establishment)/establishment/establishment.service";

import { LocationService } from "@/lib/Api/location/location.service";
import { SearchService } from "@/lib/Api/search/search.service";
import { FileUploadService } from "@/lib/Api/fileUpload/fileUploads.service";
import { useLocale } from "next-intl";

const { Search } = Input;
import type { UploadFile } from "antd/es/upload/interface";

interface LocationFormValues {
    title_ru: string;
    title_en: string;
    description_ru: string;
    description_en: string;
    category: string;
    media?: UploadFile[];
}

interface Props {
    // openModal: (type: "establishment", item?: IEstablishmentFront) => void;
}

const EstablishmentTabAdmin: React.FC<Props> = ({}) => {
    const locale = useLocale();

    const [form] = Form.useForm<LocationFormValues>();
    const [establishments, setEstablishments] = useState<IEstablishmentFront[]>(
        []
    );
    const [editEstablishment, setEditEstablishment] =
        useState<IEstablishmentFront | null>(null);

    const [modalActive, setModalActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    // const [currentPage, setCurrentPage] = useState(1);
    const [searchLocationsOptions, setSearchLocationsOptions] = useState<
        { label: string; value: string }[]
    >([]);
    const [searchLocationId, setSearchLocationId] = useState<string>();

    const establishmentService = new EstablishmentService();
    const locationService = new LocationService();
    const searchService = new SearchService();
    const fileUploadService = new FileUploadService();
    useEffect(() => {
        fetchAll(1);
    }, [searchLocationId]);
    const fetchAll = async (currentPage: number) => {
        setLoading(true);
        const bodyPagination: IPaginationEstablishmentRequest = {
            lang: locale,
            pagination: { page: currentPage, pageSize: 10 },
            filter: {
                locationId: searchLocationId,
            },
        };
        try {
            const data = await establishmentService.getByPagination(
                bodyPagination
            );
            setEstablishments(data || []);
        } catch {
            message.error("Ошибка загрузки локаций");
        } finally {
            setLoading(false);
        }
    };
    const fetchById = async (id: string) => {
        setLoading(true);

        try {
            const data = await establishmentService.getById(id, locale);
            setEstablishments(data ? [data] : []);
        } catch {
            message.error("Ошибка загрузки локаций");
        } finally {
            setLoading(false);
        }
    };

    const fetchLocationsByName = async (title: string) => {
        setSearchLoading(true);
        try {
            const responseSearch = await searchService.querySearch({
                term: title,
                indexKey: "TO_GO",
                localLang: locale,
            });
            const data = responseSearch?.searchItems;
            if (data && Array.isArray(data)) {
                setSearchLocationsOptions(
                    data.map((item: ISearchItemFront) => ({
                        label: item.title, // показываем название
                        value: item.id, // но сохраняем id
                    }))
                );
            } else {
                setSearchLocationsOptions([]);
            }
        } catch {
            message.error("Ошибка поиска");
        } finally {
            setSearchLoading(false);
        }
    };
    const handleCancel = () => {
        setModalActive(false);
        setEditEstablishment(null);
    };
    const handleOk = async () => {
        if (!editEstablishment) return;
        const values = await form.validateFields();

        const files = values.media
            ? await fileUploadService.uploadPublicFileOfAntdFiles({
                  vendorId: editEstablishment.id,
                  files: values.media,
              })
            : [];
        const updatedLocation = await locationService.update(
            editEstablishment?.id,
            {
                source: {},
                content: {
                    details: [
                        { lang: "ru", value: values.title_ru },
                        { lang: "en", value: values.title_en },
                    ],
                    media: { gallery: files },
                },
            }
        );
        if (updatedLocation) {
            message.success("Обновлена локация");
            console.log(updatedLocation);
        } else {
            message.error("Ошибка при обновлении локация");
        }
        // const newItem = editLocation
        //     ? { ...editLocation, ...values }
        //     : { id: Date.now().toString(), ...values };
        handleCancel();
        // form.resetFields();
    };
    const handleEdit = (record: IEstablishmentFront) => {
        setEditEstablishment(record);
        setModalActive(true);
        console.log(record);
        form.setFieldsValue({
            title_ru: record.content?.value.find((i) => i.lang === "ru")?.value
                .details.title,
            title_en: record.content?.value.find((i) => i.lang === "en")?.value
                .details.title,
            description_ru: record.content?.value.find((i) => i.lang === "en")
                ?.value.details.description,
            description_en: record.content?.value.find((i) => i.lang === "en")
                ?.value.details.description,
            // locationType: record.locationType?.title,
            media: record.media.gallery?.map((media, idx) => ({
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

    const columns: ColumnsType<IEstablishmentFront> = [
        { title: "Название", dataIndex: "title", key: "title" },
        {
            title: "Тип",
            dataIndex: "typeEstablishment",
            key: "typeEstablishment",
        },
        {
            title: "id",
            dataIndex: ["id"],
            key: "id",
        },
        {
            title: "Категория",
            dataIndex: ["category", "value"],
            key: "category",
        },
        {
            title: "Город",
            dataIndex: ["location", "town", "title"],
            key: "town",
        },
        {
            title: "медиа",
            dataIndex: ["media", "gallery"],
            key: "rating",
            render: (media: IMediaFront[]) => (media ? media.length : 0),
        },
        {
            title: "Рейтинг",
            dataIndex: ["rates", "main"],
            key: "rating",
            render: (rating: number) =>
                rating ? rating.toFixed(1) : "Нет оценок",
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
        <Card
            title="Заведения"
            extra={
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    // onClick={() => openModal("location")}
                >
                    Добавить
                </Button>
            }
        >
            <Space>
                <Search
                    placeholder="Поиск по ID"
                    onSearch={(value) => {
                        if (!value) return fetchAll(1);
                        fetchById(value);
                    }}
                    allowClear
                    loading={searchLoading}
                    style={{ width: 200 }}
                />
                <Select
                    showSearch
                    placeholder="Поиск по локации"
                    onSearch={fetchLocationsByName} // подгружаем варианты при вводе
                    onSelect={(id) => {
                        setSearchLocationId(id);
                    }} // при выборе варианта — грузим по ID
                    filterOption={false} // отключаем локальный фильтр, чтобы использовать API
                    notFoundContent={
                        searchLoading ? <Spin size="small" /> : null
                    }
                    style={{ width: 300 }}
                    options={searchLocationsOptions}
                />
            </Space>
            <Table
                columns={columns}
                dataSource={establishments}
                rowKey="id"
                pagination={{
                    pageSize: 10,
                    total:
                        establishments[0]?.location.info.totalEstablishment ||
                        0,
                    onChange: (page) => fetchAll(page),
                }}
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
                    // initialValues={{
                    //     locationType: editEstablishment?.locationType?.title,
                    // }}
                >
                    {editEstablishment?.content && (
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
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={`description_ru`}
                                label={`Описание ru`}
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                // key={item._id}
                                name={`description_en`}
                                label={`Описание en`}
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </>
                    )}

                    {/* <Form.Item
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
                            options={Object.values(
                                CONSTANT_TYPE_LOCATION_DB
                            ).map((value) => ({
                                label: value,
                                value,
                            }))}
                        />
                    </Form.Item> */}
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
                                <div style={{ marginTop: 8 }}>Загрузить</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default EstablishmentTabAdmin;
