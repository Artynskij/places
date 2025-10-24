"use client";
import { useEffect, useState } from "react";
import {
    Table,
    Button,
    Space,
    Modal,
    Tag,
    Image,
    // message,
    Card,
    Tooltip,
    Select,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import { IArticleFront, IOption } from "@/lib/models";
import { ArticleService } from "@/lib/Api/(Article)/article/article.service";
import useLocale from "@/lib/hooks/useLocale";
import { CONSTANT_ARTICLE_STATUS_DB } from "@/asset/constants/database/article-status.const";
import { useTranslations } from "next-intl";
import PreviewEditor from "@/components/common/TipTap/Viewer/previewEditor";
import { ModalConfirm } from "@/components/common/Modal/ModalConfirm";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { useAlertMessage } from "@/lib/context";
const { Option } = Select;
interface ArticleListTabProps {
    onArticleEdit: (article: IArticleFront) => void;
    // onArticleDelete: (articleId: string) => void;
}

export const ArticleTabAdmin: React.FC<ArticleListTabProps> = ({
    onArticleEdit,
    // onArticleDelete,
}) => {
    const message = useAlertMessage();
    const tStatusArticle = useTranslations("StatusArticle");

    const [isLoading, setIsLoading] = useState(false);

    const [articles, setArticles] = useState<IArticleFront[]>([]);
    const [statusOptions, setStatusOptions] = useState<IOption[] | null>(null);
    const articleService = new ArticleService();
    const dataLoadManagementService = new DataLoadManagementService();
    useEffect(() => {
        fetchAll();
        dataLoadManagementService.getArticleStatus().then((res) => {
            if (res) {
                const options: IOption[] = res.map((item) => ({
                    id: item.Id,
                    label: tStatusArticle(item.Code),
                    value: item.Code,
                }));
                setStatusOptions(options);
            }
        });
    }, []);
    const fetchAll = async () => {
        setIsLoading(true);
        await articleService
            .getWithFilter({ page: 1, pageSize: 10 })
            .then((res) => {
                if (res) {
                    setArticles(res);
                }
            });
        setIsLoading(false);
        message.info("Обновлено");
    };
    const handleEdit = (article: IArticleFront) => {
        onArticleEdit(article);
    };

    const handleDelete = async (article: IArticleFront) => {
        const responseDelete = await articleService.delete(article.id);
        if (responseDelete) {
            message.info("Статья удалена");
            fetchAll();
        }
    };
    const handleStatusChange = async (
        idArticle: string,
        newArticleStatus: IOption
    ) => {
        const res = await articleService.update(idArticle, {
            source: { ArticlesStatusId: newArticleStatus.id as string },
        });
        if (res) {
            fetchAll();
        }
    };
    const columns = [
        {
            title: "Заголовок",
            dataIndex: "title",
            key: "title",
            width: 300,
            render: (title: string, record: IArticleFront) => (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {record.titleImage && (
                        <Image
                            width={50}
                            height={30}
                            src={record.titleImage.src}
                            alt={record.titleImage.alt}
                            style={{ objectFit: "cover" }}
                        />
                    )}
                    <span>{title}</span>
                </div>
            ),
        },
        {
            title: "Рубрика",
            dataIndex: "type",
            key: "type",
            render: (types: IArticleFront["type"]) => (
                //     <Tooltip
                //         title={
                //             <div>
                //                 {types?.map((type, index) => (
                //                     <div key={type.id}>
                //                         {index + 1}. {type.value}
                //                     </div>
                //                 ))}
                //             </div>
                //         }
                //     >
                //         <Tag color="blue" style={{ cursor: "pointer" }}>
                //             {types.length > 1 ? types?.length : types[0].value}
                //         </Tag>
                //     </Tooltip>
                // ),
                <Space direction="vertical">
                    {types.map((type) => (
                        <Tag
                            key={type.id}
                            color="blue"
                            style={{ cursor: "pointer" }}
                        >
                            {type.value}
                        </Tag>
                    ))}
                </Space>
            ),
        },
        {
            title: "Под рубрика",
            dataIndex: "subType",
            key: "subType",
            render: (subTypes: IArticleFront["subType"]) => (
             
                <Space direction="vertical">
                    {subTypes.map((subType) => (
                        <Tag
                            key={subType.id}
                            color="blue"
                            style={{ cursor: "pointer" }}
                        >
                            {subType.value}
                        </Tag>
                    ))}
                </Space>
            ),
          
        },
        {
            title: "Автор",
            dataIndex: "author",
            key: "author",
            render: (author: IArticleFront["author"]) => author?.Nickname,
        },
        // {
        //     title: "Дата",
        //     dataIndex: "date",
        //     key: "date",
        // },
        {
            title: "Статус",
            key: "status",
            render: (_: any, record: IArticleFront) => (
                <Tag color="green">{tStatusArticle(record.status.code)}</Tag>
            ),
        },
        {
            title: "Действия",
            key: "actions",
            render: (_: any, record: IArticleFront) => (
                <Space>
                    {statusOptions && (
                        <Select
                            size="small"
                            style={{ width: 140 }}
                            defaultValue={record.status.code}
                            onChange={(selectedValue) => {
                                const newStatus = statusOptions.find(
                                    (item) => item.value === selectedValue
                                );
                                console.log("Selected value:", selectedValue);
                                console.log("Found status object:", newStatus);

                                if (newStatus) {
                                    handleStatusChange(record.id, newStatus);
                                }
                            }}
                            placeholder="Изменить статус"
                        >
                            {statusOptions.map((option) => (
                                <Option key={option.id} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    )}

                    <PreviewEditor article={record || null}>
                        <Button
                            type="primary"
                            icon={<EyeOutlined />}
                            size="middle"
                        />
                    </PreviewEditor>

                    <Button
                        icon={<EditOutlined />}
                        size="middle"
                        onClick={() => handleEdit(record)}
                    />
                    <ModalConfirm handlerAction={() => handleDelete(record)}>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            size="middle"
                        />
                    </ModalConfirm>
                </Space>
            ),
        },
    ];

    return (
        <Card
            title={`Список статей ${articles.length}`}
            extra={
                <Space>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={() => {
                            fetchAll();
                        }}
                        loading={isLoading}
                    />
                </Space>
            }
        >
            {/* <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h3></h3>
            </div> */}

            <Table
                columns={columns}
                dataSource={articles}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: 800 }}
            />
        </Card>
    );
};
