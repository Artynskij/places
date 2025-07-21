import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
import { IPageProps } from "@/lib/models";
import { TTypeOwnerBusiness } from "@/lib/models/types/auth/TTypeOwnerBusiness";
import { BusinessFormScreen } from "@/screens/(Form)/BusinessFormScreen";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | form business`,
    };
}

interface IProps extends IPageProps {
    searchParams: {
        [CONSTANT_SEARCH_PARAMS.TAB]: TTypeOwnerBusiness;
    };
}
export default function BusinessFormPage({ params, searchParams }: IProps) {
    return (
        <div className="container">
            <BusinessFormScreen params={params} searchParams={searchParams} />
        </div>
    );
}
