import { IPageProps } from "@/lib/models";
import BusinessScreen from "@/screens/(Profile)/BusinessScreen/BusinessScreen";

import { unstable_setRequestLocale } from "next-intl/server";
export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | business`,
    };
}

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        business: string;
    };
}

export default function BusinessPage({ params, searchParams }: IProps) {
    unstable_setRequestLocale(params.locale);
    return (
        <div className="container">
            {/* <OwnerScreen params={params} /> */}
            <BusinessScreen params={params} searchParams={searchParams} />
        </div>
    );
}
