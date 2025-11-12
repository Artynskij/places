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
