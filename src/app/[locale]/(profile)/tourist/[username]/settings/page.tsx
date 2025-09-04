import { IBasePageProps } from "@/lib/models";
// import { OwnerSettingsScreen } from "@/screens/(Profile)/SettingsProfile/OwnerSettingsScreen/OwnerSettingScreen";

import { TouristSettingsScreen } from "@/screens/(Profile)/SettingsProfile/TouristSettingsScreen";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | settings account`,
    };
}

interface IProps
    extends IBasePageProps<
        {
            username: string;
        },
        {
            tab: "personal" | "notification";
        }
    > {}

export default function TouristSettingsPage({ params, searchParams }: IProps) {
    return (
        <div className="container">
            <TouristSettingsScreen
                params={params}
                searchParams={searchParams}
            />
        </div>
    );
}
