"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
    IEstablishmentFront,
    IMediaFront,
    IOption,
    IPaginationEstablishmentRequest,
    ISearchItemFront,
} from "@/lib/models";
import { Button, Card, Space, Table, Spin, message, Select, Input } from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { EstablishmentService } from "@/lib/Api/(Establishment)/establishment/establishment.service";

import { FormCreateEstablishment } from "@/components/common/Form/Establishment/FormCreateEstablishment";
import { FormUpdateEstablishment } from "@/components/common/Form/Establishment/FormUpdateEstablishment";

import { SearchService } from "@/lib/Api/search/search.service";

import useLocale from "@/lib/hooks/useLocale";

import { CONSTANT_TYPES_OF_ESTABLISHMENT_DB } from "@/asset/constants/database/types-of-establishment";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { SELECT_FILTER_SORT } from "@/asset/constants/front-database/select-sort.data";
import { TTypeSortEstablishmentServer } from "@/lib/models/types";
import { LocationService } from "@/lib/Api/location/location.service";

const { Search } = Input;

interface Props {
    // openModal: (type: "establishment", item?: IEstablishmentFront) => void;
}

const EstablishmentsAdminScreen: React.FC<Props> = ({}) => {
    const locale = useLocale();

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalEstablishments, setTotalEstablishments] = useState(0);

    const [establishments, setEstablishments] = useState<IEstablishmentFront[]>(
        []
    );

    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    const [locationsOptions, setLocationsOptions] = useState<IOption[]>([]);
    const [searchLocationId, setSearchLocationId] = useState<string>();

    const [filterTypeEstablishment, setFilterTypeEstablishment] =
        useState<string>();
    const [filterCategoryEstablishment, setFilterCategoryEstablishment] =
        useState<string[]>();

    const [categoryOptions, setCategoryOption] = useState<IOption[]>([]);
    const typeOptions: IOption[] = Object.values(
        CONSTANT_TYPES_OF_ESTABLISHMENT_DB
    ).map((item) => ({
        label: item.title,
        value: item.id,
    }));

    const sortOptions: IOption[] = SELECT_FILTER_SORT.map((item) => ({
        label: item.label,
        value: item.value,
    }));
    const [sortEstablishment, setSortEstablishment] =
        useState<TTypeSortEstablishmentServer>();

    const services = useMemo(
        () => ({
            establishment: new EstablishmentService(),
            location: new LocationService(),
            dataLoadManager: new DataLoadManagementService(),
            search: new SearchService(),
        }),
        []
    );

    const fetchAll = useCallback(async () => {
        setLoading(true);
        const bodyPagination: IPaginationEstablishmentRequest = {
            lang: locale,
            pagination: { page: currentPage, pageSize: pageSize }, // используем переданную страницу
            filter: {
                locationId: searchLocationId,
                categoryIds: filterCategoryEstablishment,
                typeIds: filterTypeEstablishment
                    ? [filterTypeEstablishment]
                    : undefined,
            },
            sort: { avgRate: sortEstablishment || "NONE" },
        };

        try {
            const data = await services.establishment.getByPagination(
                bodyPagination
            );
            if (!data) {
                message.error("Ошибка загрузки заведений");
                return;
            }

            // Сохраняем общее количество
            if (data.length > 0) {
                setTotalEstablishments(
                    data[0].location.info.totalEstablishment || 0
                );
            }

            // ... остальная логика
            setEstablishments(data || []);
            message.info("обновлено");
        } catch {
            message.error("Ошибка загрузки заведений");
        } finally {
            setLoading(false);
        }
    }, [
        services,
        filterCategoryEstablishment,
        currentPage,
        locale,
        pageSize,
        searchLocationId,
        sortEstablishment,
        filterTypeEstablishment,
    ]);
    const initializeData = useCallback(async () => {
        const [categoriesResponse, establishmentFetch] = await Promise.all([
            services.dataLoadManager.getCategories(
                locale,
                filterTypeEstablishment || null
            ),
            fetchAll(),
        ]);
        if (categoriesResponse) {
            setCategoryOption(
                categoriesResponse.map((cat) => ({
                    label: cat.value,
                    value: cat.id,
                }))
            );
        } else {
            message.error("ошибка при получении категорий");
        }
    }, [services, fetchAll, filterTypeEstablishment, locale]);
    useEffect(() => {
        initializeData;
    }, [initializeData]);
    useEffect(() => {
        fetchAll();
    }, [
        searchLocationId,
        filterTypeEstablishment,
        filterCategoryEstablishment,
        sortEstablishment,
        currentPage,
        fetchAll,
    ]);

    const fetchById = async (id: string) => {
        setLoading(true);

        try {
            const data = await services.establishment.getById(id, locale);

            setEstablishments(data ? [data] : []);
        } catch {
            message.error("Ошибка загрузки локаций");
        } finally {
            setLoading(false);
        }
    };
    const fetchLocationsByName = async (title: string) => {
        setSearchLoading(true);
        setCurrentPage(1);
        try {
            const responseSearch = await services.search.querySearch({
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
    // Обработчик изменения страницы
    const handlePageChange = (page: number, newPageSize?: number) => {
        setCurrentPage(page);
        if (newPageSize && newPageSize !== pageSize) {
            setPageSize(newPageSize);
        }
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
            render: (type: keyof typeof CONSTANT_TYPES_OF_ESTABLISHMENT_DB) =>
                CONSTANT_TYPES_OF_ESTABLISHMENT_DB[type]?.title || type,
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
            dataIndex: ["location", "country", "title"],
            key: "country",
            render: (titleCountry: string, record: IEstablishmentFront) =>
                titleCountry,

            // countriesMap[idCountry] || "не найдена страна",
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
                <Space>
                    <FormCreateEstablishment>
                        <Button type="primary" icon={<PlusOutlined />}>
                            Добавить заведение
                        </Button>
                    </FormCreateEstablishment>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={() => {
                            initializeData();
                        }}
                    />
                </Space>
            }
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
                    value={filterTypeEstablishment}
                    onChange={(value) => {
                        setFilterTypeEstablishment(value);
                        setFilterCategoryEstablishment([]);
                        setCurrentPage(1); // сбрасываем на первую страницу
                    }}
                />

                <Select
                    mode="multiple"
                    placeholder="Выберите категорию объекта"
                    style={{ width: 200 }}
                    allowClear
                    options={categoryOptions}
                    value={filterCategoryEstablishment}
                    onChange={(value) => {
                        setFilterCategoryEstablishment(value);
                        setCurrentPage(1); // сбрасываем на первую страницу
                    }}
                    disabled={!filterTypeEstablishment}
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
                    current: currentPage,
                    pageSize: pageSize,
                    total: totalEstablishments,
                    onChange: handlePageChange,
                    onShowSizeChange: handlePageChange, // обработчик изменения размера страницы
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],
                }}
                loading={{ spinning: loading }}
            />
        </Card>
    );
};

export default EstablishmentsAdminScreen;
