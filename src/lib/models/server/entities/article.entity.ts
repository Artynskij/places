export interface IArticleEntity {
    Id: string;
}
export interface IArticleEntityWithContent {
    article: IArticleEntity;
    content: {
        id: string;
        type: string;
        content: {
            lang: string;
            value: {
                title: string;
                slug: string;
                description: string;
                image: string;
                author: string;
                date: string;
                markdown: string;
                tags: string[];
                reactions: number[];
            };
        }[];
    };
}
