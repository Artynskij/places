export interface IFavoriteCreateRequest {
    Person: string;
    ItemId: string;
    ItemType: string;
}
export interface IFavoriteGetQueryRequest {
    personId?: string;
    EstablishmentId?: string;
    typeId?: string;
}
