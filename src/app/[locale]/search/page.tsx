import { IPageProps } from "@/lib/models";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | search`,
    };
}

interface IProps extends IPageProps {
    params: IPageProps["params"] & {};
}

export default async function SearchPage() {
    return "sdsa";
}
