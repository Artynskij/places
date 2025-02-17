import { FormLogin } from "@/components/common/Form/Auth/FormLogin/FormLogin";
import { IPageProps } from "@/models/IType";

// import { GoogleMaps } from "@/components/UI/Map/Map/MapGoogle";

interface ILoginPage extends IPageProps {}

export default function LoginPage({ params: { locale } }: ILoginPage) {
  return (
    <>
      <div className="container">
        {/* <Button /> */}

        {/* <GoogleMaps /> */}
        <FormLogin />
      </div>
    </>
  );
}
