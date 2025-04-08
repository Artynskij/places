import type { Metadata } from "next";

import { IPageProps } from "@/lib/models/IType";

import CountriesScreen from "@/screens/CountriesScreen/CountriesScreen";

export async function generateMetadata({ params }: { params: null }) {
    return {
        title: `${process.env.BASE_NAME} | countries`,
    };
}

interface IProps extends IPageProps {
    params: IPageProps["params"] & {};
}

export default function CountriesPage({ params, searchParams }: IProps) {
    return (
        <>
            <CountriesScreen params={params} searchParams={searchParams} />
        </>
    );
}
