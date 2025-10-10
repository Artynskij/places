"use client";
import { useState } from "react";
import { Tabs, Card, message } from "antd";

import { IArticleFront } from "@/lib/models";
import CreateArticleTabAdmin from "@/components/common/Tabs/admin/article/CreateArticleTabAdmin";
import ArticleTabAdmin from "@/components/common/Tabs/admin/article/ArticleTabAdmin";
import CategoryArticleTabAdmin from "@/components/common/Tabs/admin/article/CategoryArticleTabAdmin";

const ArticleAdminScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState("create");
    const [articles, setArticles] = useState<IArticleFront[]>([]);

    const handleArticleCreated = (newArticle: IArticleFront) => {
        setArticles((prev) => [
            ...prev,
            { ...newArticle, id: Date.now().toString() },
        ]);
        message.success("Статья успешно создана");
        setActiveTab("list");
    };

    const handleArticleUpdated = (updatedArticle: IArticleFront) => {
        setArticles((prev) =>
            prev.map((article) =>
                article.id === updatedArticle.id ? updatedArticle : article
            )
        );
        message.success("Статья успешно обновлена");
        setActiveTab("list");
    };

    const handleArticleDeleted = (articleId: string) => {
        setArticles((prev) =>
            prev.filter((article) => article.id !== articleId)
        );
        message.success("Статья успешно удалена");
    };

    const tabs = [
        {
            key: "create",
            label: "Создание статьи",
            children: (
                <CreateArticleTabAdmin
                    onArticleCreated={handleArticleCreated}
                />
            ),
        },
        {
            key: "list",
            label: "Список статей",
            children: (
                <ArticleTabAdmin
                    articles={articles}
                    onArticleEdit={handleArticleUpdated}
                    onArticleDelete={handleArticleDeleted}
                />
            ),
        },
        {
            key: "categories",
            label: "Управление категориями",
            children: <CategoryArticleTabAdmin />,
        },
    ];

    return (
        <div>
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabs}
                // type="card"
            />
        </div>
    );
};
export default ArticleAdminScreen;
