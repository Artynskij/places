"use client";
import { FormInvite } from "@/components/common/Form/Invite/FormInvite";
import style from "./tabEmployees.module.scss";
import { Button } from "@/components/UI/Button/Button";
import { IBusinessFront, IInvitesByQueryItemResponse } from "@/lib/models";
import { useEffect, useState } from "react";
import { InvitesService } from "@/lib/Api/invites/invites.service";
import useLocale from "@/lib/hooks/useLocale";
import { useUser } from "@/lib/context/UserContext/UserContext";
interface IProp {
    business: IBusinessFront;
}
export const TabEmployees = ({ business }: IProp) => {
    const invitesService = new InvitesService();
    const locale = useLocale();
    const { user } = useUser();
    const [listInvites, setListInvites] =
        useState<IInvitesByQueryItemResponse[]>();
    useEffect(() => {
        if (!user) return;
        const dataLoad = async () => {
            const firstInvitesList = await invitesService.getByQuery({
                lang: locale,
                businessId: business.Id,
            });

            if (!firstInvitesList) return;
            const foundPersonInvite = firstInvitesList.find(
                (item) => item.person.id === user?.id
            );
            if (!foundPersonInvite) return;
            if (foundPersonInvite.activated) {
                setListInvites(firstInvitesList);
            } else {
                await invitesService.applyPerson(foundPersonInvite.id);
                const secondInvitesList = await invitesService.getByQuery({
                    lang: locale,
                    businessId: business.Id,
                });
                if (!secondInvitesList) return;
                setListInvites(secondInvitesList);
            }
        };
        dataLoad();
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
                                <li className={style.list_item} key={invite.id}>
                                    <span>
                                        {invite.person.name?.OriginalName ||
                                            "нету имени"}
                                    </span>
                                    <span>
                                        {invite.role.content.details[0].value}
                                    </span>
                                    <span
                                        className={
                                            invite.activated
                                                ? style.status_active
                                                : style.status_disActive
                                        }
                                    >
                                        {invite.activated
                                            ? "Активен"
                                            : "Приглашение отправлено"}
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
