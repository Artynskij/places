"use client";
import styles from "../admin.module.scss";
import { useState, useEffect, useMemo } from "react";
import {
    IEstablishmentFront,
    ILocationFront,
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
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { EstablishmentService } from "@/lib/Api/(Establishment)/establishment/establishment.service";
import type { UploadFile } from "antd/es/upload/interface";

import { FormCreateEstablishment } from "@/components/common/Form/Establishment/FormCreateEstablishment";
import { FormUpdateEstablishment } from "@/components/common/Form/Establishment/FormUpdateEstablishment";

import { SearchService } from "@/lib/Api/search/search.service";

import { useLocale, useTranslations } from "next-intl";
import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { sortSelectFilter } from "@/asset/constants/selectData";
import { TTypeSortEstablishmentServer } from "@/lib/models/types";
import { LocationService } from "@/lib/Api/location/location.service";

const { Search } = Input;

interface LocationFormValues {
    title_ru: string;
    title_en: string;
    description_ru: string;
    description_en: string;
    category: string;
    media?: UploadFile[];
}
interface TypeOptionSelect {
    label: string;
    value: string;
}
interface Props {
    // openModal: (type: "establishment", item?: IEstablishmentFront) => void;
}

const EstablishmentsAdminScreen: React.FC<Props> = ({}) => {
    const locale = useLocale();

    const [form] = Form.useForm<LocationFormValues>();
    const [countriesOfEstablishments, setCountriesOfEstablishments] =
        useState<{ title: string; id: string }[]>();
    const [establishments, setEstablishments] = useState<IEstablishmentFront[]>(
        []
    );

    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    const [locationsOptions, setLocationsOptions] = useState<
        TypeOptionSelect[]
    >([]);
    const [searchLocationId, setSearchLocationId] = useState<string>();

    const [typeEstablishment, setTypeEstablishment] = useState<string>();
    const [categoryOptions, setCategoryOption] = useState<TypeOptionSelect[]>(
        []
    );
    const [categoryEstablishment, setCategoryEstablishment] =
        useState<string[]>();
    const typeOptions: TypeOptionSelect[] = Object.values(
        CONSTANT_TYPES_OF_ESTABLISHMENT
    ).map((item) => ({
        label: item.title,
        value: item.id,
    }));

    const sortOptions: TypeOptionSelect[] = sortSelectFilter.map((item) => ({
        label: item.name,
        value: item.value,
    }));
    const [sortEstablishment, setSortEstablishment] =
        useState<TTypeSortEstablishmentServer>();

    const establishmentService = new EstablishmentService();
    const locationService = new LocationService();
    const dataLoadManagerService = new DataLoadManagementService();
    const searchService = new SearchService();

    useEffect(() => {
        fetchAll(1);
    }, [
        searchLocationId,
        typeEstablishment,
        categoryEstablishment,
        sortEstablishment,
    ]);
    useEffect(() => {
        dataLoadManagerService
            .getCategories(locale, typeEstablishment || null)
            .then((res) => {
                if (res) {
                    setCategoryOption(
                        res.map((cat) => ({ label: cat.value, value: cat.id }))
                    );
                }
            });
    }, [typeEstablishment]);
    const fetchAll = async (currentPage: number) => {
        setLoading(true);
        const bodyPagination: IPaginationEstablishmentRequest = {
            lang: locale,
            pagination: { page: currentPage, pageSize: 10 },
            filter: {
                locationId: searchLocationId,
                categoryIds: categoryEstablishment,
                typeIds: typeEstablishment ? [typeEstablishment] : undefined,
            },
            sort: { avgRate: sortEstablishment || "NONE" },
        };

        try {
            const data = await establishmentService.getByPagination(
                bodyPagination
            );
            if (!data) {
                message.error("Ошибка загрузки заведений");
                return;
            }
            const idsLocationsCountry = data
                .map((est) => {
                    return est.location.country.id;
                })
                .join(".");

            const dataCountries = await locationService.getBreadcrumbData({
                ids: idsLocationsCountry,
                lang: locale,
            });

            if (dataCountries) {
                const optionsCountries = dataCountries.map((item) => ({
                    title: item.title,
                    id: item.id,
                }));
                setCountriesOfEstablishments(optionsCountries);
            }
            setEstablishments(data || []);
        } catch {
            message.error("Ошибка загрузки заведений");
        } finally {
            setLoading(false);
        }
    };
    const countriesMap = useMemo(() => {
        const map: Record<string, string> = {};
        countriesOfEstablishments?.forEach((c) => {
            map[c.id] = c.title;
        });
        return map;
    }, [countriesOfEstablishments]);
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
                setLocationsOptions(
                    data.map((item: ISearchItemFront) => ({
                        label: item.title, // показываем название
                        value: item.id, // но сохраняем id
                    }))
                );
            } else {
                setLocationsOptions([]);
            }
        } catch {
            message.error("Ошибка поиска");
        } finally {
            setSearchLoading(false);
        }
    };

    const handleDelete = (id: string) => {
        // setLocations((prev) => prev.filter((l) => l.id !== id));
        message.error("Пока невозможно удалить");
    };
    CONSTANT_TYPES_OF_ESTABLISHMENT;
    const columns: ColumnsType<IEstablishmentFront> = [
        { title: "Название", dataIndex: "title", key: "title" },
        {
            title: "Тип",
            dataIndex: "typeEstablishment",
            key: "typeEstablishment",
            render: (type: keyof typeof CONSTANT_TYPES_OF_ESTABLISHMENT) =>
                CONSTANT_TYPES_OF_ESTABLISHMENT[type]?.title || type,
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
            title: "Страна",
            dataIndex: ["location", "country", "id"],
            key: "country",
            render: (idCountry: string) =>
                countriesMap[idCountry] || "не найдена страна",
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
                    {
                        <FormUpdateEstablishment establishment={record}>
                            <Button icon={<EditOutlined />} />
                        </FormUpdateEstablishment>
                    }

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
            title={`Заведения ${
                establishments?.[0]?.location.info.totalEstablishment || ""
            }`}
            extra={
                <FormCreateEstablishment>
                    <Button type="primary" icon={<PlusOutlined />}>
                        Добавить
                    </Button>
                </FormCreateEstablishment>
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
                    options={locationsOptions}
                />
                <Select
                    placeholder="Выберите тип объекта"
                    style={{ width: 200 }}
                    allowClear
                    options={typeOptions}
                    value={typeEstablishment}
                    onChange={(value) => {
                        setTypeEstablishment(value);
                        setCategoryEstablishment([]);
                    }}
                />

                <Select
                    mode="multiple"
                    placeholder="Выберите категорию объекта"
                    style={{ width: 200 }}
                    allowClear
                    options={categoryOptions}
                    value={categoryEstablishment}
                    onChange={(value) => setCategoryEstablishment(value)}
                    disabled={!typeEstablishment}
                />
                <Select
                    placeholder="Сортировка"
                    style={{ width: 220 }}
                    allowClear
                    options={sortOptions}
                    value={sortEstablishment}
                    onChange={(value) => setSortEstablishment(value)}
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
        </Card>
    );
};

export default EstablishmentsAdminScreen;
