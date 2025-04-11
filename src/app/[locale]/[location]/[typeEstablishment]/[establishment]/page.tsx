import { EstablishmentScreen } from "@/screens/EstablishmentScreen/EstablishmentScreen";
import { IPageProps, ITypesOfEstablishment } from "@/lib/models/IType";
import { notFound } from "next/navigation";
import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";
import { TagsService } from "@/lib/Api/tags/tag.service";
import { TYPES_OF_ESTABLISHMENT } from "@/asset/constants/typesOfEstablishment";
import { LocationService } from "@/lib/Api/location/location.service";

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        location: string;
        typeOfEstablishment: ITypesOfEstablishment;
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
    const apiEstablishment = new EstablishmentService();
    const apiTags = new TagsService();
    const apiLocation = new LocationService();

    // const dataNearEstablishment = await apiEst.getEstablishmentByPagination({
    //     pagination: { page: 1, pageSize: 5 },
    //     lang: params.locale,
    // });

    // const dataEstablishment = await apiEst.getEstablishmentById(
    //     params.establishment,
    //     params.locale
    // );

    const dataTags = await apiTags.getAllTagsOfEstablishmentFilter({
        establishmentIds: [params.establishment],
        lang: params.locale,
    });

    const [
        dataEstablishment,
        eaterNearEstablishment,
        accommodationNearEstablishment,
        attractionNearEstablishment,
        // locationData,
    ] = await Promise.all([
        apiEstablishment.getEstablishmentById(
            params.establishment,
            params.locale

        ),
        apiEstablishment.getEstablishmentByPagination({
            pagination: { page: 1, pageSize: 10 },
            filter: {
                typeIds: [TYPES_OF_ESTABLISHMENT.EATER.id],
                locationId: params.location,
            },

            lang: params.locale,
        }),
        apiEstablishment.getEstablishmentByPagination({
            pagination: { page: 1, pageSize: 10 },
            filter: {
                typeIds: [TYPES_OF_ESTABLISHMENT.ACCOMMODATION.id],
                locationId: params.location,
            },

            lang: params.locale,
        }),
        apiEstablishment.getEstablishmentByPagination({
            pagination: { page: 1, pageSize: 10 },
            filter: {
                typeIds: [TYPES_OF_ESTABLISHMENT.ATTRACTION.id],
                locationId: params.location,
            },

            lang: params.locale,
        }),
        // apiLocation.getLocationById(params.location, params.locale),
    ]);
    if (!eaterNearEstablishment || !dataEstablishment || !dataTags) {
        notFound();
    }
    const _indexClassTag = dataTags.indexOf(
        dataTags.filter((item) => item.groupKey.value === "starRating")[0]
    );
    const classTag = dataTags.splice(_indexClassTag, _indexClassTag);
    const modifyClassTag = {
        ...classTag[0],
        count: +(classTag[0]?.tags[0].name
            .split(" ")[0]
            .replace(",", ".") as string),
    };

    return (
        <EstablishmentScreen
            params={params}
           
            dataNearEstablishment={{
                accommodation: accommodationNearEstablishment || [],
                attraction: attractionNearEstablishment || [],
                eater: eaterNearEstablishment || [],
            }}
            dataEstablishment={dataEstablishment}
            dataTags={dataTags}
            classTag={modifyClassTag}
            // testTags={testTags}
        />
    );
}
