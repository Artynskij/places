import { extractActuallyTitleServer } from "@/lib/helpers/extract-title-server";
import {
    IArticleEntityWithPareContent,
    IArticleFront,
    IMediaFront,
} from "@/lib/models";

export default class ArticleMapper {
    constructor() {}
    toFront(
        articleEntity: IArticleEntityWithPareContent,
        cdnHost: string
    ): IArticleFront | null {
        if (!articleEntity.content) {
            return null;
        }

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
        const mainImages = galleryImages?.filter((item) => item.isMain) || null;
        const mainImage = mainImages?.[mainImages?.length - 1] || null;
        const typesArticle = articleEntity.article.ArticleTypeRelations.map(
            (typeConnectEntity) => {
                const valueActually = extractActuallyTitleServer(
                    typeConnectEntity.ArticleTypeEntity.content.details
                );
                return {
                    id: typeConnectEntity.ArticleTypeEntity.Id || "",
                    code: typeConnectEntity.ArticleTypeEntity.Code || "",
                    value: valueActually || "",
                };
            }
        );
        const subTypesArticle =
            articleEntity.article.ArticleSubTypeRelations.map(
                (typeConnectEntity) => {
                    const valueActually = extractActuallyTitleServer(
                        typeConnectEntity.ArticleSubTypeEntity.content.details
                    );
                    return {
                        id: typeConnectEntity.ArticleSubTypeEntity.Id || "",
                        code: typeConnectEntity.ArticleSubTypeEntity.Code || "",
                        value: valueActually || "",
                    };
                }
            );
        return {
            id: articleEntity.article.Id,
            title: contentDetailsEntity.contentValue?.title || "",
            description: contentDetailsEntity.contentValue?.description || "",
            media: galleryImages?.filter((item) => !item.isMain) || [],
            titleImage: mainImage,
            markdown: contentDetailsEntity.contentValue?.markdown || "",
            status: {
                id: articleEntity.article.ArticlesStatus.Id,
                code: articleEntity.article.ArticlesStatus.Code,
            },

            type: typesArticle,
            subType: subTypesArticle,
            author: articleEntity.article.Person,
            reactions: contentDetailsEntity.contentValue?.reactions || [],
            date: contentDetailsEntity.contentValue?.date || "",
            contentEntity: articleEntity.content,
            readingTime: articleEntity.article.ReadingTimeMinutes,
        };
    }
}
