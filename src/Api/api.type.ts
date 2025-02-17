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
      Content: _IContentStand;
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
export interface IApiRate {
  Id: string;
  EstablishmentId: string;
  Count: number;
  Rate: number;
  Atmosphere: number | null;
  Food: number | null;
  Service: number | null;
  Value: number | null;
  Rooms: number | null;
  PriceQuality: number | null;
  Clean: number | null;
  Location: number | null;
}
export interface IApiImage {
  id: string;
  refId: number;
  type: string;
  details: {
    lang: string;
    value: {
      title: string;
    };
  }[];
  width: number;
  height: number;
  refUrl: string;
  refFileName: string;
  fileName: string;
  blobPath: string;
}
export interface IApiContacts {
  Id: string;
  Phone?: string;
  Web?: string;
  Email?: string;
  Menu?: string;
  Telegram?: string;
  WhatsApp?: string;
  Instagram?: string;
  Viber?: string;
  Other?: string;
  ContentId: string;
}
// Filters

export interface IApiTagsResponse {
  TagCategory: IApiCategory;
  Tags: IApiTag[];
}

export interface IApiCategory {
  Id: string;
  Name: string;
  Content: _IContentStand;
}
export interface IApiTag {
  Id: string;
  TagCategory: IApiCategory;
  Content: _IContentStand;
}
export interface IApiArticle {
  article: {
    Id: string;
  };
  content: {
    _id: string;
    id: string;
    type: string;
    collection: string;
    content: {
      lang: string;
      value: {
        title: string;
        slug: string;
        description: string;
        image: string;
        author: string;
        date: string;
        markdown: string;
        tags: string[];
        reactions: number[];
      };
    }[];
  };
}

// main types

interface _IContentStand {
  id: string;
  details: {
    lang: string;
    value: string;
    _id: string;
  }[];
}

export interface IPaginationCredentials {
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  filter?: {
    typeIds?: string[];
    categoryIds?: string[];
    tagsIds?: string[];
  };
  lang?: string;
  ids?: string[];
}
