"use client";

import { Button } from "@/components/UI/Button/Button";
import style from "../../settings.module.scss";
import { SwitchToggle } from "@/components/UI/SwitchToggle/SwitchToggle";
import { Controller, useForm } from "react-hook-form";
import { useNotification } from "@/lib/context";
import { PersonSettingsService } from "@/lib/Api/(Person)/personSettings/personSettings.service";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";
import { mockPersonId } from "@/asset/mockData/mockServerData";
import { useEffect, useState } from "react";
import { IPersonSettingsFront } from "@/lib/models/frontend/(person)/personSettings.front";

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
const TabNotification = () => {
    const notification = useNotification();
    const personApi = new PersonService();
    const personSettingsApi = new PersonSettingsService();
    const [notificationData, setNotificationData] =
        useState<IPersonSettingsFront>();
    const { control, handleSubmit, reset } = useForm<TNotificationSettings>();

    useEffect(() => {
        personApi.getPersonById(mockPersonId).then(async (res) => {
            if (res) {
                if (res.personSettings) {
                    const settings = res.personSettings;
                    setNotificationData(settings);

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
                        NotifyContentModeration:
                            settings.notifyContentModeration,
                    });
                } else {
                    await personSettingsApi.createPersonSettings(res.id);
                }
            }
        });
    }, [reset]);
    const onSubmit = async (dataForm: TNotificationSettings) => {
        console.log("Данные из формы UI:", dataForm);
        const personData = await personApi.getPersonById(mockPersonId);
        if (!personData) {
            notification.success({ message: "не найден пользователь" });
            return;
        }

        if (personData.personSettings) {
            await personSettingsApi.updatePersonSettings(
                personData.personSettings.id,
                dataForm
            );
        } else {
            notification.error({
                message: "какие-то проблемы при отправке данных",
            });
        }

        notification.success({ message: "данные успешно сохранены" });
    };
    return (
        <form className={style.tab} onSubmit={handleSubmit(onSubmit)}>
            <h2>Уведомления и отбражение</h2>

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
export default TabNotification;
