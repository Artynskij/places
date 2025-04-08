import { EstablishmentScreen } from "@/screens/EstablishmentScreen/EstablishmentScreen";
import { IPageProps } from "@/lib/models/IType";
import { notFound } from "next/navigation";
import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";
import { TagsService } from "@/lib/Api/tags/tag.service";

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        country: string;
        district: string;
        town: string;
        establishment: string;
    };
}
export async function generateMetadata({
    params,
}: {
    params: { establishment: string };
}) {
    return {
        title: `${process.env.BASE_NAME} | ${params.establishment}`,
    };
}
export default async function EstablishmentPage({
    params,
    searchParams,
}: IProps) {
    const apiEst = new EstablishmentService();
    const apiTags = new TagsService();

    const dataNearEstablishment = await apiEst.getEstablishmentByPagination({
        pagination: { page: 1, pageSize: 5 },
        lang: params.locale,
    });

    const dataEstablishment = await apiEst.getEstablishmentById(
        params.establishment,
        params.locale
    );

    const dataTags = await apiTags.getAllTagsOfEstablishmentFilter({
        establishmentIds: [params.establishment],
        lang: params.locale,
    });
    if (!dataNearEstablishment || !dataEstablishment || !dataTags) {
        notFound();
    }
    const _indexClassTag = dataTags.indexOf(
        dataTags.filter((item) => item.groupKey.value === "starRating")[0]
    );
    const classTag = dataTags.splice(_indexClassTag, _indexClassTag);
    const modifyClassTag = {
        ...classTag[0],
        count: +(classTag[0].tags[0].name
            .split(" ")[0]
            .replace(",", ".") as string),
    };

    return (
        <EstablishmentScreen
            params={params}
            dataNearEstablishment={dataNearEstablishment}
            dataEstablishment={dataEstablishment}
            dataTags={dataTags}
            classTag={modifyClassTag}
            // testTags={testTags}
        />
    );
}
