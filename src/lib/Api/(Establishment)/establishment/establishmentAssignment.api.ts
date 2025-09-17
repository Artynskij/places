import { IEstablishmentPersonAssignWithContentEntity } from "../../../models/server/entities/(establishment)/establishment.entity";

import {
    IEstablishmentPersonAssignEntity,
    IEstablishmentPersonAssignFront,
    IEstablishmentPersonAssignGetAllRequest,
    IEstablishmentPersonAssignRequest,
} from "@/lib/models";
import { BaseApiService } from "../../BaseApi.service";
import apiClient from "../../ApiClient";

export class EstablishmentPersonAssignmentMapper {
    constructor() {}
    toFront(
        data:
            | IEstablishmentPersonAssignEntity
            | IEstablishmentPersonAssignWithContentEntity
    ): IEstablishmentPersonAssignFront {
        const entity = "entity" in data ? data.entity : data;
        // const content = "content" in data ? data.content : data.Content || null;

        return {
            Id: entity.Id,
            EstablishmentId:
                typeof entity.Establishment === "string"
                    ? entity.Establishment
                    : entity.Establishment?.Id || null,
            PersonId:
                typeof entity.Person === "string"
                    ? entity.Person
                    : entity.Person?.Id || null,
            IsAddedByPerson: entity.IsAddedByPerson,
            IsOwner: entity.IsOwner,
            IsVerified: entity.IsVerified,
            Note: entity.Note,
            Source: entity.Source,
        };
    }
}
export class EstablishmentPersonAssignmentApi extends BaseApiService<
    IEstablishmentPersonAssignEntity,
    IEstablishmentPersonAssignWithContentEntity,
    IEstablishmentPersonAssignFront,
    IEstablishmentPersonAssignRequest
    // RequestGetAllType: IEstablishmentPersonAssignGetAllRequest;
> {
    protected baseUrl = "/establishments-of-person";
    protected mapper = new EstablishmentPersonAssignmentMapper();
    async getAll(body: IEstablishmentPersonAssignGetAllRequest) {
        try {
            const res = await apiClient.post<
                IEstablishmentPersonAssignWithContentEntity[]
            >(`${this.baseUrl}/get-all`, body);
            return res.data.map((e) => this.mapper.toFront(e));
        } catch (error) {
            console.error(`error [post ${this.baseUrl}/get-all]`, error);
            return [];
        }
    }
}
