import { ApiCategory, ApiEstablishment, ApiTags } from "@/Api/Api";
import { IMockBlock } from "@/asset/mockData/mockFilterCheckBox";
import FilterScreen from "@/screens/FilterScreen/FilterScreen";
import { IPageProps } from "@/models/IType";
import { notFound } from "next/navigation";

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

  const apiEst = new ApiEstablishment();
  const apiTags = new ApiTags();
  const apiCategory = new ApiCategory();
  const data = await apiEst.getEstablishmentByPagination({
    pagination: { page: 1, pageSize: 30 },
    filter: { tagsIds: filterQuery || [] },
  });
  if (!data) notFound();
  // const tags = await api.getAllTagsOfEstablishment(
  //   data?.establishmentItems.map((item) => item.establishment.Id),
  //   params.locale
  // );
  const tags = await apiTags.getAllFiltersTagsOfEstablishment({
    lang: params.locale,
    establishmentIds: data?.establishmentItems.map(
      (item) => item.establishment.Id
    ),
  });
  const exportTags: IMockBlock[] = tags.map((cat) => {
    return {
      data: cat.Tags.map((tag) => {
        return {
          id: tag.Id,
          name: tag.Content.details[0].value,
          value: tag.Id,
        };
      }),
      title: cat.TagCategory.Content.details[0].value,
      value: cat.TagCategory.Name,
      id: cat.TagCategory.Id,
    };
  });
  // [{ id: 1, name: "", value: "" }]

  // const dataTest = await apiTags.getAllTagsOfEstablishment({
  //   lang: params.locale,
  //   establishmentIds: data?.establishmentItems.map(
  //     (item) => item.establishment.Id
  //   ),
  // });
  const dataTest = await apiCategory.getAllCategoryOfEst({
    lang: params.locale,
  });
  if (!tags) notFound();

  return (
    <FilterScreen
      dataEstablishment={data}
      dataOfTags={exportTags}
      params={params}
      searchParams={searchParams}
      dataTest={tags}
    />
  );
}
