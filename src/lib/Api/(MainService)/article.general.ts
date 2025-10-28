import {
    IArticleFront,
    IArticleRequest,
    IImageEntity,
    IMediaFront,
    IUser,
} from "@/lib/models";

import type { UploadFile } from "antd/lib";

import { TLocale, TTipTapHTMLContent } from "@/lib/models/types";
import { FileUploadService } from "../fileUpload/fileUploads.service";
import { ArticleService } from "../(Article)/article/article.service";
import { ArticleStatusService } from "../(Article)/article-status.api";
import { getReadTimeForArticle } from "@/lib/helpers/getReadTimeForArticle";
import { CONSTANT_ARTICLE_STATUS_DB } from "@/asset/constants/database/article-status.const";
import { ArticleTypeService } from "../(Article)/article-type.api";
import { ArticleSubTypeService } from "../(Article)/article-subType.api";
import { DataLoadManagementService } from "../dataLoadManagement/dataLoadManagement.service";

interface ArticleFormValues {
    lang: TLocale;
    titleSeo: string;
    descriptionSeo: string;
    title: string;
    description: string;
    mainImage: UploadFile[];
    typeIds: string[];
    subTypeIds: string[];
    content: TTipTapHTMLContent;
    mediaStorage: IMediaFront[];
}
interface IPropCreate {
    formData: ArticleFormValues;
    articleState: IArticleFront;
    user: IUser;
}
interface IPropUpdate {
    idArticle: string;
    formData: ArticleFormValues;
    articleState: IArticleFront;
    user: IUser;
}
export class GeneralArticleService {
    private articleService: ArticleService;
    private dataLoadManagementService: DataLoadManagementService;
    private articleTypeService: ArticleTypeService;
    private articleSubTypeService: ArticleSubTypeService;

