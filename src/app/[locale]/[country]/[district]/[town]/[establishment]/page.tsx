import { ApiEstablishment, ApiTags } from "@/Api/Api";
import { EstablishmentScreen } from "@/screens/EstablishmentScreen/EstablishmentScreen";
import { IPageProps } from "@/models/IType";
import { notFound } from "next/navigation";
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
  const apiEst = new ApiEstablishment();
  const apiTags = new ApiTags();

  const dataNearEstablishment = await apiEst.getEstablishmentByPagination({
    pagination: { page: 1, pageSize: 5 },
    // lang: params.locale,
  });

  const dataEstablishment = await apiEst.getEstablishmentById(
    params.establishment,
    params.locale
  );

  const dataTags = await apiTags.getAllTagsOfEstablishment({
    establishmentIds: [params.establishment],
    lang: params.locale,
  });
  if (!dataNearEstablishment || !dataEstablishment || !dataTags) {
    notFound();
  }
  console.log(dataTags);

  const transformTags = dataTags.reduce((acc, item) => {
    const key = item.TagCategory.Name;
    const value = item.Content?.details[0].value;
    const title = item.TagCategory.Content?.details[0].value;
    if (key === "starRating" || key === "priceTypes") return acc;
    if (acc[key]) {
      acc[key].value.push(value);
    } else {
      acc[key] = {
        value: [value],
        title,
      };
    }

    return acc;
  }, {} as Record<string, { value: string[]; title: string }>);
  const newType = Object.entries(transformTags).map(
    ([key, { value, title }]) => ({
      key,
      value: value,
      title,
    })
  );
  const findClassTag = dataTags?.find(
    (item) =>
      item.TagCategory.Name === "starRating" ||
      item.TagCategory.Name === "priceTypes"
  );
  const classTag = {
    key: findClassTag?.TagCategory.Name as string,
    value: findClassTag?.Content?.details[0].value as string,
    title: findClassTag?.TagCategory.Content?.details[0].value as string,
    count: +(findClassTag?.Content?.details[0].value
      .split(" ")[0]
      .replace(",", ".") as string),
  };

  return (
    <EstablishmentScreen
      params={params}
      searchParams={searchParams}
      dataNearEstablishment={dataNearEstablishment}
      dataEstablishment={dataEstablishment}
      dataTags={newType}
      classTag={classTag}
    />
  );
}
