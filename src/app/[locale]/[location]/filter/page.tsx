import { IMockBlock } from "@/asset/mockData/mockFilterCheckBox";
import FilterScreen from "@/screens/FilterScreen/FilterScreen";
import { IPageProps } from "@/lib/models/IType";
import { notFound } from "next/navigation";

import { IEstablishmentFront } from "@/lib/models";
import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";
import { TagsService } from "@/lib/Api/tags/tag.service";

// export async function generateMetadata({
//   params,
// }: {
//   params: { country: string };
// }) {
//   return {
//     title: `${process.env.BASE_NAME} | ${params.country}`,
//   };
// }

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        location: string;
    };
}

export default async function FilterPage({ params, searchParams }: IProps) {
    const filterQuery = searchParams?.filter?.toString().split("%");
    const currentPageQuery = searchParams?.page?.toString();

    const apiEst = new EstablishmentService();
    const apiTags = new TagsService();

    const data = await apiEst.getEstablishmentByPagination({
        lang: params.locale,
        pagination: {
            page: currentPageQuery ? +currentPageQuery / 30 : 1,
            pageSize: 30,
        },
        filter: { tagsIds: filterQuery || [] },
    });

    // const tags = await api.getAllTagsOfEstablishment(
    //   data?.establishmentItems.map((item) => item.establishment.Id),
    //   params.locale
    // );
    if (!data) notFound();
    const blockTags = await apiTags.getAllTagsOfEstablishmentFilter({
        lang: params.locale,
        establishmentIds:
            data?.map((item: IEstablishmentFront) => item.id) || [],
    });
    if (!blockTags) notFound();

    return (
        <FilterScreen
            dataEstablishment={data}
            blockTags={blockTags}
            params={params}
            searchParams={searchParams}
            // dataTest={blockTags}
        />
    );
}
