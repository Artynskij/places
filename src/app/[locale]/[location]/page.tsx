import { Video } from "@/components/UI/Video/Video";

import Link from "next/link";
import type { Metadata } from "next";

import { IPageProps } from "@/lib/models/IType";
import { unstable_setRequestLocale } from "next-intl/server";

import LocationScreen from "@/screens/LocationScreen/LocationScreen";
import { Loader } from "@/components/common/Loader/Loader";
import { notFound } from "next/navigation";
import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";
import { TYPES_OF_ESTABLISHMENT } from "@/asset/constants/typesOfEstablishment";
import { LocationService } from "@/lib/Api/location/location.service";
import { TagsService } from "@/lib/Api/tags/tag.service";

export async function generateMetadata({
    params,
}: {
    params: { location: string };
}) {
    return {
        title: `${process.env.BASE_NAME} | ${params.location}`,
    };
}

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        location: string;
    };
}

export default async function CountryPage({ params, searchParams }: IProps) {
    // Пример запроса данных через API (если данные нужны на сервере)
    const apiEstablishment = new EstablishmentService();
    const apiLocation = new LocationService();
    const apiTags = new TagsService()

    const [
        eaterEstablishment,
        accommodationEstablishment,
        attractionEstablishment,
        locationData,
        townsData,
    ] = await Promise.all([
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
        apiLocation.getLocationById(params.location, params.locale),
        apiLocation.getListLocationInside({
            lang: params.locale,
            locationId: params.location,
            pagination:{
                page: 1,
                pageSize: 1000,
            }
            
        }),
    ]);

    if (!eaterEstablishment || !accommodationEstablishment || !locationData) notFound();
    const tagsClassEstablishment = await apiTags.getStarsAndPriceOfAllEstablishment({
        lang: params.locale,
        establishmentIds:[...(eaterEstablishment?.map(item => item.id)), ...(accommodationEstablishment?.map(item => item.id))]
    });
    return (
        <>
            <LocationScreen
                // typePage="country"
                params={params}
                searchParams={searchParams}
                dataEstablishment={{
                    accommodation: accommodationEstablishment || [],
                    attraction: attractionEstablishment || [],
                    eater: eaterEstablishment || [],
                }}
                locationData={locationData}
                townsData={townsData}
                tagsClassEstablishment={tagsClassEstablishment}
            />
        </>
    );
}
