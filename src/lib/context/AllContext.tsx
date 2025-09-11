import { AlertMessageProvider } from "./AlertMessageContext/AlertMessageContext";
import { ViewTypeProvider } from "./ViewTypeListContext/ViewTypeListContext";
import { NotificationProvider } from "./NotificationContext/NotificationContext";
import { UserProvider } from "./UserContext/UserContext";
import { ModalProvider } from "./ModalContext/ModalContext";

export const AllContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <UserProvider>
            {/* <ModalProvider> */}
            <AlertMessageProvider>
                <NotificationProvider>
                    <ViewTypeProvider>{children}</ViewTypeProvider>
                </NotificationProvider>
            </AlertMessageProvider>
            {/* </ModalProvider> */}
        </UserProvider>
    );
};
