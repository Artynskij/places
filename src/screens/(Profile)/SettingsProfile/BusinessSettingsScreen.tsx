"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./settings.module.scss";


import { FormSettingsOwner } from "@/components/common/Form/Settings/FormSettingsOwner";
import { FormBusinessUpdate } from "@/components/common/Form/Business/FormBusinessUpdate";
import { IPageProps } from "@/lib/models";
interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        business: string;
    };
}
export const BusinessSettingsScreen = ({params}:IProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
       <div className={style.page}>
            <h2>Редактирование бизнеса</h2>

            <FormBusinessUpdate businessId={params.business}/>
        </div>
    );
};
