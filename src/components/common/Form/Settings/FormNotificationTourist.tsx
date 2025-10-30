"use client";

import { Button } from "@/components/UI/Button/Button";
import style from "./settings.module.scss";
import { SwitchToggle } from "@/components/UI/SwitchToggle/SwitchToggle";
import { Controller, useForm } from "react-hook-form";
import { useNotification } from "@/lib/context";
// import { PersonSettingsService } from "@/lib/Api/(Person)/personSettings/personSettings.service";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";

import { useEffect, useMemo, useState } from "react";
import { IPersonSettingsFront } from "@/lib/models/frontend/(person)/personSettings.front";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { Loader } from "../../Loader/Loader";
import { ModerationService } from "@/lib/Api/moderation/moderation.service";
import { PersonSettingsService } from "@/lib/Api/(Person)/personSettings.api";

type TNotificationSettings = {
    ShowTravelMap: boolean;
    ShowPosts: boolean;
    ShowPhotoAlbums: boolean;
    ShowVideos: boolean;
    ShowRatingsAndReviews: boolean;
    NotifyServiceUpdates: boolean;
    NotifyNewPlaces: boolean;
    NotifyPartnerOffers: boolean;
    NotifyPersonalRecommendations: boolean;
    NotifyReviewModeration: boolean;
    NotifyContentModeration: boolean;
};
export const FormNotificationTourist = () => {
    const notification = useNotification();

    const services = useMemo(
        () => ({
            personSettings: new PersonSettingsService(),
            moderation: new ModerationService(),
        }),
        []
    );
    const { user, loadingUser } = useUser();

    const { control, handleSubmit, reset } = useForm<TNotificationSettings>();

    useEffect(() => {
        if (!user) {
            return;
        }

        if (user.personSettings) {
            const settings = user.personSettings;

            // Обновляем форму новыми значениями
            reset({
                ShowTravelMap: settings.showTravelMap,
                ShowPosts: settings.showPosts,
                ShowPhotoAlbums: settings.showPhotoAlbums,
                ShowVideos: settings.showVideos,
                ShowRatingsAndReviews: settings.showRatingsAndReviews,
                NotifyServiceUpdates: settings.notifyServiceUpdates,
                NotifyNewPlaces: settings.notifyNewPlaces,
                NotifyPartnerOffers: settings.notifyPartnerOffers,
                NotifyPersonalRecommendations:
                    settings.notifyPersonalRecommendations,
                NotifyReviewModeration: settings.notifyReviewModeration,
                NotifyContentModeration: settings.notifyContentModeration,
            });
        } else {
            // personSettingsApi.create(user.id);
        }
    }, [reset, loadingUser, user]);
    const onSubmit = async (dataForm: TNotificationSettings) => {
        if (!user) return;
        const moderationObject = await services.moderation.getModerationData(
            user.id
        );
        if (!moderationObject) {
            notification.error({
                message: "Серверная проблема, попробуйте позже. Нету модерации",
            });
            return;
        }
        const response = await services.personSettings.updateOrCreate(
            user.personSettings?.id || null,
            {
                moderation: moderationObject,
                data: dataForm,
            },
            user.id
        );
        if (response) {
            notification.success({ message: "данные успешно сохранены" });
        } else {
            notification.error({
                message: "Серверная ошибка. Попробуйте позже",
            });
        }
    };
    if (loadingUser) return <Loader />;
    return (
        <form className={style.tab} onSubmit={handleSubmit(onSubmit)}>
            <h2>Уведомления и отображение</h2>

            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Видимость профиля
                </div>
                <div className={style.selectionBlock_content}>
                    <Controller
                        name="ShowTravelMap"
                        control={control}
                        render={({ field }) => (
                            <SwitchToggle
                                value={field.value}
                                onChange={field.onChange}
                                titleSpan="Отображать карту путешествий"
                            />
                        )}
                    />

                    <Controller
                        name="ShowPosts"
                        control={control}
                        render={({ field }) => (
                            <SwitchToggle
                                value={field.value}
                                onChange={field.onChange}
                                titleSpan="Отображать публикации"
                            />
                        )}
                    />
                    <Controller
                        name="ShowPhotoAlbums"
                        control={control}
                        render={({ field }) => (
                            <SwitchToggle
                                value={field.value}
                                onChange={field.onChange}
                                titleSpan="Отображать фотоальбом"
                            />
                        )}
                    />
                    <Controller
                        name="ShowVideos"
                        control={control}
                        render={({ field }) => (
                            <SwitchToggle
                                value={field.value}
                                onChange={field.onChange}
                                titleSpan="Отображать видео"
                            />
                        )}
                    />
                    <Controller
                        name="ShowRatingsAndReviews"
                        control={control}
                        render={({ field }) => (
                            <SwitchToggle
                                value={field.value}
                                onChange={field.onChange}
                                titleSpan="Отображать оценки и отзывы"
                            />
                        )}
                    />
                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Почтовые уведомления
                </div>
                <div className={style.selectionBlock_content}>
                    <Controller
                        name="NotifyServiceUpdates"
                        control={control}
                        render={({ field }) => (
                            <SwitchToggle
                                value={field.value}
                                onChange={field.onChange}
                                titleSpan="О новинках"
                            />
                        )}
                    />
                    <Controller
                        name="NotifyNewPlaces"
                        control={control}
                        render={({ field }) => (
                            <SwitchToggle
                                value={field.value}
                                onChange={field.onChange}
                                titleSpan="О новых объектах"
                            />
                        )}
                    />
                    <Controller
                        name="NotifyPartnerOffers"
                        control={control}
                        render={({ field }) => (
                            <SwitchToggle
                                value={field.value}
                                onChange={field.onChange}
                                titleSpan="О предложениях партнеров"
                            />
                        )}
                    />
                    <Controller
                        name="NotifyPersonalRecommendations"
                        control={control}
                        render={({ field }) => (
                            <SwitchToggle
                                value={field.value}
                                onChange={field.onChange}
                                titleSpan="Подборка рекомендаций по интересам"
                            />
                        )}
                    />
                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Общие уведомления
                </div>
                <div className={style.selectionBlock_content}>
                    <Controller
                        name="NotifyReviewModeration"
                        control={control}
                        render={({ field }) => (
                            <SwitchToggle
                                value={field.value}
                                onChange={field.onChange}
                                titleSpan="О модерации и реакциях на отзывы"
                            />
                        )}
                    />
                    <Controller
                        name="NotifyContentModeration"
                        control={control}
                        render={({ field }) => (
                            <SwitchToggle
                                value={field.value}
                                onChange={field.onChange}
                                titleSpan="О модерации и реакциях на публикации, фото и видео"
                            />
                        )}
                    />
                </div>
            </div>

            <Button
                inlineStyle={{ width: "fit-content" }}
                typeLogic="submit"
                text="Сохранить"
            />
        </form>
    );
};
