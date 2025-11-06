"use client";
import { IconPlus } from "@/components/common/Icons";
import style from "./tabBusinessOwner.module.scss";

import { Button } from "@/components/UI/Button/Button";
import { ROUTES } from "@/lib/config/Routes";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BusinessService } from "@/lib/Api/business/business.service";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { IBusinessFront } from "@/lib/models";

import { BusinessForm } from "@/components/common/Form/Business/BusinessForm";
import { log } from "console";

import { Card } from "antd";
import { getFormatDate } from "@/lib/helpers/getFormatDate";

export const TabBusinessOwner = () => {
    const services = useMemo(() => ({ business: new BusinessService() }), []);

    const { user } = useUser();
    const [businessData, setBusinessData] = useState<IBusinessFront[]>();
    const fetchData = useCallback(() => {
        if (user) {
            services.business
                .getPersonAssignment({ personId: user.id })
                .then((res) => {
                    if (res) {
                        const businessData = res
                            .map((item) => item.Business)
                            .filter((item) => !!item);

                        setBusinessData(businessData as IBusinessFront[]);
                    }
                });
        }
    }, [services, user]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return (
        <div className={style.tab}>
            <div className={style.tab_title}>
                <h3>Мои бизнесы</h3>
                <BusinessForm>
                    <Button
                        text={"Создать Бизнес"}
                        type="blue"
                        className={style.title_button}
                        icon={<IconPlus className={style.title_button_icon} />}
                    />
                </BusinessForm>
            </div>

            <ul className={style.list}>
                {businessData && businessData.length > 0 ? (
                    businessData.map((business) => {
                        return (
                            <Card
                                key={business.Id}
                                type="inner"
                                title={business.OfficialName}
                                extra={
                                    <Link
                                        href={ROUTES.PROFILE.BUSINESS(
                                            business.Id
                                        )}
                                        className={style.link}
                                    >
                                        Перейти
                                    </Link>
                                }
                            >
                                <p>
                                    <span className={style.description}>
                                        Дата добавления на сайт:
                                    </span>
                                    {getFormatDate(business.CreatedDate)}
                                </p>
                                <p>
                                    <span className={style.description}>
                                        Регистрационный номер:
                                    </span>
                                    {business.RegistrationNumber ||
                                        "Не указано"}
                                </p>
                                <p>
                                    <span className={style.description}>
                                        ID:
                                    </span>
                                    {business.Id}
                                </p>
                            </Card>
                        );
                    })
                ) : (
                    <div>нету бизнесов</div>
                )}
            </ul>
        </div>
    );
};
