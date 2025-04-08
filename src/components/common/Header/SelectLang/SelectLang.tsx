"use client";
import Select from "antd/lib/select";

import style from "./selectLang.module.scss";
import {  useTransition } from "react";
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
        <div className={style.select_ctn}>
            <div className={style.icon_ctn}>
                <IconGlobe className={style.icon_ctn_icon} />
            </div>

            <Select
                defaultValue={defaultLocale}
                onChange={handleChange}
                style={{ height: "100%" }}
                className={style.select}
                options={
                    locales.map((cur) => {
                        return { value: cur, label: cur };
                    })
                    //   [
                    //   { value: "ru", label: "Ru" },
                    //   { value: "en", label: "En" },

                    //   { value: "de", label: "De" },
                    //   { value: "ch", label: "Ch", disabled: true },
                    // ]
                }
            />
        </div>
    );
};
