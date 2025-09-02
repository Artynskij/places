"use client";

import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import {
    DatabaseOutlined,
    FileTextOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import styles from "./admin.module.scss";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: AdminLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems = [
        {
            key: "/admin/data-management",
            icon: <DatabaseOutlined />,
            label: "Управление данными",
        },
        {
            key: "/admin/article-creation",
            icon: <FileTextOutlined />,
            label: "Создание статей",
        },
    ];

    const handleMenuClick = ({ key }: { key: string }) => {
        router.push(key);
    };

    // Определяем активный пункт меню на основе текущего пути
    const getSelectedKeys = () => {
        const active = menuItems.find((item) => item.key.includes(pathname));

        return active ? [active.key] : [];
    };

    // Получаем название активной страницы для заголовка
    const getActivePageTitle = () => {
        if (pathname.startsWith("/admin/data-management")) {
            return "Управление данными";
        }
        if (pathname.startsWith("/admin/article-creation")) {
            return "Создание статей";
        }
        return "Админ панель";
    };

    // Получаем хлебные крошки
    const getBreadcrumbItems = () => {
        const items = [
            {
                title: (
                    <span style={{ display: "flex", alignItems: "center" }}>
                        <HomeOutlined style={{ marginRight: 4 }} />
                        Админ панель
                    </span>
                ),
                href: "/admin",
            },
        ];

        if (pathname.startsWith("/admin/data-management")) {
            items.push({
                title: <span>Управление данными</span>,
                href: "/admin/data-management",
            });
        } else if (pathname.startsWith("/admin/article-creation")) {
            items.push({
                title: <span>Создание статей</span>,
                href: "/admin/article-creation",
            });
        }

        return items;
    };

    return (
        <Layout style={{ minHeight: "100vh" }} className={styles.adminLayout}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    background: colorBgContainer,
                }}
            >
                <div
                    style={{
                        height: 40,
                        margin: 16,
                        background:
                            "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        color: "white",
                        fontSize: collapsed ? "16px" : "18px",
                        boxShadow: "0 2px 8px rgba(24, 144, 255, 0.3)",
                    }}
                >
                    {collapsed ? "A" : "Admin"}
                </div>
                <Menu
                    mode="inline"
                    // selectedKeys={getSelectedKeys()}
                    items={menuItems}
                    onClick={handleMenuClick}
                    defaultSelectedKeys={getSelectedKeys()}
                    style={{
                        fontSize: "15px",
                        fontWeight: "500",
                    }}
                    theme="light"
                    className={styles.adminMenu}
                />
                {/* <Menu
                    onClick={onClick}
                    style={{ width: 256 }}
                    defaultSelectedKeys={["1"]}
                    // defaultOpenKeys={["sub1"]}
                    mode="inline"
                    items={[
                        { key: "13", label: "Option 13" },
                        { key: "14", label: "Option 14" },
                    ]}
                /> */}
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
                    <button
                        type="button"
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {collapsed ? (
                            <MenuUnfoldOutlined />
                        ) : (
                            <MenuFoldOutlined />
                        )}
                    </button>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flex: 1,
                        }}
                    >
                        <h1
                            style={{
                                margin: 0,
                                marginLeft: 16,
                                fontSize: "24px",
                                fontWeight: "600",
                                color: "#262626",
                            }}
                        >
                            {getActivePageTitle()}
                        </h1>
                    </div>
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
                    {pathname !== "/admin" && (
                        <Breadcrumb
                            items={getBreadcrumbItems()}
                            style={{ marginBottom: 16, fontSize: "14px" }}
                        />
                    )}
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

// export default RootLayout;
