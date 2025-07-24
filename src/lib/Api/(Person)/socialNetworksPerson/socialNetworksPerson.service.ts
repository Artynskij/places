import SocialNetworksPersonApi from "./socialNetworksPerson.endpoints";
import { ISocialContactsFront } from "@/lib/models/frontend/(person)/socialContacts.front";
import { ISocialContactsRequest } from "@/lib/models/api/request/(Person)/socialContacts.request";

import { ContactsService } from "../../contacts/contacts.service";
import { SocialNetworksPersonMapper } from "./socialNetworksPerson.mapper";

export class SocialNetworksPersonService {
    private SocialNetworksPersonApi: SocialNetworksPersonApi;
    private SocialNetworksPersonMapper: SocialNetworksPersonMapper;

    constructor() {
        this.SocialNetworksPersonApi = new SocialNetworksPersonApi();
        this.SocialNetworksPersonMapper = new SocialNetworksPersonMapper();
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

    async createSocialNetworksPerson(
        body: ISocialContactsRequest
    ): Promise<ISocialContactsFront | null> {
        const response =
            this.SocialNetworksPersonApi.createSocialNetworksPerson(body).then(
                (res) => {
                    if (!res) return null;
                    const mappedData =
                        this.SocialNetworksPersonMapper.transformSocialNetworksPersonEntity(
                            res
                        );
                    return mappedData;
                }
            );
        return response;
    }
    async updateSocialNetworksPerson(
        id: string | null,
        body: ISocialContactsRequest
    ): Promise<ISocialContactsFront | null> {
        if (!id) {
            return this.createSocialNetworksPerson(body);
        }
        const response =
            this.SocialNetworksPersonApi.updateSocialNetworksPerson(
                id,
                body
            ).then(async (res) => {
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
