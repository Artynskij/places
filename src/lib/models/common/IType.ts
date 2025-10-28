import { TLocale } from "../types";

export interface IBasePageProps<
    TParams extends object = {},
    TSearchParams extends object = {}
> {
    params: { locale: TLocale } & TParams;
    searchParams?: { [K in keyof TSearchParams]?: string };
}
export interface IDetailLang {
    lang: TLocale;
    value: string;
}
export interface IOption {
    id?: number | string;
    label: string;
    value: string;
    info?: string;
}

export interface IDataAdvertisingItem {
    type: "country" | "district" | "town";
    country: { label: string; value: string };
    language: { label: string; value: string };
    facility: { label: string; value: string };
    district?: { label: string; value: string };
    town?: { label: string; value: string };
    calendar: [Date, Date] | string[];
    price: { allPrice: number; priceOne: number };
}
export interface IDataAdvertisingCookie {
    rows: number;
    price: number;
    data: IDataAdvertisingItem[];
}

export interface IDataCurrency {
    id: number;
    currency: { label: string; value: string };
    count: number;
}
export interface IDataWalletHistory {
    id: number;
    title: string;
    count: number;
    date: string;
    status: { value: string; label: string };
}

// After Api
