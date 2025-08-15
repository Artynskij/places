
import { FormCreateEstablishment } from "@/components/common/Form/Establishment/FormCreateEstablishment";
import { IPageProps } from "@/lib/models";


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
            <FormCreateEstablishment />
        </div>
    );
}
