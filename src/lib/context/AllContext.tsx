import { AlertMessageProvider } from "./AlertMessageContext/AlertMessageContext";
import { ViewTypeProvider } from "./ViewTypeListContext/ViewTypeListContext";
import { NotificationProvider } from "./NotificationContext/NotificationContext";

export const AllContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <AlertMessageProvider>
            <NotificationProvider>
                <ViewTypeProvider>{children}</ViewTypeProvider>
            </NotificationProvider>
        </AlertMessageProvider>
    );
};
