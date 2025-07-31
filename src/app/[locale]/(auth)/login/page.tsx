import { FormLogin } from "@/components/common/Form/Auth/FormLogin/FormLogin";
import { IPageProps } from "@/lib/models/common/IType";

// import { GoogleMaps } from "@/components/UI/Map/Map/MapGoogle";

interface ILoginPage extends IPageProps {}

export default function LoginPage({ params, searchParams }: ILoginPage) {
    return (
        <>
            <div className="container">
                <FormLogin />
            </div>
        </>
    );
}
