import type { Metadata } from "next";

import { IPageProps } from "@/lib/models/IType";
import { unstable_setRequestLocale } from "next-intl/server";

import TouristScreen from "@/screens/(Profile)/TouristScreen/TouristScreen";

export async function generateMetadata({ params }: { params: { id: string } }) {
    return {
        title: `${process.env.BASE_NAME} | ${params.id}`,
    };
}

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        id: string;
    };
}

export default function TouristPage({ params, searchParams }: IProps) {
    return <TouristScreen params={params} />;
}
