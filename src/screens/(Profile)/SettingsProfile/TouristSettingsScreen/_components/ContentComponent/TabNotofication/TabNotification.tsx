"use client";

import { Button } from "@/components/UI/Button/Button";
import style from "../contentComponent.module.scss";
import { SwitchToggle } from "@/components/UI/SwitchToggle/SwitchToggle";
import { Controller, useForm } from "react-hook-form";
import { useNotification } from "@/lib/context";

type TNotificationSettings = {
    showTravelMap: boolean;
    showPosts: boolean;
    showPhotoAlbums: boolean;
    showVideos: boolean;
    showRatingsAndReviews: boolean;
    notifyServiceUpdates: boolean;
    notifyNewPlaces: boolean;
    notifyPartnerOffers: boolean;
    notifyPersonalRecommendations: boolean;
    notifyReviewModeration: boolean;
    notifyContentModeration: boolean;
};
const TabNotification = () => {
    const notification = useNotification();
    const { control, handleSubmit } = useForm<TNotificationSettings>({
        defaultValues: {
            showTravelMap: false,
            showPosts: false,
            showPhotoAlbums: false,
            showVideos: false,
            showRatingsAndReviews: false,
            notifyServiceUpdates: false,
            notifyNewPlaces: false,
            notifyPartnerOffers: false,
            notifyPersonalRecommendations: false,
            notifyReviewModeration: false,
            notifyContentModeration: false,

            // notifyByEmail: false,
            // notifyBySMS: true,
            // notifyInApp: true,
        },
    });
    const onSubmit = (data: TNotificationSettings) => {
        console.log("Настройки уведомлений:", data);
        notification.success({message:"данные успешно сохранены"});
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
                            name="showTravelMap"
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
                            name="showPosts"
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
                            name="showPhotoAlbums"
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
                            name="showVideos"
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
                            name="showRatingsAndReviews"
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
                            name="notifyServiceUpdates"
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
                            name="notifyNewPlaces"
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
                            name="notifyPartnerOffers"
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
                            name="notifyPersonalRecommendations"
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
                            name="notifyReviewModeration"
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
                            name="notifyContentModeration"
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
