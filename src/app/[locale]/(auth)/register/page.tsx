import { FormRegister } from "@/components/common/Form/Auth/FormRegister/FormRegister";
import { IPageProps } from "@/lib/models/IType";

// import { GoogleMaps } from "@/components/UI/Map/Map/MapGoogle";

interface ILoginPage extends IPageProps {}

export default function LoginPage({ params: { locale } }: ILoginPage) {
    return (
        <>
            <div className="container">
                {/* <Button /> */}

                {/* <GoogleMaps /> */}
                {/* <FormAuth /> */}
                <FormRegister />
            </div>
        </>
    );
}
