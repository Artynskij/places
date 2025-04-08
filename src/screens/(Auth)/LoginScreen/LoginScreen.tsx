import { FormLogin } from "@/components/common/Form/Auth/FormLogin/FormLogin";
import { IPageProps } from "@/lib/models";
interface IProp extends IPageProps {}
export const LoginScreen = ({ params }: IProp) => {
    return <FormLogin />;
};
