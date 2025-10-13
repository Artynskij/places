"use client";
import { Button } from "@/components/UI/Button/Button";
import style from "./tabEstablishment.module.scss";
import { IconPlus } from "@/components/common/Icons";
import Link from "next/link";
import { ROUTES } from "@/lib/config/Routes";
import { useTranslations } from "next-intl";
import useLocale from "@/lib/hooks/useLocale";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { useEffect, useState } from "react";
import { IEstablishmentFront } from "@/lib/models";
import { EstablishmentPersonAssignmentApi } from "@/lib/Api/(Establishment)/establishment/establishmentAssignment.api";
import { EstablishmentService } from "@/lib/Api/(Establishment)/establishment/establishment.service";
import CardEstablishmentTab from "./CardEstablishmentTab/CardEstablishmentTab";
import SkeletonTabEstablishment from "./SkeletonTabEstablishment";
import { FormCreateEstablishment } from "@/components/common/Form/Establishment/FormCreateEstablishment";

const TabEstablishmentCreated = () => {
    const locale = useLocale();
    const t = useTranslations("ProfilePage");
    const { user } = useUser();
    const [establishmentsData, setEstablishmentsData] = useState<
        IEstablishmentFront[] | null
    >();
    const establishmentPersonAssignmentService =
        new EstablishmentPersonAssignmentApi();
    const establishmentService = new EstablishmentService();
    useEffect(() => {
        async function getData() {
            if (!user) {
                return;
            }
            const estPersonAssign =
                await establishmentPersonAssignmentService.getAll({
                    personIds: [user.id],
                });
            const idsEstablishments = estPersonAssign
                .map((item) => item.EstablishmentId)
                .filter((item) => !!item) as string[];
            const establishmentsResponse =
                idsEstablishments.length > 0
                    ? await establishmentService.getByPagination({
                          pagination: { page: 1, pageSize: 10 },
                          lang: locale,
                          ids: idsEstablishments,
                      })
                    : [];

            setEstablishmentsData(establishmentsResponse || []);
        }
        if (user) {
            getData();
        }
    }, []);
    return (
        <div className={style.tabEstablishment_content}>
            <div className={style.tab_title}>
                <h3>{t("objectTab.myObject")}</h3>

                <FormCreateEstablishment>
                    <Button
                        text={t("objectTab.regObject")}
                        type="blue"
                        className={style.title_button}
                        icon={<IconPlus className={style.title_button_icon} />}
                    />
                </FormCreateEstablishment>
            </div>
            {!establishmentsData ? (
                <SkeletonTabEstablishment />
            ) : (
                <div className={style.list}>
                    {establishmentsData?.length === 0 ? (
                        <div>нету объектов</div>
                    ) : (
                        establishmentsData.map((item, index) => {
                            return (
                                <CardEstablishmentTab
                                    editObjectText={t("objectTab.editObject")}
                                    establishment={item}
                                    key={index}
                                />
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};
export default TabEstablishmentCreated;
