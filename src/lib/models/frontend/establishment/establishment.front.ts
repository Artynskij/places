
import { IContactsFront } from "../parts/contacts/contacts.frontPart";
import { IImageFront } from "../parts/image/image.frontPart";

export interface IEstablishmentFront {
  id: string;
  title: string;
  description: string;
  typeEstablishment: "EATER" | "ACCOMMODATION" | "ATTRACTION";
  category: string;
  rates: {
    main: number;
    count: number;
    additional: ({
      key:
        | "Atmosphere"
        | "Food"
        | "Service"
        | "Value"
        | "Rooms"
        | "PriceQuality"
        | "Clean"
        | "Location"
        | string;
      value: number;
    } | null)[];
  };
  location: {
    street: string;
    latitude: string;
    longitude: string;
    postalCode:string
  };
  contacts: IContactsFront | null;
  media: {
    cdnHost: string;
    gallery: IImageFront[];
  };
  seo: { key: string; value: string }[];
}
