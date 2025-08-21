"use client";
import { FormInvite } from "@/components/common/Form/Invite/FormInvite";
import style from "./tabEmployees.module.scss";
import { Button } from "@/components/UI/Button/Button";
import { IBusinessFront, IInvitesByQueryItemResponse } from "@/lib/models";
import { useEffect, useState } from "react";
import { InvitesService } from "@/lib/Api/invites/invites.service";
import { useLocale } from "next-intl";
interface IProp {
    business: IBusinessFront;
}
const TabEmployees = ({ business }: IProp) => {
    const invitesService = new InvitesService();
    const locale = useLocale();

    const [listInvites, setListInvites] =
        useState<IInvitesByQueryItemResponse[]>();
    useEffect(() => {
        invitesService
            .getByQuery({ lang: locale, businessId: business.Id })
            .then((res) => {
                console.log(res);
                if (res) {
                    setListInvites(res);
                }
            });
    }, []);
    return (
        <div className={style.tab}>
            <div className={style.tab_title}>
                <h3>Сотрудники Бизнеса</h3>
                <FormInvite business={business}>
                    <Button
                        className={style.buttonInvite}
                        text="Пригласить сотрудника"
                    />
                </FormInvite>
            </div>
            <div className={style.tab_content}>
                <ul className={style.list}>
                    {listInvites && listInvites.length > 0 ? (
                        listInvites.map((invite) => {
                            return (
                                <li key={invite.id}>
                                    <span>
                                        {invite.person.name?.OriginalName ||
                                            "нету имени"}
                                    </span>
                                    <span>
                                        {invite.role.content.details[0].value}
                                    </span>
                                </li>
                            );
                        })
                    ) : (
                        <div>Тут нету сотрудников</div>
                    )}
                </ul>
            </div>
        </div>
    );
};
export default TabEmployees;
