"use client";

import { FC, useEffect, useState } from "react";
import style from "./cardMarketing.module.scss";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";

import { FormMarketing } from "@/components/UI/Form/FormMarketing/FormMarketing";
import { IconPlus } from "@/components/UI/Icons";



interface IMarketing {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
}
interface ICardMarketingProps {
  data: IMarketing;
  setRefreshCookie: (value: boolean) => void;
  // setMainMarketingObj: React.Dispatch<
  //   React.SetStateAction<IMarketingMainObj[] | null>
  // >;
}
export const CardMarketing: FC<ICardMarketingProps> = ({
  data,
  setRefreshCookie
  // setMainMarketingObj,
}) => {
  const [modalActive, setModalActive] = useState(false);
  // useEffect(() => {

  // }, [modalActive]);
  function openModal() {
    setModalActive(true);
  }

  return (
    <>
      <div  className={style.card}>
        <h4>{data.name}</h4>

        <div className={style.card_description}>{data.description}</div>
        <div className={style.card_price}>{data.price}р.</div>
        <IconPlus className={style.card_button} onClick={openModal}/>
      </div>

      <ModalCustom
        title={data.name}
        active={modalActive}
        setActive={setModalActive}
      >
        {modalActive && (
          <FormMarketing
            
            setRefreshCookie={setRefreshCookie}
            data={data}
            setModalActive={setModalActive}
          />
        )}
      </ModalCustom>
    </>
  );
};
