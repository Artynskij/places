"use client";
import { FC, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "./calendar.scss";
import { ButtonClose } from "../Button/ButtonClose";

type IValuePieceCalendar = Date | null;

type IValueCalendar =
  | IValuePieceCalendar
  | [IValuePieceCalendar, IValuePieceCalendar];
interface ICalendarProps {
  className?: string;
  activeCalendar: boolean;
  // setActiveCalendar: (value: boolean) => void;
  valueCalendar: IValueCalendar;
  setValueCalendar: (value: [Date, Date]) => void;
}
export const CalendarCustom: FC<ICalendarProps> = ({
  className,
  activeCalendar,
  // setActiveCalendar,
  valueCalendar,
  setValueCalendar,
}) => {
  // const [value, setValue] = useState<IValueCalendar>(new Date());

  function onChange(item: IValueCalendar) {
    const data = item as [Date, Date];
    setValueCalendar(data);
  }
  return (
    <div
      //   ref={rootRef}
      className={
        activeCalendar ? "calendar_ctn calendar_ctn_active" : "calendar_ctn"
      }
    >
      {/* <ButtonClose onClick={() => setActiveCalendar(false)} /> */}
      <Calendar
        minDate={new Date()}
        minDetail="month"
        goToRangeStartOnSelect={false}
        selectRange
        locale="ru"
        onChange={onChange}
        value={valueCalendar}
      />
    </div>
  );
};
