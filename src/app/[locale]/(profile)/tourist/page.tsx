import type { Metadata } from "next";

import { IPageProps } from "@/lib/models/IType";
import { unstable_setRequestLocale } from "next-intl/server";

import TouristScreen from "@/screens/(Profile)/TouristScreen/TouristScreen";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | tourist`,
    };
}

interface IProps extends IPageProps {
    
}

export default function TouristPage({ params, searchParams }: IProps) {
    return <TouristScreen params={params} />;
}
