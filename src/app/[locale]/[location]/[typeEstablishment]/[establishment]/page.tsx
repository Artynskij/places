import { EstablishmentScreen } from "@/screens/EstablishmentScreen/EstablishmentScreen";
import { IPageProps, ITypesOfEstablishment } from "@/lib/models/IType";
import { notFound } from "next/navigation";
import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";
import { TagsService } from "@/lib/Api/tags/tag.service";
import { TYPES_OF_ESTABLISHMENT } from "@/asset/constants/typesOfEstablishment";
import { LocationService } from "@/lib/Api/location/location.service";
import { ScheduleService } from "@/lib/Api/schedule/schedule.service";

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
    const apiSchedule = new ScheduleService();

    const [
        dataEstablishment,
        eaterNearEstablishment,
        accommodationNearEstablishment,
        attractionNearEstablishment,
        tagsEstablishment,
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
        apiTags.getAllTagsOfEstablishmentFilter({
            establishmentIds: [params.establishment],
            lang: params.locale,
        }),
    ]);
    if (!dataEstablishment) notFound();
    // TODO delete this
    // const locationData = await apiLocation.getLocationById(
    //     dataEstablishment?.location.town.id,
    //     params.locale
    // );

    const locationCountryData = await apiLocation.getLocationById(
        dataEstablishment.location.country.id,
        params.locale
    );
    const scheduleData = await apiSchedule.getLocationById(params.establishment)
    if (!eaterNearEstablishment || !tagsEstablishment || !locationCountryData) {
        notFound();
    }
    // TODO: mapper tag

    const _indexClassTag = tagsEstablishment.indexOf(
        tagsEstablishment.filter(
            (item) => item.groupKey.key === "starRating"
        )[0]
    );
    const classTag = tagsEstablishment.splice(_indexClassTag, 1)[0];
    const modifyClassTag = classTag
        ? {
              ...classTag,
              count: +classTag?.tags[0]?.value?.split(" ")[0].replace(",", "."),
          }
        : null;

    return (
        <EstablishmentScreen
            params={params}
            dataNearEstablishment={{
                accommodation: accommodationNearEstablishment || [],
                attraction: attractionNearEstablishment || [],
                eater: eaterNearEstablishment || [],
            }}
            dataEstablishment={dataEstablishment}
            dataTags={tagsEstablishment}
            classTag={modifyClassTag}
            // locationData={locationData}
            locationCountryData={locationCountryData}
            scheduleData={scheduleData}
        />
    );
}
