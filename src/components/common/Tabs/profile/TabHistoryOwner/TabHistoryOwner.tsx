"use client";
import { mockMarketingHistory } from "@/asset/mockData/mockMarketing";
import style from "./historyOwner.module.scss";
import { useTranslations } from "next-intl";

export const TabHistoryOwner = () => {
  const dataHistory = mockMarketingHistory;
  const t = useTranslations('ProfilePage')
  return (
    <>
      <div className={style.history}>
        <h3 className={style.history_title}>{t('historyTab.orderHistory')}</h3>
        <div className={style.history_content}>
          <div className={style.history_content_title}>
            <span>{t('tableOptions.type')}</span>
            <span>{t('tableOptions.place')}</span>
            <span>{t('tableOptions.yourObject')}</span>
            <span>{t('tableOptions.language')}</span>
            <span>{t('tableOptions.period')}</span>
            <span>{t('tableOptions.priceForAllDays')}</span>
            <span>{t('tableOptions.status')}</span>
          </div>
          <ul className={style.history_content_list}>
            {dataHistory.data.map((item, index) => {
              return (
                <li className={style.history_content_list_item} key={index}>
                  <span className={style.history_content_list_item_type}>{item.type}</span>
                  <span>
                    {item.town?.name ||
                      item.district?.name ||
                      item.country.name}
                  </span>

                  <span>{item.facility.name}</span>
                  <span>{item.language.name}</span>
                  <span>{item.calendar[0] + " - " + item.calendar[1]}</span>
                  {/* <Button
                    className={style.choice_list_item_button}
                    text="удалить"
                    onClick={() => deleteChoice(index)}
                  /> */}
                  <span>
                    {item.price.allPrice}р. / {item.price.priceOne}р.
                  </span>
                  <span
                    data-status={item.status.value}
                    className={style.history_content_list_item_status}
                  >
                    {item.status.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
