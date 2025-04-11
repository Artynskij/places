import { IMockBlock } from "@/asset/mockData/mockFilterCheckBox";
import FilterScreen from "@/screens/FilterScreen/FilterScreen";
import { IPageProps, ITypesOfEstablishment } from "@/lib/models/IType";
import { notFound } from "next/navigation";

import { IEstablishmentFront } from "@/lib/models";
import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";
import { TagsService } from "@/lib/Api/tags/tag.service";
import { TYPES_OF_ESTABLISHMENT } from "@/asset/constants/typesOfEstablishment";
import { LocationService } from "@/lib/Api/location/location.service";

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
        typeEstablishment: ITypesOfEstablishment;
    };
}

export default async function FilterPage({ params, searchParams }: IProps) {
    const filterQuery = searchParams?.filter?.toString().split("%");
    const currentPageQuery = searchParams?.page?.toString();

    const apiEst = new EstablishmentService();
    const apiTags = new TagsService();
    const apiLocation = new LocationService();

    const [data, blockTags, locationData] = await Promise.all([
        apiEst.getEstablishmentByPagination({
            lang: params.locale,
            pagination: {
                page: currentPageQuery ? +currentPageQuery / 30 : 1,
                pageSize: 30,
            },

            filter: {
                tagsIds: filterQuery || [],
                typeIds: [TYPES_OF_ESTABLISHMENT[params.typeEstablishment].id],
                locationId: params.location,
            },
        }),
        apiTags.getAllTagsOfEstablishmentFilter({
            lang: params.locale,
            // establishmentIds:
            //     data?.map((item: IEstablishmentFront) => item.id) || [],

            locationId: params.location,
        }),
        apiLocation.getLocationById(params.location, params.locale),
    ]);
  
    if (!data) notFound();

    if (!blockTags) notFound();

    return (
        <FilterScreen
            dataEstablishment={data}
            blockTags={blockTags}
            params={params}
            searchParams={searchParams}
            locationData={locationData}
            // dataTest={blockTags}
        />
    );
}
