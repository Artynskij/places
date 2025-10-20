import { IBaseSimpleEntity } from "./base.entity";
import { IContentSimpleEntity } from "./content.entity";

export interface IBaseModerationRequest<T> {
    moderation?: {
        SubmittedById?: string;
        ModerationBatchId?: string;
        SessionId?: string;
    };
    data: T;
}
export interface IBaseSourceRequest {
    Name: string;
    Code: string;
}
export interface IBaseRequest {
    source: IBaseSourceRequest;
    content: Omit<IContentSimpleEntity, "id">;
}
