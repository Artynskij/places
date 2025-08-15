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

const TabBusinessOwner = () => {
    const businessService = new BusinessService();
    const { user } = useUser();
    const [businessData, setBusinessData] = useState<IBusinessFront[]>();
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
                <Link href={ROUTES.FORM.BUSINESS}>
                    <Button
                        text={"Создать Бизнес"}
                        type="blue"
                        className={style.title_button}
                        icon={<IconPlus className={style.title_button_icon} />}
                    />
                </Link>
            </div>

            <ul className={style.list}>
                {businessData?.map((business) => {
                    return (
                        <Link
                            href={ROUTES.PROFILE.BUSINESS(business.Id)}
                            key={business.Id}
                        >
                            <li className={style.list_item}>
                                {business.OfficialName}
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
};
export default TabBusinessOwner;
