import {
    IBusinessPersonAssignEntity,
    IBusinessPersonRoleEntity,
    IBusinessPersonRoleRequest,
} from "@/lib/models";
import apiClient from "../base/ApiClient";

export class BusinessPersonRolesApi {
    constructor() {}

    async create(
        body: IBusinessPersonRoleRequest
    ): Promise<IBusinessPersonRoleEntity | null> {
        try {
            const response = await apiClient.post(
                `/person-business-roles`,
                body
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании PersonAssignment `);
            return null;
        }
    }
}
