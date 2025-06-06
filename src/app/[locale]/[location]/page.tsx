import { Video } from "@/components/UI/Video/Video";

import Link from "next/link";
import type { Metadata } from "next";

import { IPageProps } from "@/lib/models/IType";
import { unstable_setRequestLocale } from "next-intl/server";

import LocationScreen from "@/screens/LocationScreen/LocationScreen";
import { Loader } from "@/components/common/Loader/Loader";
import { notFound } from "next/navigation";
import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";
import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import { LocationService } from "@/lib/Api/location/location.service";
import { TagsService } from "@/lib/Api/tags/tag.service";
import { countriesData } from "@/asset/constants/countries";

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
    const apiEstablishment = new EstablishmentService();
    const apiLocation = new LocationService();
    const apiTags = new TagsService();

    const eaterEstablishment =
        await apiEstablishment.getEstablishmentByPagination({
            pagination: { page: 1, pageSize: 10 },
            filter: {
                typeIds: [CONSTANT_TYPES_OF_ESTABLISHMENT.EATER.id],
                locationId: params.location,
            },

            lang: params.locale,
        });
    const accommodationEstablishment =
        await apiEstablishment.getEstablishmentByPagination({
            pagination: { page: 1, pageSize: 10 },
            filter: {
                typeIds: [CONSTANT_TYPES_OF_ESTABLISHMENT.ACCOMMODATION.id],
                locationId: params.location,
            },

            lang: params.locale,
        });
    const attractionEstablishment =
        await apiEstablishment.getEstablishmentByPagination({
            pagination: { page: 1, pageSize: 10 },
            filter: {
                typeIds: [CONSTANT_TYPES_OF_ESTABLISHMENT.ATTRACTION.id],
                locationId: params.location,
            },
            lang: params.locale,
        });
    const locationData = await apiLocation.getLocationById(params.location);
    const townsData = await apiLocation.getListLocationInside({
        lang: params.locale,
        locationId: params.location,
        pagination: {
            page: 1,
            pageSize: 1000,
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
                locationData={locationData}
                townsData={townsData}
                tagsClassEstablishment={tagsClassEstablishment}
                dataTileContent={townsData}
                breadcrumbData={breadcrumbData}
            />
        </>
    );
}
