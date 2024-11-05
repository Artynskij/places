"use client";

import { FC, useEffect, useState, useRef } from "react";
import { IconShare } from "../Icons/IconShare/IconShare";
import style from "./buttonFunctional.module.scss";
import { mockObjectForObjectPage } from "@/asset/mockData/mockObject";
import Link from "next/link";
import { IconPhone } from "../Icons/IconPhone/IconPhone";
import { IconInstagram, IconTelegram, IconViber, IconWhatApp } from "../Icons";

interface IScheduleButton {
  classNameButton?: string;
  classNameButtonActive?: string;
  importTitle?: string;
  importDescription?: string;
  textButton?: string;
  scheduleData: typeof mockObjectForObjectPage.schedule;
}

export const ScheduleButton: FC<IScheduleButton> = ({
  classNameButton,
  classNameButtonActive,
  importTitle,
  textButton,
  importDescription,
  scheduleData,
}) => {
  const [popupActive, setPopupActive] = useState(false);
  const blockScheduleRef = useRef<HTMLDivElement | null>(null);

  const toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setPopupActive(!popupActive);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      blockScheduleRef.current &&
      !blockScheduleRef.current.contains(event.target as Node)
    ) {
      setPopupActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={blockScheduleRef}
      className={`${classNameButton} ${style.schedule} ${
        popupActive && classNameButtonActive
      }`}
    >
      <span onClick={toggle}>{textButton}</span>
      {popupActive && (
        <div className={style.schedule_popup}>
          <h4>{textButton}</h4>
          <ul className={style.schedule_popup_list}>
            {/* {ScheduleData.phoneNumber && (
              <li className={style.Schedule_popup_list_item}>
                <Link href={`tel:${ScheduleData.phoneNumber}`}>
                  <IconPhone className={style.Schedule_popup_list_item_icon} />
                  <span> {ScheduleData.phoneNumber}</span>
                </Link>
              </li>
            )} */}
            {scheduleData.map((item, index) => {
              return (
                <li className={style.schedule_popup_list_item} key={index}>
                  <span>{item.day}</span>
                  <span>{item.shedule}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
