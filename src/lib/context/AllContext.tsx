import { AlertMessageProvider } from "./AlertMessageContext/AlertMessageContext";
import { ViewTypeProvider } from "./ViewTypeListContext/ViewTypeListContext";
import { NotificationProvider } from "./NotificationContext/NotificationContext";
import { UserProvider } from "./UserContext/UserContext";
import { FavoritesProvider } from "./FavoriteContext/FavoriteContext";

export const AllContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <AlertMessageProvider>
            <NotificationProvider>
                <UserProvider>
                    <FavoritesProvider>
                        <ViewTypeProvider>{children}</ViewTypeProvider>
                    </FavoritesProvider>
                </UserProvider>
            </NotificationProvider>
        </AlertMessageProvider>
    );
};
