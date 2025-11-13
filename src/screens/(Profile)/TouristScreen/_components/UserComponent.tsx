"use client";
import { Button } from "@/components/UI/Button/Button";
import style from "./userComponent.module.scss";
import Image from "next/image";
import Link from "next/link";
import { IconEdit, IconEye, IconSettings } from "@/components/common/Icons";
import { ROUTES } from "@/lib/config/Routes";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { useEffect, useMemo, useState } from "react";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";
import { useNotification } from "@/lib/context";
import { useLocale, useTranslations } from "next-intl";
import { CONSTANT_DEFAULT_AVATAR_URL } from "@/asset/constants/default.const";
import { Loader } from "@/components/common/Loader/Loader";
import { IPersonFront } from "@/lib/models/frontend/(person)/person.front";
import { IUser } from "@/lib/models/common/IUser";
import { createFormatDate } from "@/lib/helpers/create-format-date";
import { IPersonTravelMarkFront, ITravelProgressFront } from "@/lib/models";
import { PersonTravelMarkService } from "@/lib/Api/(Person)/personTravelMark.api";
import { BlockWorldVisited } from "@/components/common/BlockFunctional/BlockWorldVisited";
interface IUserComponent {
    // dataUser: (typeof mockTourist)[0];
}
const UserComponent = ({ }: IUserComponent) => {
    const services = useMemo(
        () => ({
            person: new PersonService(),
            personTravelMark: new PersonTravelMarkService(),
        }),
        []
    );

    const { user } = useUser();
    const [travelProgress, setTravelProgress] = useState<ITravelProgressFront>();
    const [marks, setMarks] = useState<IPersonTravelMarkFront[]>([]);

    useEffect(() => {
        if (!user) return;

        services.person.getTravelProgress(user.id).then((res) => {
            if (res) setTravelProgress(res);
        });

        services.personTravelMark.getByPersonId(user.id).then((res) => {
            if (res) setMarks(res);
        });
    }, [services, user]);

    const visitedList = useMemo(
        () => marks.filter((m) => m.isVisited),
        [marks]
    );

    if (!user) return <Loader />;


    return (
        <>
            <div className={style.container}>
                <div className={style.avatar_block}>
                    <Image
                        src={
                            user.avatar.touristImageSrc ||
                            CONSTANT_DEFAULT_AVATAR_URL
                        }
                        alt="avatar"
                        width={500}
                        height={500}
                    />
                </div>
                <div className={style.info_container}>
                    <div>
                        <div className={style.info_name}>
                            <span>
                                {user.personName?.surname ||
                                    user.personName?.name ||
                                    user.personName?.secondName
                                    ? [
                                        user.personName?.surname,
                                        user.personName?.name,
                                        user.personName?.secondName,
                                    ]
                                        .filter(Boolean)
                                        .join(" ")
                                    : "(заполните имя)"}
                            </span>
                            {/* <SubscribeButton /> */}
                            {/* <div className={style.info_settings}> */}

                            {/* </div> */}
                        </div>
                        <div className={style.info_username}>
                            @{user.nickname}
                        </div>
                        {/* {travelProgress && (
                            <div className={style.info_status}>
                                Статус путшественника:{" "}
                                {travelProgress.goalLevel}
                            </div>
                        )} */}

                        {user.contacts?.address?.town ||
                            user.contacts?.address?.country ? (
                            <div className={style.info_hometown}>
                                Я из:{" "}
                                {[
                                    user.contacts?.address?.country,
                                    user.contacts?.address?.town,
                                ]
                                    .filter(Boolean)
                                    .join(", ")}
                            </div>
                        ) : null}

                        <div className={style.info_register_block}>
                            День регистрации:{" "}
                            {createFormatDate(user.dateRegister)}
                        </div>
                        {/* {travelProgress && (
                            <div className={style.info_travel_block}>
                                Посетил:{" "}
                                {`${travelProgress.visitedCount} города(ов)`}-
                                {`${travelProgress.percentage}% мира`}.
                            </div>
                        )} */}
                        <BlockWorldVisited travelMarks={visitedList} />

                        {user.aboutDescription && (
                            <div className={style.info_description}>
                                О себе: {user.aboutDescription}
                            </div>
                        )}
                    </div>

                    {/* <div className={style.info_buttons}>
                        <Button text="Материалы" />
                        <Button
                            text={`Подписчики ${dataUser.subscribe.yourSubscriber}`}
                        />
                        <Button
                            text={`Подписки ${dataUser.subscribe.youSubscribe}`}
                        />
                        <ShareButton
                            classNameButton={style.info_shareButton}
                            textButton="Поделиться"
                            baseUrl={baseUrl}
                            linkPage={"/tourist"}
                            importTitle={dataUser.name}
                        />
                    </div> */}
                </div>
                <div className={style.manageProfile}>
                    <Link
                        href={ROUTES.PROFILE.SETTINGS.TOURIST(
                            user.id,
                            "personal"
                        )}
                    >
                        <Button
                            className={style.manageProfile_button}
                            icon={<IconEdit />}
                            text="Профиль"
                        />
                    </Link>
                    <Link
                        href={ROUTES.PROFILE.SETTINGS.TOURIST(
                            user.id,
                            "notification"
                        )}
                    >
                        <Button
                            className={style.manageProfile_button}
                            icon={<IconSettings />}
                            text="Настройки"
                        />
                    </Link>
                    {/* <Button icon={<IconEdit/>} text="редактировать профиль"/>
          <Button icon={<IconSettings/>} text="настройки профиля"/> */}
                </div>
            </div>
        </>
    );
};
export default UserComponent;
