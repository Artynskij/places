import { Breadcrumb as BreadcrumbAnt } from "antd";
import style from "./breadcrumb.module.scss";
import { ROUTES } from "@/lib/config/Routes";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import Link from "next/link";
interface IBreadcrumb {
    links: { title: string; href?: string }[];
    type?: "location";
}
export const Breadcrumb = ({ links, type }: IBreadcrumb) => {
    const menuItems = [
        {
            key: "1",
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://www.alipay.com/"
                >
                    General
                </a>
            ),
        },
        {
            key: "2",
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://www.taobao.com/"
                >
                    Layout
                </a>
            ),
        },
        {
            key: "3",
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://www.tmall.com/"
                >
                    Navigation
                </a>
            ),
        },
    ];
    const breadcrumbItems: BreadcrumbItemType[] = links;
    if (type === "location") {
        breadcrumbItems.unshift({
            title: "Все страны",
            href: ROUTES.COUNTRIES,
        });
    }
    return (
        <div className={style.breadcrumb_ctn}>
            <BreadcrumbAnt
                items={[
                    {
                        title: "Главная",
                        href: ROUTES.MAIN,
                    },
                    ...breadcrumbItems,
                ]}
            />
        </div>
    );
};
