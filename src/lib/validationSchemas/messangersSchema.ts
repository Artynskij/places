import * as Yup from "yup";
import { TSocialNetworks } from "../models/types/TSocialNetworks";
import { CONSTANT_SOCIAL_NETWORKS_ARRAY } from "@/asset/constants/social-networks.const";

export const validMessangerNetworksSchema = Yup.array()
    .of(
        Yup.object({
            type: Yup.mixed<TSocialNetworks>()
                .oneOf(CONSTANT_SOCIAL_NETWORKS_ARRAY)
                .required("Тип обязателен"),
            url: Yup.string().required("Введите номер телефона"),
        })
    )
    .notRequired();
