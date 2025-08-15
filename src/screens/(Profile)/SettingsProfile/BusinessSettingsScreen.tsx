"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./settings.module.scss";


import { FormSettingsOwner } from "@/components/common/Form/Settings/FormSettingsOwner";

export const BusinessSettingsScreen = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
       <div className={style.page}>
            <h2>Редактирование бизнеса</h2>

            {/* <FormSettingsOwner /> */}
        </div>
    );
};
