import SocialNetworksPersonApi from "./socialNetworksPerson.endpoints";
import { ISocialContactsFront } from "@/lib/models/frontend/(person)/socialContacts.front";
import { ISocialContactsRequest } from "@/lib/models/api/request/(Person)/socialContacts.request";

import { ContactsPersonService } from "../contactsPerson/contactsPerson.service";

export class SocialNetworksPersonService {
    private SocialNetworksPersonApi: SocialNetworksPersonApi;
    private ContactsPersonService: ContactsPersonService;

    constructor() {
        this.SocialNetworksPersonApi = new SocialNetworksPersonApi();
        this.ContactsPersonService = new ContactsPersonService();
    }

    async getSocialNetworksPersonById(
        id: string,
        lang?: string
    ): Promise<ISocialContactsFront | null> {
        const response =
            this.SocialNetworksPersonApi.getSocialNetworksPersonById(id, lang);
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
            this.SocialNetworksPersonApi.createSocialNetworksPerson(body).then(
                async (res) => {
                    await this.ContactsPersonService.updateContactsPerson({
                        body: {
                            SocialContactsId: res?.Id,
                        },
                        id: idContacts || null,
                        idPerson: idPerson,
                    });

                    return res;
                }
            );
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
            this.SocialNetworksPersonApi.updateSocialNetworksPerson(id, body);
        return response;
    }
}
