import ConsentsApi from "./consents.endpoints";
import { IConsentsFront } from "@/lib/models/frontend/(person)/consents.front";
import {
    IConsentsPatchRequest,
    IConsentsRequest,
} from "@/lib/models/server/request/(Person)/consents.request";

export class ConsentsService {
    private ConsentsApi: ConsentsApi;

    constructor() {
        this.ConsentsApi = new ConsentsApi();
    }

    async getConsentsById(
        id: string,
        lang?: string
    ): Promise<IConsentsFront | null> {
        const response = this.ConsentsApi.getConsentsById(id, lang);
        return response;
    }

    async createConsents(
        body: IConsentsRequest
    ): Promise<IConsentsFront | null> {
        const response = this.ConsentsApi.createConsents(body);
        return response;
    }
    async updateConsents(
        id: string,
        body: IConsentsPatchRequest
    ): Promise<IConsentsFront | null> {
        const response = this.ConsentsApi.updateConsents(id, body);
        return response;
    }
}
