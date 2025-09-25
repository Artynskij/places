import { IArticleNewFront, IArticleRequest, IMediaFront } from "@/lib/models";
import { ArticleService } from "../article/article.service";
import type { UploadFile } from "antd/lib";

import { TLocale } from "@/lib/models/types";
import { FileUploadService } from "../fileUpload/fileUploads.service";

interface ArticleFormValues {
    lang: TLocale;
    titleSeo: string;
    descriptionSeo: string;
    title: string;
    description: string;
    mainImage: UploadFile[];
    category: string;
    content: any;
    mediaStorage: IMediaFront[];
}
interface IPropCreate {
    formData: ArticleFormValues;
    articleState: IArticleNewFront;
}
export class GeneralArticleService {
    private articleService: ArticleService;
    private fileUploadService: FileUploadService;
    constructor() {
        this.articleService = new ArticleService();
        this.fileUploadService = new FileUploadService();
    }
    async create({ formData, articleState }: IPropCreate): Promise<Boolean> {
        const fileMainImage = formData.mainImage[0];

        const bodyArticleCreate: IArticleRequest = {
            source: {},
            content: {
                value: [
                    {
                        lang: formData.lang,
                        value: {
                            details: {
                                title: formData.title,
                                description: formData.description,
                            },
                            seo: [
                                { key: "title", value: formData.titleSeo },
                                {
                                    key: "description",
                                    value: formData.descriptionSeo,
                                },
                            ],
                        },
                    },
                ],
                // media: {
                //     main: mainImageUploaded,
                //     gallery: mediaUploaded,
                // },
            },
        };

        const createArticle = await this.articleService.create(
            bodyArticleCreate
        );
        console.log("createArticle", createArticle);
        const vendorId = createArticle?.Id;
        if (!vendorId) {
            return false;
        }
        const mainImageUploaded = (
            await this.fileUploadService.uploadPublicFileOfAntdFiles({
                vendorId: vendorId,
                files: [fileMainImage],
                seo: [
                    {
                        title: articleState.titleImage.title,
                        alt: articleState.titleImage.alt,
                    },
                ],
            })
        )[0];
        const filesInMedia = articleState.media
            .map((item) => {
                if (item.file) {
                    return item.file;
                } else {
                    return null;
                }
            })
            .filter(Boolean) as UploadFile[];
            
        const seoInMedia = articleState.media
            .map((item) => {
                if (item.file) {
                    return { title: item.title, alt: item.alt };
                } else {
                    return null;
                }
            })
            .filter(Boolean) as { title: string; alt: string }[];
        const mediaUploaded =
            await this.fileUploadService.uploadPublicFileOfAntdFiles({
                vendorId: vendorId,
                files: filesInMedia,
                seo: seoInMedia,
            });
        bodyArticleCreate.content.media = {
            main: mainImageUploaded,
            gallery: mediaUploaded,
        };
        console.log("bodyArticleCreate", bodyArticleCreate);
        const updatedArticle = await this.articleService.update(
            createArticle.Id,
            bodyArticleCreate
        );

        return true;
    }
}
