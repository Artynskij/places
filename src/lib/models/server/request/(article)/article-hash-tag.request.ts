export interface IArticleHashTagRequest {
    Name: string;
}
export interface IArticleCreateHashTagUser {
    source: {
        ArticleId: string;
        HashTagId: string;
    };
}
