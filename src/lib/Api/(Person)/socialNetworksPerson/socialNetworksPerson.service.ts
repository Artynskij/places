import SocialNetworksPersonApi from "./socialNetworksPerson.endpoints";
import { ISocialContactsFront } from "@/lib/models/frontend/(person)/socialContacts.front";
import { ISocialContactsRequest } from "@/lib/models/api/request/(Person)/socialContacts.request";

import { ContactsService } from "../../contacts/contacts.service";
import { SocialNetworksPersonMapper } from "./socialNetworksPerson.mapper";

export class SocialNetworksPersonService {
    private SocialNetworksPersonApi: SocialNetworksPersonApi;
    private SocialNetworksPersonMapper: SocialNetworksPersonMapper;
    private ContactsService: ContactsService;

    constructor() {
        this.SocialNetworksPersonApi = new SocialNetworksPersonApi();
        this.SocialNetworksPersonMapper = new SocialNetworksPersonMapper();
        this.ContactsService = new ContactsService();
    }

    async getSocialNetworksPersonById(
        id: string,
        lang?: string
    ): Promise<ISocialContactsFront | null> {
        const response =
            this.SocialNetworksPersonApi.getSocialNetworksPersonById(
                id,
                lang
            ).then((res) => {
                if (!res) return null;
                const mappedData =
                    this.SocialNetworksPersonMapper.transformSocialNetworksPersonEntity(
                        res
                    );
                return mappedData;
            });
        return response;
    }

    async createSocialNetworksPerson({
        body,
        idPerson,
        idContacts,
    }: {
        body: ISocialContactsRequest;
        idPerson: string;
        idContacts: string | null;
    }): Promise<ISocialContactsFront | null> {
        const response =
            this.SocialNetworksPersonApi.createSocialNetworksPerson(body)
                .then(async (res) => {
                    await this.ContactsService.updateContacts({
                        body: {
                            SocialContactsId: res?.Id,
                        },
                        id: idContacts || null,
                        vendorId: idPerson,
                    });

                    return res;
                })
                .then((res) => {
                    if (!res) return null;
                    const mappedData =
                        this.SocialNetworksPersonMapper.transformSocialNetworksPersonEntity(
                            res
                        );
                    return mappedData;
                });
        return response;
    }
    async updateSocialNetworksPerson({
        id,
        body,
        idPerson,
        idContacts,
    }: {
        id: string | null;
        body: ISocialContactsRequest;
        idPerson: string;
        idContacts: string | null;
    }): Promise<ISocialContactsFront | null> {
        if (!id) {
            return this.createSocialNetworksPerson({
                body,
                idPerson,
                idContacts,
            });
        }
        const response =
            this.SocialNetworksPersonApi.updateSocialNetworksPerson(
                id,
                body
            ).then((res) => {
                if (!res) return null;
                const mappedData =
                    this.SocialNetworksPersonMapper.transformSocialNetworksPersonEntity(
                        res
                    );
                return mappedData;
            });
        return response;
    }
}
