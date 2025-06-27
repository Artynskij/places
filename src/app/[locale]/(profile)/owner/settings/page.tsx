import { IPageProps } from "@/lib/models";
import { OwnerSettingsScreen } from "@/screens/(Profile)/SettingsProfile/OwnerSettingsScreen/OwnerSettingScreen";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | settings account`,
    };
}

interface IProps extends IPageProps {
    params: IPageProps["params"] & {};
}

export default function TouristSettingsPage({ params, searchParams }: IProps) {
    return (
        <div className="container">
            <OwnerSettingsScreen></OwnerSettingsScreen>
        </div>
    );
}
