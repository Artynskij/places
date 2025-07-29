import apiClient from "@/lib/Api/ApiClient";

export abstract class BaseApiService<EntityType, FrontType, RequestType> {
    protected abstract baseUrl: string;
    protected abstract mapper: {
        toFront(entity: EntityType): FrontType;
    };

    async getById(id: string, lang?: string): Promise<FrontType | null> {
        try {
            const res = await apiClient.get<EntityType>(
                `${this.baseUrl}/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return this.mapper.toFront(res.data);
        } catch (error) {
            console.error(`error [GET ${this.baseUrl}/${id}]`);
            return null;
        }
    }

    async create(body: RequestType): Promise<FrontType | null> {
        try {
            const res = await apiClient.post<EntityType>(this.baseUrl, body);
            return this.mapper.toFront(res.data);
        } catch (error) {
            console.error(`error [POST ${this.baseUrl}]`);
            return null;
        }
    }

    async update(id: string, body: RequestType): Promise<FrontType | null> {
        try {
            const res = await apiClient.patch<EntityType>(
                `${this.baseUrl}/${id}`,
                body
            );
            return this.mapper.toFront(res.data);
        } catch (error) {
            console.error(`error [PATCH ${this.baseUrl}/${id}]`);
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
