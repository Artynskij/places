import type { Metadata } from "next";

import { IBasePageProps } from "@/lib/models/common/IType";
import { unstable_setRequestLocale } from "next-intl/server";

import TouristScreen from "@/screens/(Profile)/TouristScreen/TouristScreen";

export async function generateMetadata({
    params,
}: {
    params: { username: string };
}) {
    return {
        title: `${process.env.BASE_NAME} | ${params.username}`,
    };
}

interface IProps
    extends IBasePageProps<
        {
            username: string;
        },
        { tab: string }
    > {}

export default function TouristPage({ params, searchParams }: IProps) {
    return <TouristScreen params={params} searchParams={searchParams} />;
}
