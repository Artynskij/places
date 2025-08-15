import { IPageProps } from "@/lib/models";
import { OwnerSettingsScreen } from "@/screens/(Profile)/SettingsProfile/OwnerSettingScreen";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | settings account`,
    };
}

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        username: string;
    };
}

export default function TouristSettingsPage({ params, searchParams }: IProps) {
    return (
        <div className="container">
            <OwnerSettingsScreen/>
        </div>
    );
}