    private fileUploadService: FileUploadService;
    constructor() {
        this.articleService = new ArticleService();
        this.dataLoadManagementService = new DataLoadManagementService();
        this.articleTypeService = new ArticleTypeService();
        this.articleSubTypeService = new ArticleSubTypeService();

        this.fileUploadService = new FileUploadService();
    }
    async create({
        formData,
        articleState,
        user,
    }: IPropCreate): Promise<Boolean> {
        // 0. получение и формирование статичных данных
        const fileMainImage = formData.mainImage[0];
        const statusPendingRev = (
            await this.dataLoadManagementService.getArticleStatus()
        )?.find(
            (item) => item.Code === CONSTANT_ARTICLE_STATUS_DB.PENDING_REVIEW
        );
        if (!statusPendingRev) {
            console.log("problem with get status");
            return false;
        }
        const readingTime = getReadTimeForArticle(
            JSON.stringify(articleState.markdown)
        );
        const bodyArticleFromUI: IArticleRequest = {
            source: {
                ArticlesStatusId: statusPendingRev?.Id,
                ReadingTimeMinutes: readingTime,
                PersonId: user.id,
            },
            content: {
                details: [
                    {
                        lang: formData.lang,
                        contentValue: {
                            title: formData.title,
                            description: formData.description,

                            markdown: articleState.markdown,
                        },
                    },
                ],
                media: { gallery: [] },
            },
        };
        // 1. создание статьи без медиа!
        const createArticle = await this.articleService.create(
            bodyArticleFromUI
        );

        const vendorId = createArticle?.Id;
        if (!vendorId) {
            console.log("dont have createArticle");
            return false;
        }
        // 2. загрузка главной фотографии
        const mainImageUploaded = (
            await this.fileUploadService.uploadPublicFileOfAntdFiles({
                vendorId: vendorId,
                files: [fileMainImage],
                seo: [
                    {
                        title: articleState.titleImage?.title || "",
                        alt: articleState.titleImage?.alt || "",
                    },
                ],
                main: true,
            })
        )[0];

        // 3. загрузка всех остальных фотографий
        const filesInMedia = articleState.media
            .map((item) => {
                if (item.file) {
                    return { ...item.file, uid: item.id };
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
        if (bodyArticleFromUI.content?.media?.gallery) {
            bodyArticleFromUI.content.media.gallery = [
                mainImageUploaded,
                ...mediaUploaded,
            ];
        }
        // 4. добавление категории статье
        const responseAttachType =
            await this.articleTypeService.addBulkConnectionToArticle({
                articleId: createArticle.Id,
                articleTypeIds: formData.typeIds,
            });
        if (!responseAttachType) {
            console.log("тип не прикрепился к статье");
        }
        // 5. добавление категории статье
        const responseAttachSubType =
            await this.articleSubTypeService.addBulkConnectionToArticle({
                articleId: createArticle.Id,
                articleSubTypeIds: formData.subTypeIds,
            });
        if (!responseAttachSubType) {
            console.log("подтип не прикрепился к статье");
        }
        // 6. обновление статьи для прикрепрления фото
        console.log("bodyArticleUpdate", bodyArticleFromUI);
        const updatedArticle = await this.articleService.update(
            createArticle.Id,
            bodyArticleFromUI
        );
        if (!updatedArticle) {
            return false;
        }

        return true;
    }
    async update({
        idArticle,
        formData,
        articleState,
        user,
    }: IPropUpdate): Promise<Boolean> {
        // 0.получение изначальной статьи
        const initialArticle = await this.articleService.getById(idArticle);

        if (!initialArticle) return false;
        const vendorId = initialArticle.id;
        // 1.проверка главной фотографии
        const isUpdateMainImage =
            formData.mainImage[0].uid !== initialArticle.titleImage?.id;

        const mainImageUploaded = isUpdateMainImage
            ? (
                  await this.fileUploadService.uploadPublicFileOfAntdFiles({
                      vendorId: vendorId,
                      files: [formData.mainImage[0]],
                      seo: [
                          {
                              title: articleState.titleImage?.title || "",
                              alt: articleState.titleImage?.alt || "",
                          },
                      ],
                      main: true,
                  })
              )[0]
            : (initialArticle.contentEntity?.media?.gallery?.find(
                  (item) => item.isMain
              ) as IImageEntity);
        // ы
        // 2.проверка и загрузка всех остальных фотографий

        let mediaUploaded: IImageEntity[] = [];
        const initialMedia = initialArticle.contentEntity?.media?.gallery;
        if (!initialMedia) return false;
        const filesInMedia = articleState.media
            .map((item) => {
                if (item.file) {
                    return { ...item.file, uid: item.id };
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
        for (let index = 0; index < filesInMedia.length; index++) {
            const file = filesInMedia[index];
            const sameMedia = initialMedia.find((item) => item.id === file.uid);
            const preparedFile: IImageEntity = sameMedia
                ? {
                      ...sameMedia,
                      details: [
                          {
                              lang: "ru",
                              value: {
                                  title: seoInMedia[index].title,
                                  alt: seoInMedia[index].alt,
                              },
                          },
                      ],
                  }
                : (
                      await this.fileUploadService.uploadPublicFileOfAntdFiles({
                          vendorId: vendorId,
                          files: [file],
                          seo: [seoInMedia[index]],
                      })
                  )[0];
            mediaUploaded.push(preparedFile);
        }

        //3. подгтовка тела запроса
        const readingTime = getReadTimeForArticle(
            JSON.stringify(articleState.markdown)
        );
        const bodyArticleFromUI: IArticleRequest = {
            source: {
                ReadingTimeMinutes: readingTime,
            },
            content: {
                details: [
                    {
                        lang: formData.lang,
                        contentValue: {
                            title: formData.title,
                            description: formData.description,

                            markdown: articleState.markdown,
                        },
                    },
                ],
                media: { gallery: [mainImageUploaded, ...mediaUploaded] },
            },
        };

        // 4. добавление и удаление категории статье

        /// 4.1 удаление категорий
        for (let index = 0; index < initialArticle.type.length; index++) {
            const element = initialArticle.type[index];
            const existType = formData.typeIds.find(
                (item) => item === element.id
            );
            // const responseDelete = existType
            //     ? await this.articleTypeService.deleteConnectionFromArticle({
            //           articleId: vendorId,
            //           articleTypeId: existType,
            //       })
            //     : true;
        }
        /// 4.2 добавление категорий
        const responseAttachType =
            await this.articleTypeService.addBulkConnectionToArticle({
                articleId: vendorId,
                articleTypeIds: formData.typeIds,
            });

        // 5. добавление подкатегории статье
        /// 5.1 удаление подкатегории
        for (let index = 0; index < formData.subTypeIds.length; index++) {
            const element = formData.subTypeIds[index];
            const existType = initialArticle.type.find(
                (item) => item.id === element
            );
            const responseDelete = existType
                ? await this.articleSubTypeService.deleteConnectionFromArticle({
                      articleId: vendorId,
                      articleSubTypeId: existType.id,
                  })
                : true;
        }
        /// 5.2 добавление подкатегории
        if (formData.subTypeIds) {
            const responseAttachSubType =
                await this.articleSubTypeService.addBulkConnectionToArticle({
                    articleId: vendorId,
                    articleSubTypeIds: formData.subTypeIds,
                });
        }

        // 6. обновление статьи для прикрепрления фото
        console.log("bodyArticleUpdate", bodyArticleFromUI);
        const updatedArticle = await this.articleService.update(
            vendorId,
            bodyArticleFromUI
        );
        if (!updatedArticle) {
            return false;
        }

        return true;
    }
}
