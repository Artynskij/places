import { IBasePageProps } from "@/lib/models";
import { BusinessSettingsScreen } from "@/screens/(Profile)/SettingsProfile/BusinessSettingsScreen";
// import { OwnerSettingsScreen } from "@/screens/(Profile)/SettingsProfile/OwnerSettingsScreen/OwnerSettingScreen";

import { TouristSettingsScreen } from "@/screens/(Profile)/SettingsProfile/TouristSettingsScreen";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | settings business`,
    };
}

interface IProps extends IBasePageProps<{ business: string }> {}

export default function BusinessSettingsPage({ params, searchParams }: IProps) {
    return (
        <div className="container">
            <BusinessSettingsScreen params={params} />
        </div>
    );
}
