import { FormLogin } from "@/components/common/Form/Auth/FormLogin/FormLogin";
import { IPageProps } from "@/lib/models/IType";
import { LoginScreen } from "@/screens/(Auth)/LoginScreen/LoginScreen";

// import { GoogleMaps } from "@/components/UI/Map/Map/MapGoogle";

interface ILoginPage extends IPageProps {}

export default function LoginPage({ params, searchParams }: ILoginPage) {
    return (
        <>
            <div className="container">
                <LoginScreen params={params} />
            </div>
        </>
    );
}
