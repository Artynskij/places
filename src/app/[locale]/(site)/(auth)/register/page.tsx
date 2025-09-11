import { FormRegister } from "@/components/common/Form/Auth/FormRegister/FormRegister";
import { IBasePageProps } from "@/lib/models/common/IType";

// import { GoogleMaps } from "@/components/UI/Map/Map/MapGoogle";

interface ILoginPage extends IBasePageProps {}

export default function RegisterPage({ params, searchParams }: ILoginPage) {
    return (
        <>
            <div className="container">
                <FormRegister />
            </div>
        </>
    );
}
