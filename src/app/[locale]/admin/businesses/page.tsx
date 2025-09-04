import { IBasePageProps } from "@/lib/models/common/IType";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | admin-businesses`,
    };
}

interface IProps extends IBasePageProps {
    params: IBasePageProps["params"] & {};
}

export default function BusinessesAdminPage({ params, searchParams }: IProps) {
    return (
        <>
            <div>businesses</div>
            {/* <DataManagerScreen /> */}
        </>
    );
}
