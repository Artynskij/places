import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { BusinessAssignmentApi } from "@/lib/Api/business/businessAssignment.endpoints";
import { IBusinessFront } from "@/lib/models/frontend/business.front";
import BusinessApi from "./business.endpoints";
import {
    IBusinessAssignmentRequest,
    IBusinessRequest,
} from "@/lib/models/api/request/business/business.request";

export class BusinessService {
    private BusinessApi: BusinessApi;
    private BusinessAssignmentApi: BusinessAssignmentApi;
    private DataLoadManagementService: DataLoadManagementService;

    constructor() {
        this.BusinessApi = new BusinessApi();
        this.BusinessAssignmentApi = new BusinessAssignmentApi();
        this.DataLoadManagementService = new DataLoadManagementService();
    }

    async getBusinessById(
        id: string,
        lang?: string
    ): Promise<IBusinessFront | null> {
        const response = this.BusinessApi.getBusinessById(id, lang);
        return response;
    }

    async createBusiness(
        body: IBusinessRequest,
        personId: string
    ): Promise<IBusinessFront | null> {
        const response = this.BusinessApi.createBusiness(body).then(
            async (res) => {
                const roles =
                    await this.DataLoadManagementService.getRolesOwner();
                const ownerRole = roles?.find((role) => (role.Code = "OWNER"));
                if (!res || !ownerRole) return null;

                await this.BusinessAssignmentApi.createPersonAssignment({
                    BusinessId: res.Id,
                    BusinessPositionId: ownerRole.Id,
                    IsOwnerVerified: true,
                    PersonId: personId,
                });
                return res;
            }
        );
        return response;
    }
    async updateBusiness(
        id: string,
        body: IBusinessRequest
    ): Promise<IBusinessFront | null> {
        const response = this.BusinessApi.updateBusiness(id, body);
        return response;
    }

    async createAssignment(body: IBusinessAssignmentRequest) {}
}
