import React from "react";
import { Modal, Form, Input, Select } from "antd";
import styles from "../admin.module.scss";
import { ILocationFront } from "@/lib/models";

const { Option } = Select;

interface Props {
    isVisible: boolean;
    type: "location" | "establishment" | "category";
    editingItem: any;
    onCancel: () => void;
    onSave: (item: any) => void;
}

const EntityModal: React.FC<Props> = ({
    isVisible,
    type,
    editingItem,
    onCancel,
    onSave,
}) => {
    const [form] = Form.useForm();

    React.useEffect(() => {
        // if (editingItem) {
        //     form.setFieldsValue(editingItem);
        // } else {
        //     form.resetFields();
        // }
    }, [editingItem, form]);

    const handleOk = async () => {
        const values = await form.validateFields();
        const newItem = editingItem
            ? { ...editingItem, ...values }
            : { id: Date.now().toString(), ...values };
        onSave(newItem);
        form.resetFields();
    };

    const renderFields = () => {
        if(!editingItem) return
        switch (type) {
            case "location":
                const recordLocation = editingItem as ILocationFront
                const path = recordLocation.pathBreadcrumb
                return (
                    <>
                        <Form.Item
                            name="title"
                            label="Название"
                            rules={[{ required: true }]}
                        >
                            <Input value={recordLocation.title } />
                        </Form.Item>
                        {/* <Form.Item name="pathBreadcrumb" label="Путь" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item> */}
                    </>
                );
            case "establishment":
                return (
                    <>
                        <Form.Item
                            name="title"
                            label="Название"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Описание"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            name="typeEstablishment"
                            label="Тип заведения"
                            rules={[{ required: true }]}
                        >
                            <Select>
                                <Option value="Restaurant">Ресторан</Option>
                                <Option value="Hotel">Отель</Option>
                                <Option value="Cafe">Кафе</Option>
                                <Option value="Shop">Магазин</Option>
                            </Select>
                        </Form.Item>
                    </>
                );
            case "category":
                return (
                    <>
                        <Form.Item
                            name="key"
                            label="Ключ"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="value"
                            label="Название"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </>
                );
        }
    };

    return (
        <Modal
            className={styles.adminModal}
            title={editingItem ? "Редактировать" : "Добавить"}
            open={isVisible}
            onOk={handleOk}
            onCancel={onCancel}
            width={600}
        >
            <Form form={form} layout="vertical" className={styles.adminForm}>
                {renderFields()}
            </Form>
        </Modal>
    );
};

export default EntityModal;
