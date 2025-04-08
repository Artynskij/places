"use client";

import { Button } from "@/components/UI/Button/Button";
import style from "./walletOwner.module.scss";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { IconPlus } from "@/components/common/Icons";
import { mockCurrency, mockWalletHistory } from "@/asset/mockData/mockWallet";

import { IDataCurrency, IDataWalletHistory } from "@/lib/models/IType";

export const TabWalletOwner = () => {
    const t = useTranslations("ProfilePage");

    const [currencyData, setCurrencyData] = useState<IDataCurrency[] | null>(
        null
    );
    const [historyData, setHistoryData] = useState<IDataWalletHistory[] | null>(
        null
    );

    useEffect(() => {
        setCurrencyData(mockCurrency);
        setHistoryData(mockWalletHistory);
    }, []);

    function clickRefill(clickItem: IDataCurrency) {
        const promptData = prompt("How much");
        if (!Number(promptData)) {
            alert("цифры введи умник");
            clickRefill(clickItem);
            return;
        }
        const changeData = currencyData?.map((item) => {
            if (item.id === clickItem.id) {
                item.count += Number(promptData);
                return item;
            } else {
                return item;
            }
        }) as IDataCurrency[];
        setCurrencyData(changeData);
    }
    return (
        <>
            <h3 className={style.title}>{t("walletTab.myWallet")}</h3>

            <div className={style.account}>
                {/* <h4 className={style.account_title}>Баланс</h4>
        <Button
          className={style.account_addBut}
          icon={<IconPlus />}
          type="blue"
          text="Добавить валюту"
        /> */}
                <div className={style.account_content}>
                    {currencyData?.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className={style.account_content_item}
                            >
                                <div
                                    className={style.account_content_item_count}
                                >
                                    {item.count} {item.currency.name}(
                                    {item.currency.value})
                                </div>
                                {/* <div className={style.account_content_item_name}></div> */}
                                <Button
                                    onClick={() => clickRefill(item)}
                                    type="blue"
                                    text={t("walletTab.replenish")}
                                    className={
                                        style.account_content_item_refillBut
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={style.history}>
                <h4 className={style.history_title}>
                    {t("walletTab.historyPayment")}
                </h4>
                <div className={style.history_content}>
                    <div className={style.history_content_title}>
                        <span>№</span>
                        <span>{t("tableOptions.operation")}</span>
                        <span>{t("tableOptions.sum")} $</span>
                        <span>{t("tableOptions.dayAndTime")}</span>
                        <span>{t("tableOptions.status")}</span>
                        {/* <span>№</span> */}
                    </div>
                    <ul className={style.history_content_list}>
                        {historyData?.map((item) => {
                            return (
                                <li
                                    key={item.id}
                                    className={style.history_content_list_item}
                                >
                                    <span>{item.id}</span>
                                    <span>{item.title}</span>
                                    <span>{item.count}</span>
                                    <span>{item.date}</span>
                                    <span
                                        data-status={item.status.value}
                                        className={
                                            style.history_content_list_item_status
                                        }
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
