import { IMockBlock } from "@/asset/mockData/mockFilterCheckBox";
import FilterScreen from "@/screens/FilterScreen/FilterScreen";
import { IPageProps, ITypesOfEstablishment } from "@/lib/models/IType";
import { notFound } from "next/navigation";

import { IEstablishmentFront } from "@/lib/models";
import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";
import { TagsService } from "@/lib/Api/tags/tag.service";
import { TYPES_OF_ESTABLISHMENT } from "@/asset/constants/typesOfEstablishment";
import { LocationService } from "@/lib/Api/location/location.service";
import { Suspense } from "react";
import { Loader } from "@/components/common/Loader/Loader";

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
    return (
        <Suspense fallback={<Loader />}>
          <FilterContent params={params} searchParams={searchParams} />
        </Suspense>
      );
}
interface FilterContentProps extends IPageProps {
    params: IPageProps["params"] & {
        location: string;
        typeEstablishment: ITypesOfEstablishment;
    };
}
 async function FilterContent({
    params,
    searchParams,
  }: FilterContentProps) {
    const filterQuery = searchParams?.filter?.toString().split("%");
    const tagsQuery = filterQuery
      ?.filter((query) => query.includes("t"))
      .map((queryTag) => queryTag.replace("t", ""));
    const categoriesQuery = filterQuery
      ?.filter((query) => query.includes("c"))
      .map((queryTag) => queryTag.replace("c", ""));
    const currentPageQuery = searchParams?.page?.toString();
  
    const apiEst = new EstablishmentService();
    const apiTags = new TagsService();
    const apiLocation = new LocationService();
  
    const [establishmentList, blockTags, locationData] = await Promise.all([
      apiEst.getEstablishmentByPagination({
        lang: params.locale,
        pagination: {
          page: currentPageQuery ? +currentPageQuery / 30 : 1,
          pageSize: 30,
        },
        filter: {
          tagsIds: tagsQuery || [],
          categoryIds: categoriesQuery || [],
          typeIds: [TYPES_OF_ESTABLISHMENT[params.typeEstablishment].id],
          locationId: params.location,
        },
      }),
      apiTags.getAllTagsOfEstablishmentFilter({
        lang: params.locale,
        locationId: params.location,
        establishmentTypeId: TYPES_OF_ESTABLISHMENT[params.typeEstablishment].id,
      }),
      apiLocation.getLocationById(params.location, params.locale),
    ]);
  
    if (!establishmentList || !blockTags) notFound();
  
    const tagsClassEstablishment = await apiTags.getStarsAndPriceOfAllEstablishment({
      lang: params.locale,
      establishmentIds: establishmentList?.map((item) => item.id),
    });
  
    return (
      <FilterScreen
        establishmentList={establishmentList}
        blockTags={blockTags}
        params={params}
        searchParams={searchParams}
        locationData={locationData}
        tagsClassEstablishment={tagsClassEstablishment}
      />
    );
  }