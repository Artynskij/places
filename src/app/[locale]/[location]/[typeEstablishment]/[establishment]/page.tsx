import { EstablishmentScreen } from "@/screens/EstablishmentScreen/EstablishmentScreen";
import { IPageProps } from "@/lib/models/IType";
import { notFound } from "next/navigation";
import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";
import { TagsService } from "@/lib/Api/tags/tag.service";
import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import { LocationService } from "@/lib/Api/location/location.service";
import { ScheduleService } from "@/lib/Api/schedule/schedule.service";
import { CONSTANT_CATEGORY_CLASS_TAG } from "@/asset/constants/categoryClassTag";
import { TTypesOfEstablishment } from "@/lib/models/common/TTypesEstablishment";
import { MapService } from "@/lib/Api/map/map.service";

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        location: string;
        typeEstablishment: TTypesOfEstablishment;
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
    const apiMap = new MapService();
    const dataEstablishment = await apiEstablishment.getEstablishmentById(
        params.establishment,
        params.locale
    );
    if (!dataEstablishment) notFound();

    const sortedNearEstablishment =
        await apiMap.getEstablishmentByCoordAndSortTypes({
            lat: dataEstablishment.location.latitude,
            lon: dataEstablishment.location.longitude,
            radius: 1000,
        });
    if (!sortedNearEstablishment) {
        notFound();
    }
    const eaterNearEstablishment = sortedNearEstablishment.eater;
    const accommodationNearEstablishment =
        sortedNearEstablishment.accommodation;
    const attractionNearEstablishment = sortedNearEstablishment.attraction;
    const tagsEstablishment = await apiTags.getAllTagsOfEstablishmentFilter(
        {
            establishmentIds: [params.establishment],
            lang: params.locale,
        },
        []
    );
    // TODO delete this
    const locationData = await apiLocation.getLocationById(
        dataEstablishment?.location.town.id,
        params.locale
    );

    const locationCountryData = await apiLocation.getLocationById(
        dataEstablishment.location.country.id,
        params.locale
    );
    const scheduleData = await apiSchedule.getLocationById(
        params.establishment
    );
    if (!tagsEstablishment || !locationCountryData) {
        notFound();
    }

    // TODO: mapper tag
    const classTag = tagsEstablishment.find(
        (tag) =>
            tag.groupKey.key === CONSTANT_CATEGORY_CLASS_TAG.star ||
            tag.groupKey.key === CONSTANT_CATEGORY_CLASS_TAG.price
    );
    const breadcrumbData = await apiLocation.getBreadcrumbData({
        ids: locationData?.pathBreadcrumb || "",
        lang: params.locale,
    });
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
            classTag={classTag}
            // locationData={locationData}
            locationCountryData={locationCountryData}
            scheduleData={scheduleData}
            breadcrumbData={breadcrumbData}
        />
    );
}
