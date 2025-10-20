import { IArticleStatusEntity, IArticleStatusRequest } from "@/lib/models";

import { BaseApiService } from "../base/BaseApi.service";

export class ArticleStatusService extends BaseApiService<
    IArticleStatusEntity,
    IArticleStatusEntity,
    IArticleStatusEntity,
    IArticleStatusRequest
> {
    protected baseUrl = "/articles-status";
}
