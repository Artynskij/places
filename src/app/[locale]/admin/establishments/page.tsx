import { IBasePageProps } from "@/lib/models/common/IType";
import EstablishmentsAdminScreen from "@/screens/(Admin)/Establishments/Establishments.screen";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | admin-establishments`,
    };
}

interface IProps extends IBasePageProps {
    params: IBasePageProps["params"] & {};
}

export default function EstablishmentsAdminPage({
    params,
    searchParams,
}: IProps) {
    return (
        <>
            <EstablishmentsAdminScreen />
        </>
    );
}
