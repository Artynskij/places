"use client";

import { notification } from "antd";
import { createContext, useContext } from "react";
type INotificationMessage = {
    message: string;
    description?: string;
    showProgress?: boolean;
};
type INotificationContext = {
    success: (prop: INotificationMessage) => void;
    info: (prop: INotificationMessage) => void;
};

const NotificationContext = createContext<INotificationContext | undefined>(
    undefined
);

export const NotificationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [apiNotification, contextHolder] = notification.useNotification();
    const success = ({
        message,
        description,
        showProgress,
    }: INotificationMessage) =>
        apiNotification.success({
            message: message,
            description: description,
            showProgress: true,
            placement: "bottomRight",
        });
    const info = ({
        message,
        description,
        showProgress,
    }: INotificationMessage) =>
        apiNotification.info({
            message: message,
            description: description,
            showProgress: true,
            placement: "bottomRight",
        });
    return (
        <NotificationContext.Provider value={{ success,info }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotification used without Provider");
    return context;
};
