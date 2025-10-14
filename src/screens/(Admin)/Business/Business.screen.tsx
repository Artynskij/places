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
    Descriptions,
    Tooltip,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    ShopOutlined,
    SearchOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import {
    IBusinessEntity,
    IBusinessFront,
    IBusinessLegalTypesFront,
    IInvitesByQueryItemResponse,
} from "@/lib/models";
import { BusinessService } from "@/lib/Api/business/business.service";
import useLocale from "@/lib/hooks/useLocale";
import { TLegalTypeOfBusiness } from "@/lib/models/types/TLegalTypeOfBusiness";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { InvitesService } from "@/lib/Api/invites/invites.service";
import { CopyStringButton } from "@/components/common/ButtonFunctional/CopyStringButton";

const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;

interface BusinessFormValues {
    officialName: string;
    registrationNumber: string;
    legalType: TLegalTypeOfBusiness;
    email: string;
    phone: string;
    website: string;
    establishmentName: string;
    establishmentDescription: string;
}

// Имитация API задержки
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const BusinessAdminScreen = () => {
    const locale = useLocale();
    const [modalActive, setModalActive] = useState(false);
    const [detailModalActive, setDetailModalActive] = useState(false);
    const [businesses, setBusinesses] = useState<IBusinessFront[]>([]);
    const [loading, setLoading] = useState(false);
    const [editBusiness, setEditBusiness] = useState<IBusinessFront | null>(
        null
    );
    const [selectedBusiness, setSelectedBusiness] =
        useState<IBusinessFront | null>(null);
    const [selectedBusinessInvites, setSelectedBusinessInvites] = useState<
        IInvitesByQueryItemResponse[] | null
    >(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [legalTypeOptions, setLegalTypeOptions] =
        useState<IBusinessLegalTypesFront[]>();
    const [form] = Form.useForm<BusinessFormValues>();
    const businessService = new BusinessService();
    const dataLoadManagerService = new DataLoadManagementService();
    const invitesService = new InvitesService();

    // Загрузка данных
    const fetchBusinesses = async () => {
        setLoading(true);

        businessService.getAll({ lang: locale }).then((res) => {
            if (res) {
                const business = res.map((item) => item.business);

                setBusinesses(business);
            } else {
                message.error("Ошибка загрузки данных бизнесов");
            }
            setLoading(false);
        });
    };

    // Поиск по ID
    const fetchById = async (id: string) => {
        setSearchLoading(true);
        // await delay(300);

        try {
            if (!id) {
                fetchBusinesses();
                return;
            }

            businessService.getById(id, locale).then((res) => {
                if (res) {
                    setBusinesses([res]);
                } else {
                    message.error("Ошибка загрузки данных бизнеса");
                }
            });
        } catch {
            message.error("Ошибка поиска");
        } finally {
            setSearchLoading(false);
        }
    };

    // Поиск по названию
    const fetchByName = async (name: string) => {
        setSearchLoading(true);
        // await delay(300);

        try {
            if (!name) {
                fetchBusinesses();
                return;
            }
            await businessService
                .getAll({ lang: locale, OfficialName: name })
                .then((res) => {
                    if (res) {
                        const business = res.map((item) => item.business);

                        setBusinesses(business);
                    } else {
                        message.error("Ошибка загрузки данных бизнесов");
                    }
                });
        } catch {
            message.error("Ошибка поиска");
        } finally {
            setSearchLoading(false);
            setLoading(false);
        }
    };
    const loadPage = async () => {
        setLoading(true);
        await dataLoadManagerService
            .getBusinessLegalTypes(locale)
            .then((res) => {
                if (res) {
                    setLegalTypeOptions(res);
                }
            });
        fetchBusinesses();
        setLoading(false);
    };
    useEffect(() => {
        loadPage();
    }, []);

    const handleCancel = () => {
        setModalActive(false);
        setEditBusiness(null);
        form.resetFields();
    };

    const handleDetailCancel = () => {
        setDetailModalActive(false);
        setSelectedBusiness(null);
        setSelectedBusinessInvites(null);
    };

    const handleOk = async () => {
        if (!editBusiness) return;

        try {
            const values = await form.validateFields();
            setLoading(true);
            await delay(400);

            // Обновляем данные
            const updatedBusinesses = businesses.map((business) =>
                business.Id === editBusiness.Id
                    ? {
                          ...business,
                          OfficialName: values.officialName,
                          RegistrationNumber: values.registrationNumber || null,
                          LegalType: {
                              ...business.LegalType,
                              Code: values.legalType,
                          },
                          Contacts: {
                              ...business.Contacts,
                              Email: values.email,
                              Phone: values.phone,
                              Website: values.website,
                          },
                          Establishment: business.Establishment
                              ? {
                                    ...business.Establishment,
                                    Name: values.establishmentName,
                                    Description:
                                        values.establishmentDescription,
                                }
                              : null,
                      }
                    : business
            );

            setBusinesses(updatedBusinesses);
            message.success("Данные бизнеса обновлены");
            handleCancel();
        } catch (error) {
            message.error("Ошибка при обновлении");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (record: IBusinessEntity) => {
        setEditBusiness(record);
        setModalActive(true);
        form.setFieldsValue({
            officialName: record.OfficialName,
            registrationNumber: record.RegistrationNumber || "",
            legalType: record.LegalType.Code,
            email: record.Contacts.Email || "",
            phone: record.Contacts.Phone || "",
        });
    };

    const handleViewDetails = async (record: IBusinessEntity) => {
        const resInvites = await invitesService.getByQuery({
            lang: locale,
            businessId: record.Id,
        });
        setSelectedBusinessInvites(resInvites);
        setSelectedBusiness(record);
        setDetailModalActive(true);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Подтверждение удаления",
            content: "Вы уверены, что хотите удалить этот бизнес?",
            okText: "Удалить",
            cancelText: "Отмена",
            okType: "danger",
            onOk: async () => {
                await delay(300);
                setBusinesses(businesses.filter((p) => p.Id !== id));
                message.success("Бизнес удален");
            },
        });
    };

    const getLegalTypeLabel = (code: TLegalTypeOfBusiness) => {
        return (
            legalTypeOptions?.find((opt) => opt.code === code)?.title || code
        );
    };

    const getLegalTypeColor = (code: TLegalTypeOfBusiness) => {
        const colors = {
            LEGAL_ENTITY: "blue",
            SOLE_PROPRIETOR: "green",
            INDIVIDUAL: "orange",
        };
        return colors[code] || "default";
    };

    // Колонки таблицы
    const businessColumns: ColumnsType<IBusinessEntity> = [
        {
            title: "ID",
            dataIndex: "Id",
            key: "Id",
            width: 120,
            render: (id) => <code>{id}</code>,
        },
        {
            title: "Официальное название",
            dataIndex: "OfficialName",
            key: "OfficialName",
            sorter: (a, b) => a.OfficialName.localeCompare(b.OfficialName),
        },
        {
            title: "Рег. номер",
            dataIndex: "RegistrationNumber",
            key: "RegistrationNumber",
            render: (number) =>
                number || <span style={{ color: "#999" }}>не указан</span>,
        },
        {
            title: "Тип юр. лица",
            dataIndex: ["LegalType", "Code"],
            key: "LegalType",
            render: (code: TLegalTypeOfBusiness) => (
                <Tag color={getLegalTypeColor(code)}>
                    {getLegalTypeLabel(code)}
                </Tag>
            ),
            filters: legalTypeOptions?.map((opt) => ({
                text: opt.title,
                value: opt.code,
            })),
            onFilter: (value, record) => record.LegalType.Code === value,
        },
        {
            title: "Email",
            dataIndex: ["Contacts", "Email"],
            key: "Email",
            responsive: ["lg"],
        },
        {
            title: "Телефон",
            dataIndex: ["Contacts", "Phone"],
            key: "Phone",
            responsive: ["lg"],
        },
        {
            title: "Дата регистрации",
            dataIndex: "RegistrationDate",
            key: "RegistrationDate",
            responsive: ["xl"],
            render: (date) =>
                date ? (
                    dayjs(date).format("DD.MM.YYYY")
                ) : (
                    <span style={{ color: "#999" }}>не указана</span>
                ),
            sorter: (a, b) => {
                const dateA = a.RegistrationDate
                    ? dayjs(a.RegistrationDate).unix()
                    : 0;
                const dateB = b.RegistrationDate
                    ? dayjs(b.RegistrationDate).unix()
                    : 0;
                return dateA - dateB;
            },
        },
        {
            title: "Действия",
            key: "actions",
            fixed: "right",
            width: 180,
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => handleViewDetails(record)}
                        size="small"
                    >
                        Детали
                    </Button>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        size="small"
                    >
                        Редакт.
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.Id)}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    return (
        <Card
            title="Управление бизнесами"
            extra={
                <Button icon={<ReloadOutlined />} onClick={fetchBusinesses} />
            }
        >
            {/* Поиск */}
            <Space style={{ marginBottom: 16 }} wrap>
                <Search
                    placeholder="Поиск по ID бизнеса"
                    onSearch={fetchById}
                    allowClear
                    loading={searchLoading}
                    style={{ width: 220 }}
                    enterButton={<SearchOutlined />}
                />

                <Search
                    placeholder="Поиск по названию"
                    onSearch={fetchByName}
                    allowClear
                    loading={searchLoading}
                    style={{ width: 280 }}
                    enterButton={<SearchOutlined />}
                />

                <span>Найдено: {businesses.length} бизнесов</span>
            </Space>

            {/* Таблица */}
            <Table
                columns={businessColumns}
                dataSource={businesses}
                rowKey="Id"
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `Показано ${range[0]}-${range[1]} из ${total} записей`,
                }}
                loading={{ spinning: loading }}
                scroll={{ x: 1400 }}
                size="middle"
                bordered
            />

            {/* Модальное окно редактирования */}
            <Modal
                title="Редактировать данные бизнеса"
                open={modalActive}
                onOk={handleOk}
                onCancel={handleCancel}
                width={600}
                confirmLoading={loading}
                okText="Сохранить"
                cancelText="Отмена"
            >
                <Form
                    form={form}
                    layout="vertical"
                    className={styles.adminForm}
                >
                    <Form.Item
                        name="officialName"
                        label="Официальное название"
                        rules={[
                            { required: true, message: "Введите название" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="registrationNumber"
                        label="Регистрационный номер"
                    >
                        <Input placeholder="Необязательное поле" />
                    </Form.Item>

                    <Form.Item
                        name="legalType"
                        label="Тип юридического лица"
                        rules={[{ required: true, message: "Выберите тип" }]}
                    >
                        <Select placeholder="Выберите тип">
                            {legalTypeOptions?.map((option) => (
                                <Option key={option.code} value={option.title}>
                                    <Space>
                                        {/* {option.icon} */}
                                        {option.title}
                                    </Space>
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Введите email" },
                            { type: "email", message: "Некорректный email" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Телефон"
                        rules={[{ required: true, message: "Введите телефон" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Модальное окно деталей */}
            <Modal
                title="Детальная информация о бизнесе"
                open={detailModalActive}
                onCancel={handleDetailCancel}
                width={1200}
                footer={[
                    <Button key="close" onClick={handleDetailCancel}>
                        Закрыть
                    </Button>,
                ]}
            >
                {selectedBusiness && (
                    <Descriptions column={2} bordered>
                        <Descriptions.Item label="ID" span={1}>
                            <code>{selectedBusiness.Id}</code>
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Официальное название"
                            span={2}
                        >
                            {selectedBusiness.OfficialName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Рег. номер">
                            {selectedBusiness.RegistrationNumber || "не указан"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Тип юр. лица">
                            <Tag
                                color={getLegalTypeColor(
                                    selectedBusiness.LegalType.Code
                                )}
                            >
                                {getLegalTypeLabel(
                                    selectedBusiness.LegalType.Code
                                )}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {selectedBusiness.Contacts.Email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Телефон">
                            {selectedBusiness.Contacts.Phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Дата регистрации">
                            {selectedBusiness.RegistrationDate
                                ? dayjs(
                                      selectedBusiness.RegistrationDate
                                  ).format("DD.MM.YYYY")
                                : "не указана"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Юридический Адрес" span={2}>
                            {`${selectedBusiness.Contacts.Address?.Country}, ${selectedBusiness.Contacts.Address?.Town}, ${selectedBusiness.Contacts.Address?.Street}`}
                        </Descriptions.Item>
                        {selectedBusinessInvites && (
                            <Descriptions.Item label="сотрудники" span={2}>
                                {selectedBusinessInvites.map((invite) => {
                                    console.log(invite);
                                    const fullname = [
                                        invite.person.name?.LastName,
                                        invite.person.name?.FirstName,
                                    ]
                                        .filter(Boolean)
                                        .join(" ");
                                    const fullnameOrig = [
                                        invite.person.name?.OriginalLastName,
                                        invite.person.name?.OriginalName,
                                    ]
                                        .filter(Boolean)
                                        .join(" ");

                                    return (
                                        <span key={invite.id}>
                                            <span>
                                                {!!fullnameOrig
                                                    ? fullnameOrig
                                                    : fullname}
                                            </span>{" "}
                                            <span
                                                style={{
                                                    padding: "2px 5px",
                                                    backgroundColor: "#237fc6",
                                                    borderRadius: "8px",
                                                    color: "white",
                                                }}
                                            >
                                                {
                                                    invite.role.content
                                                        .details[0].value
                                                }
                                            </span>
                                            <CopyStringButton
                                                link={invite.person.id}
                                                titleTooltip="Скопировать ID"
                                            />
                                        </span>
                                    );
                                })}
                            </Descriptions.Item>
                        )}
                        <Descriptions.Item label="Заведения" span={2}>
                            {selectedBusiness.Establishment ? (
                                <span>
                                    {" "}
                                    {selectedBusiness.Establishment.Id}
                                </span>
                            ) : (
                                <span>Нету привязанных заведений</span>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Дата создания">
                            {dayjs(selectedBusiness.CreatedDate).format(
                                "DD.MM.YYYY HH:mm"
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item span={1} label="Последнее изменение">
                            {dayjs(selectedBusiness.LastModifiedDate).format(
                                "DD.MM.YYYY HH:mm"
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </Card>
    );
};
