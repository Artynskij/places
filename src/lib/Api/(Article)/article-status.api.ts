

import { IArticleStatusEntity } from "@/lib/models";
import { IArticleStatusRequest } from "@/lib/models/server/request/(article)/article-status.request";
import { BaseApiService } from "../base/BaseApi.service";

export class ArticleStatusService extends BaseApiService<
    IArticleStatusEntity,
    IArticleStatusEntity,
    IArticleStatusEntity,
    IArticleStatusRequest
> {
    protected baseUrl = "/articles-status";
    // protected mapper = new Mapper();
}
