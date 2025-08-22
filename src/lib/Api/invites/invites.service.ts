// import { IRoleOwnerEntity } from "@/lib/models/api/entities/FileUpload/roleOwner.entity";

import { IInvitesRequest } from "@/lib/models/api/request/invites/invites.request";
import InvitesApi from "./invites.endpoints";
import { IInvitesFront } from "@/lib/models/frontend/invites.front";
import { IInvitesByQueryItemResponse } from "@/lib/models";

export class InvitesService {
    private InvitesApi: InvitesApi;

    constructor() {
        this.InvitesApi = new InvitesApi();
    }

    async create(body: IInvitesRequest): Promise<{id:string} | null> {
        const response = await this.InvitesApi.create(body);
        return response;
    }
    async getByQuery(body: {
        personId?: string;
        businessId?: string;
        lang: string;
    }): Promise<IInvitesByQueryItemResponse[] | null> {
        const response = await this.InvitesApi.getByQuery(body);
        return response;
    }
    async applyPerson(idBusPerson: string): Promise<"ok" | null> {
        const response = await this.InvitesApi.applyPerson(idBusPerson);
        return response;
    }
}
