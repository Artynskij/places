import FilterScreen from "@/screens/FilterScreen/FilterScreen";
import { IBasePageProps } from "@/lib/models/common/IType";
import { notFound } from "next/navigation";

import { EstablishmentTagsService } from "@/lib/Api/(Establishment)/establishment-tags/establishment-tags.service";
import { CONSTANT_TYPES_OF_ESTABLISHMENT_DB } from "@/asset/constants/database/types-of-establishment";
import { LocationService } from "@/lib/Api/location/location.service";

import { TTypesOfEstablishment } from "@/lib/models/types/TTypesEstablishment";
import { CONSTANT_DEFAULT_PAGE_SIZE } from "@/asset/constants/default.const";
import { EstablishmentService } from "@/lib/Api/(Establishment)/establishment/establishment.service";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/search-params.const";
import { TSortType } from "@/lib/models/types/TSortType";
import { TTypeSortEstablishmentServer } from "@/lib/models/types";

// export async function generateMetadata({
//   params,
// }: {
//   params: { country: string };
// }) {
//   return {
//     title: `${process.env.BASE_NAME} | ${params.country}`,
//   };
// }

interface IProps
    extends IBasePageProps<
        { location: string; typeEstablishment: TTypesOfEstablishment },
        { sort?: TSortType; filter?: string; page?: string }
    > {}

export default async function FilterPage({ params, searchParams }: IProps) {
    const filterQuery = searchParams?.filter
        ?.toString()
        .split(CONSTANT_SEARCH_PARAMS.ampersand);

    const sortQuery = searchParams?.sort?.toString() as
        | TTypeSortEstablishmentServer
        | undefined;

    CONSTANT_SEARCH_PARAMS;
    const tagsQuery =
        filterQuery
            ?.filter((query) =>
                query.includes(CONSTANT_SEARCH_PARAMS.filterParam.tag)
            )
            .map((queryTag) =>
                queryTag.replace(CONSTANT_SEARCH_PARAMS.filterParam.tag, "")
            ) || [];
    const categoriesQuery =
        filterQuery
            ?.filter((query) =>
                query.includes(CONSTANT_SEARCH_PARAMS.filterParam.category)
            )
            .map((queryTag) =>
                queryTag.replace(
                    CONSTANT_SEARCH_PARAMS.filterParam.category,
                    ""
                )
            ) || [];
    // const sortQuery =
    //     filterQuery
    //         ?.filter((query) => query.includes(CONSTANT_SEARCH_PARAMS.SORT))
    //         .map((queryTag) => queryTag.replace("c", "")) || [];
    const currentPageQuery = searchParams?.page?.toString();

    const apiEst = new EstablishmentService();
    const apiTags = new EstablishmentTagsService();
    const apiLocation = new LocationService();

    const [establishmentList, blockTags, locationData] = await Promise.all([
        apiEst.getByPagination({
            lang: params.locale,
            pagination: {
                page: currentPageQuery
                    ? +currentPageQuery / CONSTANT_DEFAULT_PAGE_SIZE
                    : 1,
                pageSize: CONSTANT_DEFAULT_PAGE_SIZE,
            },
            sort: {
                avgRate: sortQuery || "NONE",
            },
            filter: {
                tagsIds: tagsQuery || [],
                categoryIds: categoriesQuery || [],
                typeIds: [
                    CONSTANT_TYPES_OF_ESTABLISHMENT_DB[params.typeEstablishment]
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
                    CONSTANT_TYPES_OF_ESTABLISHMENT_DB[params.typeEstablishment]
                        .id,
            },
            filterQuery || null
        ),
        apiLocation.getById(params.location, params.locale),
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
