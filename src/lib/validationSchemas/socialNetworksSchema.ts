import * as Yup from "yup";
import { TSocialNetworks } from "../models/types/TSocialNetworks";
import { CONSTANT_SOCIAL_NETWORKS_ARRAY } from "@/asset/constants/socialNetworks";

export const validSocialNetworksSchema = Yup.array().of(
    Yup.object({
        type: Yup.mixed<TSocialNetworks>()
            .oneOf(CONSTANT_SOCIAL_NETWORKS_ARRAY )
            .required("Тип обязателен"),
        url: Yup.string().url("Невалидный URL").required("Введите ссылку"),
    })
);
