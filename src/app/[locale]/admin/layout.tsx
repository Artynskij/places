"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Layout, Menu, theme, Button } from "antd";
import {
    DatabaseOutlined,
    FileTextOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import styles from "./admin.module.scss";
import { ROUTES } from "@/lib/config/Routes";

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
    children: React.ReactNode;
}

const menuItems = [
    {
        key: ROUTES.ADMIN.USERS,
        icon: <DatabaseOutlined />,
        label: "Пользователи",
    },
    {
        key: ROUTES.ADMIN.ESTABLISHMENTS,
        icon: <DatabaseOutlined />,
        label: "Объекты",
    },
    {
        key: ROUTES.ADMIN.LOCATIONS,
        icon: <DatabaseOutlined />,
        label: "Локации",
    },
    {
        key: ROUTES.ADMIN.ATTRIBUTES,
        icon: <DatabaseOutlined />,
        label: "Атрибуты",
    },
    {
        key: ROUTES.ADMIN.ARTICLES,
        icon: <FileTextOutlined />,
        label: "Контент",
    },
    {
        key: ROUTES.ADMIN.DATA_MANAGER,
        icon: <DatabaseOutlined />,
        label: "Данные",
    },
];

const pageTitles: Record<string, string> = {
    [ROUTES.ADMIN.DATA_MANAGER]: "Управление данными",
    [ROUTES.ADMIN.ARTICLES]: "Создание статей",
    [ROUTES.ADMIN.ESTABLISHMENTS]: "Управление объектами",
};

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeyMenu, setSelectedKeyMenu] = useState<string[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        const active = menuItems.find((item) => pathname.includes(item.key));
        setSelectedKeyMenu(active ? [active.key] : []);
    }, [pathname]);

    const handleMenuClick = ({ key }: { key: string }) => {
        router.push(key);
    };

    const activePageTitle =
        Object.entries(pageTitles).find(([key]) =>
            pathname.includes(key)
        )?.[1] ?? "Админ панель";

    return (
        <Layout style={{ minHeight: "100vh" }} className={styles.adminLayout}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ background: colorBgContainer }}
            >
                <h4 className={styles.adminLogo}>
                    {collapsed ? "A" : "Admin"}
                </h4>
                <Menu
                    mode="inline"
                    items={menuItems}
                    onClick={handleMenuClick}
                    selectedKeys={selectedKeyMenu}
                    style={{ fontSize: "15px", fontWeight: 500 }}
                    theme="light"
                    className={styles.adminMenu}
                />
            </Sider>
            <Layout>
                <Header
                    className={styles.adminHeader}
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ width: 64, height: 64 }}
                    />
                    <h1
                        style={{
                            margin: 0,
                            marginLeft: 16,
                            fontSize: 24,
                            fontWeight: 600,
                        }}
                    >
                        {activePageTitle}
                    </h1>
                </Header>
                <Content
                    className={styles.adminContent}
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

// import RootLayout from "@/components/admin/RootLayout";
