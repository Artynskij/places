import { StaticImageData } from "next/image";

export interface IDataCardInfo {
  id: number;
  title: string;
  value: string;
  iconDefault: StaticImageData;
  iconActive: StaticImageData;
  body: string;
}

export interface IDataCardSliderLocation {
  id: number;
  title: string;
  location: string;
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
  additional: string;
  description: string;
  coord: {
    lat: string;
    lon: string;
  };
}

export interface IDataCardSliderFilter {
  id: number;
  title: string;
  image: StaticImageData;
}
