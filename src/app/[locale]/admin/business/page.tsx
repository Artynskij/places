import { IBasePageProps } from "@/lib/models/common/IType";
import { BusinessAdminScreen } from "@/screens/(Admin)/Business";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | admin-business`,
    };
}

interface IProps extends IBasePageProps {
    params: IBasePageProps["params"] & {};
}

export default function BusinessAdminPage({ params, searchParams }: IProps) {
    return (
        <>
            <BusinessAdminScreen />
            {/* <DataManagerScreen /> */}
        </>
    );
}
