import { ITypeEstablishmentWithContentEntity } from "../../server/entities";
import { IBaseSimpleFront } from "../base/base.front";
import { ICategoryRootEstablishmentFront } from "./category-root-establishment.front";

export interface ICategoryEstablishmentFront
    extends Omit<IBaseSimpleFront, "code"> {
    type: ITypeEstablishmentWithContentEntity;
    rootCategory: ICategoryRootEstablishmentFront | null;
}
