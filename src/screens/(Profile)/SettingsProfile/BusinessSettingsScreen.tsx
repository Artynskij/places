"use client";

import style from "./settings.module.scss";

import { IBusinessFront, IPageProps } from "@/lib/models";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { ROUTES } from "@/lib/config/Routes";
import { Loader } from "@/components/common/Loader/Loader";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { FormSoleProprietor } from "@/components/common/Form/Business/FormSoleProprietor";
import { useEffect, useState } from "react";
import { BusinessService } from "@/lib/Api/business/business.service";
import { FormIndividual } from "@/components/common/Form/Business/FormIndividual";
import { FormLegalEntity } from "@/components/common/Form/Business/FormLegalEntity";
import { AuthGuard } from "@/components/common/Auth/guards/AuthGuard";
interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        business: string;
    };
}
export const BusinessSettingsScreen = ({ params }: IProps) => {
    const [businessData, setBusinessData] = useState<IBusinessFront>();
    const businessService = new BusinessService();
    const { user } = useUser();

    useEffect(() => {
        businessService.getBusinessById(params.business).then((res) => {
            if (!res) return;
            setBusinessData(res);
        });
    }, []);

    return (
        <AuthGuard roles={["owner"]}>
            {!businessData || !user ? (
                <Loader />
            ) : (
                <div className={style.page}>
                    <Breadcrumb
                        links={[
                            {
                                title: "Личный кабинет владельца",
                                href: ROUTES.PROFILE.OWNER(user.id),
                            },
                            {
                                title: "Личный кабинет бизнеса",
                                href: ROUTES.PROFILE.BUSINESS(params.business),
                            },
                            { title: "Настройки бизнеса" },
                        ]}
                    />
                    <h2>{`Редактирование бизнеса(${businessData.LegalType.Code})`}</h2>
                    {businessData.LegalType.Code === "INDIVIDUAL" && (
                        <FormIndividual mode="update" business={businessData} />
                    )}
                    {businessData.LegalType.Code === "SOLE_PROPRIETOR" && (
                        <FormSoleProprietor
                            mode="update"
                            business={businessData}
                        />
                    )}
                    {businessData.LegalType.Code === "LEGAL_ENTITY" && (
                        <FormLegalEntity
                            mode="update"
                            business={businessData}
                        />
                    )}

                
                </div>
            )}
        </AuthGuard>
    );
};
