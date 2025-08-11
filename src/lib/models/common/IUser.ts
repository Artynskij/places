
import { IPersonFront } from "../frontend/(person)/person.front";
import { TTypeUser } from "../types";

export interface IUser extends IPersonFront {
    typeUser: TTypeUser;
}
