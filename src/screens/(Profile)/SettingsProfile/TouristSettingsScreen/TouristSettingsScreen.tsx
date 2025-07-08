import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import ContentComponent from "./_components/ContentComponent/ContentComponent";
import { ROUTES } from "@/lib/config/Routes";

export const TouristSettingsScreen = () => {
    return (
        <>
            <Breadcrumb
                links={[
                    {
                        title: "Личный кабинет",
                        href: ROUTES.PROFILE.TOURIST("sherlock_bones"),
                    },
                    { title: "Настройки" },
                ]}
            />
            <h3>Настройки профиля Туриста</h3>
            <ContentComponent />
        </>
    );
};
