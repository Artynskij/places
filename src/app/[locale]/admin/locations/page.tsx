import { IBasePageProps } from "@/lib/models/common/IType";
import {LocationsAdminScreen} from "@/screens/(Admin)/Locations";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | admin-locations`,
    };
}

interface IProps extends IBasePageProps {
    params: IBasePageProps["params"] & {};
}

export default function LocationsAdminPage({ params, searchParams }: IProps) {
    return (
        <>
            <LocationsAdminScreen />
        </>
    );
}
