import { FormCreateEstablishment } from "@/components/common/Form/Establishment/FormCreateEstablishment";
import { IBasePageProps } from "@/lib/models";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | form create establishment`,
    };
}

interface IProps extends IBasePageProps {}
export default function EstablishmentFormPage({
    params,
    searchParams,
}: IProps) {
    return (
        <div className="container">
            <FormCreateEstablishment />
        </div>
    );
}
