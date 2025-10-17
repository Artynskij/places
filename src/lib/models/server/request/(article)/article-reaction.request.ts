import { IBaseSourceRequest } from "../../base";
interface ISourceArticleType extends IBaseSourceRequest {
    IsActive?: boolean;
}
export interface IArticleReactionRequest {
    source: ISourceArticleType;
}
export interface IArticleCreateUserReaction {
    articleId: string;
    userId: string;
    reactionId: string;
}
