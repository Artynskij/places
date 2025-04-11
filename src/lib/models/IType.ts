export interface IPageProps {
  params: { locale: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export interface ISelectOption {
  id: number;
  name: string;
  value: string;
}

export interface IDataAdvertisingItem {
  type: "country" | "district" | "town";
  country: { name: string; value: string };
  language: { name: string; value: string };
  facility: { name: string; value: string };
  district?: { name: string; value: string };
  town?: { name: string; value: string };
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
  currency: { name: string; value: string };
  count: number;
}
export interface IDataWalletHistory {
  id: number;
  title: string;
  count: number;
  date: string;
  status: { value: string; name: string };
}

export interface IImageData {
  src: string;
  width: number;
  height: number;
  alt: string;
}



// After Api
export type ITypesOfEstablishment  = 'ATTRACTION'| 'EATER' | 'ACCOMMODATION'