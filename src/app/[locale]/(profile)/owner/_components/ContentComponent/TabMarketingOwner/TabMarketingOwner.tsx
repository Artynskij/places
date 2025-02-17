"use client";
import { mockMarketing } from "@/asset/mockData/mockMarketing";
import style from "./marketingOwner.module.scss";
import { CardMarketing } from "./_card/CardMarketing";
import { Button } from "@/components/UI/Button/Button";
import { useEffect, useState } from "react";
import { useCookie } from "@/asset/hooks/useCookie";
import { IDataAdvertisingCookie, IDataAdvertisingItem } from "@/models/IType";
import { IconDelete } from "@/components/common/Icons";
import { useTranslations } from "next-intl";

export const TabMarketingOwner = () => {
  const t = useTranslations("ProfilePage");

  const [advertising, setAdvertising] = useState<IDataAdvertisingCookie | null>(
    null
  );
  const [refreshCookie, setRefreshCookie] = useState(false);
  const cookie = useCookie();
  useEffect(() => {
    const advertisingCookie = cookie.get("advertisingNotPay");

    const getAdvertising = advertisingCookie
      ? (cookie.get("advertisingNotPay") as IDataAdvertisingCookie)
      : null;
    setAdvertising(getAdvertising);
    setRefreshCookie(false);
  }, [refreshCookie]);

  function clickPay() {}
  function deleteChoice(indexItem: number) {
    // const filterArray = advertising;
    const filterArray = advertising?.data.filter(
      (item, index) => index !== indexItem
    ) as IDataAdvertisingItem[];
    filterArray.length > 0
      ? cookie.set("advertisingNotPay", {
          rows: filterArray.length,
          price: advertising
            ? advertising?.price - advertising?.data[indexItem].price.allPrice
            : 0,
          data: filterArray,
        })
      : cookie.remove("advertisingNotPay");
    setRefreshCookie(true);
  }
  return (
    <>
      {mockMarketing.map((item, index) => {
        return (
          <div className={style.group} key={index}>
            <h2 className={style.group_title}>
              {t(`marketingTab.${item.name}`)}
            </h2>
            <div className={style.group_content}>
              <div className={style.group_content_title}>
                <span>{t("tableOptions.type")}</span>
                <span>{t("tableOptions.description")}</span>
                <span>{t("tableOptions.priceForDay")}</span>
              </div>
            </div>
            <div className={style.group_content_list}>
              {item.data.map((cardData, index) => {
                return (
                  <li key={index}>
                    <CardMarketing
                      setRefreshCookie={setRefreshCookie}
                      // setMainMarketingObj={setMainMarketingObj}

                      data={cardData}
                    />
                  </li>
                );
              })}
            </div>
          </div>
        );
      })}
      {advertising && (
        <div className={style.choice}>
          <h2 className={style.choice_title}>{t("marketingTab.subTitle")}</h2>
          <div className={style.choice_content}>
            <ul className={style.choice_list}>
              <div className={style.choice_content_title}>
                <span>{t("tableOptions.type")}</span>
                <span>{t("tableOptions.place")}</span>
                <span>{t("tableOptions.yourObject")}</span>
                <span>{t("tableOptions.language")}</span>
                <span>{t("tableOptions.period")}</span>
                <span>{t("tableOptions.priceForAllDays")}</span>
              </div>
              {advertising.data?.map((item, index) => {
                return (
                  <li
                    className={style.choice_content_list_item}
                    key={index + 10000}
                  >
                    <span>{item.type}</span>
                    <span>
                      {item.town?.name ||
                        item.district?.name ||
                        item.country.name}
                    </span>

                    <span>{item.facility.name}</span>
                    <span>{item.language.name}</span>
                    <span>{item.calendar[0] + " - " + item.calendar[1]}</span>
                    <span>
                      {item.price.allPrice}р. / {item.price.priceOne}р.
                    </span>
                    <IconDelete
                      className={style.choice_content_list_item_button}
                      onClick={() => deleteChoice(index)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={style.choice_pay}>
            <Button onClick={clickPay} text={t("marketingTab.pay")} />
            <span className={style.choice_pay_price}>
              {t("marketingTab.cost")} -{" "}
              {advertising.price ? advertising.price : 0}р.
            </span>
          </div>
        </div>
      )}
    </>
  );
};
