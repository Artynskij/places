import type { Metadata } from "next";

import { IBasePageProps } from "@/lib/models/common/IType";

import CountriesScreen from "@/screens/CountriesScreen/CountriesScreen";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | countries`,
    };
}

interface IProps extends IBasePageProps {
   
}

export default function CountriesPage({ params, searchParams }: IProps) {
    return (
        <>
            <CountriesScreen params={params} searchParams={searchParams} />
        </>
    );
}
