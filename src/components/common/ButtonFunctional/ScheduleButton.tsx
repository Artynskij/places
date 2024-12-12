"use client";

import { FC, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import style from "./buttonFunctional.module.scss";
import { mockObjectForObjectPage } from "@/asset/mockData/mockObject";

import { Popup } from "../Popup/Popup";
import { CONSTANTS_SCREENS } from "@/asset/constants/ScreensConst";

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
  const useMedia = useSelector((state: RootState) => state.screenSize);
  const toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setPopupActive(!popupActive);
  };

  useEffect(() => {
    if (popupActive) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          blockScheduleRef.current &&
          !blockScheduleRef.current.contains(event.target as Node)
        ) {
          setPopupActive(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [popupActive]);
  const closePopup = () => {
    setPopupActive(false);
  };
  return (
    <div
      ref={blockScheduleRef}
      className={`${classNameButton} ${style.schedule} ${
        popupActive && classNameButtonActive
      }`}
    >
      <span onClick={toggle}>{textButton}</span>
      {useMedia && (
        <>
          <Popup
            active={
              popupActive && useMedia.width < CONSTANTS_SCREENS.SCREEN_PHONE
            }
            closePopup={closePopup}
            size="small"
            title={textButton}
          >
            {/* <div className={style.schedule_popup}> */}

            <ul className={style.schedule_popup_list}>
              {scheduleData.map((item, index) => {
                return (
                  <li className={style.schedule_popup_list_item} key={index}>
                    <span>{item.day}</span>
                    <span>{item.shedule}</span>
                  </li>
                );
              })}
            </ul>
            {/* </div> */}
          </Popup>
          <div
            className={`${style.schedule_popup} ${
              popupActive &&
              !(useMedia.width < CONSTANTS_SCREENS.SCREEN_PHONE) &&
              style.contact_popup_active
            }`}
          >
            <h4>{textButton}</h4>
            <ul className={style.schedule_popup_list}>
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
        </>
      )}
    </div>
  );
};
