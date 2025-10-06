import { IBaseModerationRequest } from "../base/base-with-moderation.request";

interface EstablishmentRateRequestData {
    Rooms: number | null;
    PriceQuality: number | null;
    Clean: number | null;
    Location: number | null;
    Rate: number | null;
    Atmosphere: number | null;
    Food: number | null;
    Service: number | null;
    Value: number | null;
    Comfort: number | null;
    Accessibility: number | null;
    Quality: number | null;
    Safety: number | null;

    PersonsVisitDate: Date;
    Person: string;
    Establishment: string;
}
export interface IEstablishmentRateRequest
    extends IBaseModerationRequest<EstablishmentRateRequestData> {}
export interface IEstablishmentRateGetAllRequest {
    establishmentIds?: string[];
    page: number;
    limit: number;
    personIds?: string[];
}
