"use client";

import style from "./formRate.module.scss";
import * as Yup from "yup";

import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { useState } from "react";
import { RateCafe } from "../../RateCustom/RateCafe";
import { RateMain } from "../../RateCustom/RateMain";
import { useTranslations } from "next-intl";
import { TTypesOfEstablishment } from "@/lib/models/types";
import { InputDate } from "@/components/UI/Input/InputDate/InputDate";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "@/lib/context";
import { Button } from "@/components/UI/Button/Button";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { EstablishmentService } from "@/lib/Api/(Establishment)/establishment/establishment.service";
import { IEstablishmentFront } from "@/lib/models";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/Routes";
import { validDateSchema } from "@/lib/validationSchemas";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
import { ModerationService } from "@/lib/Api/moderation/moderation.service";
interface IProp {
    children: React.ReactNode | React.ReactNode[];
    typeEstablishment: TTypesOfEstablishment;
    establishment: IEstablishmentFront;
}
const validation = Yup.object({
    date: validDateSchema.required("Дата посещения обязательна"),
    averageRate: Yup.number().required("Главная оценка обязательна"),
    // только если это "EATER"
    Food: Yup.number(),
    Service: Yup.number(),
    Value: Yup.number(),

    // если это "ACCOMMODATION"
    Rooms: Yup.number(),
    PriceQuality: Yup.number(),
    Clean: Yup.number(),
    Location: Yup.number(),
});
type TTypeForm = Yup.InferType<typeof validation>;
export const FormRate = ({
    children,
    typeEstablishment,
    establishment,
}: IProp) => {
    const pathname = usePathname();
    const tRate = useTranslations("Rates");
    const notification = useNotification();
    const router = useRouter();
    const { user } = useUser();

    const establishmentService = new EstablishmentService();
    const moderationService = new ModerationService();
    const [modalActive, setModalActive] = useState(false);
    const handlerCloseModal = () => {
        setModalActive(false);
    };
    const ratesAccommodation = [
        "Service",
        "Rooms",
        "PriceQuality",
        "Clean",
        "Location",
    ] as const;
    const ratesEater = ["Food", "Service", "Value"] as const;

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(validation),
    });
    const openModal = () => {
        const redirectUrl = encodeURIComponent(pathname);
        if (user) {
            setModalActive(true);
        } else {
            notification.error({
                message: "Чтобы оценить объект надо войти в личный кабинет.",
            });
            router.replace(
                `${ROUTES.AUTH.LOGIN}?${CONSTANT_SEARCH_PARAMS.REDIRECT}=${redirectUrl}`
            );
        }
    };
    const onSubmit: SubmitHandler<TTypeForm> = async (dataForm) => {
        if (!user) return;
        const moderationObject = await moderationService.getModerationData(
            user.id
        );
        if (!moderationObject) {
            notification.error({
                message: "системная ошибка. Попробуйте позже",
            });
            return;
        }
        establishmentService
            .createRateReview({
                moderation: moderationObject,
                data: {
                    Person: user.id,
                    Establishment: establishment.id,
                    PersonsVisitDate: dataForm.date,
                    Rate: dataForm.averageRate,
                    Rooms: dataForm.Rooms || null,
                    PriceQuality: dataForm.PriceQuality || null,
                    Clean: dataForm.Clean || null,
                    Location: dataForm.Location || null,
                    Food: dataForm.Food || null,
                    Service: dataForm.Service || null,
                    Value: dataForm.Value || null,
                    Accessibility: null,
                    Atmosphere: null,
                    Comfort: null,
                    Quality: null,
                    Safety: null,
                },
            })
            .then((res) => {
                if (res) {
                    notification.success({ message: "Спасибо за вашу оценку" });
                    setModalActive(false);
                    reset();
                } else {
                    notification.error({
                        message: "Ошибка при отправлении оценки",
                    });
                }
            });
    };
    const onSubmitInvalid = (e: any) => {
        console.log(e);

        notification.error({
            message: "Пожалуйста, заполните обязательные поля",
        });
    };
    return (
        <>
            <div onClick={openModal}>{children}</div>
            <ModalCustom
                title="Оценить объект"
                closeModal={handlerCloseModal}
                active={modalActive}
            >
                <form
                    onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}
                    className={style.form}
                >
                    <Controller
                        name="date"
                        control={control}
                        render={({ field, fieldState }) => (
                            <InputDate
                                titleSpan="Дата посещения ДД.ММ.ГГГГ*"
                                value={field.value || ""}
                                onChange={field.onChange}
                                error={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="averageRate"
                        render={({ field, fieldState }) => (
                            <div className={style.rateBlock}>
                                <span>Главная оценка</span>
                                <RateMain
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={isSubmitting}
                                />
                                {fieldState.error && (
                                    <SpanErrorForm
                                        text={fieldState.error.message}
                                    />
                                )}
                            </div>
                        )}
                    />

                    {typeEstablishment === "ACCOMMODATION" &&
                        ratesAccommodation.map((rate) => {
                            return (
                                <Controller
                                    key={rate}
                                    control={control}
                                    name={rate}
                                    render={({ field, fieldState }) => (
                                        <div className={style.rateBlock}>
                                            <span>{tRate(rate)}</span>
                                            <RateMain
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={isSubmitting}
                                            />
                                            {fieldState.error && (
                                                <p className={style.error}>
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            );
                        })}
                    {typeEstablishment === "EATER" &&
                        ratesEater.map((rate) => {
                            return (
                                <Controller
                                    key={rate}
                                    control={control}
                                    name={rate}
                                    render={({ field, fieldState }) => (
                                        <div className={style.rateBlock}>
                                            <span>{tRate(rate)}</span>
                                            <RateMain
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={isSubmitting}
                                            />
                                            {fieldState.error && (
                                                <p className={style.error}>
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            );
                        })}
                    <Button
                        className={style.buttonSubmit}
                        typeLogic="submit"
                        text="Оставить оценку"
                    />
                </form>
            </ModalCustom>
        </>
    );
};
