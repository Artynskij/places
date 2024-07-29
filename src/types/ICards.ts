import { StaticImageData } from "next/image";
export interface IDataCardSliderLocation {
  id: number;
  title: string;
  // location: string;
  // rating: number;
  // reviews: number;
  // type: string;
  img: string;
  liked?: boolean;
  link: string;
  // additional?: string;
}
export interface IDataCardSlider {
  id: number;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  type: string;
  img: string;
  liked?: boolean;
  additional?: string;
}

export interface IDataCardSliderFilter {
  id: number;
  title: string;
  image: StaticImageData;
}

export interface IDataCardInfo {
  id: number;
  title: string;
  value: string;
  iconDefault: StaticImageData;
  iconActive: StaticImageData;
  body: string;
}
