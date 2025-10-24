import { ILocationWithContentEntity } from "../locations.entity";
import { IPersonEntity } from "./person.entity";

export interface IPersonTravelMarkEntity {
    Id: string;
    Person: IPersonEntity;
    Location: ILocationWithContentEntity;
    IsVisited: boolean;
    IsWanted: boolean;
    IsLoved: boolean;
}
