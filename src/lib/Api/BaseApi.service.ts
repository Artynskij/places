import apiClient from "@/lib/Api/ApiClient";

export abstract class BaseApiService<EntityType, FrontType, RequestType> {
    protected abstract baseUrl: string;
    protected abstract mapper: {
        toFront(entity: EntityType, cdnHost?: string): FrontType;
    };

    protected cdnHost?: string;

    // 🔽 Этот метод можно переопределить в наследниках
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

    async create(body: RequestType): Promise<FrontType | null> {
        try {
            const cdnHost = await this.getCdnHost();
            const res = await apiClient.post<EntityType>(this.baseUrl, body);
           

            return this.mapper.toFront(res.data, cdnHost);
        } catch (error) {
            console.error(`error [POST ${this.baseUrl}]`, error);
            return null;
        }
    }

    async update(id: string, body: RequestType): Promise<FrontType | null> {
        try {
            const cdnHost = await this.getCdnHost();
            const res = await apiClient.patch<EntityType>(
                `${this.baseUrl}/${id}`,
                body
            );

            return this.mapper.toFront(res.data, cdnHost);
        } catch (error) {
            console.error(`error [PATCH ${this.baseUrl}/${id}]`, error);
            return null;
        }
    }

    async updateOrCreate(
        id: string | null,
        body: RequestType
    ): Promise<FrontType | null> {
        return id ? this.update(id, body) : this.create(body);
    }
}
