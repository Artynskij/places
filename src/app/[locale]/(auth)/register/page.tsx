import { FormRegister } from "@/components/common/Form/Auth/FormRegister/FormRegister";
import { IPageProps } from "@/lib/models/common/IType";

// import { GoogleMaps } from "@/components/UI/Map/Map/MapGoogle";

interface ILoginPage extends IPageProps {}

export default function RegisterPage({ params, searchParams }: ILoginPage) {
    return (
        <>
            <div className="container">
                <FormRegister />
            </div>
        </>
    );
}
