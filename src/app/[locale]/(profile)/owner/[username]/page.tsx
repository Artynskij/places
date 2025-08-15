import { IPageProps } from "@/lib/models";
import OwnerScreen from "@/screens/(Profile)/OwnerScreen/OwnerScreen";
import { unstable_setRequestLocale } from "next-intl/server";
export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | owner`,
    };
}

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        username:string
    };
}

export default function OwnerPage({ params, searchParams }: IProps) {
    unstable_setRequestLocale(params.locale);
    return (
        <div className="container">
            <OwnerScreen params={params} />
        </div>
    );
}
