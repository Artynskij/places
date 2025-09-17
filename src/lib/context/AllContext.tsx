import { AlertMessageProvider } from "./AlertMessageContext/AlertMessageContext";
import { ViewTypeProvider } from "./ViewTypeListContext/ViewTypeListContext";
import { NotificationProvider } from "./NotificationContext/NotificationContext";
import { UserProvider } from "./UserContext/UserContext";


export const AllContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <UserProvider>
           
            <AlertMessageProvider>
                <NotificationProvider>
                    <ViewTypeProvider>{children}</ViewTypeProvider>
                </NotificationProvider>
            </AlertMessageProvider>
          
        </UserProvider>
    );
};
