import { FC, useEffect, useRef, useState } from "react";
import style from "./formMarketing.module.scss";

import {
  IDataAdvertisingCookie,
  IDataAdvertisingItem,
  ISelectOption,
} from "@/types/IType";

import { mockSelectSquare } from "@/asset/mockData/mockMarketing";
import { useCookie } from "@/asset/hooks/useCookie";
import { Alert } from "antd";
import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { Button } from "@/components/UI/Button/Button";
import { CalendarCustom } from "@/components/UI/CalendarCustom/CalendarCustom";

type IValuePieceCalendar = Date;

type IValueCalendar = [IValuePieceCalendar, IValuePieceCalendar];

interface IMarketing {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
}

interface IFormMarketingProps {
  data: IMarketing;
  setModalActive: (value: boolean) => void;
  setRefreshCookie: (value: boolean) => void;

  // setMainMarketingObj: React.Dispatch<
  //   React.SetStateAction<IMarketingMainObj[] | null>
  // >;
}

export const FormMarketing: FC<IFormMarketingProps> = ({
  data,
  setModalActive,
  setRefreshCookie,
}) => {
  const cookie = useCookie();

  const [valueSelectFacility, setValueSelectFacility] = useState<{
    name: string;
    value: string;
  } | null>(null);
  const [valueSelectLang, setValueSelectLang] = useState<{
    name: string;
    value: string;
  } | null>(null);
  const [valueSelectCountry, setValueSelectCountry] = useState<{
    name: string;
    value: string;
  } | null>(null);
  const [valueSelectDistrict, setValueSelectDistrict] = useState<{
    name: string;
    value: string;
  } | null>(null);
  const [valueSelectTown, setValueSelectTown] = useState<{
    name: string;
    value: string;
  } | null>(null);
  const [valueCalendar, setValueCalendar] = useState<IValueCalendar>([
    new Date(),
    new Date(),
  ]);

  const [activeCalendar, setActiveCalendar] = useState<boolean>(false);

  const calendarBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;

      if (
        target instanceof Node &&
        !calendarBlockRef.current?.contains(target)
      ) {
        setActiveCalendar(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  function toggleCalendar() {
    setActiveCalendar(!activeCalendar);
  }
  function validData(type: string) {
    alert(`Заполни форму пожалуйста тип ${type}`);
  }
  function handleSubmitForm() {
    let submitData: IDataAdvertisingItem = {
      type: "country",
      country: { name: "", value: "" },
      language: { name: "", value: "" },
      facility: { name: "", value: "" },
      calendar: ["", ""],
      price: { allPrice: 0, priceOne: 0 },
    };
    const daysCountCalendar = Math.ceil(
      Math.abs(valueCalendar[1].getTime() - valueCalendar[0].getTime()) /
        (1000 * 3600 * 24)
    );
    switch (data.type) {
      case "town":
        if (!valueSelectTown) {
          validData(data.type);
          return;
        }
        submitData.town = valueSelectTown;
        submitData.type = data.type;

      case "district":
        if (!valueSelectDistrict) {
          validData(data.type);
          return;
        }
        submitData.type = data.type;
        submitData.district = valueSelectDistrict;

      case "country":
        if (
          !valueSelectCountry ||
          !valueSelectLang ||
          !valueSelectFacility ||
          !valueCalendar
        ) {
          validData(data.type);
          return;
        }
        const transformCalendarDate = [
          `${valueCalendar[0].getDate()}.${
            valueCalendar[0].getMonth() + 1
          }.${valueCalendar[0].getFullYear()}`,
          `${valueCalendar[1].getDate()}.${
            valueCalendar[1].getMonth() + 1
          }.${valueCalendar[1].getFullYear()}`,
        ];

        submitData.type = data.type;
        submitData.country = valueSelectCountry;
        submitData.language = valueSelectLang;
        submitData.facility = valueSelectFacility;
        submitData.calendar = transformCalendarDate;
        submitData.price.priceOne = data.price;
        submitData.price.allPrice = data.price * (daysCountCalendar | 1);
        break;

      default:
        break;
    }

    console.log(submitData);

    const advertising = cookie.get(
      "advertisingNotPay"
    ) as IDataAdvertisingCookie | null;

    advertising
      ? cookie.set("advertisingNotPay", {
          rows: advertising.data.length + 1,
          price: advertising.price + submitData.price.allPrice,
          data: [...advertising.data, submitData],
        })
      : cookie.set("advertisingNotPay", {
          rows: 1,
          price: submitData.price.allPrice,
          data: [submitData],
        });

    setRefreshCookie(true);
    setModalActive(false);
    setValueSelectLang(null);
    setValueSelectCountry(null);
    setValueSelectDistrict(null);
    setValueSelectTown(null);
    setValueSelectFacility(null);
    setValueCalendar([new Date(), new Date()]);
  }
  return (
    <>
      <div className={style.form_content_buttons}>
        <div className={style.form_select}>
          <SelectCustom
            onChange={(item: ISelectOption) => setValueSelectFacility(item)}
            title={"Выберите объект"}
            activeOption={valueSelectFacility?.value}
            options={mockSelectSquare.mockFacilityForSelect}
          />
        </div>
        <div className={style.form_select}>
          <SelectCustom
            onChange={(item: ISelectOption) => setValueSelectLang(item)}
            title={"Выберите язык"}
            activeOption={valueSelectLang?.value}
            options={mockSelectSquare.mockLanguageForSelect}
          />
        </div>
        <div className={style.form_select}>
          <SelectCustom
            onChange={(item: ISelectOption) => setValueSelectCountry(item)}
            title={"Выберите страну"}
            activeOption={valueSelectCountry?.value}
            options={mockSelectSquare.mockCountriesForSelect}
          />
        </div>
        {(data.type === "district" || data.type === "town") && (
          <div className={style.form_select}>
            <SelectCustom
              onChange={(item: ISelectOption) => setValueSelectDistrict(item)}
              title={"Выберите область"}
              activeOption={valueSelectDistrict?.value}
              options={mockSelectSquare.mockDistrictForSelect}
            />
          </div>
        )}
        {data.type === "town" && (
          <div className={style.form_select}>
            <SelectCustom
              onChange={(item: ISelectOption) => setValueSelectTown(item)}
              title={"Выберите город"}
              activeOption={valueSelectTown?.value}
              options={mockSelectSquare.mockTownsForSelect}
            />
          </div>
        )}

        <div ref={calendarBlockRef} className={style.form_calendarBlock}>
          <Button
            onClick={() => toggleCalendar()}
            text="Календарь"
            type="light"
          />
          <CalendarCustom
            activeCalendar={activeCalendar}
            // setActiveCalendar={setActiveCalendar}
            className={style.form_calendar}
            valueCalendar={valueCalendar}
            setValueCalendar={setValueCalendar}
          />
        </div>
      </div>

      <div className={style.form_content_blockSend}>
        <Button onClick={handleSubmitForm} text="готово" type="blue" />
      </div>
    </>
  );
};
