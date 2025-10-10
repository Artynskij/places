"use client";
import styles from "../admin.module.scss";
import { useState, useEffect } from "react";
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
    Tag,
    Avatar,
    DatePicker,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
    SearchOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";
import { IPersonFront } from "@/lib/models";

const { Search } = Input;
const { Option } = Select;

// Интерфейсы для данных
interface IPerson extends IPersonFront {
    status?: "moderation" | "active" | "inactive" | "rejected" | "blocked";
}

// Имитация API задержки
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const UserAdminScreen = () => {
    const [persons, setPersons] = useState<IPerson[]>([]);
    const [loading, setLoading] = useState(false);

    const [searchLoading, setSearchLoading] = useState(false);

    const personService = new PersonService();
    // Статусы для фильтрации
    const statusOptions = [
        { value: "moderation", label: "На модерации", color: "orange" },
        { value: "active", label: "Активный", color: "green" },
        { value: "inactive", label: "Не активен", color: "gray" },
        { value: "rejected", label: "Отклонен", color: "red" },
        { value: "blocked", label: "Заблокирован", color: "volcano" },
    ];

    // Загрузка данных
    const fetchPersons = async () => {
        setLoading(true);
        // await delay(600);
        const personsServer = await personService.getAll({ lang: "ru" });

        if (personsServer) {
            setPersons(personsServer);
        } else {
            message.error("Ошибка загрузки данных");
        }
        setLoading(false);
    };

    // Поиск по ID
    const fetchById = async (id: string) => {
        setSearchLoading(true);

        try {
            if (!id) {
                fetchPersons();
                return;
            }

            const person = await personService.getById(id);
            if (person) {
                setPersons([person]);
            } else {
                message.error("Турист не найден");
                setPersons([]);
            }
        } catch {
            message.error("Ошибка поиска");
        } finally {
            setSearchLoading(false);
        }
    };

    // Поиск по nickname
    const fetchByUsername = async (username: string) => {
        setSearchLoading(true);
        await delay(300);

        try {
            if (!username) {
                fetchPersons();
                return;
            }

            // const filtered = mockTourists.filter((p) =>
            //     p.nickname?.toLowerCase().includes(username.toLowerCase())
            // );
            // setPersons(filtered);
        } catch {
            message.error("Ошибка поиска");
        } finally {
            setSearchLoading(false);
        }
    };

    useEffect(() => {
        fetchPersons();
    }, []);

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Подтверждение удаления",
            content: "Вы уверены, что хотите удалить этого туриста?",
            okText: "Удалить",
            cancelText: "Отмена",
            okType: "danger",
            onOk: async () => {
                await delay(300);
                setPersons(persons.filter((p) => p.id !== id));
                message.success("Турист удален");
            },
        });
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        await delay(200);
        setPersons(
            persons.map((tourist) =>
                tourist.id === id
                    ? { ...tourist, status: newStatus as any }
                    : tourist
            )
        );

        const statusLabel = statusOptions.find(
            (opt) => opt.value === newStatus
        )?.label;
        message.success(`Статус изменен на "${statusLabel}"`);
    };

    // Колонки таблицы
    const touristColumns: ColumnsType<IPerson> = [
        {
            title: "Аватар",
            dataIndex: "avatar",
            key: "avatar",
            width: 70,
            render: (avatar) => (
                <Avatar
                    size="large"
                    src={avatar.ownerImageSrc || avatar.touristImageSrc}
                    icon={<UserOutlined />}
                    style={{ backgroundColor: "#87d068" }}
                />
            ),
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 120,
        },
        {
            title: "nickname",
            dataIndex: "nickname",
            key: "nickname",
            // sorter: (a, b) => a.nickname?.localeCompare(b.username || ''),
        },
        {
            title: "ФИО",
            dataIndex: "personName",
            key: "fullName",
            responsive: ["md"],
            render: (personName) =>
                personName?.originalFullName ||
                personName?.fullName || (
                    <span style={{ color: "red" }}>не заполнено</span>
                ),
        },
        {
            title: "Пол",
            dataIndex: "gender",
            key: "gender",
            responsive: ["md"],
            render: (gender) =>
                gender?.value || (
                    <span style={{ color: "red" }}>не заполнено</span>
                ),
        },
        {
            title: "Email",
            dataIndex: "contacts",
            key: "email",
            responsive: ["lg"],
            render: (contacts) =>
                contacts?.email || (
                    <span style={{ color: "red" }}>не заполнено</span>
                ),
        },
        {
            title: "Страна",
            dataIndex: "contacts",
            key: "country",
            responsive: ["lg"],
            // sorter: (a, b) => a.country.localeCompare(b.country),
            render: (contacts) =>
                contacts?.address?.country || (
                    <span style={{ color: "red" }}>не заполнено</span>
                ),
        },
        {
            title: "Город",
            dataIndex: "contacts",
            key: "city",
            responsive: ["lg"],
            render: (contacts) =>
                contacts?.address?.town || (
                    <span style={{ color: "red" }}>не заполнено</span>
                ),
        },
        {
            title: "Владелец",
            dataIndex: "isVerified",
            key: "isVerified",
            responsive: ["xl"],
            render: (isVerified) => (isVerified ? "да" : "нет"),
        },
        {
            title: "Дата создания",
            dataIndex: "dateRegister",
            key: "dateRegister",
            responsive: ["xl"],
            render: (date) => dayjs(date).format("DD.MM.YYYY"),
            sorter: (a, b) =>
                dayjs(a.dateRegister).unix() - dayjs(b.dateRegister).unix(),
        },
        {
            title: "Статус",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const statusOption = statusOptions.find(
                    (opt) => opt.value === status
                );
                return (
                    <Tag color={statusOption?.color}>{statusOption?.label}</Tag>
                );
            },
            filters: statusOptions.map((opt) => ({
                text: opt.label,
                value: opt.value,
            })),
            onFilter: (value, record) => record.status === value,
        },
        {
            title: "Действия",
            key: "actions",
            fixed: "right",
            width: 200,
            render: (_, record) => (
                <Space>
                    <Select
                        size="small"
                        style={{ width: 140 }}
                        value={record.status}
                        onChange={(value) =>
                            handleStatusChange(record.id, value)
                        }
                        placeholder="Изменить статус"
                    >
                        {statusOptions.map((option) => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>

                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    return (
        <Card
            title="Управление туристами"
            extra={<Button icon={<ReloadOutlined />} onClick={fetchPersons} />}
        >
            {/* Поиск */}
            <Space style={{ marginBottom: 16 }} wrap>
                <Search
                    placeholder="Поиск по ID"
                    onSearch={fetchById}
                    allowClear
                    loading={searchLoading}
                    style={{ width: 200 }}
                    enterButton={<SearchOutlined />}
                />

                <Search
                    placeholder="Поиск по username"
                    onSearch={fetchByUsername}
                    allowClear
                    loading={searchLoading}
                    style={{ width: 250 }}
                    enterButton={<SearchOutlined />}
                />

                <span>Найдено: {persons.length} туристов</span>
            </Space>

            {/* Таблица */}
            <Table
                columns={touristColumns}
                dataSource={persons}
                rowKey="id"
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `Показано ${range[0]}-${range[1]} из ${total} записей`,
                }}
                loading={{ spinning: loading }}
                scroll={{ x: 1300 }}
                size="middle"
                bordered
            />
        </Card>
    );
};
