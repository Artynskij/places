"use client";
import { IconPlus } from "@/components/common/Icons";
import style from "./tabBusinessOwner.module.scss";

import { Button } from "@/components/UI/Button/Button";
import { ROUTES } from "@/lib/config/Routes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BusinessService } from "@/lib/Api/business/business.service";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { IBusinessFront } from "@/lib/models";

import { BusinessForm } from "@/components/common/Form/Business/BusinessForm";
import { log } from "console";

import { Card } from 'antd';
import { getFormatDate } from "@/lib/helpers/getFormatDate";

const TabBusinessOwner = () => {
    const businessService = new BusinessService();
    const { user } = useUser();
    const [businessData, setBusinessData] = useState<IBusinessFront[]>();
    console.log('businessData в компоненте.', businessData)
    useEffect(() => {
        if (user) {
            businessService.getAssignment({ personId: user.id }).then((res) => {
                if (res && res) {
                    const businessData = res
                        .map((item) => item.Business)
                        .filter((item) => !!item);

                    setBusinessData(businessData as IBusinessFront[]);
                }
            });

        }
    }, []);
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
                            <Link
                                href={ROUTES.PROFILE.BUSINESS(business.Id)}
                                key={business.Id}
                            >
                                {/* <li className={style.list_item}>
                                    <div className={style.flex_container}>
                                        <span className={style.name}>{business.OfficialName}</span>
                                        <span className={style.createdDate}>
                                            Добавлен: {new Date(business.CreatedDate).toLocaleDateString('ru-RU')}
                                        </span>
                                    </div>
                                </li> */}

                                <Card  type="inner" title={business.OfficialName} extra={<a href="#">Посмотреть</a>}>
                                    <p><span className={style.description}>Дата добавления на сайт:</span> {getFormatDate(business.CreatedDate)}</p>

                                </Card>


                            </Link>
                        );
                    })
                ) : (
                    <div>нету бизнесов</div>
                )}
            </ul>
        </div>
    );
};
export default TabBusinessOwner;
