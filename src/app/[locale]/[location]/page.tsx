import { Video } from "@/components/UI/Video/Video";

import Link from "next/link";
import type { Metadata } from "next";

import { IPageProps } from "@/lib/models/IType";
import { unstable_setRequestLocale } from "next-intl/server";

import CountryScreen from "@/screens/CountryScreen/CountryScreen";
import { Loader } from "@/components/common/Loader/Loader";
import { notFound } from "next/navigation";
import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";


export async function generateMetadata({
    params,
}: {
    params: { location: string };
}) {
    return {
        title: `${process.env.BASE_NAME} | ${params.location}`,
    };
}

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        location: string;
    };
}

export default async function CountryPage({ params, searchParams }: IProps) {
    // Пример запроса данных через API (если данные нужны на сервере)
    const api = new EstablishmentService();

    const data = await api.getEstablishmentByPagination({
        pagination: { page: 5, pageSize: 5 },
        lang: params.locale,
    });
    if (!data) notFound();
    return (
        <>
            <CountryScreen
                typePage="country"
                params={params}
                searchParams={searchParams}
                dataEstablishment={data}
            />
        </>
    );
}
