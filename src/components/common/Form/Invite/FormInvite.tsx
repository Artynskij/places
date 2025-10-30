"use client";
import * as Yup from "yup";
import {
    Controller,
    FieldError,
    SubmitHandler,
    useForm,
} from "react-hook-form";

import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import style from "./formInvite.module.scss";
import { useEffect, useMemo, useState } from "react";
import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { IBusinessFront, IOption } from "@/lib/models";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "@/lib/context";
import { Loader } from "../../Loader/Loader";
import { Button } from "@/components/UI/Button/Button";
import { useTranslations } from "next-intl";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";

import { InvitesService } from "@/lib/Api/invites/invites.service";

const validationSchemaInvite = Yup.object({
    email: Yup.string()
        .email("Неккоректный адрес электронной почты")
        .required("Адрес электронной почты обязателен"),
    role: Yup.string().required("Роль обязательна"),
});
interface IProp {
    children: React.ReactNode | React.ReactNode[];
    business: IBusinessFront;
}
export const FormInvite = ({ children, business }: IProp) => {
    type TTypeForm = Yup.InferType<typeof validationSchemaInvite>;
    const notification = useNotification();
    const tRole = useTranslations("Role");
    const services = useMemo(
        () => ({
            dataLoadManagement: new DataLoadManagementService(),
            person: new PersonService(),
            invite: new InvitesService(),
        }),
        []
    );

    const [optionsRoles, setOptionsRoles] = useState<IOption[]>();
    const [modalActive, setModalActive] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchemaInvite),
    });
    useEffect(() => {
        services.dataLoadManagement.getRolesOwner().then((res) => {
            if (res) {
                const options: IOption[] = res.map((role) => {
                    return {
                        label: tRole(role.code),
                        value: role.id,
                        id: role.id,
                    };
                });
                setOptionsRoles(options);
            }
        });
    }, [services, tRole]);

    const handlerCloseModal = () => {
        setModalActive(false);
    };
    const onSubmit: SubmitHandler<TTypeForm> = async (dataForm) => {
        const personInviteId = await services.person.getByEmail(dataForm.email);
        console.log(personInviteId);
        if (!personInviteId) {
            notification.error({
                message: `Пользователя(${dataForm.email}) не существует`,
            });
            return;
        }
        const invitedData = await services.invite.create({
            businessId: business.Id,
            roleId: dataForm.role,
            personId: personInviteId,
        });
        if (invitedData) {
            notification.success({ message: "Приглашение отправлено" });

            setModalActive(false);
        }
    };
    const onSubmitInvalid = (e: any) => {
        console.log(e);
        notification.error({
            message: "Пожалуйста, заполните обязательные поля",
        });
    };
    return (
        <>
            <div
                className={style.form_buttonOpen}
                onClick={() => setModalActive(true)}
            >
                {children}
            </div>
            <ModalCustom
                title="Приглашение сотрудника"
                active={modalActive}
                closeModal={handlerCloseModal}
                view="fit"
            >
                <form
                    onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}
                    className={style.form}
                >
                    <InputForm
                        error={errors.email?.message}
                        register={register("email")}
                        placeholder="Адрес электронной почты*"
                        titleSpan="Адрес электронной почты."
                        type="email"
                    />
                    <Controller
                        control={control}
                        name="role"
                        render={({ field, fieldState }) => (
                            <div className={style.selectBlock}>
                                <label>Роль сотрудника*</label>
                                {optionsRoles && (
                                    <SelectCustom
                                        classNameCtn={style.selectBlock_select}
                                        options={optionsRoles}
                                        activeOption={field.value}
                                        onChange={(option) =>
                                            field.onChange(option.value)
                                        }
                                        titleDefault="Выбрать роль"
                                        error={fieldState.error?.message}
                                    />
                                )}
                            </div>
                        )}
                    />
                    <Button
                        className={style.form_buttonSubmit}
                        typeLogic="submit"
                        text={"Добавить сотрудника"}
                    />
                    {isSubmitting && <Loader />}
                </form>
            </ModalCustom>
        </>
    );
};
