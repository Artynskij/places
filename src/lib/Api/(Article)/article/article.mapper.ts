import {
    IArticleEntityWithContent,
    IArticleFront,
    IMediaFront,
} from "@/lib/models";

export default class ArticleMapper {
    constructor() {}
    toFront(
        article: IArticleEntityWithContent,
        cdnHost: string
    ): IArticleFront | null {
        if (!article.content) {
            return null;
        }
        const galleryImages: IMediaFront[] | null =
            article.content.media?.gallery?.map((image) => {
                return {
                    id: image.id,
                    title: image.details[0]?.value.title || "",
                    alt: image.details[0]?.value.alt || "",
                    blobPath: image.blobPath,
                    fileName: image.fileName,
                    height: image.height,
                    width: image.width,
                    type: image.type,
                    src: `${cdnHost}/${image.blobPath}`,
                };
            }) || null;
        return {
            id: article.article.Id,
            title: article.content.value[0].details.title,
            description: article.content.value[0].details.description || "",
            author: article.content.value[0].details.author,
            content: article.content.value[0].details.markdown,
            date: article.content.value[0].details.date,
            category: "",
            titleImage: galleryImages?.[0] || null,
            // titleImage: article.content.value[0].details.image,
            reactions: article.content.value[0].details.reactions,
            media: galleryImages || [],
        };
    }
}
