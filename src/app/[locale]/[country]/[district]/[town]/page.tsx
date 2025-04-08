import CountryScreen from "@/screens/CountryScreen/CountryScreen";
import { IPageProps } from "@/lib/models/IType";

import { notFound } from "next/navigation";
import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";


export async function generateMetadata({
    params,
}: {
    params: { town: string };
}) {
    return {
        title: `${process.env.BASE_NAME} | ${params.town}`,
    };
}
interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        country: string;
        district: string;
        town: string;
    };
}
export default async function TownPage({ params, searchParams }: IProps) {
    const api = new EstablishmentService();

    const data = await api.getEstablishmentByPagination({
        pagination: { page: 1, pageSize: 5 },
        lang: params.locale,
    });
    if (!data) notFound();
    return (
        <>
            <CountryScreen
                typePage="town"
                params={params}
                searchParams={searchParams}
                dataEstablishment={data}
            />
        </>
    );
}
