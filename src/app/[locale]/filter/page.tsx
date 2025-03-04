import { IMockBlock } from "@/asset/mockData/mockFilterCheckBox";
import FilterScreen from "@/screens/FilterScreen/FilterScreen";
import { IPageProps } from "@/models/IType";
import { notFound } from "next/navigation";
import { EstablishmentService } from "@/Api/establishment/establishment.service";
import { TagsService } from "@/Api/tags/tag.service";

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
    // country: string;
  };
}

export default async function FilterPage({ params, searchParams }: IProps) {
  const filterQuery = searchParams.filter?.toString().split("%");

  const apiEst = new EstablishmentService();
  const apiTags = new TagsService();
  // const apiCategory = new ApiCategory();
  const data = await apiEst.getEstablishmentByPagination({
    lang: params.locale,
    pagination: { page: 1, pageSize: 30 },
    filter: { tagsIds: filterQuery || [] },
  });

  // const tags = await api.getAllTagsOfEstablishment(
  //   data?.establishmentItems.map((item) => item.establishment.Id),
  //   params.locale
  // );
  const blockTags = await apiTags.getAllTagsOfEstablishmentFilter({
    lang: params.locale,
    establishmentIds:
      data?.establishmentItems.map((item) => item.establishment.Id) || [],
  });
  if (!blockTags || !data) notFound();

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
