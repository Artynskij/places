"use client";
import { Select } from "antd";

import style from "./selectLang.module.scss";
import { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/config";
import { IconGlobe } from "@/components/common/Icons";
// import { useRouter } from "next/router";

export const SelectLang = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();

    const defaultLocale = useLocale();

    const handleChange = (value: string) => {
        const nextLocale = value;
        const newURL = pathname.split("/");
        newURL[1] = nextLocale;
        startTransition(() => {
            router.replace(newURL.join("/"));
        });
    };

    return (
        <Select
            defaultValue={defaultLocale}
            onChange={handleChange}
            className={style.select}
            style={{ height: '54px', width: '80px' }}
            labelRender={(label) => (
                <span className={style.label_with_icon}>
                    <IconGlobe className={style.icon_globe} />
                    {label.label}
                </span>
            )}
            options={
                locales.map((cur) => {
                    return { value: cur, label: cur };
                })
            }
        />
    );
};
