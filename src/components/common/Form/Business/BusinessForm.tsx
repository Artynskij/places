"use client";
import style from "./businessForm.module.scss";
import clsx from "clsx";
import { switcherBusiness } from "@/asset/constants/switcherTabsPage";
import { FormIndividual } from "@/components/common/Form/Business/FormIndividual";

import { TTypeOwnerBusiness } from "@/lib/models/types/auth/TTypeOwnerBusiness";
import { FormSoleProprietor } from "@/components/common/Form/Business/FormSoleProprietor";
import { FormLegalEntity } from "@/components/common/Form/Business/FormLegalEntity";

import { useState } from "react";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { RiH1 } from "react-icons/ri";
interface IProps {
    children: React.ReactNode | React.ReactNode[] | null;
}
export const BusinessForm = ({ children }: IProps) => {
    const [activeTab, setActiveTab] =
        useState<TTypeOwnerBusiness>("individual");
    const [activeModal, setModalActive] = useState(false);
    const closeModal = () => {
        setModalActive(false);
    };
    return (
        <>
            <div onClick={() => setModalActive(true)}>{children}</div>
            <ModalCustom
                title="Создание бизнеса"
                closeModal={closeModal}
                active={activeModal}
                view="big"
            >
                <div className={style.container}>
                   
                    <div className={style.container_title}>Вы являетесь «Владельцем бизнеса», как :</div>
                    <div className={style.tabList}>
                        
                        {switcherBusiness.map((tab) => {
                            return (
                                
                                <div
                                    onClick={() =>
                                        setActiveTab(
                                            tab.value as TTypeOwnerBusiness
                                        )
                                    }
                                    className={clsx(
                                        style.tabList_item,
                                        tab.value === activeTab &&
                                            style.tabList_item_active
                                    )}
                                    key={tab.id}
                                >
                                    {tab.name}
                                </div>
                            );
                        })}
                    </div>

                   
                    {activeTab === "individual" && activeModal && (
                        <FormIndividual mode="create" closeModal={closeModal} />
                    )}
                    {activeTab === "sole_proprietor" && activeModal && (
                        <FormSoleProprietor
                            mode="create"
                            closeModal={closeModal}
                        />
                    )}
                    {activeTab === "legal_entity" && activeModal && (
                        <FormLegalEntity
                            mode="create"
                            closeModal={closeModal}
                        />
                    )}
                </div>
            </ModalCustom>
        </>
    );
};
