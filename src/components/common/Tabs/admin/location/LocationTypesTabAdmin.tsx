"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Card, Space, Table, message, Modal, Form, Input } from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { ILocationTypeEntity } from "@/lib/models";
import { ModalConfirm } from "@/components/common/Modal/ModalConfirm";
import { LocationTypesService } from "@/lib/Api/location-types.api";

const LocationTypesTabAdmin: React.FC = () => {
    const [locationTypes, setLocationTypes] = useState<ILocationTypeEntity[]>(
        []
    );
    const [loading, setLoading] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [editType, setEditType] = useState<ILocationTypeEntity | null>(null);
    const [form] = Form.useForm();
    const [modalLoading, setModalLoading] = useState(false);

    const services = useMemo(
        () => ({
            dataLoadManager: new DataLoadManagementService(),
            locationTypes: new LocationTypesService(),
        }),
        []
    );
    const fetchLocationTypes = useCallback(async () => {
        setLoading(true);
        try {
            const res = await services.dataLoadManager.getTypesLocation();
            if (res) {
                const types = res.map((item) => item.type);
                setLocationTypes(types);
            }
        } catch {
            message.error("Ошибка загрузки типов локаций");
        } finally {
            setLoading(false);
        }
    }, [services]);
    useEffect(() => {
        fetchLocationTypes();
    }, [fetchLocationTypes]);

    const handleEdit = (record: ILocationTypeEntity) => {
        setEditType(record);
        setModalActive(true);
        form.setFieldsValue({
            Name: record.Name,
        });
    };

    const handleDelete = async (id: string) => {
        try {
            await services.locationTypes.delete(id);
            message.success("Тип локации удален");

            fetchLocationTypes();
        } catch {
            message.error("Ошибка при удалении типа локации");
        }
    };

    const handleModalClose = () => {
        setModalActive(false);
        setEditType(null);
        form.resetFields();
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            setModalLoading(true);
            console.log(values);
            const bodyTypeLocation = {
                source: { Name: values.Name },
                content: null,
            };
            if (editType) {
                await services.locationTypes.update(
                    editType.Id,
                    bodyTypeLocation
                );
                message.success("Тип локации обновлен");
            } else {
                await services.locationTypes.create(bodyTypeLocation);
                message.success("Тип локации создан");
            }

            fetchLocationTypes();
            handleModalClose();
        } catch (error) {
            console.error("Ошибка:", error);
        } finally {
            setModalLoading(false);
        }
    };

    const locationTypeColumns: ColumnsType<ILocationTypeEntity> = [
        {
            title: "Название",
            dataIndex: "Name",
            key: "Name",
        },
        {
            title: "ID",
            dataIndex: "Id",
            key: "Id",
        },
        // {
        //     title: "Описание",
        //     dataIndex: "Description",
        //     key: "Description",
        //     render: (description) => description || "-",
        // },

        {
            title: "Действия",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <ModalConfirm handlerAction={() => handleDelete(record.Id)}>
                        <Button danger icon={<DeleteOutlined />} />
                    </ModalConfirm>
                    {/* <Button
                            danger
                            icon={<DeleteOutlined />}
                            // onClick={() => handleDelete(record.Id)}
                        /> */}
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
                            Добавить тип
                        </Button>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={() => {
                                message.info("обновлено");
                                fetchLocationTypes();
                            }}
                        />
                    </Space>
                }
                title="Управление типами локаций"
            >
                <Table
                    columns={locationTypeColumns}
                    dataSource={locationTypes}
                    rowKey="Id"
                    pagination={{ pageSize: 10 }}
                    loading={{ spinning: loading }}
                />
            </Card>

            <Modal
                title={
                    editType
                        ? "Редактировать тип локации"
                        : "Создать тип локации"
                }
                open={modalActive}
                onOk={handleModalOk}
                onCancel={handleModalClose}
                width={500}
                okText={editType ? "Сохранить" : "Создать"}
                cancelText="Отмена"
                confirmLoading={modalLoading}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="Name"
                        label="Название типа"
                        rules={[
                            {
                                required: true,
                                message: "Введите название типа",
                            },
                        ]}
                    >
                        <Input placeholder="Введите название типа локации НА АНГЛ" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default LocationTypesTabAdmin;
