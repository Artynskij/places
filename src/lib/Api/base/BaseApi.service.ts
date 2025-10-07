import { ILocationFront } from "@/lib/models";
import apiClient from "./ApiClient";

export abstract class BaseApiService<
    EntityType,
    EntityWithContentType = EntityType,
    FrontType = EntityType,
    RequestType = Partial<EntityType>,
    ResponseCreateUpdate = EntityType
> {
    protected abstract baseUrl: string;
    protected mapper = {
        toFront: (
            entity: EntityType | EntityWithContentType,
            cdnHost?: string,
            location?: ILocationFront
        ): FrontType => {
            // Базовая реализация - просто возвращает entity
            return entity as unknown as FrontType;
        },
    };

    protected cdnHost?: string;

    protected async loadCdnHost(): Promise<string | undefined> {
        return this.cdnHost;
    }

    private async getCdnHost(): Promise<string | undefined> {
        if (!this.cdnHost) {
            this.cdnHost = await this.loadCdnHost();
        }
        return this.cdnHost;
    }

    async getById(id: string, lang?: string): Promise<FrontType | null> {
        try {
            const cdnHost = await this.getCdnHost();
            const res = await apiClient.get<EntityType>(
                `${this.baseUrl}/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return this.mapper.toFront(res.data, cdnHost);
        } catch (error) {
            console.error(`error [GET ${this.baseUrl}/${id}]`, error);
            return null;
        }
    }
    async get(): Promise<FrontType[] | null> {
        try {
            const cdnHost = await this.getCdnHost();

            const res = await apiClient.get<EntityWithContentType[]>(
                this.baseUrl
            );

            return res.data.map((item) => this.mapper.toFront(item, cdnHost));
        } catch (error) {
            console.error(`error [get ${this.baseUrl}]`, error);
            return null;
        }
    }
    async create(body: RequestType): Promise<ResponseCreateUpdate | null> {
        try {
            const res = await apiClient.post<ResponseCreateUpdate>(
                this.baseUrl,
                body
            );

            return res.data;
        } catch (error) {
            console.error(`error [POST ${this.baseUrl}]`, error);
            return null;
        }
    }

    async update(
        id: string,
        body: RequestType
    ): Promise<ResponseCreateUpdate | null> {
        try {
            const res = await apiClient.patch<ResponseCreateUpdate>(
                `${this.baseUrl}/${id}`,
                body
            );
            return res.data;
        } catch (error) {
            console.error(`error [PATCH ${this.baseUrl}/${id}]`, error);
            return null;
        }
    }
    async delete(id: string): Promise<string | null> {
        try {
            await apiClient.delete<EntityWithContentType>(
                `${this.baseUrl}/${id}`
            );
            return `${id} deleted`;
        } catch (error) {
            console.error(`error [DELETE ${this.baseUrl}/${id}]`, error);
            return null;
        }
    }
    async updateOrCreate(
        id: string | null | number,
        body: RequestType
    ): Promise<ResponseCreateUpdate | null> {
        return id && typeof id === "string"
            ? this.update(id, body)
            : this.create(body);
    }
}
