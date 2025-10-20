import { IArticleFront } from "../(article)/article.front";
import { IEstablishmentFront } from "../(establishment)/establishment.front";
import { IFavoriteTypeEntity } from "../../server/entities";
import { IPersonFront } from "./person.front";

export interface IFavoriteFront {
    id: string;
    itemId: string;
    establishment: IEstablishmentFront | null;
    article: IArticleFront | null;
    person: IPersonFront;
    favoriteType: IFavoriteTypeEntity;
}
