import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { BusinessAssignmentApi } from "@/lib/Api/business/businessAssignment.endpoints";
import { IBusinessFront } from "@/lib/models/frontend/business.front";
import BusinessApi from "./business.endpoints";
import {
    IBusinessAssignmentGetQueryRequest,
    IBusinessAssignmentRequest,
    IBusinessRequest,
} from "@/lib/models/server/request/business/business.request";
import { IBusinessPersonAssignEntity } from "@/lib/models";
import { InvitesService } from "../invites/invites.service";

export class BusinessService {
    private BusinessApi: BusinessApi;
    private BusinessAssignmentApi: BusinessAssignmentApi;
    private DataLoadManagementService: DataLoadManagementService;
    private InvitesService: InvitesService;

    constructor() {
        this.BusinessApi = new BusinessApi();
        this.BusinessAssignmentApi = new BusinessAssignmentApi();
        this.DataLoadManagementService = new DataLoadManagementService();
        this.InvitesService = new InvitesService();
    }

    async getBusinessById(
        id: string,
        lang?: string
    ): Promise<IBusinessFront | null> {
        const response = this.BusinessApi.getBusinessById(id, lang).then(
            (res) => res?.business || null
        );

        return response;
    }

    async createBusiness(
        body: IBusinessRequest,
        personId: string
    ): Promise<ICreateBusinessResponse> {
        const mainResponse: ICreateBusinessResponse = {
            business: null,
            status: {
                businessCreated: StepStatus.Pending,
                businessAssignCreated: StepStatus.Pending,
                inviteCreated: StepStatus.Pending,
                inviteApplyCreated: StepStatus.Pending,
            },
        };

        // 1. Создание бизнеса
        const businessResponse = await this.BusinessApi.createBusiness(body);
        if (!businessResponse) {
            mainResponse.status.businessCreated = StepStatus.Failed;
            return mainResponse;
        }
        mainResponse.business = businessResponse;
        mainResponse.status.businessCreated = StepStatus.Success;

        // 2. Привязка владельца
        const businessAssignResponse = await this.BusinessAssignmentApi.create({
            Business: businessResponse.Id,
            Person: personId,
        });
        if (!businessAssignResponse) {
            mainResponse.status.businessAssignCreated = StepStatus.Failed;
            return mainResponse;
        }
        mainResponse.status.businessAssignCreated = StepStatus.Success;

        // 3. Получение роли OWNER
        const roleOwnerId =
            await this.DataLoadManagementService.getRolesOwner().then(
                (res) => res?.find((item) => item.code === "OWNER")?.id ?? null
            );
        if (!roleOwnerId) {
            // inviteCreated / inviteApplyCreated остаются pending
            return mainResponse;
        }

        // 4. Создание инвайта
        const inviteResponse = await this.InvitesService.create({
            businessId: businessResponse.Id,
            personId,
            roleId: roleOwnerId,
        });
        if (!inviteResponse) {
            mainResponse.status.inviteCreated = StepStatus.Failed;
            return mainResponse;
        }
        mainResponse.status.inviteCreated = StepStatus.Success;

        // 5. Применение инвайта
        const applied = await this.InvitesService.applyPerson(
            inviteResponse.id
        );
        mainResponse.status.inviteApplyCreated = applied
            ? StepStatus.Success
            : StepStatus.Failed;

        return mainResponse;
    }

    async updateBusiness(
        id: string,
        body: IBusinessRequest
    ): Promise<IBusinessFront | null> {
        const response = this.BusinessApi.updateBusiness(id, body);
        return response;
    }

    async getAssignment(
        body: IBusinessAssignmentGetQueryRequest
    ): Promise<IBusinessPersonAssignEntity[] | null> {
        const response = this.BusinessAssignmentApi.getByQuery(body);
        return response;
    }
}

enum StepStatus {
    Pending = "pending", // мы сюда ещё не дошли
    Success = "success", // шаг выполнен
    Failed = "failed", // шаг выполнялся, но с ошибкой
}

interface ICreateBusinessStatus {
    businessCreated: StepStatus;
    businessAssignCreated: StepStatus;
    inviteCreated: StepStatus;
    inviteApplyCreated: StepStatus;
}

interface ICreateBusinessResponse {
    business: IBusinessFront | null;
    status: ICreateBusinessStatus;
}
