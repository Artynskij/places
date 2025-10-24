import { IBasePageProps } from "@/lib/models/common/IType";

import { AttributesAdminScreen } from "@/screens/(Admin)/Attributes";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | admin-attributes`,
    };
}

interface IProps extends IBasePageProps {
    params: IBasePageProps["params"] & {};
}

export default function AttributesAdminPage({ params, searchParams }: IProps) {
    return (
        <>
            <AttributesAdminScreen />
        </>
    );
}
