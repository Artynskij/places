import { IPersonEntity } from "./(person)/person.entity";
import { IBusinessEntity } from "./business.entity";
import { IRoleOwnerWithContentEntity } from "./(person)/roleOwner.entity";

export interface IInvitesEntity {
    person: IPersonEntity;
    business?: IBusinessEntity;
    role: IRoleOwnerWithContentEntity;
}
