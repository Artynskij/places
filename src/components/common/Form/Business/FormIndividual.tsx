"use client";
import style from "./businessForm.module.scss";
import * as Yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { InputPhoneNumber } from "@/components/UI/Input/InputPhone/InputPhone";
import { Button } from "@/components/UI/Button/Button";
import { UploadButton } from "../../ButtonFunctional/UploadButton";

import { BlockAgreements } from "../../BlockFunctional/BlockAgreements";

import { useNotification } from "@/lib/context";

import { useUser } from "@/lib/context/UserContext/UserContext";

import useLocale from "@/lib/hooks/useLocale";
import { GeneralBusinessService } from "@/lib/Api/(MainService)/business.general";

import { AGREEMENT_KEYS_BUS_INDIVIDUAL } from "@/asset/constants/front-database/agreements-keys.data";

import { useRouter } from "next/navigation";

import { validationBusinessIndividualSchema } from "@/lib/validationSchemas/business/businessValid.schema";
import { TTypeOwnerBusiness } from "@/lib/models/types";
import { IBusinessFront } from "@/lib/models";
import { BlockExtraInfo } from "../../BlockFunctional/BlockExtraInfo";

type TTypeForm = Yup.InferType<typeof validationBusinessIndividualSchema>;

interface IProp {
    business?: IBusinessFront;
    mode: "create" | "update";
    closeModal?: (value: false) => void;
}
export const FormIndividual = ({ business, mode, closeModal }: IProp) => {
    const notification = useNotification();
    const activeTab: TTypeOwnerBusiness = "individual";
    const { user } = useUser();
    const locale = useLocale();

    const generalBusinessService = new GeneralBusinessService();
    const initialFormData: TTypeForm | null = business
        ? {
              officialName: business.OfficialName,
              dateRegister: business.RegistrationDate || null,
              numberOrganization: business.RegistrationNumber || null,
              phone: business.Contacts.Phone || "",
              email: business.Contacts.Email || "",
              address: {
                  addressLine: business.Contacts.Address?.Street || "",
                  country: business.Contacts.Address?.Country || "",
                  district: business.Contacts.Address?.District || "",
                  town: business.Contacts.Address?.Town || "",
                  postalCode: business.Contacts.Address?.PostalCode || "",
              },
              agreements:
                  mode === "update" ? AGREEMENT_KEYS_BUS_INDIVIDUAL : undefined,
          }
        : null;

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationBusinessIndividualSchema),
        defaultValues: initialFormData || undefined,
    });

    const onSubmit: SubmitHandler<TTypeForm> = async (formData) => {
        if (!user) {
            notification.error({ message: "нету пользователя" });
            return;
        }
        let success = false;
        if (!business) {
            success = !!(await generalBusinessService.create({
                formData: formData,
                activeTab: activeTab,

                userId: user.id,
                locale: locale,
            }));
        } else {
            if (!initialFormData) {
                notification.error({ message: "Нету изначальной формы" });
                return;
            }
            success = !!(await generalBusinessService.update({
                formData: formData,
                business: business,
                initialForm: initialFormData,
                activeTab: activeTab,
                locale: locale,
                userId: user.id,
            }));
        }

        if (success) {
            notification.success({ message: "Бизнес отправлен на модерацию" });
            closeModal && closeModal(false);
            // router.push(
            //     ROUTES.PROFILE.OWNER(user.id, CONSTANT_TABS.owner.business)
            // );
        } else {
            notification.error({
                message:
                    "Произошла ошибка при создании бизнеса. Технические неполадки",
            });
        }
    };
    const onSubmitInvalid = () => {
        notification.error({
            message: "Пожалуйста, заполните обязательные поля",
        });
    };

    return (
        <form
            className={style.form}
            onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}
        >
            <BlockExtraInfo text="*Физическое лицо, которое самостоятельно владеет и управляет бизнесом без образования юридического лица" />
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>ФИО</div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.officialName?.message}
                        register={register("officialName")}
                        placeholder="ФИО*"
                        titleSpan="ФИО согласно удостоверению личности."
                        type="text"
                    />
                </div>
            </div>

            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>Контакты</div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.email?.message}
                        register={register("email")}
                        placeholder="Адрес электронной почты*"
                        titleSpan="Адрес электронной почты"
                        type="email"
                    />

                    <Controller
                        control={control}
                        name="phone"
                        render={({ field, fieldState }) => (
                            <InputPhoneNumber<"phone">
                                field={field}
                                error={fieldState.error || null}
                                titleSpan="Номер телефона*"
                            />
                        )}
                    />
                </div>
            </div>

            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Адрес регистрации
                </div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.address?.country?.message}
                        register={register("address.country")}
                        titleSpan="Страна*"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.district?.message}
                        register={register("address.district")}
                        titleSpan="Регион, область, штат*"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.town?.message}
                        register={register("address.town")}
                        titleSpan="Город*"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.addressLine?.message}
                        register={register("address.addressLine")}
                        titleSpan="Адрес – улица, дом, корпус, квартира/офис*"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.postalCode?.message}
                        register={register("address.postalCode")}
                        titleSpan="Почтовый индекс"
                        type="text"
                    />
                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Документы подтверждающие личность
                </div>
                <div className={style.selectionBlock_content}>
                    <Controller
                        name="documentsVerify"
                        control={control}
                        defaultValue={[]}
                        render={({ field, fieldState }) => (
                            <div>
                            <UploadButton
                                titleSpan="Прикрепление подтверждающих документов*"
                                accept="image"
                                maxSizeMB={10}
                                maxCount={10}
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error || null}
                            />
                            </div>
                        )}
                    />
                </div>
            </div>
            {mode === "create" && (
                <BlockAgreements
                    agreementKeys={AGREEMENT_KEYS_BUS_INDIVIDUAL}
                    value={watch("agreements") as string[]}
                    onChange={(vals) => setValue("agreements", vals)}
                    error={errors.agreements?.message}
                />
            )}

            <Button
                className={style.buttonAccept}
                typeLogic="submit"
                text={
                    mode === "create" ? "Зарегистрировать" : "Отправить форму"
                }
            />
        </form>
    );
};
