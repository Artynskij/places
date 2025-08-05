import { ISocialContactsFront, ISocialContactsRequest } from "@/lib/models";
import SocialNetworksPersonApi from "./socialNetworksPerson.endpoints";


import { SocialNetworksPersonMapper } from "./socialNetworksPerson.mapper";

export class SocialNetworksService {
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
        body: ISocialContactsRequest | null
    ): Promise<ISocialContactsFront | null> {
        if (!body) return null;
        if (!id) {
            return this.createSocialNetworksPerson(body);
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
