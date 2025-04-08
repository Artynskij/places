import type { Metadata } from "next";

import { IPageProps } from "@/lib/models/IType";
import { unstable_setRequestLocale } from "next-intl/server";
import NewsCategoryScreen from "@/screens/(News)/NewsCategoryScreen/NewsCategoryScreen";
import TouristScreen from "@/screens/(Profile)/TouristScreen/TouristScreen";
// import NewsAuthorScreen from "@/screens/News/NewsAuthorScreen/NewsAuthorScreen";

export async function generateMetadata({
    params,
}: {
    params: { username: string };
}) {
    return {
        title: `${process.env.BASE_NAME} | ${params.username}`,
    };
}

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        username: string;
    };
}

export default function TouristPage({ params, searchParams }: IProps) {
    return <TouristScreen params={params}  />;
}
