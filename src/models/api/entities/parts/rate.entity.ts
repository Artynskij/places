export interface IRateEntity {
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