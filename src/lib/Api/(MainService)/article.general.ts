import {
    IArticleNewFront,
    IArticleRequest,
    IMediaFront,
    IUser,
} from "@/lib/models";

import type { UploadFile } from "antd/lib";

import { TLocale } from "@/lib/models/types";
import { FileUploadService } from "../fileUpload/fileUploads.service";
import { ArticleService } from "../(Article)/article/article.service";
import { ArticleStatusService } from "../(Article)/article-status.api";
import { getReadTimeForArticle } from "@/lib/helpers/getReadTimeForArticle";

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
    user: IUser;
}
export class GeneralArticleService {
    private articleService: ArticleService;
    private articleStatusService: ArticleStatusService;
    private fileUploadService: FileUploadService;
    constructor() {
        this.articleService = new ArticleService();
        this.articleStatusService = new ArticleStatusService();
        this.fileUploadService = new FileUploadService();
    }
    async create({
        formData,
        articleState,
        user,
    }: IPropCreate): Promise<Boolean> {
        const fileMainImage = formData.mainImage[0];
        const statusPendingRev = (await this.articleStatusService.get())?.find(
            (item) => item.Code === "PENDING_REVIEW"
        );
        if (!statusPendingRev) {
            console.log("problem with get status");
            return false;
        }
        const readingTime = getReadTimeForArticle(
            JSON.stringify(formData.content)
        );
        const bodyArticleCreate: IArticleRequest = {
            source: {
                ArticlesStatusId: statusPendingRev?.Id,
                ReadingTimeMinutes: readingTime,
                PersonId: user.id,
            },
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
                media: [],
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
            console.log("dont have createArticle");
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
                main: true,
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
        bodyArticleCreate.content.media = [mainImageUploaded, ...mediaUploaded];

        console.log("bodyArticleCreate", bodyArticleCreate);
        const updatedArticle = await this.articleService.update(
            createArticle.Id,
            bodyArticleCreate
        );
        if (!updatedArticle) {
            return false;
        }

        return true;
    }
}
