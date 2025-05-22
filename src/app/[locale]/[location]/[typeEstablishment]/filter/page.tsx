import { IMockBlock } from "@/asset/mockData/mockFilterCheckBox";
import FilterScreen from "@/screens/FilterScreen/FilterScreen";
import { IPageProps } from "@/lib/models/IType";
import { notFound } from "next/navigation";

import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";
import { TagsService } from "@/lib/Api/tags/tag.service";
import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import { LocationService } from "@/lib/Api/location/location.service";

import { TTypesOfEstablishment } from "@/lib/models/common/TTypesEstablishment";
import { CONSTANT_DEFAULT_PAGE_SIZE } from "@/asset/constants/DefaultConstant";

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
        typeEstablishment: TTypesOfEstablishment;
    };
}

export default async function FilterPage({ params, searchParams }: IProps) {
    const filterQuery = searchParams?.filter?.toString().split("%");
    const tagsQuery =
        filterQuery
            ?.filter((query) => query.includes("t"))
            .map((queryTag) => queryTag.replace("t", "")) || [];
    const categoriesQuery =
        filterQuery
            ?.filter((query) => query.includes("c"))
            .map((queryTag) => queryTag.replace("c", "")) || [];
    const currentPageQuery = searchParams?.page?.toString();

    const apiEst = new EstablishmentService();
    const apiTags = new TagsService();
    const apiLocation = new LocationService();

    const [establishmentList, blockTags, locationData] = await Promise.all([
        apiEst.getEstablishmentByPagination({
            lang: params.locale,
            pagination: {
                page: currentPageQuery
                    ? +currentPageQuery / CONSTANT_DEFAULT_PAGE_SIZE
                    : 1,
                pageSize: CONSTANT_DEFAULT_PAGE_SIZE,
            },
            filter: {
                tagsIds: tagsQuery || [],
                categoryIds: categoriesQuery || [],
                typeIds: [
                    CONSTANT_TYPES_OF_ESTABLISHMENT[params.typeEstablishment]
                        .id,
                ],
                locationId: params.location,
            },
        }),
        apiTags.getAllTagsOfEstablishmentFilter(
            {
                lang: params.locale,
                locationId: params.location,
                establishmentTypeId:
                    CONSTANT_TYPES_OF_ESTABLISHMENT[params.typeEstablishment]
                        .id,
            },
            filterQuery || null
        ),
        apiLocation.getLocationById(params.location, params.locale),
    ]);
    if (!establishmentList || !blockTags) notFound();
    const tagsClassEstablishment =
        await apiTags.getStarsAndPriceOfAllEstablishment({
            lang: params.locale,
            establishmentIds: establishmentList?.map((item) => item.id),
        });
    const breadcrumbData = await apiLocation.getBreadcrumbData({
        ids: locationData?.pathBreadcrumb || "",
        lang: params.locale,
    });
    return (
        <FilterScreen
            establishmentList={establishmentList}
            blockTags={blockTags}
            params={params}
            searchParams={searchParams}
            locationData={locationData}
            tagsClassEstablishment={tagsClassEstablishment}
            breadcrumbData={breadcrumbData}
        />
    );
}
