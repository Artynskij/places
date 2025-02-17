import { IApiCategory } from "./category.api";
import { IApiContacts } from "./parts/contact.apiPart";
import { IApiContent } from "./parts/content.apiPart";
import { IApiImage } from "./parts/image.apiPart";
import { IApiRate } from "./parts/rate.apiPart";

export interface IApiEstablishment {
  establishment: {
    Id: string;
    Latitude: string;
    Longitude: string;
    PostalCode: string;
    ContentId: string;
    Moderate: null | boolean;
    Type: {
      Id: string;
      Name: "ACCOMMODATION" | "EATER" | "ATTRACTION";
      RefName: string;
      ContentId: string;
      Content: IApiContent;
    };
    Category: IApiCategory;
    Contacts: IApiContacts | null;
    Locations: {} | null;
    Rates: IApiRate;
  };
  content: {
    id: string;
    type: string;
    collection: string;
    value: {
      lang: string;
      value: {
        details: {
          title: string;
          description: string;
        };
        seoTrip: {
          key: string;
          value: string;
        }[];

        location: {
          street1: string;
          street2: string;
        };
      };
    }[];
    media: {
      gallery: IApiImage[];
    };
  };
}
