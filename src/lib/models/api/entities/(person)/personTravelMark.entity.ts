import { ILocationsEntity } from "../locations.entity";
import { IPersonEntity } from "./person.entity";

export interface IPersonTravelMarkEntity {
    Id: string;
    Person: IPersonEntity;
    Location: ILocationsEntity;
    IsVisited: boolean;
    IsWanted: boolean;
    IsLoved: boolean;
}
