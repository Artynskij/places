import { IBusinessFront } from "@/lib/models/frontend/business/business.front";
import BusinessApi from "./business.endpoints";
import { IBusinessRequest } from "@/lib/models/api/request/business/business.request";

export class BusinessService {
    private BusinessApi: BusinessApi;
    // private ContactsPersonService: ContactsPersonService;

    constructor() {
        this.BusinessApi = new BusinessApi();
        // this.ContactsPersonService = new ContactsPersonService();
    }

    async getBusinessById(
        id: string,
        lang?: string
    ): Promise<IBusinessFront | null> {
        const response = this.BusinessApi.getBusinessById(id, lang);
        return response;
    }

    async createBusiness(
        body: IBusinessRequest
    ): Promise<IBusinessFront | null> {
        const response = this.BusinessApi.createBusiness(body);
        return response;
    }
    async updateBusiness(
        id: string,
        body: IBusinessRequest
    ): Promise<IBusinessFront | null> {
        const response = this.BusinessApi.updateBusiness(id, body);
        return response;
    }
}
