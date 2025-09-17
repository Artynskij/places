import { useState } from "react";
import { Button, Input, Form, Card } from "antd";
import ArticleEditor from "@/components/common/ArticleEditor/ArticleEditor";

export const ArticleAdminScreen: React.FC = () => {
    const [form] = Form.useForm();
    const [editorData, setEditorData] = useState<any>(null);

    const handleFinish = (values: any) => {
        console.log("Заголовок:", values.title);
        console.log("Контент JSON:", editorData);
        // TODO: отправить в API для сохранения в БД
    };

    return (
        <Card className="max-w-3xl mx-auto mt-8">
            <Form layout="vertical" form={form} onFinish={handleFinish}>
                <Form.Item
                    label="Заголовок"
                    name="title"
                    rules={[{ required: true, message: "Введите заголовок" }]}
                >
                    <Input placeholder="Введите заголовок статьи" />
                </Form.Item>

                <Form.Item label="Контент">
                    <ArticleEditor />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
