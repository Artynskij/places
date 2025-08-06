import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
import { FormCreateEstablishment } from "@/components/common/Form/Establishment/FormCreateEstablishment";
import { IPageProps } from "@/lib/models";
import { TTypeOwnerBusiness } from "@/lib/models/types/auth/TTypeOwnerBusiness";
import { BusinessFormScreen } from "@/screens/(Form)/BusinessFormScreen";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | form create establishment`,
    };
}

interface IProps extends IPageProps {
    searchParams: {
        // [CONSTANT_SEARCH_PARAMS.TAB]: TTypeOwnerBusiness;
    };
}
export default function EstablishmentFormPage({
    params,
    searchParams,
}: IProps) {
    return (
        <div className="container">
            {/* <BusinessFormScreen params={params} searchParams={searchParams} /> */}
            <FormCreateEstablishment typeUser="tourist"/>
        </div>
    );
}
