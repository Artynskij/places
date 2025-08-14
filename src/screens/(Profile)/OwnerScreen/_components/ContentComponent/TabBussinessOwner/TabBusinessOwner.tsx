"use client";
import { IconPlus } from "@/components/common/Icons";
import style from "./tabBusinessOwner.module.scss";

import { Button } from "@/components/UI/Button/Button";
import { ROUTES } from "@/lib/config/Routes";
import Link from "next/link";
import { useEffect } from "react";
import { BusinessService } from "@/lib/Api/business/business.service";
import { useUser } from "@/lib/context/UserContext/UserContext";

const TabBusinessOwner = () => {
    const businessService = new BusinessService();
    const { user } = useUser();
    useEffect(() => {
        if (user) {
            businessService.getAssignment({ personId: user.id }).then((res) => {
                console.log(res);
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
                <li className={style.list_item}>1</li>
                <li className={style.list_item}>2</li>
                <li className={style.list_item}>3</li>
                <li className={style.list_item}>4</li>
                <li className={style.list_item}>5</li>
            </ul>
        </div>
    );
};
export default TabBusinessOwner;
