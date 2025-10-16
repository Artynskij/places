import {
    IArticleEntityWithContent,
    IArticleFront,
    IMediaFront,
} from "@/lib/models";

export default class ArticleMapper {
    constructor() {}
    toFront(
        articleEntity: IArticleEntityWithContent,
        cdnHost: string
    ): IArticleFront | null {
        if (!articleEntity.content) {
            return null;
        }
        console.log(articleEntity);

        const contentDetailsEntity = articleEntity.content.details[0];
        const galleryImages: IMediaFront[] | null =
            articleEntity.content.media?.gallery?.map((image) => {
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
                    isMain: image.isMain || false,
                };
            }) || null;
        const mainImage = galleryImages?.find((item) => item.isMain) || null;
        return {
            id: articleEntity.article.Id,
            title: contentDetailsEntity.contentValue?.title || "",
            description: contentDetailsEntity.contentValue?.description || "",
            media: galleryImages || [],
            titleImage: mainImage,
            markdown: contentDetailsEntity.contentValue?.markdown,
            status: {
                id: articleEntity.article.ArticlesStatus.Id,
                code: articleEntity.article.ArticlesStatus.Code,
            },

            category: "",

            author: contentDetailsEntity.contentValue?.author || "",
            reactions: contentDetailsEntity.contentValue?.reactions || [],
            date: contentDetailsEntity.contentValue?.date || "",
        };
    }
}
