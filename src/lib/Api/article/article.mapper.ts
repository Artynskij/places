import { IArticleEntity, IArticleFront } from "@/lib/models";

export default class ArticleMapper {
    constructor() {}
    transformToFront(article: IArticleEntity): IArticleFront | null {
        if(!article.content) {
            return null
        }
        return {
            id: article.article.Id,
            title: article.content.content[0].value.title,
            description: article.content.content[0].value.description,
            author: article.content.content[0].value.author,
            markdown: article.content.content[0].value.markdown,
            date: article.content.content[0].value.date,
            titleImage: article.content.content[0].value.image,
            reactions: article.content.content[0].value.reactions,
        };
    }
}
