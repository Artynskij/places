import { IBasePageProps } from "@/lib/models/common/IType";
import { UserAdminScreen } from "@/screens/(Admin)/Users/UsersAdmin.screen";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | admin-users`,
    };
}

interface IProps extends IBasePageProps {
    params: IBasePageProps["params"] & {};
}

export default function UsersAdminPage({ params, searchParams }: IProps) {
    return (
        <>
            <UserAdminScreen></UserAdminScreen>
            {/* <DataManagerScreen /> */}
        </>
    );
}
