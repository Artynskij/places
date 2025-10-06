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
    // async update(
    //     id: string,
    //     body: IBusinessAssignmentRequest
    // ): Promise<IBusinessPersonAssignEntity | null> {
    //     try {
    //         const response = await apiClient.patch(
    //             `/person-business-assignments/${id}`,

    //             body
    //         );
    //         return response.data;
    //     } catch (error) {
    //         console.error(`Ошибка при обновлении PersonAssignment ${id}`);
    //         return null;
    //     }
    // }
    // async delete(
    //     id: string,
    //     body: IBusinessAssignmentRequest
    // ): Promise<IBusinessPersonAssignEntity | null> {
    //     try {
    //         const response = await apiClient.patch(
    //             `/person-business-assignments/${id}`,

    //             body
    //         );
    //         return response.data;
    //     } catch (error) {
    //         console.error(`Ошибка при обновлении PersonAssignment ${id}`);
    //         return null;
    //     }
    // }
}
