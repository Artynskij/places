import { Video } from "@/components/UI/Video/Video";

import Link from "next/link";
import type { Metadata } from "next";

import { IBasePageProps } from "@/lib/models/common/IType";
import { unstable_setRequestLocale } from "next-intl/server";

import LocationScreen from "@/screens/LocationScreen/LocationScreen";
import { Loader } from "@/components/common/Loader/Loader";
import { notFound } from "next/navigation";

import { CONSTANT_TYPES_OF_ESTABLISHMENT_DB } from "@/asset/constants/database/types-of-establishment";
import { LocationService } from "@/lib/Api/location/location.service";
import { TagsService } from "@/lib/Api/(Establishment)/tags/tag.service";
import { CONSTANT_COUNTRIES_DB } from "@/asset/constants/database/countries.const";
import { EstablishmentService } from "@/lib/Api/(Establishment)/establishment/establishment.service";

export async function generateMetadata({
    params,
}: {
    params: { location: string };
}) {
    return {
        title: `${process.env.BASE_NAME} | ${params.location}`,
    };
}

interface IProps extends IBasePageProps<{ location: string }> {}

export default async function CountryPage({ params, searchParams }: IProps) {
    const apiEstablishment = new EstablishmentService();
    const apiLocation = new LocationService();
    const apiTags = new TagsService();

    const eaterEstablishment = await apiEstablishment.getByPagination({
        pagination: { page: 1, pageSize: 10 },
        filter: {
            typeIds: [CONSTANT_TYPES_OF_ESTABLISHMENT_DB.EATER.id],
            locationId: params.location,
        },

        lang: params.locale,
    });
    const accommodationEstablishment = await apiEstablishment.getByPagination({
        pagination: { page: 1, pageSize: 10 },
        filter: {
            typeIds: [CONSTANT_TYPES_OF_ESTABLISHMENT_DB.ACCOMMODATION.id],
            locationId: params.location,
        },

        lang: params.locale,
    });
    const attractionEstablishment = await apiEstablishment.getByPagination({
        pagination: { page: 1, pageSize: 10 },
        filter: {
            typeIds: [CONSTANT_TYPES_OF_ESTABLISHMENT_DB.ATTRACTION.id],
            locationId: params.location,
        },
        lang: params.locale,
    });
    const locationData = await apiLocation.getById(params.location);
    const townsResponse = await apiLocation.getAll({
        lang: params.locale,
        locationId: params.location,
        pagination: {
            page: 1,
            pageSize: 10,
        },
    });

    if (!locationData) notFound();
    const tagsClassEstablishment =
        await apiTags.getStarsAndPriceOfAllEstablishment({
            lang: params.locale,
            establishmentIds: [
                ...(eaterEstablishment?.map((item) => item.id) || []),
                ...(accommodationEstablishment?.map((item) => item.id) || []),
            ],
        });
    const breadcrumbData = await apiLocation.getBreadcrumbData({
        ids: locationData.pathBreadcrumb,
        lang: params.locale,
    });
    return (
        <>
            <LocationScreen
                params={params}
                searchParams={searchParams}
                dataEstablishment={{
                    accommodation: accommodationEstablishment || [],
                    attraction: attractionEstablishment || [],
                    eater: eaterEstablishment || [],
                }}
                breadcrumbData={breadcrumbData}
                locationData={locationData}
                tagsClassEstablishment={tagsClassEstablishment}
                townsData={townsResponse?.locations || null}
                dataTileContent={townsResponse?.locations || null}
                totalLocations={townsResponse?.info.total || 0}
            />
        </>
    );
}
